import React from 'react';
import { BookOpen, Users, Award, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseChart from './courseChart';
import CustomCalendar from './schedule';

export default function DashboardContent() {
  const stats = [
    {
      icon: BookOpen,
      value: '8',
      label: 'Үзэж буй хичээл',
      bg: 'bg-purple-100',
      iconBg: 'bg-purple-200',
      url: '/team4/course',
    },
    {
      icon: Award,
      value: '76',
      label: 'Дундаж оноо',
      bg: 'bg-green-100',
      iconBg: 'bg-blue-500',
      iconColor: 'text-white',
      url: '/team4/score',
    },
    {
      icon: Users,
      value: '8',
      label: 'Баг',
      bg: 'bg-orange-100',
      iconBg: 'bg-orange-200',
      url: '/team4/group',
    },
    {
      icon: Trophy,
      value: '21',
      label: 'Үзсэн хичээлүүд',
      bg: 'bg-green-100',
      iconBg: 'bg-green-200',
      url: '/team4/courses',
    },
  ];

  return (
    <>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Dashboard</h2>

      <div className='grid grid-cols-4 gap-4 mb-8'>
        {stats.map((stat, index) => (
          <Link to={stat.url}>
            <div
              key={index}
              className={`${stat.bg} rounded-xl p-6 flex items-center gap-4`}>
              <div
                className={`${stat.iconBg} p-3 rounded-lg ${
                  stat.iconColor || 'text-gray-700'
                }`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className='text-2xl font-bold text-gray-800'>
                  {stat.value}
                </div>
                <div className='text-sm text-gray-600'>{stat.label}</div>
              </div>
            </div>{' '}
          </Link>
        ))}
      </div>

      <CourseChart />

      <CustomCalendar />
    </>
  );
}
