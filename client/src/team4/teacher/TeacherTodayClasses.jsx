import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from './DataContext';

/**
 * Renders a simple table listing the classes scheduled for today.  If
 * there are no classes, an empty state message is displayed.  Each
 * row links to the corresponding course detail view.
 */
const TeacherTodayClasses = () => {
  const { courses } = useData();
  const todayIndex = new Date().getDay();
  // Flatten schedules with course information
  const todays = courses.flatMap(course => {
    return course.schedule
      .filter(slot => slot.day === todayIndex)
      .map(slot => ({
        courseId: course.id,
        title: course.title,
        start: slot.start,
        end: slot.end,
        colour: course.colour
      }));
  }).sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div style={{ width: '100%', background: '#ffffff', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '1rem', color: '#1E293B' }}>Өнөөдрийн хичээлүүд</h3>
      {todays.length === 0 ? (
        <p style={{ color: '#64748B', margin: '0' }}>Өнөөдөр хичээлгүй.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>Хичээл</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>Эхлэх</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>Дуусах</th>
            </tr>
          </thead>
          <tbody>
            {todays.map((cls, idx) => (
              <tr key={idx} style={{ cursor: 'pointer' }}>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>
                  <Link to={`/team4/teacher/course/${cls.courseId}`} style={{ color: cls.colour, textDecoration: 'none' }}>{cls.title}</Link>
                </td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>{cls.start}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>{cls.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherTodayClasses;