// ==========================================
// 13. ExamResult.jsx - Үр дүн
// ==========================================

import { useParams, Link } from 'react-router-dom';

const exam = { name: "Сорил 1", total_points: 38 };

const result = {
  total_earned: 24,
  total_possible: 38,
  percentage: 63.2,
  grade: "D",
  status: "Тэнцсэн",
  submitted_at: "2025-03-15 11:30",
  checked_at: "2025-03-15 14:00",
  teacher_feedback: "Хичээгээрэй! React-ийн үндсийг сайн ойлгосон байна."
};

const breakdown = [
  { category: "React", earned: 15, possible: 20, percentage: 75 },
  { category: "Node.js", earned: 9, possible: 18, percentage: 50 }
];

export default function ExamResult() {
  const { exam_id, student_id } = useParams();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">
          {result.percentage >= 80 ? '🎉' : result.percentage >= 60 ? '😊' : '📚'}
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{exam.name}</h1>
        <p className="text-xl text-gray-600">Таны үр дүн</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-sm text-gray-600 mb-2">Нийт оноо</div>
          <div className="text-4xl font-bold text-blue-600">{result.total_earned}</div>
          <div className="text-sm text-gray-500">/ {result.total_possible}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-sm text-gray-600 mb-2">Хувь</div>
          <div className="text-4xl font-bold text-purple-600">{result.percentage}%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-sm text-gray-600 mb-2">Үнэлгээ</div>
          <div className="text-4xl font-bold text-green-600">{result.grade}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-sm text-gray-600 mb-2">Төлөв</div>
          <div className={`text-2xl font-bold ${
            result.percentage >= 60 ? 'text-green-600' : 'text-red-600'
          }`}>
            {result.status}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Сэдэвээр задаргаа</h2>
        <div className="space-y-4">
          {breakdown.map(item => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{item.category}</span>
                <span className="text-sm text-gray-600">
                  {item.earned}/{item.possible} ({item.percentage}%)
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    item.percentage >= 80 ? 'bg-green-500' :
                    item.percentage >= 60 ? 'bg-blue-500' :
                    item.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {result.teacher_feedback && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-lg text-yellow-800 mb-2">👨‍🏫 Багшийн санал</h3>
          <p className="text-yellow-900">{result.teacher_feedback}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-3">Мэдээлэл</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Илгээсэн:</span>
            <p className="font-semibold">{result.submitted_at}</p>
          </div>
          <div>
            <span className="text-gray-600">Шалгасан:</span>
            <p className="font-semibold">{result.checked_at}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to={`/exams/${exam_id}/students/${student_id}/check`}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 text-center"
        >
          Зөв хариулт харах
        </Link>
        <Link
          to={`/courses/1/exams`}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 text-center"
        >
          Хичээл рүү буцах
        </Link>
      </div>
    </div>
  );
}