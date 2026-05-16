const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb://dawoodta80_db_user:QeEY4fColV52SfpZ@ac-repcvt8-shard-00-00.hqvz7gv.mongodb.net:27017,ac-repcvt8-shard-00-01.hqvz7gv.mongodb.net:27017,ac-repcvt8-shard-00-02.hqvz7gv.mongodb.net:27017/taskApp?ssl=true&replicaSet=atlas-30wyyd-shard-0&authSource=admin&retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Schema
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

// Model
const Task = mongoose.model("Task", taskSchema);


app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =========================
// DELETE TASK
// =========================
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Server Start
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});