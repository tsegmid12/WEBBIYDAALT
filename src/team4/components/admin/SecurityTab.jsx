"use client";
import { useState } from "react";
import { InputField } from "../InputField";

export default function SecurityTab() {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (password.new !== password.confirm)
      return alert("Нууц үг таарахгүй байна");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    alert("Нууц үг амжилттай солигдлоо!");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#0e153a]">Нууц үг солих</h3>
      <div className="space-y-4 max-w-md">
        <InputField
          labelname="Одоогийн нууц үг"
          type="password"
          value={password.current}
          onChange={(e) =>
            setPassword({ ...password, current: e.target.value })
          }
        />
        <InputField
          labelname="Шинэ нууц үг"
          type="password"
          value={password.new}
          onChange={(e) => setPassword({ ...password, new: e.target.value })}
        />
        <InputField
          labelname="Давтах"
          type="password"
          value={password.confirm}
          onChange={(e) =>
            setPassword({ ...password, confirm: e.target.value })
          }
        />
      </div>
      <button
        onClick={handleSave}
        disabled={
          loading ||
          !password.current ||
          !password.new ||
          password.new !== password.confirm
        }
        className="px-6 py-2 bg-[#13C3DA] text-white rounded-lg hover:bg-[#0e9da7] disabled:opacity-70"
      >
        {loading ? "Солих..." : "Нууц үг солих"}
      </button>
    </div>
  );
}
