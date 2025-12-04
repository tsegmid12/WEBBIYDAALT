import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useData } from './DataContext';

/**
 * Pie chart displaying the distribution of students across the
 * teacher's first three classes.  Each slice corresponds to a
 * course and is coloured using the course's colour property.  The
 * chart animates on mount and includes a legend for clarity.
 */
const TeacherPieChart = () => {
  const { courses } = useData();
  // Use only the first three classes for the dashboard as requested.
  const chartData = courses.slice(0, 3).map(course => ({
    name: course.title,
    value: course.students.length,
    colour: course.colour
  }));

  return (
    <div style={{ width: '100%', background: '#ffffff', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '1rem', color: '#1E293B', textAlign: 'center' }}>Ангиудын сурагчдын хуваарилалт</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '60%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
                isAnimationActive
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.colour || '#60A5FA'} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} сурагч`, 'Нийт']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: '40%', paddingLeft: '1rem' }}>
          {chartData.map((entry, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: entry.colour, display: 'inline-block', marginRight: '8px' }} />
              <span style={{ color: '#334155', fontSize: '0.95rem' }}>{entry.name} — {entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherPieChart;