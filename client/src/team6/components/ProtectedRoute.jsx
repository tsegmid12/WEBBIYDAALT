import { Navigate } from "react-router-dom";
import { hasRole, getSelectedRole } from "../utils/role";

const ProtectedRoute = ({ requiredRole, children }) => {
  if (!hasRole()) {
    return <Navigate to="/team6" replace />;
  }

  if (requiredRole && getSelectedRole() !== requiredRole) {
    return <Navigate to="/team6" replace />;
  }

  return children;
};

export default ProtectedRoute;
