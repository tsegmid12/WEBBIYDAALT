import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { schoolAPI, courseAPI } from "./api";

export default function ClassForm() {
  const nav = useNavigate();
  const { id } = useParams();

  const [schools, setSchools] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category_id: "",
    picture: "",
    priority: "",
    start_on: "",
    end_on: "",
    cloned_course_id: "",
    school_id: "",
  });

  // const loadSchools = async () => {
  //   const data = await schoolAPI.getAllSchools();
  //   setSchools(data);
  // };

  // const loadCourse = async () => {
  //   if (!id) return;
  //   try {
  //     const data = await courseAPI.getCourseById(id);
  //     setForm({
  //       name: data.name || "",
  //       description: data.description || "",
  //       category_id: data.category_id || "",
  //       picture: data.picture || "",
  //       priority: data.priority || "",
  //       start_on: data.start_on || "",
  //       end_on: data.end_on || "",
  //     });
  //   } catch (err) {
  //     alert("Хичээлийн мэдээлэл олдсонгүй!");
  //     console.error(err);
  //     nav("/team4/admin/classes");
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const schools = await schoolAPI.getAllSchools();
      setSchools(schools);

      if (id) {
        try {
          const data = await courseAPI.getCourseById(id);
          setForm({
            name: data.name || "",
            description: data.description || "",
            category_id: data.category_id || "",
            picture: data.picture || "",
            priority: data.priority || "",
            start_on: data.start_on || "",
            end_on: data.end_on || "",
            school_id: data.school_id || "",
          });
        } catch (err) {
          console.error(err);
          alert("Хичээлийн мэдээлэл олдсонгүй!");
          nav("/team4/admin/classes");
        }
      }
    };

    fetchData();
  }, [id, nav]);

  const save = async () => {
    if (!form.name || !form.category_id || !form.start_on) {
      alert("Шаардлагатай талбаруудыг бөглөнө үү!");
      return;
    }

    const body = {
      ...form,
      category_id: form.category_id,
      priority: form.priority || "",
      cloned_course_id: form.cloned_course_id || "",
      start_on: form.start_on || "",
      end_on: form.end_on || "",
    };

    console.log("FINAL BODY: ", JSON.stringify(body, null, 2));

    try {
      if (id) {
        await courseAPI.updateCourse(id, body);
        alert("Хичээл засагдлаа!");
      } else {
        await courseAPI.createCourse(Number(form.school_id), body);
        alert("Хичээл нэмэгдлээ!");
      }

      nav("/team4/admin/classes");
    } catch (err) {
      alert("API алдаа: " + err);
    }
  };

  return (
    <div className="p-8">
      <button
        className="text-gray-600 text-sm mb-4 hover:underline"
        onClick={() => nav("/team4/admin/classes")}
      >
        ← Буцах
      </button>

      <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">
          {id ? "Хичээл засах" : "Шинэ хичээл нэмэх"}
        </h2>

        {/* Сургуулийн сонголт (зөвхөн шинээр нэмэх үед) */}
        {!id && (
          <>
            <label className="text-sm font-medium">Сургууль *</label>
            <select
              className="border p-2 w-full rounded mb-4"
              onChange={(e) => setForm({ ...form, school_id: e.target.value })}
            >
              <option>-- Сургууль сонгох --</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </>
        )}

        <label className="text-sm font-medium">Хичээлийн нэр *</label>
        <input
          className="border p-2 w-full rounded mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="text-sm font-medium">Тайлбар</label>
        <textarea
          className="border p-2 w-full rounded mb-4 h-24"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label className="text-sm font-medium">Category ID *</label>
        <input
          className="border p-2 w-full rounded mb-4"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        />

        <label className="text-sm font-medium">Priority</label>
        <input
          className="border p-2 w-full rounded mb-4"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        />

        <label className="text-sm font-medium">Зураг (URL)</label>
        <input
          className="border p-2 w-full rounded mb-4"
          value={form.picture}
          onChange={(e) => setForm({ ...form, picture: e.target.value })}
        />

        {form.picture && (
          <img
            src={form.picture}
            className="w-full h-40 object-cover rounded mb-4 border"
            alt="Course"
          />
        )}

        <label className="text-sm font-medium">Эхлэх огноо *</label>
        <input
          type="date"
          className="border p-2 w-full rounded mb-4"
          value={form.start_on ? form.start_on.substring(0, 10) : ""}
          onChange={(e) => {
            const iso = new Date(e.target.value).toISOString();
            setForm({ ...form, start_on: iso });
          }}
        />

        <label className="text-sm font-medium">Дуусах огноо</label>
        <input
          type="date"
          className="border p-2 w-full rounded mb-4"
          value={form.end_on ? form.end_on.substring(0, 10) : ""}
          onChange={(e) => {
            const iso = new Date(e.target.value).toISOString();
            setForm({ ...form, end_on: iso });
          }}
        />

        <div className="flex gap-3">
          <button
            className="bg-[#1B214E] text-white px-6 py-2 rounded hover:bg-[#0f1538] flex-1"
            onClick={save}
          >
            Хадгалах
          </button>

          <button
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded flex-1 hover:bg-gray-300"
            onClick={() => nav("/team4/admin/classes")}
          >
            Цуцлах
          </button>
        </div>
      </div>
    </div>
  );
}
