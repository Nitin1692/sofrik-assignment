import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import API from "../../utils/api";
import { loginSuccess } from "../../redux/authSlice";
import LoginForm, { LoginFormData } from "../../components/auth/LoginForm";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const res = await API.post("/auth/login", data);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
        <p className="mt-3 text-center text-sm text-gray-600">
          No account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
