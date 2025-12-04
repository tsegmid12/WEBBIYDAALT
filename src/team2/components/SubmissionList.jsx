import React from 'react';
import { SubmissionCard } from './SubmissionCard';

export const SubmissionList = ({ submissions, lessons, isTeacher = false, showLesson = false }) => {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-700/50 border border-slate-600/50 mb-6">
          <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Даалгавар байхгүй</h3>
        <p className="text-slate-400">Одоогоор илгээсэн даалгавар байхгүй байна.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {submissions.map(submission => {
        const lesson = lessons?.find(l => l.id === submission.lesson_id);
        return (
          <SubmissionCard
            key={submission.id}
            submission={submission}
            lesson={lesson}
            isTeacher={isTeacher}
            showLesson={showLesson}
          />
        );
      })}
    </div>
  );
};
