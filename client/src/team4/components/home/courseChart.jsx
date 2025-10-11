import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function CourseChart() {
  const data = [
    { name: 'Дискрет бүтэц', оноо: 80 },
    { name: 'Веб систем ба технологи', оноо: 40 },
    { name: 'Үйлдлийн систем', оноо: 95 },
    { name: 'Мобайл программчлал', оноо: 80 },
    { name: 'Компьютерийн сүлжээ', оноо: 25 },
    { name: 'Тусгай зориулалтын англи хэл', оноо: 80 },
    { name: 'Компьютерийн график', оноо: 40 },
  ];

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

  // ✨ X тэнхлэгт индекс тоо нэмэх
  const numberedData = data.map((item, index) => ({
    ...item,
    index: index + 1, // 1-ээс эхэлнэ
  }));

  return (
    <div className='flex justify-center items-center bg-white p-8'>
      <div className='w-full max-w-5xl flex justify-between items-center'>
        {/* График хэсэг */}
        <div className='w-2/3 h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={numberedData}>
              <XAxis
                dataKey='index'
                label={{
                  value: 'Хичээл',
                  position: 'insideBottom',
                  offset: -5,
                }}
                tickFormatter={value => `${value}`} // тоо хэвээр
              />
              <YAxis
                label={{ value: 'Оноо', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
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

        <div className='w-1/3 flex flex-col gap-3 ml-20'>
          {data.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <div
                className='w-6 h-6 rounded-full'
                style={{
                  backgroundColor: colors[index % colors.length],
                }}></div>
              <span className='text-gray-800 font-medium'>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
