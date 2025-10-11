import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('UI/UX Design');

  const courses = Array(8).fill({
    title: 'Веб Систем Ба Технологи',
    instructor: 'Т.Золбоо',
    members: 'Нийт 42 Сурагч',
    image: '/api/placeholder/280/200',
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='border-b'>
        <div className='max-w-7xl mx-auto px-8 py-6'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1 max-w-2xl'>
              <Search
                className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search courses...'
                className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-8 py-8'>
        <p className='text-gray-600 mb-6'>1 results find for "ui/ux design"</p>

        <div className='grid grid-cols-4 gap-6'>
          {courses.map((course, index) => (
            <Link key={`course-${index}`} to='/team4/course/courseDetail'>
              <div className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group'>
                <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50'>
                  <img src='/team4/student/course.png' alt='course' />
                  <button className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10'>
                    <Heart className='text-cyan-500 transition-all' size={20} />
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
