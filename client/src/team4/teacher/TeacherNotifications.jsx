import React, { useState } from 'react';
// import Header from '../components/teacherComponent/TeacherHeader';
import { useData } from './DataContext';
import { formatDate } from './utils';

const Notifications = () => {
  const { notifications, updateNotification } = useData();
  const [activeTab, setActiveTab] = useState('system');

  const systemNotifs = notifications
    .filter(n => n.type === 'system')
    .sort((a, b) => new Date(b.time) - new Date(a.time));
    
  const courseNotifs = notifications
    .filter(n => n.type === 'course')
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  const handleToggleRead = (id, currentReadStatus) => {
    updateNotification(id, { read: !currentReadStatus });
  };

  const renderNotificationList = (notifList) => {
    if (notifList.length === 0) {
      return <p style={{ color: '#64748B', textAlign: 'center', padding: '2rem' }}>Мэдэгдэл байхгүй.</p>;
    }

    return notifList.map(notif => (
      <div key={notif.id} className="teacher-notification-card">
        <div className="teacher-notification-header">
          <div className="teacher-notif-dot-container">
            <span className={`teacher-notif-dot ${notif.read ? 'read' : ''}`} />
            <strong style={{ marginLeft: '0.5rem' }}>{notif.title}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="teacher-notif-time">{formatDate(notif.time)}</span>
            <button
              className="teacher-icon-button"
              onClick={() => handleToggleRead(notif.id, notif.read)}
              title={notif.read ? 'Уншаагүй болгох' : 'Уншсан гэж тэмдэглэх'}
            >
              {notif.read ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <p className="teacher-notif-message">{notif.message}</p>
      </div>
    ));
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
          font-weight: 500;
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
        
        .teacher-notification-card {
          background: #ffffff;
          border-radius: 0.75rem;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #E2E8F0;
          margin-bottom: 1rem;
        }
        
        .teacher-notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .teacher-notif-dot-container {
          display: flex;
          align-items: center;
        }
        
        .teacher-notif-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #F97316;
        }
        
        .teacher-notif-dot.read {
          background-color: #CBD5E1;
        }
        
        .teacher-notif-time {
          font-size: 0.85rem;
          color: #94A3B8;
        }
        
        .teacher-notif-message {
          margin: 0;
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .teacher-icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
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
      
      {/* <Header active="" /> */}
      
      <main className="teacher-main-container">
        <h2>Мэдэгдэл</h2>
        
        <div className="teacher-tabs">
          <button
            className={`teacher-tab ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            System
          </button>
          <button
            className={`teacher-tab ${activeTab === 'course' ? 'active' : ''}`}
            onClick={() => setActiveTab('course')}
          >
            Courses
          </button>
        </div>
        
        {activeTab === 'system' && renderNotificationList(systemNotifs)}
        {activeTab === 'course' && renderNotificationList(courseNotifs)}
      </main>
    </>
  );
};

export default Notifications;
