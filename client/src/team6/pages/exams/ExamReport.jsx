// ==========================================
// 5. ExamReport.jsx - Тайлан/Статистик
// ==========================================

import { useParams } from 'react-router-dom';

const exam = { name: "Сорил 1", total_points: 10 };

const submissions = [
  { id: 1, student: "Бат", score: 85, percentage: 85, status: "Шалгасан" },
  { id: 2, student: "Болд", score: 72, percentage: 72, status: "Шалгасан" },
  { id: 3, student: "Дорж", score: 90, percentage: 90, status: "Шалгасан" },
  { id: 4, student: "Гэрэл", score: 0, percentage: 0, status: "Өгөөгүй" }
];

export default function ExamReport() {
  const { exam_id } = useParams();
  
  const avgScore = submissions.filter(s => s.status === 'Шалгасан').reduce((sum, s) => sum + s.score, 0) / 3;
  const submittedCount = submissions.filter(s => s.status === 'Шалгасан').length;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{exam.name} - Тайлан</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Нийт оюутан</div>
          <div className="text-3xl font-bold text-gray-800">{submissions.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Илгээсэн</div>
          <div className="text-3xl font-bold text-green-600">{submittedCount}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Дундаж оноо</div>
          <div className="text-3xl font-bold text-blue-600">{avgScore.toFixed(1)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Хамгийн өндөр</div>
          <div className="text-3xl font-bold text-purple-600">90</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Оюутны үр дүн</h2>
        
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">№</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Оюутан</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Оноо</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Хувь</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Төлөв</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {submissions.map((sub, index) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{sub.student}</td>
                <td className="px-4 py-3 text-sm">{sub.score}/{exam.total_points}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${sub.percentage}%` }}
                      />
                    </div>
                    <span className="font-semibold">{sub.percentage}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    sub.status === 'Шалгасан' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}