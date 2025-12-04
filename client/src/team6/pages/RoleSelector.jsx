import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { selectRoleOnServer } from "../utils/role";
import { User, GraduationCap, AlertCircle } from "lucide-react";

const RoleSelector = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectRole = async (role) => {
    setLoading(true);
    setError(null);

    try {
      // Pass only the role string, not the result object
      await selectRoleOnServer(role);
      console.log("Role saved:", role);

      // Navigate to different pages based on role
      if (role === "teacher") {
        navigate("/team6/exams"); // Teacher home page (shows courses)
      } else if (role === "student") {
        navigate("/team6/exams"); // Student home page (shows exams)
      }
    } catch (err) {
      setError("Role selection failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full'>
        <h1 className='text-3xl font-bold text-center mb-2'>Шалгалтын Систем</h1>
        <p className='text-center text-gray-600 mb-8'>Та эрхээ сонгоно уу</p>

        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3'>
            <AlertCircle size={20} className='text-red-600 mt-0.5' />
            <p className='text-red-700 text-sm'>{error}</p>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Teacher */}
          <button
            onClick={() => handleSelectRole("teacher")}
            disabled={loading}
            className='p-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
          >
            <User size={48} className="mx-auto mb-3" />
            <h2 className='text-2xl font-bold'>Багш</h2>
            <p className='text-sm text-blue-100'>Шалгалт үүсгэх, засварлах</p>
          </button>

          {/* Student */}
          <button
            onClick={() => handleSelectRole("student")}
            disabled={loading}
            className='p-8 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50'
          >
            <GraduationCap size={48} className="mx-auto mb-3" />
            <h2 className='text-2xl font-bold'>Оюутан</h2>
            <p className='text-sm text-green-100'>Шалгалтад оролцох</p>
          </button>
        </div>

        {loading && (
          <p className='text-center mt-4 text-gray-600'>Уншиж байна...</p>
        )}
      </div>
    </div>
  );
};

export default RoleSelector;