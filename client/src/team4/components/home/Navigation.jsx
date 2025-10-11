import React from 'react';

export default function Navigation({ currentPage, setCurrentPage }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className='max-w-7xl mx-auto px-8'>
      <div className='flex justify-center gap-12 border-b border-gray-200 mt-6'>
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
