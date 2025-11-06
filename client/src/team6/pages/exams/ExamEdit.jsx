
// ==========================================
// 4. ExamEdit.jsx - Шалгалт засах
// ==========================================

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ExamEdit() {
  const { exam_id } = useParams();
  const navigate = useNavigate();
  
  const [examInfo, setExamInfo] = useState({
    name: 'Сорил 1',
    description: 'React болон Node.js сэдвийн сорил 1',
    duration: 60,
    start_date: '2025-03-15',
    start_time: '10:00',
    close_date: '2025-03-15',
    close_time: '12:00'
  });

  const handleSave = () => {
    console.log('Шалгалт шинэчлэх:', examInfo);
    alert('Шалгалт амжилттай шинэчлэгдлээ!');
    navigate(`/exams/${exam_id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Шалгалт засах</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Шалгалтын нэр *</label>
            <input
              type="text"
              value={examInfo.name}
              onChange={(e) => setExamInfo({...examInfo, name: e.target.value})}
              className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Тайлбар</label>
            <textarea
              value={examInfo.description}
              onChange={(e) => setExamInfo({...examInfo, description: e.target.value})}
              className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Үргэлжлэх хугацаа (минут)</label>
            <input
              type="number"
              value={examInfo.duration}
              onChange={(e) => setExamInfo({...examInfo, duration: parseInt(e.target.value)})}
              className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Эхлэх огноо</label>
              <input
                type="date"
                value={examInfo.start_date}
                onChange={(e) => setExamInfo({...examInfo, start_date: e.target.value})}
                className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Эхлэх цаг</label>
              <input
                type="time"
                value={examInfo.start_time}
                onChange={(e) => setExamInfo({...examInfo, start_time: e.target.value})}
                className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Дуусах огноо</label>
              <input
                type="date"
                value={examInfo.close_date}
                onChange={(e) => setExamInfo({...examInfo, close_date: e.target.value})}
                className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Дуусах цаг</label>
              <input
                type="time"
                value={examInfo.close_time}
                onChange={(e) => setExamInfo({...examInfo, close_time: e.target.value})}
                className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => navigate(`/exams/${exam_id}`)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
            >
              Болих
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Хадгалах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
