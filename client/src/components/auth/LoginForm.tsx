import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = yup.InferType<typeof schema>;

export default function LoginForm({
    onSubmit,
}: {
    onSubmit: (data: LoginFormData) => void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    return (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl mb-4 text-center font-semibold text-gray-800">
                Login
            </h2>
            <div className="mb-3">
                <input
                    {...register("email")}
                    placeholder="Email"
                    className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>
            <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="bg-black text-white p-2 w-full rounded hover:bg-gray-800"
            >
                Login
            </button>
        </div>

    );
}
