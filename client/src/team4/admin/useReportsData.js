import { useState, useEffect } from "react";

const mockUsers = [
  {
    id: 1,
    firstName: "Анар",
    lastName:"Бат",
    email: "anar@must.edu.mn",
    role: "schoolstudent",
    joined: "2025-10-15",
    active: true,

  },
  {
    id: 2,
    firstName: "Болд",
    lastName:"Бат",

    email: "bold@must.edu.mn",
    role: "schoolteacher",
    joined: "2025-09-20",
    active: false,
  },
  {
    id: 3,
    firstName: "Сувд",
    lastName:"Бат",

    email: "suvd@must.edu.mn",
    role: "schooladmin",
    joined: "2025-08-10",
    active: true,
  },
  {
    id: 4,
    firstName: "Ганбат",
    lastName:"Бат",

    email: "ganbat@must.edu.mn",
    role: "schoolstudent",
    joined: "2025-11-01",
    active: true,
  },
  {
    id: 5,
    firstName: "Оюу",
    lastName:"Бат",

    email: "oyuu@must.edu.mn",
    role: "schoolstudent",
    joined: "2025-11-05",
    active: true,
  },
  {
    id: 5,
    firstName: "Оюу",
    lastName:"Бат",

    email: "oyuu@must.edu.mn",
    role: "schoolstudent",
    joined: "2025-11-05",
    active: true,
  },
];

const generateChartData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date.toLocaleDateString("mn-MN", { day: "numeric" });
    data.push({ day: `${day}-ны`, users: Math.floor(Math.random() * 15) + 5 });
  }
  return data;
};

export const useReportsData = () => {
  const [users] = useState(mockUsers);
  const [chartData] = useState(generateChartData());
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    teachers: 0,
    admins: 0,
    activeToday: 0,
  });

  useEffect(() => {
    const activeToday = users.filter((u) => u.active).length;
    setStats({
      total: users.length,
      students: users.filter((u) => u.role === "schoolstudent").length,
      teachers: users.filter((u) => u.role === "schoolteacher").length,
      admins: users.filter((u) => ["admin", "schooladmin"].includes(u.role))
        .length,
      activeToday,
    });
  }, [users]);

  return { users, chartData, stats };
};
