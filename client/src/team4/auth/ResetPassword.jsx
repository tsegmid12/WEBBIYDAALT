"use client";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { useState } from "react";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Нууц үг таарахгүй байна.");
      return;
    }

    if (newPassword.length < 8) {
      alert("Нууц үг хэт богино байна.");
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    setLoading(false);
    alert("Амжилттай шинэчлэгдлээ! Та одоо нэвтэрч орно уу.");
    navigate("/team4/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="h-full w-full flex items-center justify-between p-8 gap-4">
        <div className="relative w-1/2 h-full rounded-2xl overflow-hidden">
          <img
            src="/team4/hero.png"
            alt="hero img"
            className="w-full h-full object-cover"
          />
          <div className="flex flex-col justify-start items-start gap-2 absolute left-[50px] bottom-[50px] z-10">
            <p className="text-white text-2xl font-bold">Let's grow together</p>
            <p className="text-white text-lg">Таны хөгжих орон зай</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="flex flex-col justify-center items-center w-[380px]">
            <p className="text-lg text-center mb-8 text-gray-700">
              Шинэ нууц үгээ оруулна уу.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <InputField
                labelname="Шинэ нууц үг"
                type="password"
                placeholder="8+ тэмдэгт"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                required
              />

              <InputField
                labelname="Давтан оруулах"
                type="password"
                placeholder="Дахин оруулна уу"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-full mt-6 bg-[#49BBBD] text-white p-2 disabled:opacity-70 transition"
              >
                {loading ? "Шинэчилж байна…" : "Шинэчлэх"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
