import { Navigate } from 'react-router-dom';
import { isAdmin, isProfessor } from '../utils/role';

export const ProtectedRoute = ({ children, requireAdmin = false, requireProfessor = false }) => {
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/team1/schools" replace />;
  }
  
  if (requireProfessor && !isProfessor() && !isAdmin()) {
    return <Navigate to="/team1/schools" replace />;
  }

  return children;
};

export default ProtectedRoute;

