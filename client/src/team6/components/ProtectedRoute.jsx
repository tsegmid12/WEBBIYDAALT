import { Navigate } from 'react-router-dom';
import { getSelectedRole, hasRole } from '../utils/role';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  if (!hasRole()) {
    return <Navigate to='/team6/select-role' replace />;
  }

  if (requiredRole) {
    const selectedRole = getSelectedRole();
    if (selectedRole !== requiredRole) {
      return <Navigate to='/team6' replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

