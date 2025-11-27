import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap } from "lucide-react";
import axios from "axios";

const RoleSelector = ({ addRole }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api", {
        role: selectedRole,
      });
      if (addRole) addRole(res.data.selectedRole);
      res
        console.log("Token:", res.data.token);

      navigate("/team6/exams");
    } catch (error) {
      console.error("Error selecting role:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Шалгалтын Систем
          </h2>
          <p className="text-gray-600">Эрхээ сонгоно уу</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Teacher Form */}
            <form onSubmit={handleRoleSelect} className="flex justify-center">
              <button
                type="submit"
                onClick={() => setSelectedRole("teacher")}
                className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 w-full max-w-xs"
              >
                <div className="mb-4 p-4 bg-blue-100 rounded-full">
                  <User size={48} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Багш
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Шалгалт үүсгэх, засах, тайлан харах
                </p>
              </button>
            </form>

            {/* Student Form */}
            <form onSubmit={handleRoleSelect} className="flex justify-center">
              <button
                type="submit"
                onClick={() => setSelectedRole("student")}
                className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-green-500 w-full max-w-xs"
              >
                <div className="mb-4 p-4 bg-green-100 rounded-full">
                  <GraduationCap size={48} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Оюутан
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Шалгалт өгөх, үр дүн харах
                </p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
