import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(
        formData
      );

      toast.success("Login successful");

      login(response.data);

      if (
        response.data.user.role ===
        "admin"
      ) {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <nav className="w-full bg-black text-white px-8 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">
            Leave Management System
          </h1>

          <p className="text-gray-300 text-sm">
            Employee Portal
          </p>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-black mb-2">
              Login
            </h2>

            <p className="text-gray-500">
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-black font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="mb-7">
              <label className="block text-black font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;