"use client";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("otpEmail") || "your@email.com";

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) {
      alert("4 оронтой код оруулна уу.");
      return;
    }

    try {
      const res = await fetch("https://todu.mn/bs/lms/v1/otp/email/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, email }),
      });

      if (res.status) {
        setError(res.message);
        console.log(res.message);
      }

      setLoading(true);
      setTimeout(() => {
        localStorage.removeItem("otpEmail");
        setLoading(false);
        navigate("/team4/reset-password");
      }, 1000);
      alert("Код баталгаажлаа");
    } catch (error) {
      console.log(error);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setResendTimer(60);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    inputRefs.current[0].focus();
    alert("Шинэ код илгээгдлээ!");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="h-full w-full flex items-center justify-between p-8 gap-4 max-w-6xl mx-auto">
        {/* LEFT IMAGE */}
        <div className="relative w-1/2 h-full rounded-2xl overflow-hidden hidden md:block">
          <img
            src="/team4/hero.png"
            alt="hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute left-8 bottom-8 text-white">
            <p className="text-2xl font-bold">Let's grow together</p>
            <p className="text-lg">Таны хөгжих орон зай</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Баталгаажуулах
            </h2>
            <p className="text-sm text-gray-600 text-center mb-8">
              <span className="font-medium">{email}</span> хаягт илгээсэн{" "}
              <strong>4 оронтой код</strong>-ыг оруулна уу.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-14 h-14 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-[#49BBBD] focus:outline-none transition"
                    disabled={loading}
                  />
                ))}
              </div>

              {/* RESEND TIMER */}
              <div className="text-center text-sm text-gray-600">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#49BBBD] font-medium hover:underline"
                  >
                    Дахин илгээх
                  </button>
                ) : (
                  <span>Дахин илгээх: {resendTimer} сек</span>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || otp.join("").length !== 4}
                className="w-full py-3 rounded-full bg-[#49BBBD] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Шалгаж байна..." : "Баталгаажуулах"}
              </button>
            </form>

            <button
              onClick={() => navigate("/team4/forgot-password")}
              className="mt-6 block w-full text-center text-sm text-[#49BBBD] hover:underline"
            >
              Буцах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
