"use client";
import { useState } from "react";

export const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    alert("Мэдэгдэл тохиргоо хадгалагдлаа!");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#0e153a]">
        Мэдэгдэл тохиргоо
      </h3>
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between">
            <span className="text-gray-700">
              {key === "email" && "И-мэйл мэдэгдэл"}
              {key === "push" && "Браузер мэдэгдэл"}
              {key === "sms" && "SMS мэдэгдэл"}
            </span>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) =>
                setNotifications({ ...notifications, [key]: e.target.checked })
              }
              className="w-5 h-5 text-[#13C3DA] rounded focus:ring-[#13C3DA]"
            />
          </label>
        ))}
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
};
