// team2/pages/LessonSubmissionsPage.jsx
// FIXED + Dark Blue Theme
// Route: /courses/:course_id/lessons/:lesson_id/submissions

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSubmission } from '../context/SubmissionContext';
import { useCourse } from '../context/CourseContext';
import { SubmissionList } from '../components/SubmissionList';
import { lessonAPI } from '../api/lessonAPI';

const LessonSubmissionsPage = () => {
  const { course_id, lesson_id } = useParams();
  const navigate = useNavigate();
  const { submissions, loading, fetchSubmissionsByLesson } = useSubmission();
  const { currentCourse, fetchCourse } = useCourse();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [currentUser] = useState({ id: 2, role_id: 2 });
  const isTeacher = currentUser.role_id === 1;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadError(null);
        console.log('🔍 Loading lesson ID:', lesson_id);
        
        // Fetch course
        await fetchCourse(course_id);
        
        // Fetch lesson - FIXED
        const lessonResponse = await lessonAPI.getLesson(lesson_id);
        console.log('✅ Lesson loaded:', lessonResponse.data);
        setCurrentLesson(lessonResponse.data);
        
        // Fetch submissions
        await fetchSubmissionsByLesson(lesson_id);
        
      } catch (error) {
        console.error('❌ Error loading data:', error);
        setLoadError(error.message);
      }
    };
    
    loadData();
  }, [course_id, lesson_id]);

  const userSubmission = submissions.find(s => s.user_id === currentUser.id);
  const canSubmit = !isTeacher && !userSubmission;

  const stats = {
    total: submissions.length,
    graded: submissions.filter(s => s.status === 'graded').length,
    submitted: submissions.filter(s => s.status === 'submitted').length,
    average: submissions.filter(s => s.grade_point).reduce((acc, s) => acc + s.grade_point, 0) / 
             (submissions.filter(s => s.grade_point).length || 1)
  };

  if (loading && !currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mx-auto"></div>
          <p className="text-blue-200 mt-4 text-lg">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-8 max-w-md backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-red-200">Алдаа гарлаа</h3>
          </div>
          <p className="text-red-300 mb-6">{loadError}</p>
          <button
            onClick={() => navigate(`/team2/courses/${course_id}/submissions`)}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Буцах
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-20 right-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl bottom-20 left-20 animate-pulse delay-1000"></div>
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
            <Link to={`/team2/courses/${course_id}/submissions`} className="text-blue-300 hover:text-blue-200 transition-colors">
              {currentCourse?.name}
            </Link>
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-300">{currentLesson?.name}</span>
          </div>

          {/* Header Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-8 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {currentLesson?.name}
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Lesson ID: {lesson_id}</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 text-lg">{currentLesson?.content}</p>
                <div className="flex items-center space-x-8 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-400">Оноо</div>
                      <div className="text-white font-bold text-lg">{currentLesson?.point}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-400">Даалгавар</div>
                      <div className="text-white font-bold text-lg">{stats.total}</div>
                    </div>
                  </div>
                </div>
              </div>

              {canSubmit && (
                <button
                  onClick={() => navigate(`/team2/courses/${course_id}/lessons/${lesson_id}/submissions/create`)}
                  className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Даалгавар илгээх</span>
                </button>
              )}
            </div>

            {!isTeacher && userSubmission && (
              <div className="mt-6 p-5 bg-blue-900/30 rounded-xl border border-blue-500/30 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-blue-200 font-medium text-lg">
                      Та энэ сэдвийн даалгавраа илгээсэн байна
                    </span>
                  </div>
                  <Link
                    to={`/team2/courses/${course_id}/lessons/${lesson_id}/submissions`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Харах →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-sm mb-1">Үнэлэгдсэн</div>
                  <div className="text-4xl font-bold text-green-400">{stats.graded}</div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-sm mb-1">Үнэлгээ хүлээж буй</div>
                  <div className="text-4xl font-bold text-yellow-400">{stats.submitted}</div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-sm mb-1">Дундаж оноо</div>
                  <div className="text-4xl font-bold text-purple-400">{Math.round(stats.average)}</div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submissions List */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-7 h-7 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Илгээсэн даалгаврууд
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-400"></div>
              </div>
            ) : (
              <SubmissionList
                submissions={submissions}
                lessons={[currentLesson]}
                isTeacher={isTeacher}
                showLesson={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonSubmissionsPage;