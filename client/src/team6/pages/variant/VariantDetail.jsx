// ==========================================
// 8. VariantDetail.jsx - Вариант харах
// ==========================================

import { useParams, Link } from 'react-router-dom';

const variant = { id: 1, name: "Вариант А" };

const questions = [
  { id: 1, question: "React нь юу вэ?", type: "Single Choice", point: 5 },
  { id: 2, question: "useState Hook нь юунд хэрэглэгддэг вэ?", type: "Multiple Choice", point: 10 },
  { id: 3, question: "Node.js нь асинхрон юм.", type: "True/False", point: 5 }
];

export default function VariantDetail() {
  const { exam_id, id } = useParams();
  const totalPoints = questions.reduce((sum, q) => sum + q.point, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{variant.name}</h1>
          <p className="text-gray-600 mt-1">{questions.length} асуулт</p>
        </div>
        
        <Link
          to={`/exams/${exam_id}/variants/${id}/edit`}
          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200"
        >
          Засах
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Нийт асуулт</div>
          <div className="text-3xl font-bold text-blue-600">{questions.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Нийт оноо</div>
          <div className="text-3xl font-bold text-green-600">{totalPoints}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Дундаж оноо</div>
          <div className="text-3xl font-bold text-purple-600">{(totalPoints / questions.length).toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Асуултууд</h2>
        
        <div className="space-y-3">
          {questions.map((q, index) => (
            <div key={q.id} className="border-2 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">#{index + 1}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{q.type}</span>
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