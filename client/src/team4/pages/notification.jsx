import React, { useState } from 'react';
import { Clock } from 'lucide-react';

export default function Notification() {
  const [activeTab, setActiveTab] = useState('system');

  const systemNotifications = [
    {
      id: 1,
      title: 'Системийн шинэчлэлт хийгдэх тухай',
      description:
        'Өнөөдөр 00:00-02:00 цагийн хооронд системийн шинэчлэлт хийгдэх тул платформ түр хугацаагаар ажиллахгүй. Та энэ хугацаанд сургалтдаа хамрагдах боломжгүй болохыг анхаарна уу.',
      date: '2025.03.13',
      time: '17:20',
    },
    {
      id: 2,
      title: 'Системийн шинэчлэлт хийгдэх тухай',
      description:
        'Өнөөдөр 00:00-02:00 цагийн хооронд системийн шинэчлэлт хийгдэх тул платформ түр хугацаагаар ажиллахгүй. Та энэ хугацаанд сургалтдаа хамрагдах боломжгүй болохыг анхаарна уу.',
      date: '2025.03.13',
      time: '17:20',
    },
    {
      id: 3,
      title: 'Системийн шинэчлэлт хийгдэх тухай',
      description:
        'Өнөөдөр 00:00-02:00 цагийн хооронд системийн шинэчлэлт хийгдэх тул платформ түр хугацаагаар ажиллахгүй. Та энэ хугацаанд сургалтдаа хамрагдах боломжгүй болохыг анхаарна уу.',
      date: '2025.03.13',
      time: '17:20',
    },
  ];

  const coursesNotifications = [
    {
      id: 1,
      title: 'Програмчлалын үндэс',
      description: '"Програмчлалын үндэс" Хичээлийн "Team3" Бүлэгт нэмэгдлээ',
      date: '2025.03.13',
      time: '17:20',
    },
    {
      id: 2,
      title: 'Програмчлалын үндэс',
      description: '"Програмчлалын үндэс" Хичээлийн "Team3" Бүлэгт нэмэгдлээ',
      date: '2025.03.13',
      time: '17:20',
    },
    {
      id: 3,
      title: 'Програмчлалын үндэс',
      description: '"Програмчлалын үндэс" Хичээлийн "Team3" Бүлэгт нэмэгдлээ',
      date: '2025.03.13',
      time: '17:20',
    },
    {
      id: 4,
      title: 'Програмчлалын үндэс',
      description: '"Програмчлалын үндэс" Хичээлийн "Team3" Бүлэгт нэмэгдлээ',
      date: '2025.03.13',
      time: '17:20',
    },
  ];

  const notifications =
    activeTab === 'system' ? systemNotifications : coursesNotifications;

  return (
    <div className='min-h-[90vh] bg-gray-50'>
      <div className='max-w-5xl mx-auto px-8 '>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Notifications</h1>
        <div className='flex gap-8 border-b mb-8'>
          <button
            onClick={() => setActiveTab('system')}
            className={`pb-3 px-2 font-medium border-b-2 transition-colors ${
              activeTab === 'system'
                ? 'text-gray-900 border-indigo-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}>
            System
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-3 px-2 font-medium border-b-2 transition-colors ${
              activeTab === 'courses'
                ? 'text-gray-900 border-indigo-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}>
            Courses
          </button>
        </div>

        <div className='space-y-4'>
          {notifications.map(notification => (
            <div
              key={notification.id}
              className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-indigo-600'>
              <div className='flex items-start justify-between mb-3'>
                <div className='flex items-start gap-3 flex-1'>
                  <div className='w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0'></div>
                  <h3 className='font-semibold text-gray-900 text-lg'>
                    {notification.title}
                  </h3>
                </div>
                <div className='flex items-center gap-2 text-gray-500 text-sm flex-shrink-0 ml-4'>
                  <Clock size={16} />
                  <span>
                    {notification.date} {notification.time}
                  </span>
                </div>
              </div>
              <p className='text-gray-700 leading-relaxed ml-5'>
                {notification.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
