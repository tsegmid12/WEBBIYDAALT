import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../components/teacherComponent/TeacherHeader';
import { useData } from './DataContext';
import { generateAvatar } from './utils';

const StudentDetail = () => {
  const { id } = useParams();
  const {
    getStudentById,
    courses,
    updateStudent,
    updateStudentGrade,
    updateStudentAttendance
  } = useData();
  const navigate = useNavigate();
  
  const student = getStudentById(id);
  
  if (!student) {
    return (
      <>
        {/* <Header active="" /> */}
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Student not found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .teacher-main-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 1rem;
          min-height: calc(100vh - 200px);
        }
        
        .teacher-back-btn {
          padding: 0.5rem 1rem;
          background: #F3F4F6;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: #374151;
          margin-bottom: 1.5rem;
          transition: background 0.2s;
        }
        
        .teacher-back-btn:hover {
          background: #E5E7EB;
        }
        
        .teacher-student-detail-card {
          background: #ffffff;
          border-radius: 0.75rem;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border: 1px solid #E2E8F0;
          text-align: center;
        }
        
        .teacher-profile-large-avatar {
          width: 6rem;
          height: 6rem;
          border-radius: 9999px;
          border: 3px solid #E2E8F0;
          margin: 0 auto 1rem;
        }
        
        .teacher-student-detail-card h2 {
          margin: 0 0 0.5rem 0;
          color: #1E293B;
          font-size: 1.75rem;
        }
        
        .teacher-student-detail-card p {
          margin: 0.25rem 0;
          color: #64748B;
          font-size: 0.95rem;
        }
        
        .teacher-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
          text-align: left;
        }
        
        .teacher-info-item {
          padding: 0.75rem;
          background: #F8FAFC;
          border-radius: 0.5rem;
        }
        
        .teacher-info-label {
          font-size: 0.8rem;
          color: #94A3B8;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        .teacher-info-value {
          font-size: 0.95rem;
          color: #334155;
          font-weight: 600;
        }
        
        .teacher-courses-section {
          margin-top: 2rem;
        }
        
        .teacher-courses-section h3 {
          margin-bottom: 1rem;
          color: #1E293B;
        }
        
        .teacher-course-progress-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem;
          background: #F8FAFC;
          border-radius: 0.5rem;
          margin-bottom: 0.75rem;
        }
        
        .teacher-course-name {
          flex: 0 0 200px;
          font-weight: 500;
          color: #334155;
        }
        
        .teacher-progress-bar-container {
          flex: 1;
          height: 8px;
          background: #E2E8F0;
          border-radius: 9999px;
          overflow: hidden;
        }
        
        .teacher-progress-bar-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.3s;
        }
        
        .teacher-progress-value {
          flex: 0 0 60px;
          text-align: right;
          font-weight: 600;
          color: #334155;
        }
      `}</style>
      
      {/* <Header active="" /> */}
      
      <main className="teacher-main-container">
        <button className="teacher-back-btn" onClick={() => navigate(-1)}>
          ← Буцах
        </button>
        
        <div className="teacher-student-detail-card">
          <img
            src={generateAvatar(
              student.name.split(' ').map(n => n.charAt(0)).join(''),
              student.avatarColor
            )}
            alt={student.name}
            className="teacher-profile-large-avatar"
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <h2 style={{ margin: 0 }}>{student.name}</h2>
            <button
              className="teacher-icon-button"
              onClick={(e) => {
                e.stopPropagation();
                updateStudent(student.id, { favourites: !student.favourites });
              }}
              title={student.favourites ? 'Таалагдсаныг болиулах' : 'Таалагдсан болгох'}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {student.favourites ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF407A" stroke="#FF407A" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              )}
            </button>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1rem', fontWeight: 500 }}>{student.code}</p>
          
          <div className="teacher-info-grid">
            <div className="teacher-info-item">
              <div className="teacher-info-label">Имэйл</div>
              <div className="teacher-info-value">{student.email}</div>
            </div>
            <div className="teacher-info-item">
              <div className="teacher-info-label">Утас</div>
              <div className="teacher-info-value">{student.phone}</div>
            </div>
            <div className="teacher-info-item">
              <div className="teacher-info-label">Хаяг</div>
              <div className="teacher-info-value">{student.address}</div>
            </div>
          </div>
          
          <div className="teacher-courses-section">
            <h3>Суралцаж буй хичээлүүд</h3>
            {courses
              .filter(course => course.students.includes(student.id))
              .map(course => {
                const prog = student.progress[course.id] || { completed: 0, total: 0 };
                const pct = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
                const att = student.attendance && student.attendance[course.id] ? student.attendance[course.id] : { attended: 0, total: 0 };
                const attPct = att.total > 0 ? Math.round((att.attended / att.total) * 100) : 0;
                const gradeVal = student.grades && student.grades[course.id] !== undefined ? student.grades[course.id] : 0;
                return (
                  <div
                    key={course.id}
                    className="teacher-course-progress-row"
                    style={{ flexWrap: 'wrap', alignItems: 'flex-start' }}
                  >
                    <div className="teacher-course-name" style={{ flex: '0 0 200px' }}>{course.title}</div>
                    {/* Progress */}
                    <div style={{ flex: '1 1 150px', marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.25rem' }}>Ахиц</div>
                      <div className="teacher-progress-bar-container">
                        <div
                          className="teacher-progress-bar-fill"
                          style={{ width: `${pct}%`, background: course.colour }}
                        />
                      </div>
                      <div className="teacher-progress-value">{pct}%</div>
                    </div>
                    {/* Attendance */}
                    <div style={{ flex: '1 1 150px', marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.25rem' }}>Ирц</div>
                      <div style={{ width: '100%', background: '#E5E7EB', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${attPct}%`, background: '#34D399', height: '100%', borderRadius: '4px' }} />
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{att.attended}/{att.total} ({attPct}%)</div>
                    </div>
                    {/* Grade */}
                    <div style={{ flex: '1 1 150px', marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.25rem' }}>Оноо</div>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={gradeVal}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val) && val >= 0 && val <= 100) {
                            updateStudentGrade(student.id, course.id, val);
                          }
                        }}
                        style={{ width: '60px', padding: '0.25rem', border: '1px solid #E2E8F0', borderRadius: '0.25rem', fontSize: '0.85rem' }}
                      />
                      <div style={{ width: '100%', background: '#E5E7EB', borderRadius: '4px', height: '6px', marginTop: '0.25rem', overflow: 'hidden' }}>
                        <div style={{ width: `${gradeVal}%`, background: '#60A5FA', height: '100%' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
      
      {/* Footer is intentionally omitted */}
    </>
  );
};

export default StudentDetail;
