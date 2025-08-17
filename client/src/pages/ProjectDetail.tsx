import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import TaskForm, { TaskFormData } from "../components/tasks/taskForm";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    API.get(`/projects/${id}`).then((res) => setProject(res.data));
    API.get(`/projects/${id}/tasks`).then((res) => setTasks(res.data.data));
  }, [id]);

  const handleAddTask = async (data: TaskFormData) => {
    try {
      const res = await API.post(`/projects/${id}/tasks/create`, data);
      setTasks((prev) => [...prev, res.data]);
      setShowForm(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="p-6">
      {project && (
        <div className="mb-6">
          <h1 className="text-2xl">{project.title}</h1>
          <p>{project.description}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl">Tasks</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Add Task"}
        </button>
      </div>

      {showForm && <TaskForm onSubmit={handleAddTask} />}

      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t._id} className="p-3 bg-white rounded shadow">
            <p className="font-semibold">{t.title}</p>
            <p>{t.description}</p>
            <p>Status: {t.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
