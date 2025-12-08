import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getSelectedRole, setSelectedRole, isTeacher } from './utils/role';
import { ChevronDown, User, GraduationCap } from 'lucide-react';

const Team6Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const menuRef = useRef(null);
  const isActive = (path) => location.pathname.includes(path);

  useEffect(() => {
    const selectedRole = getSelectedRole();
    setRole(selectedRole);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowRoleMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (newRole) => {
    setSelectedRole(newRole);
    setRole(newRole);
    setShowRoleMenu(false);
    // Navigate to home to refresh the page with new role
    navigate('/team6');
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <header className='bg-blue-600 text-white py-4 px-4 sm:px-6 shadow-md'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <Link to='/team6' className='text-xl font-bold'>
            Шалгалтын Систем
          </Link>

          <nav className='hidden md:flex items-center gap-6'>
            <Link
              to='/team6'
              className={`${
                isActive('/team6') && !isActive('/team6/courses') && !isActive('/team6/exams') && !isActive('/team6/select-role')
                  ? 'underline font-semibold'
                  : ''
              } hover:underline`}>
              Нүүр
            </Link>
          </nav>

          {role && (
            <div className='relative' ref={menuRef}>
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className='flex items-center gap-2 px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors'>
                {isTeacher() ? (
                  <User size={20} />
                ) : (
                  <GraduationCap size={20} />
                )}
                <span className='text-sm font-medium'>
                  {isTeacher() ? 'Багш' : 'Оюутан'}
                </span>
                <ChevronDown size={16} className={`transition-transform ${showRoleMenu ? 'rotate-180' : ''}`} />
              </button>

              {showRoleMenu && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-50'>
                  <button
                    onClick={() => handleRoleSwitch('teacher')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                      role === 'teacher' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                    }`}>
                    <User size={20} />
                    <div>
                      <div className='font-medium'>Багш</div>
                      <div className='text-xs text-gray-500'>Шалгалт үүсгэх, засах</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('student')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-green-50 transition-colors ${
                      role === 'student' ? 'bg-green-100 text-green-700' : 'text-gray-700'
                    }`}>
                    <GraduationCap size={20} />
                    <div>
                      <div className='font-medium'>Оюутан</div>
                      <div className='text-xs text-gray-500'>Шалгалт өгөх</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className='max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1'>
        <Outlet />
      </main>

      <footer className='bg-gray-800 text-white py-6 mt-auto'>
        <div className='max-w-7xl mx-auto text-center px-4'>
          <p className='text-sm'>© 2025 Шалгалтын Систем - Team 6</p>
        </div>
      </footer>
    </div>
  );
};

export default Team6Layout;

