import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";

import EmployeeDashboard from "./pages/EmployeeDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";

import UsersPage from "./pages/admin/UsersPage";

import LeavesPage from "./pages/admin/LeavesPage";

import NotificationsPage from "./pages/admin/NotificationsPage";

import EmployeeNotificationsPage from "./pages/employee/NotificationsPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  const { user } =
    useContext(AuthContext);

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* EMPLOYEE DASHBOARD */}

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

        {/* EMPLOYEE NOTIFICATIONS */}

        <Route
          path="/employee/notifications"
          element={
            <ProtectedRoute
              user={user}
              allowedRole="employee"
            >
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              user={user}
              allowedRole="admin"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* USERS */}

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              user={user}
              allowedRole="admin"
            >
              <UsersPage />
            </ProtectedRoute>
          }
        />

        {/* LEAVES */}

        <Route
          path="/admin/leaves"
          element={
            <ProtectedRoute
              user={user}
              allowedRole="admin"
            >
              <LeavesPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN NOTIFICATIONS */}

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute
              user={user}
              allowedRole="admin"
            >
              <NotificationsPage />
            </ProtectedRoute>
          }
        />


      </Routes>

    </BrowserRouter>
  );
}

export default App;