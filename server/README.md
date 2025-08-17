#Project Management App (Node.js + Express)

A full-stack application for managing users, projects, and tasks.
The backend is built with Node.js, Express, MongoDB, Mongoose, and JWT authentication, while the frontend is powered by React.

## 🚀 Features

- User authentication (Register/Login with JWT)

- Create and manage projects

- Create tasks linked to projects and users

- Protected routes (only accessible with valid token)

- Database seeders for initial dummy data

- Unit testing with Jest + Supertest

## 🛠️ Setup Instructions
1. Clone Repository
```bash
git clone https://github.com/Nitin1692/sofrik-assignment.gits
cd sofrik-assignment
```

2. Backend Setup
```bash
cd server
npm install
```

Environment Variables (.env)

Create a .env file inside server/:

PORT=5000
MONGO_URI=mongodb://localhost:27017/project_management
JWT_SECRET=your_jwt_secret

Run Backend
```bash
node index.js
```


Backend runs on http://localhost:4000


🌱 Database Seeders

We use a seeder script to populate the database with sample users, projects, and tasks.

Run Seeder
```bash
cd server
node seed/seed.js
```

🧪 Running Tests

Tests are written with Jest and Supertest.

Run all tests:
```bash
cd server
npm test
```

## ⚠️ Known Limitations
<!-- TODO: Fill this section -->

- e.g. No password reset feature yet

- e.g. JWT tokens don’t refresh automatically