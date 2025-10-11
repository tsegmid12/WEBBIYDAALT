import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LessonsTab() {
  const [openWeek, setOpenWeek] = useState(null);

  const weeks = [
    { id: 0, title: 'Ерөнхий', lessons: [] },
    { id: 1, title: 'Week 1', lessons: [] },
    { id: 2, title: 'Week 2', lessons: [] },
    { id: 3, title: 'Week 3', lessons: [] },
    { id: 4, title: 'Week 4', lessons: [] },
    { id: 5, title: 'Week 5', lessons: [] },
    { id: 6, title: 'Week 6', lessons: [] },
    { id: 7, title: 'Week 7', lessons: [] },
    { id: 8, title: 'Week 8', lessons: [] },
  ];

  return (
    <div className='max-w-2xl mx-auto space-y-3'>
      {weeks.map(week => (
        <div
          key={week.id}
          className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
          <button
            onClick={() => setOpenWeek(openWeek === week.id ? null : week.id)}
            className='w-full px-6 py-4 flex items-center justify-between text-left'>
            <span className='font-semibold text-gray-900'>{week.title}</span>
            <ChevronDown
              className={`text-gray-400 transition-transform ${
                openWeek === week.id ? 'rotate-180' : ''
              }`}
              size={20}
            />
          </button>

          {openWeek === week.id && week.lessons.length > 0 && (
            <div className='px-6 pb-4 border-t'>
              <div className='pt-4 space-y-2'>
                {week.lessons.map((lesson, idx) => (
                  <div key={idx} className='text-gray-600 text-sm'>
                    {lesson}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
