const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("Task CRUD API Tests", () => {

  test("Create Task - Valid Data", async () => {

    const res = await request(app)
      .post("/tasks")
      .send({
        taskName: "Complete MERN Assignment",
        date: "2026-05-17"
      });

    expect(res.statusCode).toBe(201);

  });

  test("Create Task - Missing taskName", async () => {

    const res = await request(app)
      .post("/tasks")
      .send({
        date: "2026-05-17"
      });

    expect(res.statusCode).toBe(400);

  });

  test("Get All Tasks", async () => {

    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);

  });

  test("Update Task", async () => {

    const newTask = await request(app)
      .post("/tasks")
      .send({
        taskName: "Old Task",
        date: "2026-05-17"
      });

    const taskId = newTask.body._id;

    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({
        taskName: "Updated Task"
      });

    expect(res.statusCode).toBe(200);

  });

  test("Delete Task", async () => {

    const newTask = await request(app)
      .post("/tasks")
      .send({
        taskName: "Delete Me",
        date: "2026-05-17"
      });

    const taskId = newTask.body._id;

    const res = await request(app)
      .delete(`/tasks/${taskId}`);

    expect(res.statusCode).toBe(200);

  });

});

afterAll(async () => {
  await mongoose.connection.close();
});