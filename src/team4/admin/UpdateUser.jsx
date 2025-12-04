import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "./userStorage";

export default function UpdateUser() {
  const nav = useNavigate();
  const { id } = useParams();

  const [f, setF] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    image: "",
    lastLogin: "--"
  });

  useEffect(() => {
    const u = getUserById(id);
    if (!u) {
      alert("Хэрэглэгч олдсонгүй!");
      nav("/team4/admin/users");
      return;
    }
    setF(u);
  }, [id, nav]);

  const save = () => {
    if (!f.firstName || !f.lastName || !f.email || !f.role) {
      alert("Бүх талбарыг бөглөнө үү!");
      return;
    }

    updateUser(id, f);
    alert("Хэрэглэгч амжилттай шинэчлэгдлээ!");
    nav("/team4/admin/users");
  };

  return (
    <div className="p-8">

      <button
        onClick={() => nav(-1)}
        className="text-sm mb-6 flex items-center gap-1 text-blue-600 hover:underline"
      >
        ← Буцах
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="col-span-2 bg-white rounded-xl shadow-md p-8 border">

          <h2 className="text-xl font-semibold mb-6">Хэрэглэгч засах</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-600">Нэр *</label>
              <input
                className="border p-3 w-full rounded-md mt-1 bg-gray-50"
                value={f.firstName}
                onChange={(e) => setF({ ...f, firstName: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Овог *</label>
              <input
                className="border p-3 w-full rounded-md mt-1 bg-gray-50"
                value={f.lastName}
                onChange={(e) => setF({ ...f, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600">И-мэйл *</label>
            <input
              className="border p-3 w-full rounded-md mt-1 bg-gray-50"
              value={f.email}
              onChange={(e) => setF({ ...f, email: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600">Үүрэг *</label>
            <select
              className="border p-3 w-full rounded-md mt-1 bg-gray-50"
              value={f.role}
              onChange={(e) => setF({ ...f, role: e.target.value })}
            >
              <option value="">Сонгох</option>
              <option value="admin">Админ</option>
              <option value="teacher">Багш</option>
              <option value="student">Оюутан</option>
            </select>
          </div>

          <button
            onClick={save}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full font-medium"
          >
            Хадгалах
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border flex flex-col">

          <h3 className="text-sm text-gray-700 mb-3 font-semibold">Профайл зураг</h3>

          <input
            placeholder="Зургийн URL"
            className="border p-3 w-full rounded-md mb-4 text-sm bg-gray-50"
            value={f.image}
            onChange={(e) => setF({ ...f, image: e.target.value })}
          />

          <div className="w-full h-64 rounded-lg border flex items-center justify-center bg-gray-100 overflow-hidden">
            {f.image ? (
              <img
                src={f.image}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">Зураггүй</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
