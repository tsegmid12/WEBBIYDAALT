import React from 'react';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'lessons', label: 'Хичээл' },
    { id: 'students', label: 'Суралчид' },
    { id: 'teams', label: 'Багууд' },
  ];

  return (
    <div className='bg-white border-b'>
      <div className='max-w-6xl mx-auto px-8'>
        <div className='flex justify-center gap-12'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 pt-2 px-2 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-orange-600 border-orange-500'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
