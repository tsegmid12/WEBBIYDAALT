import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseAPI, schoolAPI } from "./api";

export default function ClassesList() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [schoolNames, setSchoolNames] = useState({});

  const loadCourses = async () => {
  try {
    const schools = await schoolAPI.getAllSchools();
    const map = {};
    schools.forEach((s) => (map[s.id] = s.name));
    setSchoolNames(map);

    const schoolIds = schools.map((s) => s.id);
    let allCourses = [];

    for (let id of schoolIds) {
      const courses = await courseAPI.getCoursesBySchoolId(id);
      allCourses = [...allCourses, ...courses];
    }

    setClasses(allCourses);
  } catch (err) {
    console.error("Failed to load courses:", err.message);
    alert("Хичээлүүдийг ачаалж чадсангүй!");
  }
};


  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Хичээлийг устгах уу?")) return;

    try {
      // API-аас хичээл устгах
      await courseAPI.deleteCourse(id);

      // UI refresh
      setClasses((prev) => prev.filter((c) => c.id !== id));

      alert("Хичээл устгалаа!");
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Устгах үед алдаа гарлаа!");
    }
  };

  console.log("classes", classes);
  // Нэрээр хайх
  const filtered = classes.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#F9FBFD] min-h-screen">
      
      {/* Хайлт */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center bg-white border rounded-lg shadow px-3 py-2 w-80">
          <span className="text-gray-400 text-lg mr-2">🔍</span>
          <input
            type="text"
            placeholder="Хичээлийн нэрээр хайх..."
            className="w-full outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Link
          to="/team4/admin/classes/add"
          className="bg-[#00CBB8] hover:bg-[#00b39e] text-white px-4 py-2 rounded-lg text-sm shadow font-medium transition"
        >
          + Хичээл нэмэх
        </Link>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold">Хичээлийн жагсаалт</h2>
        <p className="text-sm text-gray-500">
          Нийт {filtered.length} хичээл байна
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 italic">Хичээл олдсонгүй…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-gray-100"
            >
              <img
                src={
                  cls.picture
                    ? (cls.picture.startsWith("http")
                        ? cls.picture
                        : `https://todu.mn${cls.picture}`)
                    : "https://placehold.co/400x200?text=Course+Image"
                }
                className="rounded-lg mb-3 w-full h-40 object-cover"
                alt="Course cover"
              />


              <h3 className="font-semibold text-lg">{cls.name}</h3>

              <p className="text-sm text-gray-600">
                Сургууль: <b>{schoolNames[cls.school_id]}</b>
              </p>

              <p className="text-sm text-gray-600 mb-1">
                Тайлбар: <b>{cls.description || "Тайлбаргүй"}</b>
              </p>

              <div className="flex justify-between mt-4 pt-2 border-t">
                <Link
                  to={`/team4/admin/classes/${cls.id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Засах
                </Link>

                <button
                  onClick={() => handleDelete(cls.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Устгах
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
