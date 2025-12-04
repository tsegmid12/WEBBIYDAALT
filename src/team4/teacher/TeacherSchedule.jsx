import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from './DataContext';

/**
 * Weekly schedule component for the teacher dashboard.  It renders a
 * grid from 8:00 to 18:30 in 30‑minute increments, and places each
 * course at its scheduled times.  Courses are coloured using their
 * course colour and are clickable to open the course detail view.
 */
const TeacherSchedule = () => {
  const { courses } = useData();

  // Build an array of schedule entries for the first three courses
  const scheduleEntries = courses.slice(0, 3).flatMap(course => {
    return course.schedule.map(s => ({
      day: s.day,
      startTime: s.start,
      endTime: s.end,
      subject: course.title,
      colour: course.colour,
      url: `/team4/teacher/course/${course.id}`
    }));
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Convert HH:MM to minutes for placement
  const timeToMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  return (
    <div style={{ width: '100%', background: '#ffffff', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '1rem', color: '#1E293B', textAlign: 'center' }}>Хуваарь</h3>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '800px', display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', border: '1px solid #E2E8F0', fontSize: '0.8rem' }}>
          {/* Header row */}
          <div style={{ borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '0.5rem', background: '#F8FAFC', fontWeight: 600 }}>Цаг</div>
          {days.map(d => (
            <div key={d} style={{ borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '0.5rem', textAlign: 'center', background: '#F8FAFC', fontWeight: 600 }}>{d}</div>
          ))}
          {/* Time slots */}
          {Array.from({ length: 22 }).map((_, rowIndex) => {
            const hour = 8 + Math.floor(rowIndex / 2);
            const minute = rowIndex % 2 === 0 ? '00' : '30';
            const timeLabel = `${hour}:${minute}`;
            const slotStart = timeToMinutes(timeLabel);
            const slotEnd = slotStart + 30;
            return (
              <React.Fragment key={`row-${rowIndex}`}> 
                {/* Time column */}
                <div style={{ borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '0.5rem', background: '#F9FAFB' }}>{timeLabel}</div>
                {/* Day columns */}
                {days.map((d, dayIndex) => {
                  // Find classes overlapping this slot
                  const matches = scheduleEntries.filter(cls => {
                    if (cls.day !== dayIndex) return false;
                    const clsStart = timeToMinutes(cls.startTime);
                    const clsEnd = timeToMinutes(cls.endTime);
                    return clsStart < slotEnd && clsEnd > slotStart;
                  });
                  return (
                    <div key={`${d}-${rowIndex}`} style={{ position: 'relative', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', height: '40px' }}>
                      {matches.map((cls, idx) => {
                        const clsStart = timeToMinutes(cls.startTime);
                        const clsEnd = timeToMinutes(cls.endTime);
                        const startsInSlot = clsStart >= slotStart && clsStart < slotEnd;
                        if (!startsInSlot) return null;
                        const duration = clsEnd - clsStart;
                        const barHeight = (duration / 30) * 40;
                        const offset = ((clsStart - slotStart) / 30) * 40;
                        return (
                          <Link to={cls.url} key={idx} style={{ textDecoration: 'none' }}>
                            <div
                              style={{
                                position: 'absolute',
                                left: '4px',
                                right: '4px',
                                top: `${offset + 4}px`,
                                height: `${barHeight - 8}px`,
                                background: cls.colour,
                                borderRadius: '0.25rem',
                                color: '#ffffff',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                            >
                              <div style={{ fontWeight: 600, textAlign: 'center' }}>{cls.subject}</div>
                              <div style={{ fontSize: '0.6rem', opacity: 0.9 }}>{cls.startTime} – {cls.endTime}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherSchedule;