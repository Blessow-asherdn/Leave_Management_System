import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";

import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              user={user}
              allowedRole="admin"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute
              user={user}
              allowedRole="employee"
            >
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;