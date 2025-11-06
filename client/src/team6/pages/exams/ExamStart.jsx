// ==========================================
// 10. ExamStart.jsx - Шалгалт эхлүүлэх
// ==========================================

import { Link, useParams } from 'react-router-dom';

const exam = {
  name: "Сорил 1",
  description: "React болон Node.js сэдвийн сорил 1",
  duration: 60,
  total_questions: 15,
  total_points: 100
};

export default function ExamStart() {
  const { exam_id, student_id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-6xl text-center mb-4">📝</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{exam.name}</h1>
        <p className="text-gray-600 mb-6 text-center">{exam.description}</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">📋 Шалгалтын мэдээлэл:</h2>
          <ul className="space-y-2 text-gray-700">
            <li>⏱️ Хугацаа: <strong>{exam.duration} минут</strong></li>
            <li>📝 Нийт асуулт: <strong>{exam.total_questions}</strong></li>
            <li>💯 Нийт оноо: <strong>{exam.total_points}</strong></li>
            <li>🔄 Нэг удаа өгөх боломжтой</li>
            <li>✅ Хариултаа тогтмол хадгална</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Анхаар:</strong> Шалгалт эхэлсний дараа цаг хугацаа эхлэх бөгөөд дуусах хүртэл зогсоох боломжгүй!
          </p>
        </div>

        <Link
          to={`/exams/${exam_id}/students/${student_id}/edit`}
          className="block w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition text-center"
        >
          🚀 Шалгалт эхлүүлэх
        </Link>
      </div>
    </div>
  );
}