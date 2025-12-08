import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { schoolAPI } from "./api";

export default function SchoolForm({ isNew = true, id }) {
  const nav = useNavigate();

  const [f, setF] = useState({
    name: "",
    picture: "",
    priority: "",
  });

  useEffect(() => {
    if (!isNew && id) {
      const fetchSchool = async () => {
        try {
          const school = await schoolAPI.getSchoolById(id);
          if (school) setF(school);
        } catch (err) {
          console.error(err);
        }
      };
      fetchSchool();
    }
  }, [id, isNew]);

  async function save() {
    if (!f.name || !f.picture || !f.priority) {
      alert("Бүх талбарыг бөглөнө үү!");
      return;
    }

    try {
      if (isNew) {
        await schoolAPI.createSchool(f);
        alert("Сургууль амжилттай нэмэгдлээ");
      } else {
        await schoolAPI.updateSchool(id, f); // You need to implement this
        alert("Сургуулийн мэдээлэл амжилттай шинэчлэгдлээ");
      }
      nav("/team4/admin/schools");
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа!");
    }
  }

  return (
    <div className="p-5">
      <button
        onClick={() => nav(-1)}
        className="text-sm mb-3 flex items-center gap-1 text-gray-600 hover:underline"
      >
        ← Буцах
      </button>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white shadow border rounded-lg p-5">
          <h2 className="font-semibold text-base mb-4">Сургуулийн мэдээлэл</h2>

          <div className="grid grid-cols-1 gap-2 mb-2">
            <input
              className="border p-2 text-sm rounded"
              placeholder="Нэр *"
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 mb-2">
            <input
              className="border p-2 text-sm rounded"
              placeholder="Зураг URL *"
              value={f.picture}
              onChange={(e) => setF({ ...f, picture: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 mb-3">
            <select
              className="border p-2 text-sm rounded"
              value={f.priority}
              onChange={(e) => setF({ ...f, priority: e.target.value })}
            >
              <option value="">Priority *</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="flex justify-between gap-2 mt-3">
            <button
              onClick={save}
              className="bg-[#1e255b] text-white text-sm px-5 py-2 rounded"
            >
              Хадгалах
            </button>
            <button
              onClick={() => nav("/team4/admin/users")}
              className="border text-sm px-5 py-2 rounded"
            >
              Цуцлах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
