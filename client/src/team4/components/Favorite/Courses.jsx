import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('UI/UX Design');

  const courses = Array(8).fill({
    title: 'Веб Систем Ба Технологи',
    instructor: 'Т.Золбоо',
    members: 'Нийт 42 Сурагч',
    image: '/api/placeholder/280/200',
    isFavorite: true,
  });

  return (
    <div className='min-h-[60vh] bg-gray-50'>
      <div className='max-w-7xl mx-auto px-8 py-8'>
        <div className='grid grid-cols-4 gap-6'>
          {courses.map((course, index) => (
            <Link key={`course-${index}`} to='/team4/course/courseDetail'>
              <div className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group'>
                <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50'>
                  <img src='/team4/student/course.png' alt='course' />
                  <button className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10'>
                    <Heart
                      className='textBlue'
                      size={20}
                      style={
                        course.isFavorite
                          ? { fill: '#44B1D2' }
                          : { fill: 'white' }
                      }
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
                  <p className='text-sm text-gray-500'>{course.members}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
