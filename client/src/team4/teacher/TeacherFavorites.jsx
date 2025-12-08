import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/teacherComponent/TeacherHeader';
import { useData } from './DataContext';

const Favorites = () => {
  const { courses, students, groups, getCourseById, updateCourse, updateStudent, updateGroup } = useData();
  const navigate = useNavigate();

  const favCourses = courses.filter(c => c.favourites);
  const favStudents = students.filter(s => s.favourites);
  const favGroups = groups.filter(g => g.favourites);

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
        
        .teacher-fav-section {
          margin-bottom: 3rem;
        }
        
        .teacher-fav-section h3 {
          margin-bottom: 1rem;
          color: #334155;
        }
        
        .teacher-fav-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }
        
        .teacher-fav-card {
          background: #ffffff;
          border-radius: 0.75rem;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border: 1px solid #E2E8F0;
          transition: box-shadow 0.2s;
        }
        
        .teacher-fav-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .teacher-fav-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1E293B;
          font-size: 1rem;
        }
        
        .teacher-fav-subtitle {
          font-size: 0.9rem;
          color: #64748B;
          margin-bottom: 1rem;
        }
        
        .teacher-fav-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .teacher-btn {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
          flex: 1;
        }
        
        .teacher-btn-primary {
          background: #2563EB;
          color: #ffffff;
        }
        
        .teacher-btn-primary:hover {
          background: #1D4ED8;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
        }
        
        .teacher-btn-secondary {
          background: #F3F4F6;
          color: #374151;
        }
        
        .teacher-btn-secondary:hover {
          background: #E5E7EB;
        }
      `}</style>
      
      {/* <Header active="" /> */}
      
      <main className="teacher-main-container">
        <h2>Таалагдсан зүйлс</h2>
        
        <div className="teacher-fav-section">
          <h3>Хичээлүүд</h3>
          {favCourses.length === 0 ? (
            <p style={{ color: '#64748B' }}>Таалагдсан хичээл алга</p>
          ) : (
            <div className="teacher-fav-list">
              {favCourses.map(course => (
                <div key={course.id} className="teacher-fav-card">
                  <div className="teacher-fav-title">{course.title}</div>
                  <div className="teacher-fav-subtitle">
                    Нийт {course.students.length} сурагч
                  </div>
                  <div className="teacher-fav-actions">
                    <button
                      className="teacher-btn teacher-btn-secondary"
                      onClick={() => updateCourse(course.id, { favourites: false })}
                    >
                      Устгах
                    </button>
                    <button
                      className="teacher-btn teacher-btn-primary"
                      /* Link directly to the course detail under the teacher
                         routes.  An absolute path ensures the router
                         resolves correctly regardless of the base URL. */
                      onClick={() => navigate(`/team4/teacher/course/${course.id}`)}
                    >
                      Нээх
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="teacher-fav-section">
          <h3>Суралцагчид</h3>
          {favStudents.length === 0 ? (
            <p style={{ color: '#64748B' }}>Таалагдсан суралцагч алга</p>
          ) : (
            <div className="teacher-fav-list">
              {favStudents.map(student => (
                <div key={student.id} className="teacher-fav-card">
                  <div className="teacher-fav-title">{student.name}</div>
                  <div className="teacher-fav-subtitle">{student.code}</div>
                  <div className="teacher-fav-actions">
                    <button
                      className="teacher-btn teacher-btn-secondary"
                      onClick={() => updateStudent(student.id, { favourites: false })}
                    >
                      Устгах
                    </button>
                    <button
                      className="teacher-btn teacher-btn-primary"
                      /* Link to the student detail view under the teacher
                         routes. */
                      onClick={() => navigate(`/team4/teacher/student/${student.id}`)}
                    >
                      Нээх
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="teacher-fav-section">
          <h3>Багууд</h3>
          {favGroups.length === 0 ? (
            <p style={{ color: '#64748B' }}>Таалагдсан баг алга</p>
          ) : (
            <div className="teacher-fav-list">
              {favGroups.map(group => {
                const course = getCourseById(group.courseId);
                return (
                  <div key={group.id} className="teacher-fav-card">
                    <div className="teacher-fav-title">{group.name}</div>
                    <div className="teacher-fav-subtitle">
                      {course ? course.title : ''}
                    </div>
                    <div className="teacher-fav-actions">
                      <button
                        className="teacher-btn teacher-btn-secondary"
                        onClick={() => updateGroup(group.id, { favourites: false })}
                      >
                        Устгах
                      </button>
                      <button
                        className="teacher-btn teacher-btn-primary"
                        /* Link to the group detail view under the teacher
                           routes. */
                        onClick={() => navigate(`/team4/teacher/group/${group.id}`)}
                      >
                        Нээх
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Favorites;
