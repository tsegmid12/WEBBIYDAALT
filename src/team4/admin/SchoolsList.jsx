import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./userStorage";
import { Link, useNavigate } from "react-router-dom";
import { schoolAPI } from "./api";

export default function SchoolsList() {
  const nav = useNavigate();

  const [search, setSearch] = useState("");
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function load() {
      const result = await schoolAPI.getAllSchools();
      setSchools(result);
    }
    load();
  }, []);

  console.log(schools, "schools");

  function remove(id) {
    if (window.confirm("Устгах уу?")) {
      deleteUser(id);
      setSchools(getUsers());
    }
  }

  const filtered = schools.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Нэрээр хайх..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-3 items-center">
          <Link
            to="/team4/admin/schools/add"
            className="bg-[#00CBB8] text-white font-medium px-4 py-2 rounded-md hover:bg-[#06b3a1] text-sm transition"
          >
            + Сургууль нэмэх
          </Link>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-1">Сургуулиудын жагсаалт</h2>
      <p className="text-sm text-gray-500 mb-4">
        Нийт {filtered.length} сургууль байна
      </p>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4">Нэр</th>
              <th className="py-3 px-4">Сүүлийн шинэчлэлт</th>
              <th className="py-3 px-4">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  Сургууль олдсонгүй...
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 max-w-[240px] whitespace-nowrap overflow-hidden text-ellipsis">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => nav(`/team4/admin/schools/${u.id}/edit`)}
                    >
                      {u.name}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {u.updated_on.split("T").join(" ") || "--"}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      className="text-red-500 hover:underline text-sm"
                      onClick={() => remove(u.id)}
                    >
                      🗑 Устгах
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
