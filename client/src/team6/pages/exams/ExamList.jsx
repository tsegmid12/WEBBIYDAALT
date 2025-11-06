// src/team[X]/pages/exams/ExamList.jsx

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Mock Data - та өөрийн mockData.js-с import хийнэ
const exams = [
  {
    id: 1,
    name: "Сорил 1",
    description: "React болон Node.js сэдвийн сорил 1",
    start_date: "2025-03-15T10:00",
    close_date: "2025-03-15T12:00",
    duration: 60,
    total_questions: 15,
    total_points: 100,
    status: "upcoming",
    students_count: 25,
    submitted_count: 0
  },
  {
    id: 2,
    name: "Улирлын шалгалт",
    description: "Бүх сэдвийн эцсийн шалгалт",
    start_date: "2025-05-20T09:00",
    close_date: "2025-05-20T12:00",
    duration: 90,
    total_questions: 30,
    total_points: 150,
    status: "active",
    students_count: 25,
    submitted_count: 12
  },
  {
    id: 3,
    name: "Лабораторийн шалгалт 1",
    description: "HTML/CSS/JavaScript үндсэн мэдлэгийн шалгалт",
    start_date: "2025-02-10T14:00",
    close_date: "2025-02-10T15:30",
    duration: 45,
    total_questions: 20,
    total_points: 50,
    status: "finished",
    students_count: 25,
    submitted_count: 25
  }
];

const user = { role: 'teacher' };

export default function ExamList() {
  const { course_id } = useParams();
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { text: 'Удахгүй', color: 'bg-blue-100 text-blue-700' },
      active: { text: 'Идэвхтэй', color: 'bg-green-100 text-green-700' },
      finished: { text: 'Дууссан', color: 'bg-gray-100 text-gray-700' }
    };
    return badges[status];
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('mn-MN', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const filteredExams = filterStatus === 'all' 
    ? exams 
    : exams.filter(e => e.status === filterStatus);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Шалгалтууд</h1>
            <p className="text-gray-600 mt-1">Хичээлийн ID: {course_id}</p>
          </div>
          
          {user.role === 'teacher' && (
            <Link
              to={`/courses/${course_id}/exams/create`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              + Шинэ шалгалт үүсгэх
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Нийт шалгалт</div>
            <div className="text-3xl font-bold text-gray-800">{exams.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Идэвхтэй</div>
            <div className="text-3xl font-bold text-green-600">
              {exams.filter(e => e.status === 'active').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Удахгүй</div>
            <div className="text-3xl font-bold text-blue-600">
              {exams.filter(e => e.status === 'upcoming').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Дууссан</div>
            <div className="text-3xl font-bold text-gray-600">
              {exams.filter(e => e.status === 'finished').length}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Төлөв:</span>
          <div className="flex gap-2">
            {['all', 'upcoming', 'active', 'finished'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Бүгд' : getStatusBadge(status).text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredExams.map(exam => {
          const badge = getStatusBadge(exam.status);
          return (
            <div key={exam.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{exam.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                      {badge.text}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{exam.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Эхлэх:</span>
                      <p className="font-semibold">{formatDate(exam.start_date)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Дуусах:</span>
                      <p className="font-semibold">{formatDate(exam.close_date)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Хугацаа:</span>
                      <p className="font-semibold">{exam.duration} минут</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Оноо:</span>
                      <p className="font-semibold text-blue-600">{exam.total_points}</p>
                    </div>
                  </div>

                  {exam.status !== 'upcoming' && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Хариулт илгээсэн: <strong>{exam.submitted_count}/{exam.students_count}</strong>
                        </span>
                        <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${(exam.submitted_count / exam.students_count) * 100}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-700">
                          {Math.round((exam.submitted_count / exam.students_count) * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ml-6 flex flex-col gap-2">
                  <Link
                    to={`/exams/${exam.id}`}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 text-center"
                  >
                    Дэлгэрэнгүй
                  </Link>
                  
                  {user.role === 'teacher' && (
                    <>
                      <Link
                        to={`/exams/${exam.id}/edit`}
                        className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold hover:bg-yellow-200 text-center"
                      >
                        Засах
                      </Link>
                      <Link
                        to={`/exams/${exam.id}/report`}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 text-center"
                      >
                        Тайлан
                      </Link>
                      <Link
                        to={`/exams/${exam.id}/variants`}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 text-center"
                      >
                        Вариантууд
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}