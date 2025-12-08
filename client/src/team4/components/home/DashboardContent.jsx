import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseChart from './courseChart';
import CustomCalendar from './schedule';
import { studentAPI, courseAPI } from '../../services/usedAPI';
import { useSearchParams } from 'react-router-dom';

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
  const [groupsCount, setGroupsCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Хичээлийн мэдээлэл авах
      const coursesData = await courseAPI.getMyCourses();
      const coursesArray =
        coursesData.items || coursesData.courses || coursesData || [];

      // Идэвхитэй хичээл (Үзэж буй хичээл) - бүх хичээлийн тоо
      const enrolledCoursesCount = coursesArray.length;

      // TODO: API-аас гомдол статусыг авч "Үзсэн хичээлүүд"-ийг тодорхойлох
      // Одоогоор бүх хичээлийн тоо (дараа нь "completed" статусын хичээлүүдийг авах)
      const completedCoursesCount = coursesArray.length;

      // Бүх хичээлийн сурагчдаас уникан багуудыг цуглуулах
      const uniqueGroups = new Set();

      // Бүх хичээлийн дүнг авах
      let totalPoints = 0;

      for (const course of coursesArray) {
        try {
          const courseUsers = await courseAPI.getCourseUsers(course.id);
          const items = courseUsers.items || [];

          items.forEach(item => {
            try {
              const groupData = JSON.parse(item.group);
              if (groupData && groupData.id) {
                uniqueGroups.add(groupData.id);
              }
            } catch (e) {
              // JSON parse алдаа, үргэлжлүүлэх
            }
          });
        } catch (e) {
          console.error(`Error fetching users for course ${course.id}:`, e);
        }

        // Хичээлийн дүнг авах
        try {
          const pointsData = await courseAPI.getCoursePoints(course.id);
          const points = pointsData.points || pointsData.score || 0;
          totalPoints += points;
        } catch (e) {
          console.error(`Error fetching points for course ${course.id}:`, e);
        }
      }

      // Дундаж оноо тооцоолох
      const avgScore =
        coursesArray.length > 0
          ? Math.round((totalPoints / coursesArray.length) * 10) / 10
          : 0;

      setGroupsCount(uniqueGroups.size);
      setAverageScore(avgScore);

      setStats(prevStats => [
        {
          ...prevStats[0],
          value: String(enrolledCoursesCount),
        },
        {
          ...prevStats[1],
          value: String(avgScore),
        },
        {
          ...prevStats[2],
          value: String(uniqueGroups.size),
        },
        {
          ...prevStats[3],
          value: String(completedCoursesCount),
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
