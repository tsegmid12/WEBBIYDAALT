import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { favoriteAPI } from '../../services/usedAPI';

export default function FavoriteCourses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavoriteCourses();
  }, []);

  const fetchFavoriteCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await favoriteAPI.getFavoriteCourses();
      console.log('Favorite API:', res);

      const items = res.items || res.data || res || [];

      const formatted = items.map(course => ({
        id: course.id,
        title: course.name || course.title,
        instructor: course.teacher_name || course.instructor,
        members: course.student_count || 0,
        image: course.picture || '/team4/student/course.png',
      }));

      setCourses(formatted);
    } catch (err) {
      console.error('Favorite error:', err);
      setError('Таалагдсан хичээл татаж чадсангүй');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await favoriteAPI.removeFavorite(courseId);

      setCourses(prev => prev.filter(c => c.id !== courseId));
    } catch (err) {
      console.error('Remove favorite error:', err);
    }
  };

  const filteredCourses = courses.filter(course => {
    const q = searchQuery.toLowerCase();
    return (
      course.title?.toLowerCase().includes(q) ||
      course.instructor?.toLowerCase().includes(q)
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
              {filteredCourses.map(course => (
                <Link key={course.id} to={`/team4/course/${course.id}`}>
                  <div className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group'>
                    <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50'>
                      <img
                        src={course.image}
                        alt={course.title}
                        className='w-full h-48 object-cover'
                        onError={e =>
                          (e.target.src = '/team4/student/course.png')
                        }
                      />
                      <button
                        onClick={e => removeFavorite(e, course.id)}
                        className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10'>
                        <Heart
                          size={20}
                          fill={'#44B1D2'}
                          className='textBlue'
                        />
                      </button>
                    </div>
                    <div className='p-4'>
                      <h3 className='font-semibold text-gray-800 mb-1 group-hover:text-cyan-600 transition-colors'>
                        {course.title}
                      </h3>
                      <p className='text-sm text-gray-600 mb-1'>
                        {course.instructor}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Нийт {course.members} Сурагч
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
