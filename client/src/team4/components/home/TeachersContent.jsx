import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teacherAPI, favoriteAPI } from '../../services/usedAPI';

export default function TeachersContent() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    let data = [...teachers];

    // 🔍 Хайлт (first_name + last_name)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        t =>
          t.first_name?.toLowerCase().includes(q) ||
          t.last_name?.toLowerCase().includes(q)
      );
    }

    setFilteredTeachers(data);
    setCurrentPage(1);
  }, [searchQuery, teachers]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      let data = await teacherAPI.getAllTeachers();

      // Өгөгдөл array эсэхийг шалгах
      data = Array.isArray(data) ? data : [];

      // 🛠 Бүх багшийг UI–д таарах байдлаар normalize хийнэ
      const formatted = data.map(t => ({
        id: t.id,
        first_name: t.first_name,
        last_name: t.last_name,
        picture: t.picture
          ? `/uploads/${t.picture}`
          : '/team4/student/teacher.png',
      }));

      setTeachers(formatted);
      setFilteredTeachers(formatted);
    } catch (err) {
      console.error(err);
      setTeachers([]);
      setFilteredTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (e, teacherId) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.has(teacherId) ? newSet.delete(teacherId) : newSet.add(teacherId);
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className='text-center py-12'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4'></div>
        <p className='text-gray-600'>Багш нарын мэдээлэл ачааллаж байна...</p>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentTeachers = filteredTeachers.slice(
    startIndex,
    startIndex + perPage
  );

  return (
    <>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Teachers ({filteredTeachers.length})
      </h2>

      <div className='mb-6'>
        <label className='block text-sm text-gray-600 mb-2'>Хайлт:</label>
        <div className='relative'>
          <Search
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='text'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='Багш хайх...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200'
          />
        </div>
      </div>

      {currentTeachers.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500'>Багш олдсонгүй</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {currentTeachers.map(teacher => (
            <div
              key={teacher.id}
              className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
              <div className='relative'>
                {teacher.picture === 'no-image.jpg' ? (
                  <img
                    src={teacher.picture}
                    alt={teacher.last_name}
                    className='w-full h-56 sm:h-64 object-cover'
                  />
                ) : (
                  <img
                    src='/team4/student/teacher.png'
                    alt={teacher.last_name}
                    className='w-full h-56 sm:h-64 object-cover'
                  />
                )}

                <button
                  onClick={e => handleToggleFavorite(e, teacher.id)}
                  className='absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100'>
                  <Heart
                    className='text-cyan-500'
                    size={20}
                    fill={favorites.has(teacher.id) ? '#00CBB8' : 'none'}
                  />
                </button>
              </div>

              <div className='p-4'>
                <h3 className='font-semibold text-gray-800 mb-1'>
                  {teacher.last_name}
                </h3>

                <Link to={`/team4/course?teacher=${teacher.id}`}>
                  <button className='w-full bg-cyan-400 text-white py-2 rounded-lg hover:bg-cyan-500 transition-colors text-sm font-medium'>
                    Хичээл үзэх
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-3 mt-8'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className='px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50'>
            Өмнөх
          </button>

          <span className='text-gray-600'>
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className='px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50'>
            Дараах
          </button>
        </div>
      )}
    </>
  );
}
