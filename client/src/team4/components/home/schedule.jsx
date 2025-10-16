import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomCalendar() {
  const schedule = [
    {
      day: 'Mon',
      startTime: '9:40',
      endTime: '11:10',
      subject: 'Програмчлалын үндэс',
      color: 'bg-sky-400',
      url: '/team4/course/101',
    },
    {
      day: 'Tue',
      startTime: '8:00',
      endTime: '9:30',
      subject: 'Програм хангамжийн бүтэц',
      color: 'bg-green-400',
      url: '/team4/course/102',
    },

    {
      day: 'Wed',
      startTime: '8:00',
      endTime: '9:30',
      subject: 'Тоглоомын програмчлал',
      color: 'bg-purple-400',
      url: '/team4/course/103',
    },
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Цагийг минут руу хөрвүүлэх
  const timeToMinutes = time => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Хичээлийн хуваарь</h2>
      <div className='grid grid-cols-8 border text-sm'>
        <div className='border-r border-b p-2 font-bold bg-gray-100'>Цаг</div>
        {days.map(d => (
          <div
            key={d}
            className='border-r border-b p-2 font-bold text-center bg-gray-100'>
            {d}
          </div>
        ))}

        {Array.from({ length: 26 }).map((_, i) => {
          const hour = 7 + Math.floor(i / 2);
          const minute = i % 2 === 0 ? '00' : '30';
          const time = `${hour}:${minute}`;
          const slotStart = timeToMinutes(time);
          const slotEnd = slotStart + 30;

          return (
            <React.Fragment key={i}>
              <div className='border-r border-b p-2 bg-gray-50'>{time}</div>
              {days.map(d => {
                const matchingClasses = schedule.filter(cls => {
                  if (cls.day !== d) return false;
                  const classStart = timeToMinutes(cls.startTime);
                  const classEnd = timeToMinutes(cls.endTime);
                  return classStart < slotEnd && classEnd > slotStart;
                });

                return (
                  <div key={d + i} className='border-r border-b relative h-10'>
                    {matchingClasses.map((cls, idx) => {
                      const classStart = timeToMinutes(cls.startTime);
                      const classEnd = timeToMinutes(cls.endTime);
                      const startsInThisSlot =
                        classStart >= slotStart && classStart < slotEnd;

                      if (startsInThisSlot) {
                        const duration = classEnd - classStart;
                        const height = (duration / 30) * 40;
                        const offsetMinutes = classStart - slotStart;
                        const topOffset = (offsetMinutes / 30) * 40;

                        return (
                          <Link to={cls.url}>
                            <div
                              key={idx}
                              className={`${cls.color} absolute z-50 left-1 right-1 rounded-md text-white flex flex-col items-center justify-center p-2 text-xs shadow-md`}
                              style={{
                                top: `${topOffset + 4}px`,
                                height: `${height - 8}px`,
                              }}>
                              <div className='font-semibold text-center'>
                                {cls.subject}
                              </div>
                              <div className='text-xs opacity-90 mt-1'>
                                {cls.startTime} - {cls.endTime}
                              </div>
                            </div>
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
