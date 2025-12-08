import { useState } from "react";
import { InputField } from "../InputField";

export default function SchoolTab() {
  const [school, setSchool] = useState({
    name: "Шинжлэх Ухаан Технологийн Их Сургууль",
    code: "MUST-001",
    address: "Улаанбаатар, Сүхбаатар дүүрэг",
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    alert("Сургуулийн мэдээлэл хадгалагдлаа!");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#0e153a]">
        Сургуулийн мэдээлэл
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          labelname="Сургуулийн нэр"
          value={school.name}
          onChange={(e) => setSchool({ ...school, name: e.target.value })}
        />
        <InputField
          labelname="Код"
          value={school.code}
          onChange={(e) => setSchool({ ...school, code: e.target.value })}
        />
        <div className="md:col-span-2">
          <InputField
            labelname="Хаяг"
            value={school.address}
            onChange={(e) => setSchool({ ...school, address: e.target.value })}
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={loading}
        className="px-6 py-2 bg-[#13C3DA] text-white rounded-lg hover:bg-[#0e9da7]"
      >
        {loading ? "Хадгалж байна..." : "Хадгалах"}
      </button>
    </div>
  );
}
