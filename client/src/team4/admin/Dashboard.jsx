"use client";
import { useEffect, useState } from "react";
import { getLogs } from "./activityLog";
import { userAPI } from "./api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    teachers: 0,
    students: 0,
    classes: 0,
  });

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const classes = JSON.parse(localStorage.getItem("classes") || "[]");

      const teachers = users.filter((u) => u.role === "teacher").length;
      const students = users.filter((u) => u.role === "student").length;

      let totalUsers = 0;
      try {
        const allUsers = await userAPI.getAllUsers();
        totalUsers = allUsers.length;
      } catch (err) {
        console.error("Failed to fetch users:", err);
        totalUsers = users.length;
      }

      setStats({
        totalUsers,
        teachers,
        students,
        classes: classes.length,
      });

      setLogs(getLogs());
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Админ самбар</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-gray-600">Нийт хэрэглэгч</p>
          <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-gray-600">Хичээлүүд</p>
          <h3 className="text-2xl font-bold">{stats.classes}</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-gray-600">Багш</p>
          <h3 className="text-2xl font-bold">{stats.teachers}</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-gray-600">Оюутан</p>
          <h3 className="text-2xl font-bold">{stats.students}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-2">Сүүлийн үйлдлүүд</h3>
        <p className="text-xs text-gray-500 mb-3">
          Системд хийгдсэн сүүлийн 5 үйлдэл
        </p>

        {logs.length === 0 ? (
          <p className="text-gray-500 text-sm">Мэдээлэл алга</p>
        ) : (
          <ul className="text-sm space-y-1">
            {logs.slice(0, 5).map((log, i) => (
              <li key={i}>
                {log.action} — <b>{log.user}</b>
                <span className="text-gray-400 ml-2 text-xs">{log.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
