import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courseAPI } from '../../services/usedAPI';

export default function StudentsTab() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('id');

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (courseId) loadStudents();
  }, [courseId]);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const data = await courseAPI.getCourseUsers(courseId);

      const items = data.items || [];
      console.log('suragchid', items);
      setTotal(items.length);

      const formatted = items.map(item => ({
        id: item.user_id,
        role: JSON.parse(item.role)?.name || '',
        group: JSON.parse(item.group)?.name || '',
        ...JSON.parse(item.user),
      }));

      setStudents(formatted);
    } catch (err) {
      console.error('Error loading students:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  // Одоогийн page-ийн сурагчид
  const start = (page - 1) * limit;
  const end = start + limit;
  const pagedStudents = students.slice(start, end);

  return (
    <div className='bg-white p-6 rounded-lg shadow-sm'>
      <h2 className='text-xl font-semibold mb-4'>Суралцагчдын жагсаалт</h2>

      {loading ? (
        <p className='text-gray-500'>Уншиж байна...</p>
      ) : students.length === 0 ? (
        <p className='text-gray-500'>Суралцагч олдсонгүй.</p>
      ) : (
        <>
          <div className='space-y-3'>
            {pagedStudents.map(st => (
              <div
                key={st.id}
                className='flex items-center justify-between p-3 border rounded-lg'>
                <div>
                  <p className='font-medium text-gray-900'>
                    {st.last_name} {st.first_name}
                  </p>
                  <p className='text-gray-500 text-sm'>{st.email}</p>
                </div>

                <div className='text-right text-sm'>
                  <p className='text-gray-700'>{st.role}</p>
                  {st.group && (
                    <p className='text-gray-500'>Бүлэг: {st.group}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex items-center justify-center mt-6 space-x-4'>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg border ${
                page === 1
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}>
              Өмнөх
            </button>

            <span className='text-gray-700 text-sm'>
              Хуудас {page} / {totalPages || 1}
            </span>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg border ${
                page === totalPages
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}>
              Дараах
            </button>
          </div>
        </>
      )}

      {error && <p className='text-red-500 mt-3'>{error}</p>}
    </div>
  );
}
