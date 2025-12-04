// Simple role management for team1
const ROLE_KEY = 'team1_selected_role';

export const getSelectedRole = () => {
  return localStorage.getItem(ROLE_KEY) || 'admin';
};

export const setSelectedRole = (role) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const isAdmin = () => {
  return getSelectedRole() === 'admin';
};

export const isProfessor = () => {
  return getSelectedRole() === 'professor';
};

export const isStudent = () => {
  return getSelectedRole() === 'student';
};

export const hasRole = () => {
  return !!getSelectedRole();
};

export const getRoleLabel = () => {
  const role = getSelectedRole();
  const labels = {
    admin: 'Админ',
    professor: 'Багш',
    student: 'Оюутан'
  };
  return labels[role] || 'Админ';
};

export const getRoleEmail = () => {
  const role = getSelectedRole();
  const emails = {
    admin: 'admin@must.edu.mn',
    professor: 'professor@must.edu.mn',
    student: 'student@must.edu.mn'
  };
  return emails[role] || 'admin@must.edu.mn';
};

