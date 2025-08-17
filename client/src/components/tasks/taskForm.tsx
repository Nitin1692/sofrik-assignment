import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Task title is required"),
  description: yup.string().required("Task description is required"),
  status: yup.string().oneOf(["todo", "in-progress", "done"]).required(),
});

export type TaskFormData = yup.InferType<typeof schema>;

export default function TaskForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: TaskFormData) => void;
  defaultValues?: TaskFormData;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow-md w-full"
    >
      <h2 className="text-xl mb-4 text-center font-semibold text-gray-800">
        {defaultValues ? "Edit Task" : "New Task"}
      </h2>

      {/* Title */}
      <div className="mb-3">
        <input
          {...register("title")}
          placeholder="Task Title"
          className="border border-gray-300 p-2 w-full rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-3">
        <textarea
          {...register("description")}
          placeholder="Task Description"
          className="border border-gray-300 p-2 w-full rounded"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="mb-3">
        <select
          {...register("status")}
          className="border border-gray-300 p-2 w-full rounded"
        >
          <option value="">Select status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-700"
      >
        {defaultValues ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
