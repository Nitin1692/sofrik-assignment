This is the React frontend for the Project Management App.
It connects to the Node.js + Express backend to manage users, projects, and tasks.

## ✨ Features

- React + React Router for navigation

- User authentication with JWT (login/register forms)

- Protected routes (only accessible when logged in)

- Forms with Yup + Formik validation

- Create and manage projects and tasks

- API integration with backend (/api/* endpoints)

## 🛠️ Setup Instructions
1. Clone Repository

If not already cloned:
```bash
git clone https://github.com/your-username/project-management-app.git
cd project-management-app/client
```

2. Install Dependencies
```bash
npm install
```

## 🚧 Known Limitations


### Bundle Size & Performance

- Large React apps can result in bigger bundle sizes, impacting performance.

- Requires optimization techniques like code splitting and lazy loading.

### Frequent Updates

- React ecosystem evolves rapidly. Some libraries break after major updates.

### Client-Side Rendering Only (by default)

- Without SSR or hydration, initial load may be slower compared to traditional server-rendered apps.