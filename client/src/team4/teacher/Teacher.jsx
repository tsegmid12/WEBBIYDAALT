import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/teacherComponent/TeacherHeader';
import { useData } from './DataContext';

const Groups = () => {
  const { courses, groups, updateGroup } = useData();
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .teacher-main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          min-height: calc(100vh - 200px);
        }
        
        .teacher-main-container h2 {
          margin: 1rem 0;
          font-size: 1.75rem;
          color: #1E293B;
        }
        
        .teacher-groups-course-box {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 0.75rem;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #E2E8F0;
        }
        
        .teacher-groups-course-header h3 {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
        }
        
        .teacher-group-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        
        .teacher-team-card {
          border-radius: 0.75rem;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(0,0,0,0.05);
        }
        
        .teacher-team-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .teacher-badge {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }
        
        .teacher-team-info {
          font-size: 0.9rem;
          color: #475569;
        }
        
        .teacher-team-info > div {
          margin-bottom: 0.375rem;
        }
      `}</style>
      
      {/* <Header active="groups" /> */}
      
      <main className="teacher-main-container">
        <h2>  </h2>
        
        {courses.map(course => {
          const courseGroups = groups.filter(g => g.courseId === course.id);
          
          return (
            <div key={course.id} className="teacher-groups-course-box">
              <div className="teacher-groups-course-header">
                <h3 style={{ color: course.colour }}>{course.title}</h3>
              </div>
              
              <div className="teacher-group-list">
                {courseGroups.length === 0 ? (
                  <p style={{ color: '#64748B' }}>Баг алга.</p>
                ) : (
                  courseGroups.map(group => {
                    // Compute average grade for group performance
                    const grades = group.grades ? Object.values(group.grades) : [];
                    const avg = grades.length ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length) : 0;
                    return (
                      <div
                        key={group.id}
                        className="teacher-team-card"
                        style={{ background: course.colour + '20', position: 'relative' }}
                        onClick={() => navigate(`/team4/teacher/group/${group.id}`)}
                      >
                        <div className="teacher-badge" style={{ background: course.colour }}>
                          {group.name}
                        </div>
                        <div className="teacher-team-info">
                          <div>Гишүүд: {group.members.length}</div>
                          {group.assignments && group.assignments.length > 0 && (
                            <div>Даалгавар: {group.assignments.length}</div>
                          )}
                          {group.labs && group.labs.length > 0 && (
                            <div>Лаб: {group.labs.length}</div>
                          )}
                          <div>Гүйцэтгэл: {avg}%</div>
                        </div>
                        {/* Favourite toggle for team */}
                        <button
                          className="teacher-icon-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateGroup(group.id, { favourites: !group.favourites });
                          }}
                          title={group.favourites ? 'Таалагдсаныг болиулах' : 'Таалагдсан болгох'}
                          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                        >
                          {group.favourites ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF407A" stroke="#FF407A" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </main>
      
    
    </>
  );
};

export default Groups;
