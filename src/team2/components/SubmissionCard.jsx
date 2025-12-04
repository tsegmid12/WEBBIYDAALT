import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { getGradeColor, getGradeLabel, getStatusBadge } from '../utils/calculatePoints';
import { getUserById } from '../utils/mockData';

export const SubmissionCard = ({ submission, lesson, showLesson = false, isTeacher = false }) => {
  const user = getUserById(submission.user_id);
  const statusBadge = getStatusBadge(submission.status);
  
  const getStatusColor = (status) => {
    if (status === 'graded') return 'bg-green-500/20 text-green-300 border-green-500/30';
    if (status === 'submitted') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  };

  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={user?.picture || 'https://via.placeholder.com/40'} 
              alt={user?.first_name}
              className="w-12 h-12 rounded-full border-2 border-slate-600 group-hover:border-blue-500 transition-colors"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="text-sm text-slate-400">{formatDate(submission.created_at)}</p>
          </div>
        </div>
        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(submission.status)}`}>
          {statusBadge.label}
        </span>
      </div>

      {/* Lesson Info */}
      {showLesson && lesson && (
        <div className="mb-4 pb-4 border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-sm font-medium text-slate-300">{lesson.name}</p>
          </div>
        </div>
      )}

      {/* Content Preview */}
      <p className="text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
        {submission.content}
      </p>

      {/* File Attachment */}
      {submission.file_url && (
        <div className="mb-4">
          <a 
            href={submission.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors group/link"
          >
            <svg className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            Хавсралт файл
          </a>
        </div>
      )}

      {/* Grade */}
      {submission.status === 'graded' && submission.grade_point !== null && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-300">Үнэлгээ:</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-400">
                {submission.grade_point}
              </span>
              <span className="text-slate-400">/ {lesson?.point || 100}</span>
              <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-lg border border-green-500/30">
                {getGradeLabel((submission.grade_point / (lesson?.point || 100)) * 100)}
              </span>
            </div>
          </div>
          {submission.teacher_comment && (
            <div className="mt-3 pt-3 border-t border-green-500/20">
              <p className="text-sm text-slate-300 italic">
                <svg className="w-4 h-4 inline mr-1 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                {submission.teacher_comment}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3">
        <Link
          to={`/team2/courses/${lesson?.course_id}/lessons/${submission.lesson_id}/submissions`}
          className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 text-sm font-medium shadow-lg shadow-blue-500/20"
        >
          Дэлгэрэнгүй
        </Link>
        {!isTeacher && submission.status !== 'graded' && (
          <Link
            to={`/team2/courses/${lesson?.course_id}/lessons/${submission.lesson_id}/submissions/${submission.id}/edit`}
            className="flex-1 text-center px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all duration-300 text-sm font-medium border border-slate-600/50"
          >
            Засах
          </Link>
        )}
      </div>
    </div>
  );
};

