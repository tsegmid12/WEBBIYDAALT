import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  Bell,
  LogOut,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { studentAPI, authAPI } from './services/api';

const Team4Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = path => location.pathname === path;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await studentAPI.getProfile();
      setUser(data?.user || data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setUser({ name: 'team4', avatar: '/team4/student/profile.png' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      navigate('/');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <header className='bgBlue text-white py-4 px-4 sm:px-6'>
        <div className='max-w-7xl mx-auto flex items-center justify-between relative'>
          <Link to='/team4' className='flex-shrink-0'>
            <img
              src='/team4/student/logo.png'
              alt='logo'
              width={44}
              className='sm:w-[50px]'
            />
          </Link>

          {/* Center nav - hidden on small screens */}
          <nav className='hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8'>
            <Link
              to='/team4'
              className={`${
                isActive('/team4') ? 'underline font-semibold' : ''
              }`}>
              Нүүр
            </Link>
            <Link
              to='/team4/course'
              className={`${
                isActive('/team4/course') ? 'underline font-semibold' : ''
              }`}>
              Хичээл
            </Link>
            <Link
              to='/team4/group'
              className={`${
                isActive('/team4/group') ? 'underline font-semibold' : ''
              }`}>
              Бүлэг
            </Link>
          </nav>

          <div className='flex items-center gap-2 sm:gap-4'>
            {/* Mobile menu */}
            <button
              aria-label='Open menu'
              className='md:hidden rounded-md p-2 hover:bg-white/10'
              onClick={() => setMobileOpen(o => !o)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16m0 6H4'
                />
              </svg>
            </button>

            <nav className='hidden sm:flex items-center gap-4'>
              <Link to='/team4/favorite' className='flex items-center gap-2'>
                {isActive('/team4/favorite') ? (
                  <Heart fill='#00CBB8' size={22} />
                ) : (
                  <Heart size={22} />
                )}
              </Link>
              <Link
                to='/team4/notification'
                className='flex items-center gap-2'>
                {isActive('/team4/notification') ? (
                  <Bell fill='#00CBB8' size={22} />
                ) : (
                  <Bell size={22} />
                )}
              </Link>
            </nav>

            {/* User */}
            <div className='relative flex items-center gap-2'>
              <img
                src={user?.avatar || '/team4/student/profile.png'}
                width={32}
                height={32}
                alt='profile'
                className='rounded-full object-cover'
              />
              <button
                onClick={toggleDropdown}
                className='hidden sm:flex text-sm font-medium items-center gap-1'>
                {user?.name ||
                  user?.full_name ||
                  (loading ? 'Loading...' : 'User')}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className='absolute right-0 top-full mt-2 w-36 bg-white text-black rounded-lg shadow-lg z-50'>
                  <ul className='py-2'>
                    {['team1', 'team2', 'team3', 'team4', 'team5', 'team6'].map(
                      team => (
                        <li key={team}>
                          <Link
                            to={`/${team}`}
                            onClick={closeDropdown}
                            className='block px-4 py-2 hover:bg-gray-100'>
                            {team.charAt(0).toUpperCase() + team.slice(1)}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className='bg-white rounded-full p-2'>
              <button
                onClick={handleLogout}
                className='flex items-center gap-2 underline'
                title='Гарах'>
                <LogOut size={16} color='#44B1D2' />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className='md:hidden max-w-7xl mx-auto px-2 mt-3'>
            <div className='bg-white/10 rounded-lg backdrop-blur p-2 flex flex-col'>
              <Link
                to='/team4'
                onClick={() => setMobileOpen(false)}
                className='px-3 py-2 rounded hover:bg-white/20'>
                Нүүр
              </Link>
              <Link
                to='/team4/course'
                onClick={() => setMobileOpen(false)}
                className='px-3 py-2 rounded hover:bg-white/20'>
                Хичээл
              </Link>
              <Link
                to='/team4/group'
                onClick={() => setMobileOpen(false)}
                className='px-3 py-2 rounded hover:bg白/20'>
                Бүлэг
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className='max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1'>
        <Outlet />
      </main>

      <footer className='bg-[#24243a] text-white py-10'>
        <div className='max-w-7xl mx-auto text-center flex flex-col items-center space-y-6 px-4'>
          <div className='flex flex-wrap items-center justify-center gap-6'>
            <div className='flex flex-col items-center space-y-1 border-r-2 pr-4'>
              <div className='flex items-center space-x-2'>
                <div className='w-12 h-12 flex items-center justify-center'>
                  <img src='/team4/student/logo.png' alt='logo' />
                </div>
                <div className='text-left leading-tight'>
                  <p className='textGreen text-sm font-semibold'>Let’s</p>
                  <p className='textGreen text-sm font-semibold'>Grow</p>
                  <p className='textGreen text-sm font-semibold'>Together</p>
                </div>
              </div>
            </div>

            <div className='text-sm'>
              <p className='font-semibold'>Video lesson</p>
              <p>&</p>
              <p className='font-semibold'>Online class</p>
            </div>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-6'>
            <a
              href='https://www.facebook.com/d.uuganbaar.467495'
              className='text-gray-400 hover:text-white'>
              <Facebook size={24} color='white' />
            </a>
            <a
              href='https://www.instagram.com/uuganaaa_12/'
              className='text-gray-400 hover:text-white'>
              <Instagram size={24} color='white' />
            </a>
            <a href='#' className='text-gray-400 hover:text-white'>
              <Linkedin size={24} color='white' />
            </a>
            <a href='#' className='text-gray-400 hover:text-white'>
              <Youtube size={24} color='white' />
            </a>
          </div>

          <p className='text-gray-400 text-xs'>© 2025 Let’s grow together</p>
        </div>
      </footer>
    </div>
  );
};

export default Team4Layout;
