import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSelectedRole, clearSelectedRole, isTeacher } from './utils/role';
import { LogOut, User, GraduationCap } from 'lucide-react';

const Team6Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const isActive = (path) => location.pathname.includes(path);

  useEffect(() => {
    const selectedRole = getSelectedRole();
    setRole(selectedRole);
  }, [location]);

  const handleRoleChange = () => {
    clearSelectedRole();
    setRole(null);
    navigate('/team6/select-role');
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
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                {isTeacher() ? (
                  <User size={20} />
                ) : (
                  <GraduationCap size={20} />
                )}
                <span className='text-sm'>
                  {isTeacher() ? 'Багш' : 'Оюутан'}
                </span>
              </div>
              <button
                onClick={handleRoleChange}
                className='p-2 hover:bg-blue-700 rounded-lg transition-colors'
                title='Эрх солих'>
                <LogOut size={20} />
              </button>
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

