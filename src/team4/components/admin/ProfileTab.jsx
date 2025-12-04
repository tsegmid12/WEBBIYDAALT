import { useState } from "react";
import { InputField } from "../InputField";

export default function ProfileTab() {
  const [profile, setProfile] = useState({
    name: "Админ Нэр",
    email: "admin@must.edu.mn",
    phone: "+976 9911-2233",
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    alert("Хувийн мэдээлэл хадгалагдлаа!");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#0e153a]">Хувийн мэдээлэл</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          labelname="Нэр"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <InputField
          labelname="И-мэйл"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <InputField
          labelname="Утас"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />
      </div>
      <button
        onClick={handleSave}
        disabled={loading}
        className="px-6 py-2 bg-[#13C3DA] text-white rounded-lg hover:bg-[#0e9da7] disabled:opacity-70"
      >
        {loading ? "Хадгалж байна..." : "Хадгалах"}
      </button>
    </div>
  );
}
