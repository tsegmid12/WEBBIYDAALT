import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { favoriteAPI } from '../../services/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavoriteCourses();
  }, []);

  const fetchFavoriteCourses = async () => {
    setLoading(true);
    const demoData = Array(8)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        title: 'Веб Систем Ба Технологи',
        instructor: 'Т.Золбоо',
        members: 42,
        image: '/team4/student/course.png',
        isFavorite: true,
      }));
    setCourses(demoData);
    setLoading(false);
  };

  const handleRemoveFavorite = (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const filteredCourses = courses.filter(course => {
    if (searchQuery.trim() === '') return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      course.title?.toLowerCase().includes(searchLower) ||
      course.instructor?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className='min-h-[60vh] bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>
            Таалагдсан хичээлүүдийг ачааллаж байна...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8'>
        {/* {error && (
          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
            <p className='text-yellow-700'>
              Demo өгөгдөл харуулж байгаа.
            </p>
          </div>
        )} */}

        {/* Search bar */}
        <div className='mb-6'>
          <div className='relative max-w-md'>
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Хичээл хайх...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
            />
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className='text-center py-12'>
            <Heart className='mx-auto mb-4 text-gray-400' size={48} />
            <p className='text-gray-500 text-lg'>
              {searchQuery
                ? 'Хайлтад тохирох хичээл олдсонгүй'
                : 'Таалагдсан хичээл олдсонгүй'}
            </p>
            <Link
              to='/team4/course'
              className='text-cyan-500 hover:underline mt-2 inline-block'>
              Хичээл үзэх
            </Link>
          </div>
        ) : (
          <>
            <p className='text-gray-600 mb-6'>
              {filteredCourses.length} хичээл олдлоо
              {searchQuery && ` "${searchQuery}" хайлтаар`}
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filteredCourses.map((course, index) => (
                <Link
                  key={course.id || `course-${index}`}
                  to={`/team4/course/${course.id || index + 1}`}>
                  <div className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group'>
                    <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50'>
                      <img
                        src={course.image || '/team4/student/course.png'}
                        alt={course.title}
                        className='w-full h-48 object-cover'
                      />
                      <button
                        onClick={e => handleRemoveFavorite(e, course.id)}
                        className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10'>
                        <Heart className='textBlue' size={20} fill='#44B1D2' />
                      </button>
                    </div>
                    <div className='p-4'>
                      <h3 className='font-semibold text-gray-800 mb-1 group-hover:text-cyan-600 transition-colors'>
                        {course.title || 'Хичээлийн нэр'}
                      </h3>
                      <p className='text-sm text-gray-600 mb-1'>
                        {course.instructor || course.teacher_name || 'Багш'}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Нийт {course.members || course.student_count || 0}{' '}
                        Сурагч
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
