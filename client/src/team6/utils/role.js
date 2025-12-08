export const getSelectedRole = () => {
  return localStorage.getItem('team6_selected_role');
};

export const setSelectedRole = (role) => {
  localStorage.setItem('team6_selected_role', role);
};

export const clearSelectedRole = () => {
  localStorage.removeItem('team6_selected_role');
};

export const isTeacher = () => {
  return getSelectedRole() === 'teacher';
};

export const isStudent = () => {
  return getSelectedRole() === 'student';
};

export const hasRole = () => {
  return !!getSelectedRole();
};

