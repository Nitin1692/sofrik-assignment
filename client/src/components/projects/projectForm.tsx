import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Project name is required"),
  description: yup.string().required("Project description is required"),
});

export type ProjectFormData = yup.InferType<typeof schema>;

export default function ProjectForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: ProjectFormData) => void;
  defaultValues?: ProjectFormData;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow-md w-full"
    >
      <h2 className="text-xl mb-4 text-center font-semibold text-gray-800">
        {defaultValues ? "Edit Project" : "New Project"}
      </h2>

      <div className="mb-3">
        <input
          {...register("title")}
          placeholder="Project Name"
          className="border border-gray-300 p-2 w-full rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-3">
        <textarea
          {...register("description")}
          placeholder="Project Description"
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700"
      >
        {defaultValues ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
