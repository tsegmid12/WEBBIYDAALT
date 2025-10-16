import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teacherAPI, favoriteAPI } from '../../services/api';

export default function TeachersContent() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    fetchTeachers();
    fetchFavorites();
  }, []);

  useEffect(() => {
    let data = [...teachers];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        teacher =>
          teacher.name?.toLowerCase().includes(q) ||
          teacher.description?.toLowerCase().includes(q)
      );
    }

    if (selectedSubject !== 'all') {
      const subj = selectedSubject.toLowerCase().trim();
      data = data.filter(t => {
        const courseList = Array.isArray(t.courses)
          ? t.courses
          : typeof t.courses === 'string'
          ? t.courses.split(',')
          : [];

        const subjects = [...courseList]
          .filter(Boolean)
          .map(s => String(s).toLowerCase().trim());

        return subjects.some(s => s.includes(subj));
      });
    }

    if (selectedDepartment !== 'all') {
      const dep = selectedDepartment.toLowerCase().trim();
      data = data.filter(t =>
        (t.department || t.description || '').toLowerCase().trim().includes(dep)
      );
    }

    setFilteredTeachers(data);
  }, [searchQuery, teachers, selectedSubject, selectedDepartment]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const data = await teacherAPI.getAllTeachers();
      const teachersData = data.teachers || data;
      setTeachers(teachersData);
      setFilteredTeachers(teachersData);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError(err.message);
      const demoData = Array(8)
        .fill(null)
        .map((_, index) => ({
          id: index + 1,
          name: 'Б.ганзориг',
          description: 'Мэдээлэл, Холбооны технологийн сургууль',
          image: '/team4/student/teacher.png',
          courses: ['Веб систем ба технологи', 'Мобайл программчлал'],
          department: 'Компьютерийн ухааны тэнхим',
        }));
      setTeachers(demoData);
      setFilteredTeachers(demoData);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    // Backend хүсэлт явуулахгүй - зөвхөн UI дээр toggle хийнэ
    // try {
    //   const data = await favoriteAPI.getFavoriteTeachers();
    //   const favoriteIds = new Set(data.map(teacher => teacher.id));
    //   setFavorites(favoriteIds);
    // } catch (err) {
    //   console.error('Error fetching favorites:', err);
    // }
  };

  const handleToggleFavorite = (e, teacherId) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(teacherId)) {
        newFavorites.delete(teacherId);
      } else {
        newFavorites.add(teacherId);
      }
      return newFavorites;
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

  return (
    <>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Teachers ({filteredTeachers.length})
      </h2>

      {/* {error && (
        <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
          <p className='text-yellow-700'>
            Demo өгөгдөл харуулж байгаа.
          </p>
        </div>
      )} */}

      <div className='grid grid-cols-3 gap-4 mb-8'>
        <div>
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
        <div>
          <label className='block text-sm text-gray-600 mb-2'>Хичээл:</label>
          <select
            className='w-full px-4 py-2 border border-gray-300 rounded-lg'
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}>
            <option value='all'>Бүх хичээл</option>
            <option value='Мобайл программчлал'>Мобайл программчлал</option>
            <option value='Веб систем ба технологи'>
              Веб систем ба технологи
            </option>
            <option value='Дискрет бүтэц'>Дискрет бүтэц</option>
            <option value='Үйлдлийн систем'>Үйлдлийн систем</option>
          </select>
        </div>
        <div>
          <label className='block text-sm text-gray-600 mb-2'>Тэнхим:</label>
          <select
            className='w-full px-4 py-2 border border-gray-300 rounded-lg'
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}>
            <option value='all'>Бүх багш</option>
            <option value='Мэдээллийн технологийн тэнхим'>
              Мэдээллийн технологийн тэнхим
            </option>
            <option value='Компьютерийн ухааны тэнхим'>
              Компьютерийн ухааны тэнхим
            </option>
            <option value='Кибер аюулгүй байдлын тэнхим'>
              Кибер аюулгүй байдлын тэнхим
            </option>
          </select>
        </div>
      </div>

      {/* Teachers Grid */}
      {filteredTeachers.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500'>Багш олдсонгүй</p>
        </div>
      ) : (
        <div className='grid grid-cols-4 gap-6'>
          {filteredTeachers.map((teacher, index) => (
            <div
              key={teacher.id || index}
              className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
              <div className='relative'>
                <img
                  src={
                    teacher.image ||
                    teacher.avatar ||
                    '/team4/student/teacher.png'
                  }
                  alt={teacher.name}
                  className='w-full h-64 object-cover'
                />
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
                  {teacher.name || teacher.full_name || 'Багш'}
                </h3>
                <p className='text-sm text-gray-500 mb-3'>
                  {teacher.description || teacher.department || 'Сургууль'}
                </p>
                <Link to={`/team4/course?teacher=${teacher.id}`}>
                  <button className='w-full bg-cyan-400 text-white py-2 rounded-lg hover:bg-cyan-500 transition-colors text-sm font-medium'>
                    {teacher.mainCourse || 'Хичээл үзэх'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
