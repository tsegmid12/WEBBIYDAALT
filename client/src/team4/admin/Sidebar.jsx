import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Icon({ name, active }) {
  const base = "w-4 h-4 mr-2";
  const fill = active ? "#0a0a0a" : "#cbd5e1";

  switch (name) {
    case "dashboard":
      return (
        <svg className={base} viewBox="0 0 24 24" fill={fill}>
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      );
    case "users":
      return (
        <svg className={base} viewBox="0 0 24 24" fill={fill}>
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      );
    case "courses":
      return (
        <svg className={base} viewBox="0 0 24 24" fill={fill}>
          <path d="M21 4H3v2h18V4zM3 8h18v10H3V8zm2 2v6h14v-6H5z" />
        </svg>
      );
    case "reports":
      return (
        <svg className={base} viewBox="0 0 24 24" fill={fill}>
          <path d="M3 13h2v6H3v-6zm4-4h2v10H7V9zm4 2h2v8h-2v-8zm4-6h2v14h-2V5zm4 4h2v10h-2V9z" />
        </svg>
      );
    case "settings":
      return (
        <svg className={base} viewBox="0 0 24 24" fill={fill}>
          <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.6-.22l-2.39.96a7.007 7.007 0 00-1.63-.94l-.36-2.54A.5.5 0 0013.9 1h-3.8a.5.5 0 00-.49.41L9.25 3.95c-.59.22-1.13.52-1.63.9l-2.4-.96a.5.5 0 00-.6.22L2.7 7.43a.5.5 0 00.12.64L4.85 9.65c-.04.31-.06.63-.06.95s.02.64.06.95l-2.03 1.58a.5.5 0 00-.12.64l1.92 3.32c.13.22.39.31.61.22l2.39-.96c.5.38 1.05.68 1.63.9l.36 2.54c.05.24.25.41.49.41h3.8c.24 0 .45-.17.49-.41l.36-2.54c.58-.22 1.12-.52 1.62-.9l2.4.96c.22.09.48 0 .6-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1112 8a3.5 3.5 0 010 7.5z" />
        </svg>
      );
    case "logout":
      return (
        <svg className={base} viewBox="0 0 24 24" fill={fill}>
          <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
        </svg>
      );
    case "school":
      return (
        <svg className={base} viewBox="0 0 24 24" fill={fill}>
          <path d="M12 2l7 4v4h-2V7.97L12 5 7 7.97V10H5V6l7-4zm-7 9h14v11H5V11zm4 2v3h2v-3H9zm4 0v3h2v-3h-2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { label: "Самбар", path: "/team4/admin/dashboard", icon: "dashboard" },
    { label: "Сургуулиуд", path: "/team4/admin/schools", icon: "school" },
    { label: "Хэрэглэгчид", path: "/team4/admin/users", icon: "users" },
    { label: "Хичээлүүд", path: "/team4/admin/classes", icon: "courses" },
    { label: "Тайлан", path: "/team4/admin/reports", icon: "reports" },
    { label: "Тохиргоо", path: "/team4/admin/settings", icon: "settings" },
    { label: "Гарах", path: "/team4", icon: "logout" },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-[#0e153a] text-white pt-16">
      <nav>
        {menu.map((item) => {
          const active =
            item.path === "/team4"
              ? pathname === "/team4"
              : pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mx-2 mb-1 flex items-center py-2.5 px-3 rounded text-sm transition
                ${
                  active
                    ? "bg-[#00CBB8] text-black font-semibold"
                    : "text-gray-300 hover:bg-[#1e266d]"
                }
              `}
            >
              <Icon name={item.icon} active={active} />
              <span className="text-[16px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
