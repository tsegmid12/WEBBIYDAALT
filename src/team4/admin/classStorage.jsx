const KEY = "classes";

export function getClasses() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveClasses(classes) {
  localStorage.setItem(KEY, JSON.stringify(classes));
}

export function addClass(cls) {
  const classes = getClasses();
  cls.id = cls.code();
  classes.push(cls);
  saveClasses(classes);
}

export function getClassById(id) {
  return getClasses().find((c) => c.id.toString() === id.toString());
}

export function updateClass(id, data) {
  const classes = getClasses().map((c) =>
    c.id === Number(id) ? { ...c, ...data } : c
  );
  saveClasses(classes);
}

export function deleteClass(id) {
  const classes = getClasses().filter((c) => c.id !== Number(id));
  saveClasses(classes);
}
