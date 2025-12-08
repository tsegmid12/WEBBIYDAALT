import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

export const CourseCard = ({ course, submissionCount = 0 }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
      <img 
        src={course.picture} 
        alt={course.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="font-semibold text-lg text-white mb-2">{course.name}</h3>
        <div className="text-sm text-slate-400 mb-4">
          <p>Эхлэх: {formatDate(course.start_date)}</p>
          <p>Дуусах: {formatDate(course.end_date)}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-300">
            {submissionCount} даалгавар
          </span>
        </div>
        <Link
          to={`/team2/courses/${course.id}/submissions`}
          className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-medium"
        >
          Даалгаврууд харах
        </Link>
      </div>
    </div>
  );
};