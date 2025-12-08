import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSelectedRole, hasRole, setSelectedRole } from '../utils/role';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // If no role is selected, automatically set to 'student'
    if (!hasRole()) {
      setSelectedRole('student');
    }
    setIsReady(true);
  }, []);

  // Wait for role to be set
  if (!isReady) {
    return null;
  }

  if (requiredRole) {
    const selectedRole = getSelectedRole();
    if (selectedRole !== requiredRole) {
      // If required role doesn't match, redirect to home
      return <Navigate to='/team6' replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

