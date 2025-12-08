import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userAPI } from "./api";

export default function UserForm() {
  const nav = useNavigate();
  const { id } = useParams();

  const [f, setF] = useState({
    first_name: "",
    last_name: "",
    facebook_id: "",
    phone: "",
    email: "",
    // role: "",
    username: "",
    password: "123",
  });

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const user = await userAPI.getUserById(id);
          if (user) setF(user);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [id]);

  const save = async () => {
    if (!f.first_name || !f.last_name || !f.email) {
      alert("Бүх талбарыг бөглөнө үү!");
      return;
    }

    try {
      if (id) {
        await userAPI.updateUser(id, f);
        alert("Хэрэглэгч засагдлаа");
      } else {
        await userAPI.createUser(f);
        alert("Хэрэглэгч нэмэгдлээ");
      }
      nav("/team4/admin/users");
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа!");
    }
  };

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
          <h2 className="font-semibold text-base mb-4">
            Хэрэглэгчийн мэдээлэл
          </h2>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              className="border p-2 text-sm rounded"
              placeholder="Нэр *"
              value={f.first_name}
              onChange={(e) => setF({ ...f, first_name: e.target.value })}
            />
            <input
              className="border p-2 text-sm rounded"
              placeholder="Овог *"
              value={f.last_name}
              onChange={(e) => setF({ ...f, last_name: e.target.value })}
            />
          </div>

          <input
            className="border p-2 text-sm rounded w-full mb-2"
            placeholder="Username"
            value={f.username}
            onChange={(e) => setF({ ...f, username: e.target.value })}
          />

          <input
            className="border p-2 text-sm rounded w-full mb-2"
            placeholder="И-мэйл *"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
          />

          <input
            className="border p-2 text-sm rounded w-full mb-2"
            placeholder="Facebook "
            value={f.facebook_id}
            onChange={(e) => setF({ ...f, facebook_id: e.target.value })}
          />

          <input
            className="border p-2 text-sm rounded w-full mb-2"
            placeholder="Утасны дугаар"
            value={f.phone}
            onChange={(e) => setF({ ...f, phone: e.target.value })}
          />

          {/* <select
            className="border p-2 text-sm rounded w-full mb-3"
            value={f.role}
            onChange={(e) => setF({ ...f, role: e.target.value })}
          >
            <option value="">Үүрэг *</option>
            <option value="admin">Админ</option>
            <option value="teacher">Багш</option>
            <option value="student">Оюутан</option>
          </select> */}

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

        <div className="bg-white shadow border rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2 text-sm">Нууц үг тохиргоо</h3>
          <p className="text-xs text-gray-600 mb-2">
            Анхны нууц үг автоматаар үүссэн:
          </p>
          <div className="bg-gray-50 p-2 rounded border text-center text-sm font-bold">
            {f.password}
          </div>
        </div>
      </div>
    </div>
  );
}
