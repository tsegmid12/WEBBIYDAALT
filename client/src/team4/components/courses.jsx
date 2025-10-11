import { useState, useMemo } from 'react';

const sampleData = [
  { id: 1, name: 'Програмчлал I', teacher: 'Н.Бат', grade: 'A', gradeNum: 3.8 },
  {
    id: 2,
    name: 'Мэдээллийн бүтцүүд',
    teacher: 'С.Өлзий',
    grade: 'B+',
    gradeNum: 3.0,
  },
  {
    id: 3,
    name: 'Үндсэн салбарын математик',
    teacher: 'Д.Энх',
    grade: 'A-',
    gradeNum: 3.4,
  },
  {
    id: 4,
    name: 'Сүлжээний үндэс',
    teacher: 'Б.Отгон',
    grade: 'B',
    gradeNum: 2.7,
  },
  {
    id: 5,
    name: 'Вэб хөгжүүлэлт',
    teacher: 'Л.Батзориг',
    grade: 'A',
    gradeNum: 3.7,
  },
  {
    id: 6,
    name: 'Өгөгдлийн сан',
    teacher: 'Ч.Төгөлдөр',
    grade: 'B+',
    gradeNum: 3.0,
  },
];

const CoursesTaken = ({ data }) => {
  const [query, setQuery] = useState('');
  const [sortDir, setSortDir] = useState('desc');

  const source = data ?? sampleData;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = source.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.teacher.toLowerCase().includes(q)
    );

    list.sort((a, b) => {
      return sortDir === 'asc'
        ? a.gradeNum - b.gradeNum
        : b.gradeNum - a.gradeNum;
    });

    return list;
  }, [source, query, sortDir]);

  // Голч (GPA)
  const average =
    filtered.length > 0
      ? (
          filtered.reduce((sum, c) => sum + c.gradeNum, 0) / filtered.length
        ).toFixed(2)
      : 0;

  return (
    <div className='min-h-[80vh] max-w-6xl mx-auto p-6'>
      {/* Header */}
      <header className='mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-semibold'>Үзсэн хичээлүүд</h1>
          <p className='text-sm text-gray-500'>
            Хичээлийн нэр, багш болон дүнг харна
          </p>
        </div>

        <div className='flex items-center gap-3'>
          <input
            type='text'
            placeholder='Хайх: хичээл нэр эсвэл багш...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 w-64'
          />
          <button
            type='button'
            onClick={() =>
              setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'))
            }
            className='px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50'
            title='Дүнгээр эрэмбэлэх'>
            Дүн: {sortDir === 'asc' ? 'Өсөх' : 'Буурах'}
          </button>
        </div>
      </header>

      {/* Table for desktop */}
      <div className='hidden md:block bg-white shadow rounded-lg overflow-hidden'>
        <table className='min-w-full divide-y'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                #
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                Хичээлийн нэр
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                Багш
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                Үсгэн дүн
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                Тоон дүн
              </th>
            </tr>
          </thead>

          <tbody className='bg-white divide-y'>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='px-6 py-8 text-center text-sm text-gray-500'>
                  Хоосон байна
                </td>
              </tr>
            ) : (
              filtered.map((c, idx) => (
                <tr key={c.id}>
                  <td className='px-6 py-4 text-sm text-gray-700'>{idx + 1}</td>
                  <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                    {c.name}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {c.teacher}
                  </td>
                  <td className='px-6 py-4 text-sm font-semibold'>{c.grade}</td>
                  <td className='px-6 py-4 text-sm'>{c.gradeNum.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>

          {/* Голч харуулах хэсэг */}
          {filtered.length > 0 && (
            <tfoot className='bg-gray-50'>
              <tr>
                <td
                  colSpan={4}
                  className='px-6 py-4 text-right font-semibold text-gray-700'>
                  Голч дүн:
                </td>
                <td className='px-6 py-4 font-bold text-blue-600 text-lg'>
                  {average}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Mobile cards */}
      <div className='md:hidden space-y-3'>
        {filtered.length === 0 ? (
          <div className='p-6 bg-white rounded-lg shadow text-center text-gray-500'>
            Хоосон байна
          </div>
        ) : (
          <>
            {filtered.map(c => (
              <div
                key={c.id}
                className='bg-white rounded-lg shadow p-4 flex flex-col gap-1'>
                <div className='text-sm font-medium text-gray-900'>
                  {c.name}
                </div>
                <div className='text-xs text-gray-500'>Багш: {c.teacher}</div>
                <div className='text-sm mt-1'>
                  Дүн: <span className='font-semibold'>{c.grade}</span> (
                  {c.gradeNum})
                </div>
              </div>
            ))}

            {/* Голч дүн mobile-д */}
            <div className='bg-gray-100 rounded-lg shadow p-4 text-center font-semibold text-blue-700'>
              Голч дүн: {average}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesTaken;
