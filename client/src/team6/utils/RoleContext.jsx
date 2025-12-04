import { createContext, useContext, useState, useEffect } from 'react';
import { getSelectedRole, onRoleChange } from './role';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => getSelectedRole());

  useEffect(() => {
    // Subscribe to role changes
    const unsubscribe = onRoleChange((newRole) => {
      setRole(newRole);
    });

    return unsubscribe;
  }, []);

  return (
    <RoleContext.Provider value={{ role }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
};