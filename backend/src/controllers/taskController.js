const pool = require("../config/db");

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await pool.query(
      "INSERT INTO tasks (title, description, created_by, org_id) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, description, req.user.userId, req.user.orgId]
    );

    // audit log
    await pool.query(
      "INSERT INTO audit_logs (action, user_id, task_id) VALUES ($1,$2,$3)",
      ["CREATE_TASK", req.user.userId, result.rows[0].id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating task" });
  }
};

// ✅ GET TASKS
exports.getTasks = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      // admin → all tasks in org
      result = await pool.query(
        "SELECT * FROM tasks WHERE org_id=$1",
        [req.user.orgId]
      );
    } else {
      // member → only own tasks
      result = await pool.query(
        "SELECT * FROM tasks WHERE org_id=$1 AND created_by=$2",
        [req.user.orgId, req.user.userId]
      );
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM tasks WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const task = result.rows[0];

    // RBAC check
    if (
      req.user.role !== "admin" &&
      task.created_by !== req.user.userId
    ) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);

    // audit log
    await pool.query(
      "INSERT INTO audit_logs (action, user_id, task_id) VALUES ($1,$2,$3)",
      ["DELETE_TASK", req.user.userId, id]
    );

    res.json({ msg: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting task" });
  }
};