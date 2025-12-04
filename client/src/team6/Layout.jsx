import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSelectedRole, clearSelectedRole, isTeacher, onRoleChange } from './utils/role';
import { LogOut, User, GraduationCap } from 'lucide-react';

const Team6Layout = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Load initial role
    const initialRole = getSelectedRole();
    setRole(initialRole);

    // Subscribe to role changes
    const unsubscribe = onRoleChange((newRole) => {
      setRole(newRole);
    });

    return unsubscribe;
  }, []);

  const handleRoleChange = () => {
    clearSelectedRole();
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
              className='hover:underline'>
              Нүүр
            </Link>
          </nav>

          {role ? (
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
          ) : (
            <Link
              to='/team6/select-role'
              className='px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
              Эрх сонгох
            </Link>
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