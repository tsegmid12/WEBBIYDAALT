"use client";
import { useContext, useEffect, useState } from "react";
import { logOut } from "../../utils/UserService";
import { UserContext } from "../../contexts/UserContext";

export default function Topbar() {
  const [user, setUser] = useState(null);
  const { logout } = useContext(UserContext);
  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    logOut();
    logout();

    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-[#13C3DA] flex items-center justify-between px-10 text-white shadow z-50">
      <div className="text-2xl font-bold">LGT</div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm">
            {user.name || user.firstName} ({user.role})
          </span>
        )}

        <button
          onClick={handleLogout}
          className="bg-white text-[#13C3DA] px-4 py-1.5 rounded shadow hover:bg-gray-100"
        >
          Гарах
        </button>
      </div>
    </div>
  );
}
