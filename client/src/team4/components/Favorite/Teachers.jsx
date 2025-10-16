import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeachersContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers, setTeachers] = useState(
    Array(8)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        name: 'Б.ганзориг',
        description: 'Мэдээлэл, Холбооны технологийн сургууль',
        image: '/team4/student/teacher.png',
        isFavorite: true,
      }))
  );

  const handleToggleFavorite = (e, teacherId) => {
    e.preventDefault();
    e.stopPropagation();

    setTeachers(prev =>
      prev.map(teacher =>
        teacher.id === teacherId
          ? { ...teacher, isFavorite: !teacher.isFavorite }
          : teacher
      )
    );
  };

  const handleRemoveFavorite = (e, teacherId) => {
    e.preventDefault();
    e.stopPropagation();

    setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
  };

  // Filter teachers based on search
  const filteredTeachers = teachers.filter(teacher => {
    if (searchQuery.trim() === '') return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      teacher.name?.toLowerCase().includes(searchLower) ||
      teacher.description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
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
            placeholder='Багш хайх...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
          />
        </div>
      </div>

      <p className='text-gray-600 mb-6'>
        {filteredTeachers.length} багш олдлоо
        {searchQuery && ` "${searchQuery}" хайлтаар`}
      </p>

      {filteredTeachers.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Багш олдсонгүй</p>
        </div>
      ) : (
        <div className='grid grid-cols-4 gap-6'>
          {filteredTeachers.map(teacher => (
            <div
              key={teacher.id}
              className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
              <div className='relative'>
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className='w-full h-64 object-cover'
                />
                <button
                  onClick={e => handleRemoveFavorite(e, teacher.id)}
                  className='absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100'>
                  <Heart className='textBlue' size={20} fill='#44B1D2' />
                </button>
              </div>
              <div className='p-4'>
                <h3 className='font-semibold text-gray-800 mb-1'>
                  {teacher.name}
                </h3>
                <p className='text-sm text-gray-500 mb-3'>
                  {teacher.description}
                </p>
                <Link to='/team4/course/1'>
                  <button className='w-full bg-cyan-400 text-white py-2 rounded-lg hover:bg-cyan-500 transition-colors text-sm font-medium'>
                    Тоглоомын программчлал
                  </button>{' '}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
