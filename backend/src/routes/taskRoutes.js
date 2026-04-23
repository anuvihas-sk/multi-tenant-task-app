const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

// routes
router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.delete("/:id", auth, deleteTask);

module.exports = router;