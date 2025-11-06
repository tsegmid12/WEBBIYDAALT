
// ==========================================
// 3. ExamDetail.jsx - Шалгалтын дэлгэрэнгүй
// ==========================================

import { useParams, Link } from 'react-router-dom';

const exam = {
  id: 1,
  name: "Сорил 1",
  description: "React болон Node.js сэдвийн сорил 1",
  start_date: "2025-03-15T10:00",
  close_date: "2025-03-15T12:00",
  duration: 60,
  status: "active"
};

const examQuestions = [
  { id: 1, category: "React", level: "Хялбар", type: "Single Choice", point: 5, question: "React нь юу вэ?" },
  { id: 2, category: "React", level: "Дунд", type: "Multiple Choice", point: 10, question: "React Hooks-д аль нь багтдаг вэ?" },
  { id: 3, category: "Node.js", level: "Хялбар", type: "True/False", point: 5, question: "Node.js нь асинхрон юм." }
];

const user = { role: 'teacher' };

export default function ExamDetail() {
  const { exam_id } = useParams();
  
  const totalPoints = examQuestions.reduce((sum, q) => sum + q.point, 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{exam.name}</h1>
          <p className="text-gray-600 mt-1">{exam.description}</p>
        </div>
        
        {user.role === 'teacher' && (
          <div className="flex gap-2">
            <Link
              to={`/exams/${exam_id}/edit`}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200"
            >
              Засах
            </Link>
            <Link
              to={`/exams/${exam_id}/report`}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200"
            >
              Тайлан
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Үргэлжлэх хугацаа</div>
          <div className="text-2xl font-bold text-blue-600">{exam.duration} мин</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Нийт асуулт</div>
          <div className="text-2xl font-bold text-green-600">{examQuestions.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Нийт оноо</div>
          <div className="text-2xl font-bold text-purple-600">{totalPoints}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Төлөв</div>
          <div className="text-lg font-bold text-green-600">Идэвхтэй</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Асуултууд ({examQuestions.length})</h2>
        
        <div className="space-y-3">
          {examQuestions.map((q, index) => (
            <div key={q.id} className="border-2 rounded-lg p-4 hover:border-blue-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-700">#{index + 1}</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{q.category}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{q.level}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{q.type}</span>
                  </div>
                  <p className="text-gray-800">{q.question}</p>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-2xl font-bold text-blue-600">{q.point}</div>
                  <div className="text-xs text-gray-500">оноо</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}