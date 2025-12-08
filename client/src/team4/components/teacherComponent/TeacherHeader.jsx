import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../../teacher/DataContext';
import { generateAvatar } from '../../teacher/utils';

/**
 * Teacher dashboard header component.  This header displays navigation
 * links, a favourites button, notifications with unread count,
 * profile information and a logout action.  It uses the current
 * location to automatically highlight the active navigation link
 * rather than requiring the parent to pass an `active` prop.  All
 * teacher routes are now prefixed with `/team4/teacher`.  The
 * navigation links and active state detection below assume this
 * prefix.
 */
const Header = () => {
  // Obtain the teacher data context if available.  When the header is
  // rendered outside of the DataProvider (e.g. on student routes),
  // calling useData() would throw.  Wrap in a try/catch and fall back
  // to sensible defaults when no context is present.
  let profile = { name: '', nick: '', avatarColor: '#FFFFFF' };
  let notifications = [];
  try {
    const data = useData();
    profile = data.profile;
    notifications = data.notifications;
  } catch (err) {
    // No DataProvider found; leave defaults.  In this case the
    // favourites and notifications buttons will be hidden.
  }
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which nav item is active based on the current path
  const path = location.pathname;
  // Determine active section based on the `/team4/teacher` URL prefix
  const active = path.startsWith('/team4/teacher/courses')
    ? 'courses'
    : path.startsWith('/team4/teacher/groups')
    ? 'groups'
    : 'home';

  // Count of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Generate an avatar from initials and colour
  const initials = profile.name
    ? profile.name
        .split(' ')
        .map(s => s.charAt(0))
        .join('')
    : 'T';
  const avatarSrc = generateAvatar(initials, profile.avatarColor);

  const handleLogout = () => {
    localStorage.removeItem('teacherData');
    // Redirect back to the login page after logout
    navigate('/team4');
  };

  return (
    <>
      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background-color: #44B1D2;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 1.5rem;
          box-shadow: 0 2px 4px rgba(15, 23, 42, 0.1);
        }
        
        .header-left, .header-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border: 2px solid rgba(255,255,255,0.7);
          border-radius: 0.5rem;
          font-weight: 700;
          letter-spacing: 1px;
        }
        
        .nav {
          display: flex;
          align-items: center;
          flex-grow: 1;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.95rem;
        }
        
        .nav a {
          color: #fff;
          text-decoration: none;
          position: relative;
          padding-bottom: 0.25rem;
          transition: opacity 0.2s;
        }
        
        .nav a:hover {
          opacity: 0.85;
        }
        
        .nav a.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -0.2rem;
          height: 2px;
          background-color: #fff;
          border-radius: 1px;
        }
        
        .notification-wrapper {
          position: relative;
        }
        
        .notification-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: #EF4444;
          color: #fff;
          border-radius: 9999px;
          font-size: 0.6rem;
          padding: 2px 5px;
          line-height: 1;
          min-width: 1.1rem;
          text-align: center;
        }
        
        .icon-button {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.4rem;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        
        .icon-button:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }
        
        .profile-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.5rem;
          transition: background-color 0.2s;
        }
        
        .profile-button:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }
        
        .avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.3);
        }
        
        .profile-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #ffffff;
          white-space: nowrap;
        }
      `}</style>
      
      <header className="header">
        <div className="header-left">
          <div className="logo">LGT</div>
        </div>
        
        <nav className="nav">
          <Link to="/team4/teacher" className={active === 'home' ? 'active' : ''}>
            Нүүр
          </Link>
          <Link to="/team4/teacher/courses" className={active === 'courses' ? 'active' : ''}>
            Хичээлүүд
          </Link>
          <Link to="/team4/teacher/groups" className={active === 'groups' ? 'active' : ''}>
            Багууд
          </Link>
        </nav>
        
        <div className="header-right">
          {/* Only show favourites and notifications when a teacher profile exists */}
          {profile && profile.name && (
            <>
              <button
                className="icon-button"
                onClick={() => navigate('/team4/teacher/favorites')}
                title="Таалагдсан"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
              
              <div className="notification-wrapper">
                <button
                  className="icon-button"
                  onClick={() => navigate('/team4/teacher/notifications')}
                  title="Мэдэгдэл"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                </button>
                {unreadCount > 0 && (
                  <span className="notification-count">{unreadCount}</span>
                )}
              </div>
            </>
          )}
          <button
            className="profile-button"
            onClick={() => navigate('/team4/teacher')}
          >
            <img src={avatarSrc} alt="teacher" className="avatar" />
            <span className="profile-name">{profile.nick || profile.name}</span>
          </button>
          
          <button
            className="icon-button"
            onClick={handleLogout}
            title="Гарах"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
