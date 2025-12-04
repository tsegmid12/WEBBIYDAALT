import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { courseAPI, favoriteAPI } from '../services/usedAPI';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    fetchCourses();
    loadFavoritesFromStorage();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseAPI.getMyCourses();
      console.log('API Response:', data);

      // API-аас items array-г авна
      const coursesData = data.items || data.courses || data || [];

      // Format courses data to match UI expectations
      const formattedCourses = coursesData.map(course => ({
        id: course.id,
        title: course.name || course.title || 'Хичээлийн нэр',
        instructor: course.description || course.description || 'Багш',
        members: course.student_count || course.members || 0,
        image: course.picture || course.image || '/team4/student/course.png',
        description: course.description || '',
        start_on: course.start_on,
        end_on: course.end_on,
      }));

      setCourses(formattedCourses);
      setFilteredCourses(formattedCourses);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message);

      // Demo data for fallback
      const demoData = Array(8)
        .fill(null)
        .map((_, index) => ({
          id: index + 1,
          title: 'Веб Систем Ба Технологи',
          instructor: 'Т.Золбоо',
          members: 42,
          image: '/team4/student/course.png',
        }));
      setCourses(demoData);
      setFilteredCourses(demoData);
    } finally {
      setLoading(false);
    }
  };

  const loadFavoritesFromStorage = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('favoriteCourses') || '[]');
      setFavorites(new Set(favs));
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        course =>
          course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  // Toggle favorite - localStorage-д хадгална
  const handleToggleFavorite = (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(courseId)) {
        newFavorites.delete(courseId);
      } else {
        newFavorites.add(courseId);
      }
      try {
        localStorage.setItem(
          'favoriteCourses',
          JSON.stringify([...newFavorites])
        );
      } catch (err) {
        console.error('Error saving favorites:', err);
      }

      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Хичээлүүдийг ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='relative flex-1 max-w-2xl'>
              <Search
                className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Хичээл хайх...'
                className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8'>
        {error && (
          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
            <div className='flex items-start'>
              <div className='flex-1'>
                <p className='text-yellow-800 font-medium'>Анхааруулга</p>
                <p className='text-yellow-700 text-sm mt-1'>
                  API-тай холбогдоход алдаа гарлаа. Demo өгөгдөл харуулж байна.
                </p>
                <p className='text-yellow-600 text-xs mt-1'>Алдаа: {error}</p>
              </div>
            </div>
          </div>
        )}

        <p className='text-gray-600 mb-6'>
          {filteredCourses.length} хичээл олдлоо
          {searchQuery && ` "${searchQuery}" хайлтаар`}
        </p>

        {filteredCourses.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Хичээл олдсонгүй</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='mt-4 text-cyan-600 hover:text-cyan-700 underline'>
                Хайлт арилгах
              </button>
            )}
          </div>
        ) : (
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
                      onError={e => {
                        e.target.src = '/team4/student/course.png';
                      }}
                    />
                    <button
                      onClick={e => handleToggleFavorite(e, course.id)}
                      className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10'>
                      <Heart
                        className='text-cyan-500 transition-all'
                        size={20}
                        fill={favorites.has(course.id) ? '#00CBB8' : 'none'}
                      />
                    </button>
                  </div>
                  <div className='p-4'>
                    <h3 className='font-semibold text-gray-800 mb-1 group-hover:text-cyan-600 transition-colors line-clamp-2'>
                      {course.title}
                    </h3>
                    {/* <p className='text-sm text-gray-600 mb-1'>
                      {course.instructor}
                    </p> */}
                    {/* <p className='text-sm text-gray-500'>
                      Нийт {course.members} Сурагч
                    </p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
