// utils/role.js

// ================= Event System ==================
const roleListeners = new Set();

export const onRoleChange = (callback) => {
  roleListeners.add(callback);
  return () => roleListeners.delete(callback);
};

const notifyRoleChange = (role) => {
  roleListeners.forEach(listener => listener(role));
};

// ================= Local Storage ==================
export const getSelectedRole = () => {
  const stored = localStorage.getItem("team6_selected_role");
  
  if (!stored) return null;
  
  try {
    // Try to parse as JSON first (in case it's an object)
    const parsed = JSON.parse(stored);
    
    // If it's an object with a 'name' or 'role' property, extract it
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed.name || parsed.role || null;
    }
    
    // If it's already a string, return it
    return typeof parsed === 'string' ? parsed : null;
  } catch (e) {
    // Not JSON, return as string
    return stored;
  }
};

export const setSelectedRole = (role) => {
  // Always save as string, not object
  let roleString = role;
  
  if (typeof role === 'object' && role !== null) {
    roleString = role.name || role.role || null;
  }
  
  if (roleString) {
    localStorage.setItem("team6_selected_role", JSON.stringify(roleString));
    notifyRoleChange(roleString);
  }
};

export const clearSelectedRole = () => {
  localStorage.removeItem("team6_selected_role");
  notifyRoleChange(null);
};

// ================= Role Checkers ==================
export const isTeacher = () => {
  const role = getSelectedRole();
  return role === "teacher";
};

export const isStudent = () => {
  const role = getSelectedRole();
  return role === "student";
};

export const hasRole = () => {
  return !!getSelectedRole();
};

// ================= Stub API ==================
export const selectRoleOnServer = async (role) => {
  setSelectedRole(role);
  return Promise.resolve({ status: "ok", selectedRole: role });
};

export const getCurrentRoleFromServer = async () => {
  return Promise.resolve(getSelectedRole());
};

export const syncRoleWithServer = async () => {
  return getSelectedRole();
};

export const logoutRole = async () => {
  clearSelectedRole();
};