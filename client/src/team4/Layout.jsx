import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Heart,
  Bell,
  LucideMessageSquareText,
  LogOut,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

const Team4Layout = () => {
  const location = useLocation();
  const isActive = path => location.pathname === path;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bgBlue text-white py-4 px-6'>
        <div className='max-w-8xl mx-auto flex items-center justify-between relative'>
          <Link to='/team4' className='flex-shrink-0'>
            <img src='/team4/student/logo.png' alt='vite' width={50} />
          </Link>

          <nav className='absolute left-1/2 transform -translate-x-1/2 space-x-10'>
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

          <div className='flex space-x-6 items-center'>
            <nav className='space-x-6 flex items-center'>
              <Link to='/team4/favorite' className='flex items-center gap-2'>
                {isActive('/team4/favorite') ? (
                  <Heart fill='#00CBB8' size={24} />
                ) : (
                  <Heart size={24} />
                )}
              </Link>
              <Link
                to='/team4/notification'
                className='flex items-center gap-2'>
                {isActive('/team4/notification') ? (
                  <Bell fill='#00CBB8' size={24} />
                ) : (
                  <Bell size={24} />
                )}
              </Link>
                {/* <Link to='/team4/message' className='flex items-center gap-2'>
                  {isActive('/team4/message') ? (
                    <LucideMessageSquareText fill='#00CBB8' size={24} />
                  ) : (
                    <LucideMessageSquareText size={24} />
                  )}
                </Link> */}
            </nav>

            <div className='relative flex  space-x-2'>
              <img src='/team4/student/profile.png' width={36} alt='profile' />
              <button
                onClick={toggleDropdown}
                className='text-sm font-medium flex items-center gap-1'>
                team4
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
                <div className='absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg z-50'>
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
              <Link to='/' className='flex items-center gap-2 underline'>
                <LogOut size={16} color='#44B1D2' />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto p-6'>
        <Outlet />
      </main>

      <footer className='bg-[#24243a] text-white py-10'>
        <div className='max-w-7xl mx-auto text-center flex flex-col items-center space-y-6'>
          <div className='flex space-x-6'>
            <div className='flex flex-col items-center space-y-1 border-r-2 pr-4'>
              <div className='flex items-center space-x-2'>
                <div className='w-12 h-12 flex items-center justify-center'>
                  <img src='/team4/student/logo.png' alt='' />
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

          <div className='flex space-x-6'>
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
