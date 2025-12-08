import React from 'react';
import { Link } from 'react-router-dom';

export const LessonCard = ({ lesson, courseId, submissionCount = 0 }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300">
      <h3 className="font-semibold text-white text-lg mb-2">{lesson.name}</h3>
      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{lesson.content}</p>
      
      <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
        <span>Оноо: {lesson.point}</span>
        <span>Даалгавар: {submissionCount}</span>
      </div>

      <Link
        to={`/team2/courses/${courseId}/lessons/${lesson.id}/submissions`}
        className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-medium"
      >
        Даалгаврууд харах
      </Link>
    </div>
  );
};