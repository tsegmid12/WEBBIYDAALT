import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/teacherComponent/TeacherHeader';
import { useData } from './DataContext';
import { generateAvatar } from './utils';

// Dashboard visualisation components
import TeacherPieChart from './TeacherPieChart.jsx';
import TeacherBarChart from './TeacherBarChart.jsx';
import TeacherSchedule from './TeacherSchedule.jsx';
import TeacherTodayClasses from './TeacherTodayClasses.jsx';

const Home = () => {
  const {
    profile,
    setProfile,
    courses,
    students,
    groups,
    updateStudent
  } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [nickname, setNickname] = useState(profile.nick || '');

  // State for editing other profile fields.  Initialise from the
  // existing profile so that the form fields are pre‑populated.
  const [editName, setEditName] = useState(profile.name);
  const [editInstitution, setEditInstitution] = useState(profile.institution);
  const [editDepartment, setEditDepartment] = useState(profile.department);
  const navigate = useNavigate();

  const teacherCourses = courses.slice(0, 3);
  const totalStudents = students.length;
  const totalTeams = groups.length;

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === 'all' ||
                         courses.find(c => c.id === courseFilter && c.students.includes(student.id));
    return matchesSearch && matchesCourse;
  });

  const handleSaveNickname = () => {
    setProfile({ ...profile, nick: nickname || profile.name });
    alert('Нэр амжилттай хадгалагдлаа');
  };

  const handleSaveProfile = () => {
    setProfile({
      ...profile,
      name: editName || profile.name,
      nick: nickname || profile.nick || profile.name,
      institution: editInstitution || profile.institution,
      department: editDepartment || profile.department
    });
    alert('Профайл амжилттай хадгалагдлаа');
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
        
        .teacher-profile-card {
          background: #ffffff;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .teacher-profile-large-avatar {
          width: 4rem;
          height: 4rem;
          border-radius: 9999px;
          border: 3px solid #E2E8F0;
        }
        
        .teacher-profile-info h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          color: #1E293B;
        }
        
        .teacher-profile-info p {
          margin: 0;
          color: #64748B;
          font-size: 0.95rem;
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
          border-radius: 2px;
        }
        
        .teacher-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .teacher-kpi-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        
        .teacher-kpi-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .teacher-kpi-content {
          flex: 1;
        }
        
        .teacher-kpi-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1E293B;
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        
        .teacher-kpi-label {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.2;
        }
        
        .teacher-card {
          background: #ffffff;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
        
        .teacher-card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          color: #1E293B;
        }
        
        .teacher-student-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        
        .teacher-student-filters input,
        .teacher-student-filters select {
          flex: 1;
          min-width: 200px;
          padding: 0.625rem 1rem;
          border: 1px solid #E2E8F0;
          border-radius: 0.5rem;
          font-size: 0.95rem;
        }
        
        .teacher-student-filters input:focus,
        .teacher-student-filters select:focus {
          outline: none;
          border-color: #0EA5E9;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.1);
        }
        
        .teacher-students-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        
        .teacher-student-card {
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.875rem;
          border-radius: 0.75rem;
          border: 1px solid #E2E8F0;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .teacher-student-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border-color: #CBD5E1;
        }
        
        .teacher-avatar {
          width: 3rem;
          height: 3rem;
          border-radius: 9999px;
          border: 2px solid #F1F5F9;
        }
        
        .teacher-student-info {
          flex: 1;
        }
        
        .teacher-student-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #1E293B;
          font-size: 0.95rem;
        }
        
        .teacher-student-code {
          font-size: 0.8rem;
          color: #94A3B8;
        }
        
        .teacher-student-actions {
          display: flex;
          align-items: center;
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
        
        .teacher-settings-section {
          max-width: 600px;
        }
        
        .teacher-settings-row {
          margin-bottom: 1.5rem;
        }
        
        .teacher-settings-row label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #334155;
        }
        
        .teacher-settings-row input {
          width: 100%;
          padding: 0.625rem 1rem;
          border: 1px solid #E2E8F0;
          border-radius: 0.5rem;
          font-size: 0.95rem;
        }
        
        .teacher-settings-row input:focus {
          outline: none;
          border-color: #0EA5E9;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.1);
        }
        
        .teacher-btn {
          padding: 0.625rem 1.25rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .teacher-btn-primary {
          background: #2563EB;
          color: #ffffff;
        }
        
        .teacher-btn-primary:hover {
          background: #1D4ED8;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
        }
        
        .teacher-empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #64748B;
        }
      `}</style>
      
     
      
      <main className="teacher-main-container">
        <div className="teacher-profile-card">
          <img
            src={generateAvatar(
              profile.name.split(' ').map(s => s.charAt(0)).join(''),
              profile.avatarColor
            )}
            alt="teacher"
            className="teacher-profile-large-avatar"
          />
          <div className="teacher-profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.institution}, {profile.department}</p>
          </div>
        </div>
        
        <div className="teacher-tabs">
          <button
            className={`teacher-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`teacher-tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Суралцагчид
          </button>
          <button
            className={`teacher-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        {activeTab === 'dashboard' && (
          <div>
            {/* KPI statistics */}
            <div className="teacher-kpi-grid">
              <div className="teacher-kpi-card" style={{ background: '#F4E2FF' }}>
                <div className="teacher-kpi-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="14" rx="2" ry="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div className="teacher-kpi-content">
                  <div className="teacher-kpi-value">{teacherCourses.length}</div>
                  <div className="teacher-kpi-label">Одоо зааж буй хичээл</div>
                </div>
              </div>
              <div className="teacher-kpi-card" style={{ background: '#D6F5E5' }}>
                <div className="teacher-kpi-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M5.5 21h13a2.5 2.5 0 0 0-13 0z" />
                  </svg>
                </div>
                <div className="teacher-kpi-content">
                  <div className="teacher-kpi-value">{totalStudents}</div>
                  <div className="teacher-kpi-label">Нийт суралцагч</div>
                </div>
              </div>
              <div className="teacher-kpi-card" style={{ background: '#FFF1DB' }}>
                <div className="teacher-kpi-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-3-3.85" />
                    <path d="M7 21v-2a4 4 0 0 1 3-3.85" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="teacher-kpi-content">
                  <div className="teacher-kpi-value">{totalTeams}</div>
                  <div className="teacher-kpi-label">Багууд</div>
                </div>
              </div>
              <div className="teacher-kpi-card" style={{ background: '#E0F7FA' }}>
                <div className="teacher-kpi-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div className="teacher-kpi-content">
                  <div className="teacher-kpi-value">{courses.length - teacherCourses.length}</div>
                  <div className="teacher-kpi-label">Ирээдүй дэх хичээл</div>
                </div>
              </div>
            </div>
            {/* Charts and schedule */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <TeacherPieChart />
              <TeacherBarChart />
            </div>
            <TeacherSchedule />
            <div style={{ marginTop: '1rem' }}>
              <TeacherTodayClasses />
            </div>
          </div>
        )}
        
        {activeTab === 'students' && (
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#1E293B' }}>Суралцагчид</h3>
            
            <div className="teacher-student-filters">
              <input
                type="text"
                placeholder="Нэр эсвэл код хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">Бүх хичээл</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            
            {filteredStudents.length === 0 ? (
              <div className="teacher-empty-state">
                <p>Суралцагч олдсонгүй.</p>
              </div>
            ) : (
              <div className="teacher-students-list">
                {filteredStudents.map(student => (
                  <div
                    key={student.id}
                    className="teacher-student-card"
                    onClick={() => navigate(`/team4/teacher/student/${student.id}`)}
                  >
                    <img
                      src={generateAvatar(
                        student.name.split(' ').map(s => s.charAt(0)).join(''),
                        student.avatarColor
                      )}
                      alt={student.name}
                      className="teacher-avatar"
                    />
                    <div className="teacher-student-info">
                      <div className="teacher-student-name">{student.name}</div>
                      <div className="teacher-student-code">{student.code}</div>
                      {/* Display the average grade across the student's courses */}
                      {student.grades && (
                        <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Дундаж оноо: {(() => {
                          const values = Object.values(student.grades);
                          return values.length ? Math.round(values.reduce((a,b) => a + b, 0) / values.length) : 0;
                        })()}%</div>
                      )}
                    </div>
                    <div className="teacher-student-actions">
                      <button
                        className="teacher-icon-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStudent(student.id, { favourites: !student.favourites });
                        }}
                        title={student.favourites ? 'Таалагдсаныг болиулах' : 'Таалагдсан болгох'}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="teacher-card">
            <h3>Account Settings</h3>
            <div className="teacher-settings-section">
              <div className="teacher-settings-row">
                <label htmlFor="name">Нэр</label>
                <input
                  type="text"
                  id="name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Овог нэр"
                />
              </div>
              <div className="teacher-settings-row">
                <label htmlFor="nick">Дууддаг нэр</label>
                <input
                  type="text"
                  id="nick"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Дууддаг нэр"
                />
              </div>
              <div className="teacher-settings-row">
                <label htmlFor="institution">Сургууль</label>
                <input
                  type="text"
                  id="institution"
                  value={editInstitution}
                  onChange={(e) => setEditInstitution(e.target.value)}
                  placeholder="Сургууль"
                />
              </div>
              <div className="teacher-settings-row">
                <label htmlFor="department">Тэнхим</label>
                <input
                  type="text"
                  id="department"
                  value={editDepartment}
                  onChange={(e) => setEditDepartment(e.target.value)}
                  placeholder="Тэнхим"
                />
              </div>
              <button
                className="teacher-btn teacher-btn-primary"
                onClick={handleSaveProfile}
              >
                Хадгалах
              </button>
            </div>
          </div>
        )}
      </main>
      
      
    </>
  );
};

export default Home;