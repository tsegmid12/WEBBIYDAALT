import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useData } from './DataContext';

/**
 * Bar chart representing team performance as a percentage.  The
 * performance for each group is calculated by dividing the number of
 * completed assignments and labs by the total number of tasks.  If a
 * group has no tasks, it defaults to 100% completion.  Colours are
 * derived from the course colour of the group.
 */
const TeacherBarChart = () => {
  const { groups, getCourseById } = useData();
  // Prepare data for the first few groups only to keep the chart
  // readable.  Each entry includes a name and a percentage value.
  const chartData = groups.slice(0, 6).map((group, idx) => {
    const course = getCourseById(group.courseId);
    const totalTasks = (group.assignments?.length || 0) + (group.labs?.length || 0);
    const completedTasks = [...(group.assignments || []), ...(group.labs || [])].filter(t => t.complete).length;
    const percent = totalTasks === 0 ? 100 : Math.round((completedTasks / totalTasks) * 100);
    return {
      name: group.name,
      percent,
      colour: course?.colour || '#60A5FA'
    };
  });

  return (
    <div style={{ width: '100%', background: '#ffffff', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '1rem', color: '#1E293B', textAlign: 'center' }}>Багуудын гүйцэтгэл</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(value) => [`${value}%`, 'Гүйцэтгэл']} />
          <Bar dataKey="percent" barSize={30} isAnimationActive>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.colour} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeacherBarChart;