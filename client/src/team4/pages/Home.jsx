import React, { useState } from 'react';
import Header from '../components/home/Header';
import Navigation from '../components/home/Navigation';
import DashboardContent from '../components/home/DashboardContent';
import TeachersContent from '../components/home/TeachersContent';
import SettingsContent from '../components/home/SettingsContent';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  return (
    <div className='min-h-screen'>
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className='max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8'>
        {currentPage === 'dashboard' && <DashboardContent />}
        {currentPage === 'teachers' && <TeachersContent />}
        {currentPage === 'settings' && <SettingsContent />}
      </div>
    </div>
  );
};
export default Home;
