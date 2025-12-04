import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { courseAPI } from '../../services/usedAPI';

export default function CourseChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageScore, setAverageScore] = useState(0);

  const colors = [
    '#C48B8B',
    '#F8E8E0',
    '#DFF2DF',
    '#60A5FA',
    '#E8E8FF',
    '#F9C6C9',
    '#FFE7A0',
    '#B2DFDB',
    '#D1C4E9',
    '#FFCCBC',
  ];

  useEffect(() => {
    fetchCoursesWithPoints();
  }, []);

  const fetchCoursesWithPoints = async () => {
    try {
      setLoading(true);
      setError(null);

      // Хичээлүүдийн мэдээлэл авах
      const coursesData = await courseAPI.getMyCourses();
      const coursesArray =
        coursesData.items || coursesData.courses || coursesData || [];

      // Бүх хичээлийн дүнг авах
      const coursesWithPoints = [];
      let totalPoints = 0;

      for (const course of coursesArray) {
        try {
          const pointsData = await courseAPI.getCoursePoints(course.id);
          const points = pointsData.points || pointsData.score || 0;

          coursesWithPoints.push({
            name: course.name || course.title || 'Хичээлийн нэр',
            оноо: points,
            courseId: course.id,
          });

          totalPoints += points;
        } catch (err) {
          console.error(`Error fetching points for course ${course.id}:`, err);
          // Дүн авахад алдаа гарвал 0 оноо ашиглана
          coursesWithPoints.push({
            name: course.name || course.title || 'Хичээлийн нэр',
            оноо: 0,
            courseId: course.id,
          });
        }
      }

      // Дундаж оноо тооцоолох
      const average =
        coursesWithPoints.length > 0
          ? Math.round((totalPoints / coursesWithPoints.length) * 10) / 10
          : 0;

      setData(coursesWithPoints);
      setAverageScore(average);
    } catch (err) {
      console.error('Error fetching courses with points:', err);
      setError(err.message);

      // Demo data fallback
      const demoData = [
        { name: 'Дискрет бүтэц', оноо: 80, courseId: 1 },
        { name: 'Веб систем ба технологи', оноо: 40, courseId: 2 },
        { name: 'Үйлдлийн систем', оноо: 95, courseId: 3 },
        { name: 'Мобайл программчлал', оноо: 80, courseId: 4 },
        { name: 'Компьютерийн сүлжээ', оноо: 25, courseId: 5 },
        { name: 'Тусгай зориулалтын англи хэл', оноо: 80, courseId: 6 },
        { name: 'Компьютерийн график', оноо: 40, courseId: 7 },
      ];
      setData(demoData);
      const avg =
        Math.round(
          (demoData.reduce((sum, item) => sum + item.оноо, 0) /
            demoData.length) *
            10
        ) / 10;
      setAverageScore(avg);
    } finally {
      setLoading(false);
    }
  };

  const numberedData = data.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center bg-white p-8 rounded-lg'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4'></div>
        <p className='text-gray-600'>Хичээлийн дүнг ачааллаж байна...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center bg-white p-8 rounded-lg'>
      <div className='w-full mb-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Таны одоо үзэж буй хичээлүүд дээр цугласан оноонууд
          </h2>
          <div className='bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-3 rounded-lg border border-cyan-200'>
            <p className='text-sm text-gray-600'>Дундаж оноо</p>
            <p className='text-2xl font-bold text-cyan-600'>{averageScore}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className='w-full bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
          <p className='text-yellow-800 text-sm'>
            Хичээлийн дүнг авахад алдаа гарлаа. Demo өгөгдөл харуулж байна.
          </p>
        </div>
      )}

      {data.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-500'>Хичээл олдсонгүй</p>
        </div>
      ) : (
        <div className='w-full max-w-5xl flex justify-between items-start gap-8'>
          {/* График хэсэг */}
          <div className='flex-1 h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={numberedData}>
                <XAxis
                  dataKey='index'
                  label={{
                    value: 'Хичээл',
                    position: 'insideBottom',
                    offset: -5,
                  }}
                  tickFormatter={value => `${value}`}
                />
                <YAxis
                  label={{ value: 'Оноо', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'оноо') return [value, 'Оноо'];
                    return value;
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                      return payload[0].payload.name;
                    }
                    return label;
                  }}
                />
                <Bar dataKey='оноо'>
                  {numberedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Легенд хэсэг */}
          <div className='w-80 flex flex-col gap-3'>
            {data.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                <div className='flex items-center gap-3 flex-1'>
                  <div
                    className='w-4 h-4 rounded-full flex-shrink-0'
                    style={{
                      backgroundColor: colors[index % colors.length],
                    }}></div>
                  <span className='text-sm text-gray-800 truncate'>
                    {item.name}
                  </span>
                </div>
                <span className='font-bold text-cyan-600 text-sm flex-shrink-0'>
                  {item.оноо}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
