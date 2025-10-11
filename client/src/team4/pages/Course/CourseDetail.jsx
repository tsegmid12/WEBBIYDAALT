import React, { useState } from 'react';
import Header from '../../components/courseDetail/Header';
import Navigation from '../../components/courseDetail/Navigation';
import LessonsTab from '../../components/courseDetail/CourseDetail';
import StudentsTab from '../../components/courseDetail/Students';
import TeamsTab from '../../components/courseDetail/Groups';

export default function CourseDetail() {
  const [activeTab, setActiveTab] = useState('lessons');

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='max-w-6xl mx-auto px-8 py-8'>
        {activeTab === 'lessons' && <LessonsTab />}
        {activeTab === 'students' && <StudentsTab />}
        {activeTab === 'teams' && <TeamsTab />}
      </div>
    </div>
  );
}
