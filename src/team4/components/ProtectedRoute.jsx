import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const raw = localStorage.getItem("currentUser");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const ProtectedRoute = ({ allowedRoles }) => {
  const user = useAuth();

  if (!user) return <Navigate to="/team4" replace />;

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.includes(user.role);
    if (!isAllowed) {
      const fallback = user.route || "/team4";
      return <Navigate to={fallback} replace />;
    }
  }

  return <Outlet />;
};
