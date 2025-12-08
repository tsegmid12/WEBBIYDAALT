import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../components/teacherComponent/TeacherHeader';
import { useData } from './DataContext';
import { generateAvatar } from './utils';

const CourseDetail = () => {
  const { id } = useParams();
  // Pull in additional helpers from the data context.  These allow us
  // to manage lessons, grades, attendance and favourites directly from
  // this view.
  const {
    getCourseById,
    students,
    groups,
    updateCourse,
    addLesson,
    deleteLesson,
    updateLesson,
    updateStudent,
    updateStudentGrade,
    updateStudentAttendance,
    updateGroup
  } = useData();
  const [activeTab, setActiveTab] = useState('lessons');
  const [expandedWeek, setExpandedWeek] = useState(null);
  const navigate = useNavigate();
  
  const course = getCourseById(id);
  
  if (!course) {
    return (
      <>
        {/* <Header active="courses" /> */}
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Course not found</h2>
        </div>
      </>
    );
  }

  const toggleFavourite = () => {
    updateCourse(id, { favourites: !course.favourites });
  };

  return (
    <>
      <style>{`
        .teacher-main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          min-height: calc(100vh - 200px);
        }
        
        .teacher-course-header {
          background: #ffffff;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: start;
        }
        
        .teacher-course-header h2 {
          margin: 0 0 0.5rem 0;
          color: #1E293B;
        }
        
        .teacher-course-header p {
          margin: 0;
          color: #64748B;
        }
        
        .teacher-icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        
        .teacher-icon-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .teacher-tabs {
          display: flex;
          gap: 1.5rem;
          border-bottom: 2px solid #E2E8F0;
          margin-bottom: 2rem;
        }
        
        .teacher-tab {
          background: none;
          border: none;
          padding: 0.75rem 0;
          font-size: 1rem;
          cursor: pointer;
          position: relative;
          color: #475569;
          transition: color 0.2s;
          font-weight: 500;
        }
        
        .teacher-tab:hover {
          color: #F97316;
        }
        
        .teacher-tab.active {
          color: #F97316;
          font-weight: 600;
        }
        
        .teacher-tab.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 3px;
          background-color: #F97316;
        }
        
        .teacher-week-card {
          border: 1px solid #E2E8F0;
          border-radius: 0.75rem;
          overflow: hidden;
          margin-bottom: 1rem;
          background: #ffffff;
        }
        
        .teacher-week-header {
          background: #F8FAFC;
          padding: 1rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s;
        }
        
        .teacher-week-header:hover {
          background: #F1F5F9;
        }
        
        .teacher-week-content {
          padding: 1rem;
          border-top: 1px solid #E2E8F0;
        }
        
        .teacher-lesson-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          border-radius: 0.5rem;
          background: #F8FAFC;
          transition: background 0.2s;
        }
        
        .teacher-lesson-item:hover {
          background: #F1F5F9;
        }
        
        .teacher-lesson-icon {
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }
        
        .teacher-lesson-title {
          flex: 1;
          font-size: 0.95rem;
          color: #334155;
        }
        
        .teacher-lesson-duration {
          font-size: 0.8rem;
          color: #94A3B8;
        }
        
        .teacher-student-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        
        .teacher-student-table th,
        .teacher-student-table td {
          padding: 0.875rem;
          text-align: left;
          border-bottom: 1px solid #E2E8F0;
        }
        
        .teacher-student-table th {
          background: #F8FAFC;
          font-weight: 600;
          color: #475569;
          font-size: 0.9rem;
        }
        
        .teacher-student-table tr {
          transition: background 0.2s;
        }
        
        .teacher-student-table tr:hover {
          background: #F8FAFC;
          cursor: pointer;
        }
        
        .teacher-student-table td {
          color: #334155;
        }
      `}</style>
      
      {/* <Header active="courses" /> */}
      
      <main className="teacher-main-container">
        <div className="teacher-course-header">
          <div>
            <h2>{course.title}</h2>
            <p>Багш: {course.teacher}</p>
          </div>
          
          <button className="teacher-icon-button" onClick={toggleFavourite}>
            {course.favourites ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF407A" stroke="#FF407A" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="teacher-tabs">
          <button className={`teacher-tab ${activeTab === 'lessons' ? 'active' : ''}`} onClick={() => setActiveTab('lessons')}>
            Хичээлүүд
          </button>
          <button className={`teacher-tab ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
            Суралцагчид
          </button>
          <button className={`teacher-tab ${activeTab === 'teams' ? 'active' : ''}`} onClick={() => setActiveTab('teams')}>
            Багууд
          </button>
        </div>
        
        {activeTab === 'lessons' && (
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#1E293B' }}>Хичээлийн агуулга</h3>
            {course.weeks.map((week, index) => (
              <div key={index} className="teacher-week-card">
                <div 
                  className="teacher-week-header"
                  onClick={() => setExpandedWeek(expandedWeek === index ? null : index)}
                >
                  <span>{week.title} ({week.lessons.length} хичээл)</span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#64748B" 
                    strokeWidth="2"
                    style={{ 
                      transform: expandedWeek === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                {expandedWeek === index && (
                  <div className="teacher-week-content">
                    {/* Render each lesson with edit/delete actions. */}
                    {week.lessons.map((lesson, lIdx) => (
                      <div key={lesson.id} className="teacher-lesson-item" style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Icon indicating the lesson type */}
                        <div className="teacher-lesson-icon">
                          {lesson.type === 'video' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          ) : lesson.type === 'assignment' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                              <path d="M8 12h8M8 16h5" />
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                              <path d="M5 4h14M5 8h14M5 12h14M5 16h14" />
                            </svg>
                          )}
                        </div>
                        {/* Lesson title and duration */}
                        <div className="teacher-lesson-title" style={{ flex: 1 }}>{lesson.title}</div>
                        <div className="teacher-lesson-duration" style={{ marginRight: '0.5rem' }}>{lesson.duration}</div>
                        {/* Edit and delete buttons */}
                        <button
                          className="teacher-icon-button"
                          onClick={() => {
                            const newTitle = prompt('Хичээлийн нэрийг засах', lesson.title);
                            if (newTitle !== null) {
                              const newDuration = prompt('Үргэлжлэх хугацааг засах', lesson.duration);
                              const newType = prompt('Төрөл (video/lecture/assignment)', lesson.type);
                              updateLesson(course.id, index, lIdx, {
                                title: newTitle || lesson.title,
                                duration: newDuration || lesson.duration,
                                type: newType || lesson.type
                              });
                            }
                          }}
                          title="Засах"
                          style={{ marginRight: '0.25rem' }}
                        >
                          {/* Pencil icon */}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
                          </svg>
                        </button>
                        <button
                          className="teacher-icon-button"
                          onClick={() => {
                            if (confirm('Та энэ хичээлийг устгахдаа итгэлтэй байна уу?')) {
                              deleteLesson(course.id, index, lIdx);
                            }
                          }}
                          title="Устгах"
                        >
                          {/* Trash icon */}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-2 14H7L5 6" />
                            <path d="M10 11v6M14 11v6M5 6l1-2h12l1 2" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {/* Button to add a new lesson to this week */}
                    <div style={{ marginTop: '0.5rem' }}>
                      <button
                        className="teacher-btn"
                        style={{ padding: '0.5rem 1rem', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}
                        onClick={() => {
                          const title = prompt('Шинэ хичээлийн нэрийг оруулна уу');
                          if (title) {
                            const duration = prompt('Үргэлжлэх хугацаа (жишээ нь: 60 мин)') || '';
                            const type = prompt('Төрөл (video/lecture/assignment)', 'lecture') || 'lecture';
                            addLesson(course.id, index, { title, duration, type });
                          }
                        }}
                      >
                        + Хичээл нэмэх
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'students' && (
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#1E293B' }}>Суралцагчид</h3>
            <table className="teacher-student-table">
              <thead>
                <tr>
                  <th>Нэр</th>
                  <th>Код</th>
                  <th>Ахиц</th>
                  <th>Ирц</th>
                  <th>Оноо</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {course.students.map((sid) => {
                  const student = students.find((s) => s.id === sid);
                  if (!student) return null;
                  // Progress percentage
                  const prog = student.progress[id] || { completed: 0, total: 0 };
                  const progressPct = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
                  // Attendance percentage
                  const att = student.attendance && student.attendance[id] ? student.attendance[id] : { attended: 0, total: 0 };
                  const attPct = att.total > 0 ? Math.round((att.attended / att.total) * 100) : 0;
                  // Grade value (0‑100)
                  const gradeVal = student.grades && student.grades[id] !== undefined ? student.grades[id] : 0;
                  return (
                    <tr key={sid} style={{ cursor: 'pointer' }} onClick={() => navigate(`/team4/teacher/student/${sid}`)}>
                      <td>{student.name}</td>
                      <td>{student.code}</td>
                      <td>{progressPct}%</td>
                      <td>
                        <div style={{ width: '100px', background: '#E5E7EB', borderRadius: '4px', height: '6px', position: 'relative' }}>
                          <div style={{ width: `${attPct}%`, background: '#34D399', height: '100%', borderRadius: '4px' }} />
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{att.attended}/{att.total} ({attPct}%)</div>
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradeVal}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 0 && val <= 100) {
                              updateStudentGrade(sid, id, val);
                            }
                          }}
                          style={{ width: '60px', padding: '0.25rem', border: '1px solid #E2E8F0', borderRadius: '0.25rem', fontSize: '0.85rem' }}
                        />
                        <div style={{ width: '100px', background: '#E5E7EB', borderRadius: '4px', height: '6px', marginTop: '4px', position: 'relative' }}>
                          <div style={{ width: `${gradeVal}%`, background: '#60A5FA', height: '100%', borderRadius: '4px' }} />
                        </div>
                      </td>
                      <td>
                        <button
                          className="teacher-icon-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStudent(sid, { favourites: !student.favourites });
                          }}
                          title={student.favourites ? 'Таалагдсаныг болиулах' : 'Таалагдсан болгох'}
                        >
                          {student.favourites ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF407A" stroke="#FF407A" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'teams' && (
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#1E293B' }}>Багууд</h3>
            {(() => {
              const courseGroups = groups.filter((g) => g.courseId === course.id);
              if (courseGroups.length === 0) {
                return <p style={{ color: '#64748B' }}>Энэ хичээлд багууд байхгүй байна.</p>;
              }
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: '1rem' }}>
                  {courseGroups.map((group) => {
                    // Compute average grade for the team
                    const grades = group.grades ? Object.values(group.grades) : [];
                    const avg = grades.length ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length) : 0;
                    return (
                      <div
                        key={group.id}
                        className="teacher-team-card"
                        style={{ background: course.colour + '20', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '1rem', cursor: 'pointer', position: 'relative' }}
                        onClick={() => navigate(`/team4/teacher/group/${group.id}`)}
                      >
                        <div className="teacher-badge" style={{ background: course.colour, color: '#fff', borderRadius: '0.5rem', padding: '0.25rem 0.5rem', display: 'inline-block', fontWeight: 600, marginBottom: '0.5rem' }}>{group.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.25rem' }}>Гишүүд: {group.members.length}</div>
                        <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.25rem' }}>Даалгавар: {group.assignments ? group.assignments.length : 0}</div>
                        <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.25rem' }}>Лаб: {group.labs ? group.labs.length : 0}</div>
                        <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>Гүйцэтгэл: {avg}%</div>
                        {/* Favourite toggle */}
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
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </main>
      
      {/* <Footer /> */}
    </>
  );
};

export default CourseDetail;
