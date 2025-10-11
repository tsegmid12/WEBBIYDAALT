import React from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function TeachersContent() {
  const teachers = Array(8).fill({
    name: 'Б.ганзориг',
    description: 'Мэдээлэл, Холбооны технологийн сургууль',
    image: '/team4/student/teacher.png',
  });

  return (
    <>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Teachers (24)</h2>
      <div className='grid grid-cols-3 gap-4 mb-8'>
        <div>
          <label className='block text-sm text-gray-600 mb-2'>Search:</label>
          <div className='relative'>
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              placeholder='Search in your teachers...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200'
            />
          </div>
        </div>
        <div>
          <label className='block text-sm text-gray-600 mb-2'>Courses:</label>
          <select className='w-full px-4 py-2 border border-gray-300 rounded-lg'>
            <option>All Courses</option>
          </select>
        </div>
        <div>
          <label className='block text-sm text-gray-600 mb-2'>Teacher:</label>
          <select className='w-full px-4 py-2 border border-gray-300 rounded-lg'>
            <option>All Teachers</option>
          </select>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className='grid grid-cols-4 gap-6'>
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
            <div className='relative'>
              <img
                src={teacher.image}
                alt={teacher.name}
                className='w-full h-64 object-cover'
              />
              <button className='absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100'>
                <Heart className='text-cyan-500' size={20} />
              </button>
            </div>
            <div className='p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>
                {teacher.name}
              </h3>
              <p className='text-sm text-gray-500 mb-3'>
                {teacher.description}
              </p>
              <Link to='/team4/course/courseDetail'>
                <button className='w-full bg-cyan-400 text-white py-2 rounded-lg hover:bg-cyan-500 transition-colors text-sm font-medium'>
                  Тоглоомын программчлал
                </button>{' '}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
