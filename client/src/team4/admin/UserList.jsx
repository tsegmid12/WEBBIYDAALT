import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAPI } from "./api";

export default function UsersList() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await userAPI.getAllUsers();
      setUsers(allUsers);
    };
    loadUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      (u.first_name + " " + u.last_name + " " + u.email)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (roleFilter === "all" || u.role === roleFilter)
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  // For showing only 5 page buttons at a time
  const getPageNumbers = () => {
    const maxButtons = 5;
    let start = Math.max(currentPage - 2, 1);
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxButtons + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      {/* Search and filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Нэр эсвэл и-мэйлээр хайх..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-3 items-center">
          <select
            className="border rounded-md px-3 py-2 text-sm text-gray-700"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Бүгд</option>
            <option value="admin">Админ</option>
            <option value="teacher">Багш</option>
            <option value="student">Оюутан</option>
          </select>

          <Link
            to="/team4/admin/users/add"
            className="bg-[#00CBB8] text-white font-medium px-4 py-2 rounded-md hover:bg-[#06b3a1] text-sm transition"
          >
            + Хэрэглэгч нэмэх
          </Link>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4">Нэр</th>
              <th className="py-3 px-4">И-мэйл</th>
              <th className="py-3 px-4">Үүрэг</th>
              <th className="py-3 px-4">Сүүлийн нэвтрэлт</th>
              <th className="py-3 px-4">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  Хэрэглэгч олдсонгүй...
                </td>
              </tr>
            ) : (
              currentUsers.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 max-w-[240px] whitespace-nowrap overflow-hidden text-ellipsis">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => nav(`/team4/admin/users/${u.id}/edit`)}
                    >
                      {u.first_name} {u.last_name}
                    </button>
                  </td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 text-xs rounded bg-green-100 text-green-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {u.lastLogin || "--"}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-red-500 hover:underline text-sm">
                      🗑 Устгах
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            Өмнөх
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded-md text-sm ${
                page === currentPage ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            Дараах
          </button>
        </div>
      )}
    </div>
  );
}
