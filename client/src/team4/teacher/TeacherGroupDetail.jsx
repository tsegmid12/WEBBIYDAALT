import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import Header from '../components/teacherComponent/TeacherHeader';
import { useData } from './DataContext';
import { generateAvatar } from './utils';

const GroupDetail = () => {
  const { id } = useParams();
  const {
    getGroupById,
    getCourseById,
    students,
    updateGroupMembers,
    updateGroupGrades,
    updateGroup,
    updateStudent
  } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [memberToAdd, setMemberToAdd] = useState('');
  
  const group = getGroupById(id);
  const course = group ? getCourseById(group.courseId) : null;
  
  if (!group || !course) {
    return (
      <>
        {/* <Header active="groups" /> */}
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Group not found</h2>
        </div>
      </>
    );
  }

  // Toggle favourite status for this group
  const toggleFavourite = () => {
    updateGroup(group.id, { favourites: !group.favourites });
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
        
        .teacher-group-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: #ffffff;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-top: 1rem;
        }
        
        .teacher-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .teacher-group-stats {
          display: flex;
          gap: 1rem;
        }
        
        .teacher-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #F8FAFC;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          min-width: 5rem;
        }
        
        .teacher-stat strong {
          font-size: 1.5rem;
          color: #1E293B;
        }
        
        .teacher-stat span {
          font-size: 0.75rem;
          color: #64748B;
        }
        
        .teacher-tabs {
          display: flex;
          gap: 1.5rem;
          border-bottom: 2px solid #E2E8F0;
          margin-top: 1.5rem;
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
          font-weight: 500;
        }
        
        .teacher-tab.active {
          color: #0EA5E9;
          font-weight: 600;
        }
        
        .teacher-tab.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 3px;
          background: #0EA5E9;
        }
        
        .teacher-members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }
        
        .teacher-member-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          border: 1px solid #E2E8F0;
          border-radius: 0.75rem;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        
        .teacher-student-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin-bottom: 0.75rem;
          border: 2px solid #E2E8F0;
        }
        
        .teacher-student-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #334155;
          text-align: center;
        }
        
        .teacher-student-code {
          font-size: 0.8rem;
          color: #94A3B8;
        }
        
        .teacher-task-item {
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          border-radius: 0.5rem;
          background: #F8FAFC;
          border-left: 3px solid #CBD5E1;
        }
        
        .teacher-task-title {
          font-weight: 500;
          color: #334155;
          margin-bottom: 0.25rem;
        }
        
        .teacher-task-date {
          font-size: 0.85rem;
          color: #94A3B8;
        }
      `}</style>
      
      {/* <Header active="groups" /> */}
      
      <main className="teacher-main-container">
        <div className="teacher-group-header" style={{ background: group.colour + '15' }}>
          <div>
            <div className="teacher-badge" style={{ background: group.colour }}>
              {group.name}
            </div>
            <div style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '0.25rem' }}>{course.title}</div>
            <div style={{ color: '#64748B', fontSize: '0.9rem' }}>Багш: {course.teacher}</div>
          </div>
          
          <div className="teacher-group-stats" style={{ position: 'relative' }}>
            {/* Favourite toggle */}
            <button
              className="teacher-icon-button"
              onClick={toggleFavourite}
              title={group.favourites ? 'Таалагдсаныг болиулах' : 'Таалагдсан болгох'}
              style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem' }}
            >
              {group.favourites ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF407A" stroke="#FF407A" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              )}
            </button>
            <div className="teacher-stat">
              <strong>{group.members.length}</strong>
              <span>Гишүүд</span>
            </div>
            <div className="teacher-stat">
              <strong>{group.labs.length}</strong>
              <span>Лаборатори</span>
            </div>
            <div className="teacher-stat">
              <strong>{group.assignments.length}</strong>
              <span>Даалгавар</span>
            </div>
          </div>
        </div>
        
        <div className="teacher-tabs">
          <button className={`teacher-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            Даалгавар
          </button>
          <button className={`teacher-tab ${activeTab === 'labs' ? 'active' : ''}`} onClick={() => setActiveTab('labs')}>
            Лаборатори
          </button>
          <button className={`teacher-tab ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>
            Бие даалт
          </button>
          <button className={`teacher-tab ${activeTab === 'members' ? 'active' : ''}`} onClick={() => setActiveTab('members')}>
            Гишүүд
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div>
            <p style={{ color: '#64748B' }}>Энд бүлгийн үндсэн тайлбар, зорилго болон бусад мэдээлэл байрлана.</p>
          </div>
        )}
        
        {activeTab === 'labs' && (
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#1E293B' }}>Лаборатори</h4>
            {group.labs.length === 0 ? (
              <p style={{ color: '#64748B' }}>Лабораторийн ажил байхгүй.</p>
            ) : (
              group.labs.map(lab => (
                <div key={lab.id} className="teacher-task-item">
                  <div className="teacher-task-title">{lab.title}</div>
                  <div className="teacher-task-date">{lab.date}</div>
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === 'assignments' && (
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#1E293B' }}>Бие даалт</h4>
            {group.assignments.length === 0 ? (
              <p style={{ color: '#64748B' }}>Бие даалтын ажил байхгүй.</p>
            ) : (
              group.assignments.map(a => (
                <div key={a.id} className="teacher-task-item">
                  <div className="teacher-task-title">{a.title}</div>
                  <div className="teacher-task-date">{a.date}</div>
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === 'members' && (
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#1E293B' }}>Гишүүд</h4>
            {/* Members table with grade editing and remove option */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>Нэр</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>Код</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>Оноо</th>
                  <th style={{ padding: '0.5rem', borderBottom: '1px solid #E2E8F0' }}></th>
                </tr>
              </thead>
              <tbody>
                {group.members.map((sid) => {
                  const student = students.find((s) => s.id === sid);
                  if (!student) return null;
                  const gradeVal = group.grades && group.grades[sid] !== undefined ? group.grades[sid] : 0;
                  return (
                    <tr key={sid} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.5rem' }}>{student.name}</td>
                      <td style={{ padding: '0.5rem' }}>{student.code}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradeVal}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 0 && val <= 100) {
                              const newGrades = { ...(group.grades || {}) };
                              newGrades[sid] = val;
                              updateGroupGrades(group.id, newGrades);
                            }
                          }}
                          style={{ width: '60px', padding: '0.25rem', border: '1px solid #E2E8F0', borderRadius: '0.25rem', fontSize: '0.85rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <button
                          className="teacher-icon-button"
                          onClick={() => {
                            // Remove this member from the group
                            const newMembers = group.members.filter((m) => m !== sid);
                            const newGrades = { ...(group.grades || {}) };
                            delete newGrades[sid];
                            updateGroupMembers(group.id, newMembers);
                            updateGroupGrades(group.id, newGrades);
                          }}
                          title="Гишүүнийг хасах"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Section to add a new member */}
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <select
                value={memberToAdd}
                onChange={(e) => setMemberToAdd(e.target.value)}
                style={{ flex: 1, padding: '0.5rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}
              >
                <option value="">-- Гишүүн сонгох --</option>
                {students
                  .filter((s) => !group.members.includes(s.id))
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
              </select>
              <button
                className="teacher-btn teacher-btn-primary"
                onClick={() => {
                  if (memberToAdd) {
                    const newMembers = [...group.members, memberToAdd];
                    // Add a default grade of 0 for the new member
                    const newGrades = { ...(group.grades || {}) };
                    newGrades[memberToAdd] = 0;
                    updateGroupMembers(group.id, newMembers);
                    updateGroupGrades(group.id, newGrades);
                    setMemberToAdd('');
                  }
                }}
              >
                Нэмэх
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* <Footer /> */}
    </>
  );
};

export default GroupDetail;
