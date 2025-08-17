import 'dotenv/config';
import mongoose from 'mongoose';
import argon2 from 'argon2';
import { connectDB } from '../config/db.js';
import User from '../models/user.js';
import Project from '../models/project.js';
import Task from '../models/task.js';

const MONGODB_URI = process.env.MONGO_URL || '';

async function run() {
  await connectDB(MONGODB_URI);
  try {
    // Clear collections
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Task.deleteMany({})
    ]);

    const password = await argon2.hash('Test@123');
    const user = await User.create({ email: 'test@example.com', password, name: 'Test User' });

    const projects = await Project.create([
      { user: user._id, title: 'Website Redesign', description: 'Revamp landing page', status: 'active' },
      { user: user._id, title: 'Mobile App', description: 'MVP for Android', status: 'active' }
    ]);

    const tasks = [];
    for (const p of projects) {
      tasks.push(
        { project: p._id, title: 'Plan', description: 'Define scope', status: 'todo', dueDate: new Date() },
        { project: p._id, title: 'Build', description: 'Implement features', status: 'in-progress' },
        { project: p._id, title: 'Test', description: 'QA and bug fixes', status: 'todo' },
      );
    }
    await Task.create(tasks);

    console.log('✅ Seed completed. User: test@example.com / Test@123');
  } catch (err) {
    console.error('❌ Seed failed:', err);
  } finally {
    await mongoose.connection.close();
  }
}

run();
