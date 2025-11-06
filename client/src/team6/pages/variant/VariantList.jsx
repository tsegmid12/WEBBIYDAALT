

// ==========================================
// 6. VariantList.jsx - Вариантын жагсаалт
// ==========================================

import { Link, useParams } from 'react-router-dom';

const variants = [
  { id: 1, name: "Вариант А", question_count: 15 },
  { id: 2, name: "Вариант Б", question_count: 15 },
  { id: 3, name: "Вариант В", question_count: 15 }
];

export default function VariantList() {
  const { exam_id } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Шалгалтын вариантууд</h1>
        <Link
          to={`/exams/${exam_id}/variants/create`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          + Вариант үүсгэх
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-gray-600">Шалгалтын ID: {exam_id}</p>
        <p className="text-sm text-gray-500 mt-1">Нийт {variants.length} вариант байна</p>
      </div>

      <div className="space-y-4">
        {variants.map(variant => (
          <div key={variant.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{variant.name}</h3>
                <p className="text-gray-600 mt-1">{variant.question_count} асуулт</p>
              </div>
              
              <div className="flex gap-2">
                <Link
                  to={`/exams/${exam_id}/variants/${variant.id}`}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200"
                >
                  Харах
                </Link>
                <Link
                  to={`/exams/${exam_id}/variants/${variant.id}/edit`}
                  className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200"
                >
                  Засах
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
