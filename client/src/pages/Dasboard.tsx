import { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import ProjectForm, { ProjectFormData } from "../components/projects/projectForm";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data.data));
  }, []);

  const handleAddProject = async (data: ProjectFormData) => {
    try {
      const res = await API.post("/projects/create", data);
      setProjects((prev) => [...prev, res.data]);
      setShowForm(false); // hide form after submit
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">My Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Add Project"}
        </button>
      </div>

      {/* Show form only when button clicked */}
      {showForm && <ProjectForm onSubmit={handleAddProject} />}

      {/* Project list */}
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p._id} className="p-4 bg-white rounded shadow">
            <Link to={`/projects/${p._id}`} className="text-xl text-blue-600">
              {p.title}
            </Link>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
