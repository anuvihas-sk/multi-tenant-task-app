const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, org_id } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await pool.query(
    "INSERT INTO users (name, email, password, role, org_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [name, email, hashed, "member", org_id]
  );

  res.json(user.rows[0]);
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0)
    return res.status(400).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid)
    return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign(
    {
      userId: user.rows[0].id,
      orgId: user.rows[0].org_id,
      role: user.rows[0].role,
    },
    "SECRET_KEY"
  );

  res.json({ token });
};