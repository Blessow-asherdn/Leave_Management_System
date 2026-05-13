import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  user,
  allowedRole,
}) => {
  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;