"use client";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { useState } from "react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Имэйл хаягаа оруулна уу.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://todu.mn/bs/lms/v1/otp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("Server error:", text);
        setError("Илгээхэд алдаа гарлаа.");
        return;
      }

      localStorage.setItem("otpEmail", email);
      alert("Таны имэйл хаягт код илгээгдлээ!");
      navigate("/team4/otp");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Илгээхэд алдаа гарлаа. Дахин оролдоно уу.";
      alert(msg);
    } finally {
      setLoading(false);
    }
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
              Таны оруулсан имэйл хаягт <br />
              нэг удаагийн код илгээгдэнэ.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <InputField
                labelname="Имэйл"
                type="email"
                placeholder="Бүртгэлтэй имэйлээ оруулна уу"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-full mt-6 bg-[#49BBBD] text-white p-2 disabled:opacity-70 transition"
              >
                {loading ? "Илгээж байна…" : "Код илгээх"}
              </button>
            </form>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Back button */}
            <button
              onClick={() => navigate("/team4/")}
              className="mt-6 text-sm text-[#49BBBD] underline hover:text-[#3a999b] transition"
            >
              Буцах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
