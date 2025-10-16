import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from '../../components/courseDetail/Header';
import Navigation from '../../components/courseDetail/Navigation';
import LessonsTab from '../../components/courseDetail/CourseDetail';
import StudentsTab from '../../components/courseDetail/Students';
import TeamsTab from '../../components/courseDetail/Groups';

export default function CourseDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('lessons');

  // Keep backward compatibility: components under courseDetail read id from query params
  useEffect(() => {
    const existing = searchParams.get('id');
    if (!existing && id) {
      const params = new URLSearchParams(searchParams);
      params.set('id', id);
      setSearchParams(params, { replace: true });
    }
  }, [id]);

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
