// team2/pages/CoursesListPage.jsx
// NEW PAGE: Show all available courses
// Route: /courses/list (or /team2/courses)

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import { useSubmission } from '../context/SubmissionContext';
import { formatDate } from '../utils/formatDate';

const CoursesListPage = () => {
  const { courses, fetchCourses, loading } = useCourse();
  const { submissions, fetchSubmissionsByCourse } = useSubmission();
  const [courseStats, setCourseStats] = useState({});
  const [currentUser] = useState({ id: 2, role_id: 2 }); // Mock user

  useEffect(() => {
    fetchCourses();
  }, []);

  // Calculate stats for each course
  useEffect(() => {
    const calculateStats = async () => {
      const stats = {};
      for (const course of courses) {
        const subs = await fetchSubmissionsByCourse(course.id);
        stats[course.id] = {
          total: subs.length,
          graded: subs.filter(s => s.status === 'graded').length,
          pending: subs.filter(s => s.status === 'submitted').length
        };
      }
      setCourseStats(stats);
    };
    
    if (courses.length > 0) {
      calculateStats();
    }
  }, [courses]);

  if (loading) {
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
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Миний <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Хичээлүүд</span>
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Та нийт {courses.length} хичээлд бүртгэлтэй байна
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {courses.map((course) => {
              const stats = courseStats[course.id] || { total: 0, graded: 0, pending: 0 };
              
              return (
                <div 
                  key={course.id}
                  className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  {/* Course Image with Gradient Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={course.picture} 
                      alt={course.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    
                    {/* Course Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                        {course.name}
                      </h3>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6 space-y-4">
                    {/* Date Info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-slate-300">{formatDate(course.start_date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-300">{formatDate(course.end_date)}</span>
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center border border-slate-600/50">
                        <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
                        <div className="text-xs text-slate-400 mt-1">Нийт</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center border border-slate-600/50">
                        <div className="text-2xl font-bold text-green-400">{stats.graded}</div>
                        <div className="text-xs text-slate-400 mt-1">Үнэлэгдсэн</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center border border-slate-600/50">
                        <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
                        <div className="text-xs text-slate-400 mt-1">Хүлээгдэж буй</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Link
                        to={`/team2/courses/${course.id}/submissions`}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center space-x-2 group"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Даалгаврууд</span>
                      </Link>
                      
                      <button className="px-4 py-3 bg-slate-700/50 text-slate-300 rounded-xl font-medium hover:bg-slate-600/50 transition-all duration-300 border border-slate-600/50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/50"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Хичээл олдсонгүй</h3>
              <p className="text-slate-400">Одоогоор бүртгэлтэй хичээл байхгүй байна.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesListPage;