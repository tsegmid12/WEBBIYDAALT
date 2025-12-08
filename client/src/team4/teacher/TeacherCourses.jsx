import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/teacherComponent/TeacherHeader';
import { useData } from './DataContext';

const Courses = () => {
  const { courses, updateCourse } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavourite = (e, courseId) => {
    e.stopPropagation();
    const course = courses.find(c => c.id === courseId);
    updateCourse(courseId, { favourites: !course.favourites });
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
        
        .teacher-main-container h2 {
          margin: 1rem 0;
          font-size: 1.75rem;
          color: #1E293B;
        }
        
        .teacher-course-search {
          margin: 1.5rem 0;
        }
        
        .teacher-course-search input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #E2E8F0;
          border-radius: 0.5rem;
          font-size: 1rem;
        }
        
        .teacher-course-search input:focus {
          outline: none;
          border-color: #0EA5E9;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.1);
        }
        
        .teacher-courses-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .teacher-course-card {
          cursor: pointer;
          border-radius: 0.75rem;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #E2E8F0;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
        }
        
        .teacher-course-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.08);
          border-color: #CBD5E1;
        }
        
        .teacher-course-img {
          width: 80px;
          height: 60px;
          border-radius: 0.5rem;
          flex-shrink: 0;
          object-fit: cover;
        }
        
        .teacher-course-info {
          flex: 1;
        }
        
        .teacher-course-info h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          color: #1E293B;
          font-weight: 600;
        }
        
        .teacher-course-info p {
          margin: 0;
          font-size: 0.85rem;
          color: #64748B;
        }
        
        .teacher-course-info .tiny {
          font-size: 0.75rem;
          color: #94A3B8;
        }
        
        .teacher-icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.375rem;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .teacher-icon-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `}</style>
      
      {/* <Header active="courses" /> */}
      
      <main className="teacher-main-container">
        <h2>Хичээлүүд</h2>
        
        <div className="teacher-course-search">
          <input
            type="text"
            placeholder="Хичээл хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="teacher-courses-list">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="teacher-course-card"
              onClick={() => navigate(`/team4/teacher/course/${course.id}`)}
            >
              {course.image ? (
                <img src={course.image} alt={course.title} className="teacher-course-img" />
              ) : (
                <div className="teacher-course-img" style={{ background: course.colour }} />
              )}
              
              <div className="teacher-course-info">
                <h4>{course.title}</h4>
                <p>{course.teacher}</p>
                <p className="tiny">Нийт {course.students.length} сурагч</p>
              </div>
              
              <button
                className="teacher-icon-button"
                onClick={(e) => toggleFavourite(e, course.id)}
              >
                {course.favourites ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF407A" stroke="#FF407A" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </main>
      
      {/* <Footer /> */}
    </>
  );
};

export default Courses;
