// team2/pages/SubmissionsPage.jsx
// UPDATED: Dark Blue Theme
// Route: /courses/:course_id/submissions

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSubmission } from '../context/SubmissionContext';
import { useCourse } from '../context/CourseContext';
import { SubmissionList } from '../components/SubmissionList';
import { calculateAverageGrade } from '../utils/calculatePoints';

const SubmissionsPage = () => {
  const { course_id } = useParams();
  const { submissions, loading: submissionsLoading, fetchSubmissionsByCourse } = useSubmission();
  const { currentCourse, lessons, fetchCourse, fetchLessons } = useCourse();
  const [filter, setFilter] = useState('all');
  const [currentUser] = useState({ id: 2, role_id: 2 });
  const isTeacher = currentUser.role_id === 1;

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchCourse(course_id),
        fetchLessons(course_id),
        fetchSubmissionsByCourse(course_id)
      ]);
    };
    loadData();
  }, [course_id]);

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });

  const stats = {
    total: submissions.length,
    graded: submissions.filter(s => s.status === 'graded').length,
    submitted: submissions.filter(s => s.status === 'submitted').length,
    averageGrade: calculateAverageGrade(submissions)
  };

  if (submissionsLoading && !currentCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mx-auto"></div>
          <p className="text-blue-200 mt-4 text-lg">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl bottom-20 right-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6 space-x-2">
            <Link to="/team2" className="text-blue-300 hover:text-blue-200 transition-colors">
              Хичээлүүд
            </Link>
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-300">{currentCourse?.name}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-3">
              <span className="text-white">Бүх </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Даалгаврууд</span>
            </h1>
            <p className="text-slate-300 text-lg">
              {currentCourse?.name} - Хичээлийн бүх илгээсэн даалгаврууд
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-slate-400 text-sm font-medium">Нийт даалгавар</div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-white">{stats.total}</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-slate-400 text-sm font-medium">Үнэлэгдсэн</div>
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-green-400">{stats.graded}</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-slate-400 text-sm font-medium">Илгээсэн</div>
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-yellow-400">{stats.submitted}</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-slate-400 text-sm font-medium">Дундаж оноо</div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-purple-400">{stats.averageGrade}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-medium text-slate-300">Шүүлт:</span>
              </div>
              
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50'
                }`}
              >
                Бүгд ({stats.total})
              </button>
              
              <button
                onClick={() => setFilter('graded')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === 'graded'
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/30'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50'
                }`}
              >
                Үнэлэгдсэн ({stats.graded})
              </button>
              
              <button
                onClick={() => setFilter('submitted')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === 'submitted'
                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg shadow-yellow-500/30'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50'
                }`}
              >
                Илгээсэн ({stats.submitted})
              </button>
            </div>
          </div>

          {/* Submissions List */}
          {submissionsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-400"></div>
            </div>
          ) : (
            <SubmissionList
              submissions={filteredSubmissions}
              lessons={lessons}
              isTeacher={isTeacher}
              showLesson={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;