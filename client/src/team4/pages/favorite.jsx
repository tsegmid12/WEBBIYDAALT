import React, { useState } from 'react';
import Header from '../components/Favorite/Header';
import Navigation from '../components/Favorite/Navigation';
import Courses from '../components/Favorite/Courses';
import Teachers from '../components/Favorite/Teachers';
import Groups from '../components/Favorite/Groups';

const Favorite = () => {
  const [currentPage, setCurrentPage] = useState('courses');
  return (
    <div className='min-h-[60vh] '>
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className='max-w-9xl mx-auto px-8 py-8'>
        {currentPage === 'courses' && <Courses />}
        {currentPage === 'teachers' && <Teachers />}
        {currentPage === 'groups' && <Groups />}
      </div>
    </div>
  );
};
export default Favorite;
