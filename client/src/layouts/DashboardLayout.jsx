import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = ({
  children,
}) => {
  const navigate = useNavigate();

  const { user, logout } =
    useContext(AuthContext);

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="w-full bg-black text-white px-8 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">
            Leave Management System
          </h1>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-lg font-semibold">
                {user?.role}
              </p>

              <p className="text-sm text-gray-400">
                {user?.name}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;