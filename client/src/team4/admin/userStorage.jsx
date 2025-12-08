const KEY = "users";

export function getUsers() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveUsers(users) {
  localStorage.setItem(KEY, JSON.stringify(users));
}

export function addUser(user) {
  const users = getUsers();
  user.id = Date.now();   
  user.password = "123";
  users.push(user);
  saveUsers(users);
}

export function getUserById(id) {

  return getUsers().find(u => u.id.toString() === id.toString());
}

export function updateUser(id, data) {
  const users = getUsers().map(u =>
    u.id.toString() === id.toString()
      ? { ...u, ...data }
      : u
  );
  saveUsers(users);
}

export function loginUser(email, pass) {
  return getUsers().find(
    u => u.email === email && u.password === pass
  );
}

export function deleteUser(id) {
  saveUsers(getUsers().filter(u => u.id.toString() !== id.toString()));
}
