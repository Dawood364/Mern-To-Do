import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/tasks";

  const getTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();

    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);


  const addTask = async () => {
    if (!taskName || !date) {
      alert("Please fill all fields");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName,
        date,
      }),
    });

    setTaskName("");
    setDate("");

    getTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    getTasks();
  };


  const editTask = (task) => {
    setTaskName(task.taskName);
    setDate(task.date);
    setEditId(task._id);
  };


  const updateTask = async () => {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName,
        date,
      }),
    });

    setTaskName("");
    setDate("");
    setEditId(null);

    getTasks();
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Task Manager</h1>

        <input
          type="text"
          placeholder="Enter Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {editId ? (
          <button className="updateBtn" onClick={updateTask}>
            Update Task
          </button>
        ) : (
          <button className="addBtn" onClick={addTask}>
            Add Task
          </button>
        )}

        <div className="taskList">
          {tasks.map((task) => (
            <div className="taskCard" key={task._id}>
              <div>
                <h3>{task.taskName}</h3>
                <p>{task.date}</p>
              </div>

              <div className="btns">
                <button
                  className="editBtn"
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;