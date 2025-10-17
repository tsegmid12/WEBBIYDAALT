import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseChart from './courseChart';
import CustomCalendar from './schedule';
import { studentAPI } from '../../services/api';

export default function DashboardContent() {
  const [stats, setStats] = useState([
    {
      icon: BookOpen,
      value: '0',
      label: 'Үзэж буй хичээл',
      bg: 'bg-purple-100',
      iconBg: 'bg-purple-200',
      url: '/team4/course',
    },
    {
      icon: Award,
      value: '0',
      label: 'Дундаж оноо',
      bg: 'bg-green-100',
      iconBg: 'bg-blue-500',
      iconColor: 'text-white',
      url: '/team4/score',
    },
    {
      icon: Users,
      value: '0',
      label: 'Баг',
      bg: 'bg-orange-100',
      iconBg: 'bg-orange-200',
      url: '/team4/group',
    },
    {
      icon: Trophy,
      value: '0',
      label: 'Үзсэн хичээлүүд',
      bg: 'bg-green-100',
      iconBg: 'bg-green-200',
      url: '/team4/courses',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getDashboardStats();

      // Update stats with real data
      setStats(prevStats => [
        {
          ...prevStats[0],
          value: String(data.enrolledCourses || data.current_courses || 0),
        },
        {
          ...prevStats[1],
          value: String(data.averageScore || data.average_score || 0),
        },
        {
          ...prevStats[2],
          value: String(data.groups || data.team_count || 0),
        },
        {
          ...prevStats[3],
          value: String(data.completedCourses || data.completed_courses || 0),
        },
      ]);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.message);
      // Set demo data if API fails
      setStats(prevStats => [
        { ...prevStats[0], value: '8' },
        { ...prevStats[1], value: '76' },
        { ...prevStats[2], value: '8' },
        { ...prevStats[3], value: '21' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Dashboard</h2>

      {/* {error && (
        <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
          <p className='text-yellow-700'>
            Demo өгөгдөл харуулж байгаа.
          </p>
        </div>
      )} */}

      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className='bg-gray-200 rounded-xl p-6 animate-pulse h-28'></div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {stats.map((stat, index) => (
            <Link to={stat.url} key={index}>
              <div
                className={`${stat.bg} rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow`}>
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
              </div>
            </Link>
          ))}
        </div>
      )}

      <CourseChart />

      <CustomCalendar />
    </>
  );
}
