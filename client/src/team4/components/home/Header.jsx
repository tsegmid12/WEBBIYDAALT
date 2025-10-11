import React from 'react';

export default function Header() {
  return (
    <div className=' px-8 py-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm'>
          <img
            src='/team4/student/profile.png'
            alt='Profile'
            className='w-20 h-20 rounded-full object-cover'
          />
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>Uuganaa</h1>
            <p className='text-gray-500'>ШУТИС, МХТС, Програм хангамж</p>
          </div>
        </div>
      </div>
    </div>
  );
}
