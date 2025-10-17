import React from 'react';

export default function Navigation({ currentPage, setCurrentPage }) {
  const tabs = [
    { id: 'courses', label: 'Courses' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'groups', label: 'Groups' },
  ];

  return (
    <div className='bg-white max-w-7xl mx-auto px-4 sm:px-8'>
      <div className='flex justify-center gap-6 sm:gap-12 border-b border-gray-200 pt-6 overflow-x-auto no-scrollbar'>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentPage(tab.id)}
            className={`pb-3 px-4 font-medium ${
              currentPage === tab.id
                ? 'text-gray-800 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-800'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
