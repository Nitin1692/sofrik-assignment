import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../models/user.js";
import Project from "../models/project.js";
import Task from "../models/task.js";
import 'dotenv/config';

const MONGODB_URI = process.env.MONGO_URL || '';

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Project.deleteMany({});
  await Task.deleteMany({});
});

describe("User, Project, Task API", () => {
  it("should create a user, project, and task linked together", async () => {
    // 1. Create User
    const userRes = await request(app).post("/api/auth/register").send({
      name: "Alice",
      email: "alice@example.com",
      password: "Password123",
    });
    expect(userRes.statusCode).toBe(201);
    token = userRes.body.token;
    const userId = userRes.body._id;

    // 2. Create Project linked to user
    const projectRes = await request(app).post("/api/projects/create").set("Authorization", `Bearer ${token}`).send({
      title: "My Project",
      description: "Test project",
      userId,
    });
    expect(projectRes.statusCode).toBe(201);
    const projectId = projectRes.body._id;

    // 3. Create Task linked to project
    const taskRes = await request(app).post(`/api/projects/${projectId}/tasks/create`).set("Authorization", `Bearer ${token}`).send({
      title: "First Task",
      description: "Do something",
      status: "todo",
      projectId,
    });
    expect(taskRes.statusCode).toBe(201);
    expect(taskRes.body.project).toBe(projectId);

    // 4. Fetch tasks of project
    const tasksRes = await request(app).get(`/api/projects/${projectId}/tasks/`).set("Authorization", `Bearer ${token}`);
    expect(tasksRes.statusCode).toBe(200);
    expect(tasksRes.body.data.length).toBe(1);
    expect(tasksRes.body.data[0].title).toBe("First Task");
  });
});
