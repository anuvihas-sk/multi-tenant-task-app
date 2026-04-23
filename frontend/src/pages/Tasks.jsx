import { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks", {
      headers: { Authorization: token },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ CREATE TASK
  const createTask = async () => {
    await axios.post(
      "http://localhost:5000/tasks",
      { title, description },
      { headers: { Authorization: token } }
    );

    setTitle("");
    setDescription("");
    fetchTasks(); // refresh
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`, {
      headers: { Authorization: token },
    });

    fetchTasks(); // refresh
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tasks</h2>

      {/* CREATE */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createTask}>Add Task</button>

      <hr />

      {/* LIST */}
      {tasks.map((t) => (
        <div key={t.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h4>{t.title}</h4>
          <p>{t.description}</p>

          <button onClick={() => deleteTask(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}