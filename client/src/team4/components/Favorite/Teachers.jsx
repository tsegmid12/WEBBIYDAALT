import React from 'react';
import { Search, Heart } from 'lucide-react';

export default function TeachersContent() {
  const teachers = Array(8).fill({
    name: 'Б.ганзориг',
    description: 'Мэдээлэл, Холбооны технологийн сургууль',
    image: '/team4/student/teacher.png',
    isFavorite: true,
  });

  return (
    <>
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
                <Heart
                  className='textBlue'
                  size={20}
                  style={
                    teacher.isFavorite ? { fill: '#44B1D2' } : { fill: 'white' }
                  }
                />
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
