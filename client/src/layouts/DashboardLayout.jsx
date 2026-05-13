import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold">
            Leave Management System
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p>{user?.name}</p>
            <p className="text-gray-300 capitalize">
              {user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;