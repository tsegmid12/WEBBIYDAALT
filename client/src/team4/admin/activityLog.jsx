export function getLogs() {
  return JSON.parse(localStorage.getItem("logs") || "[]");
}

export function addLog(action, user) {
  const logs = getLogs();
  const newLog = {
    action,
    user,
    time: new Date().toLocaleString(),
  };

  logs.unshift(newLog); 
  localStorage.setItem("logs", JSON.stringify(logs));
}

export function getRecentLogs(limit = 5) {
  const logs = getLogs();
  return logs.slice(0, limit);
}

export function clearLogs() {
  localStorage.removeItem("logs");
}
