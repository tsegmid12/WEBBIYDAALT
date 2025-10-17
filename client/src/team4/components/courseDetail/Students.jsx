import React, { useState } from 'react';
import { User } from 'lucide-react';

export default function StudentsTab() {
  const [currentPage, setCurrentPage] = useState(3);

  const students = [
    { name: 'БАТХААН ГАНБААТАР', id: 'B232270004' },
    { name: 'АЗЖАРГАЛ ЦЭСЭДНЭМ', id: 'B232270004' },
    { name: 'ЧИМЭГ-ЭРДЭНЭ БАТ-АМГАЛАН', id: 'B232270004' },
    { name: 'НАРАНТУНГАЛАГ ...', id: 'B232270004' },
    { name: 'БАЯРЦЭН БАЯР', id: 'B232270004' },
    { name: 'ЭНХБАЯР ГАНБОЛД', id: 'B232270004' },
    { name: 'ТӨГӨЛЭЛ БАТ-ЭНХ', id: 'B232270004' },
  ];

  const totalPages = 5;

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='grid grid-cols-2 gap-4 mb-8'>
        {students.map((student, index) => (
          <div
            key={index}
            className='bg-white rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow'>
            <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center'>
              <User className='text-gray-400' size={24} />
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 text-sm'>
                {student.name}
              </h3>
              <p className='text-gray-500 text-xs'>{student.id}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center gap-2'>
        <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        {[1, 2, 3, 4, 5].map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            {page}
          </button>
        ))}

        <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
