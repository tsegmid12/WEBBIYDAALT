// team2/pages/EditSubmissionPage.jsx
// UPDATED: Dark Blue Theme + Bug Fix
// Route: /courses/:course_id/lessons/:lesson_id/submissions/:submission_id/edit

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSubmission } from '../context/SubmissionContext';
import { useCourse } from '../context/CourseContext';
import { useSubmissionForm } from '../hooks/useSubmission';
import { lessonAPI } from '../api/lessonAPI';

const EditSubmissionPage = () => {
  const { course_id, lesson_id, submission_id } = useParams();
  const navigate = useNavigate();
  const { currentSubmission, updateSubmission, fetchSubmission } = useSubmission();
  const { currentCourse, fetchCourse } = useCourse();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentUser] = useState({ id: 2, role_id: 2 });
  const [successMessage, setSuccessMessage] = useState('');

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleFileChange,
    handleSubmit,
    setFormData
  } = useSubmissionForm();

  useEffect(() => {
    const loadData = async () => {
      await fetchCourse(course_id);
      const lessonResponse = await lessonAPI.getLesson(lesson_id);
      setCurrentLesson(lessonResponse.data);
      await fetchSubmission(submission_id);
    };
    loadData();
  }, [course_id, lesson_id, submission_id]);

  useEffect(() => {
    if (currentSubmission) {
      setFormData({
        content: currentSubmission.content,
        file_url: currentSubmission.file_url
      });
    }
  }, [currentSubmission]);

  const canEdit = currentSubmission && 
                  currentSubmission.user_id === currentUser.id && 
                  currentSubmission.status !== 'graded';

  if (!canEdit && currentSubmission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-8 max-w-md backdrop-blur-sm">
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-200">Засах боломжгүй</h3>
              <p className="text-red-300 text-sm mt-1">
                {currentSubmission.status === 'graded' 
                  ? 'Үнэлэгдсэн даалгавар засах боломжгүй.'
                  : 'Та энэ даалгаврыг засах эрхгүй байна.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/team2/courses/${course_id}/lessons/${lesson_id}/submissions`)}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium"
          >
            Буцах
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async () => {
    const success = await handleSubmit(async (data) => {
      await updateSubmission(submission_id, data);
    });

    if (success) {
      setSuccessMessage('Даалгавар амжилттай шинэчлэгдлээ!');
      setTimeout(() => {
        navigate(`/team2/courses/${course_id}/lessons/${lesson_id}/submissions`);
      }, 2000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const mockFileUrl = `https://example.com/files/${file.name}`;
      handleFileChange(mockFileUrl);
    }
  };

  if (!currentSubmission || !currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
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
        <div className="max-w-4xl mx-auto">
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
            <Link to={`/team2/courses/${course_id}/lessons/${lesson_id}/submissions`} className="text-blue-300 hover:text-blue-200 transition-colors">
              {currentLesson?.name}
            </Link>
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-300">Засах</span>
          </div>

          {/* Header Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Даалгавар засах
                </h1>
                <p className="text-slate-400 mt-1">
                  {currentLesson?.name} - {currentCourse?.name}
                </p>
              </div>
            </div>

            <div className="p-6 bg-yellow-900/20 rounded-xl border border-yellow-500/30">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-yellow-300 mb-1">Анхаарах:</p>
                  <p className="text-sm text-yellow-200">
                    Даалгавар үнэлэгдсэний дараа засах боломжгүй болно. Засварыг хадгалахын өмнө сайтар шалгана уу.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-8 p-6 bg-green-900/30 border border-green-500/50 rounded-xl backdrop-blur-sm animate-fadeIn">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-green-300 font-medium text-lg">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-xl">
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
              {/* Content */}
              <div className="mb-8">
                <label htmlFor="content" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Даалгаврын агуулга <span className="text-red-400 ml-1">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows="10"
                  value={formData.content}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all ${
                    errors.content ? 'border-red-500/50' : 'border-slate-600/50'
                  }`}
                  placeholder="Даалгаврын дэлгэрэнгүй тайлбар..."
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.content}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className={formData.content.length >= 10 ? 'text-green-400' : 'text-slate-400'}>
                    {formData.content.length} тэмдэгт
                  </span>
                  <span className="text-slate-500">Хамгийн багадаа 10</span>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Файл хавсаргах
                </label>

                {formData.file_url && (
                  <div className="mb-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-sm text-slate-300 font-medium">Одоогийн файл</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileChange(null)}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
                      >
                        Устгах
                      </button>
                    </div>
                  </div>
                )}

                <div className="border-2 border-dashed border-slate-600 hover:border-blue-500/50 rounded-xl bg-slate-700/30 transition-all">
                  <div className="px-8 py-10 text-center">
                    <svg className="mx-auto h-12 w-12 text-slate-500 mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex justify-center text-sm text-slate-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-lg font-medium text-blue-400 hover:text-blue-300 transition-colors">
                        <span>Шинэ файл сонгох</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">ZIP, PDF, DOCX, PNG хүртэл 10MB</p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="mb-8 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
                  <p className="text-sm text-red-300">{errors.submit}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(`/team2/courses/${course_id}/lessons/${lesson_id}/submissions`)}
                  className="px-8 py-3.5 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-600/50 transition-all duration-300 font-medium border border-slate-600/50"
                  disabled={isSubmitting}
                >
                  Болих
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-yellow-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Хадгалж байна...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Өөрчлөлт хадгалах
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Original Info Card */}
          <div className="mt-8 bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-3">Анхны мэдээлэл:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Үүсгэсэн:</span>
                <p className="text-slate-300 mt-1">{new Date(currentSubmission.created_at).toLocaleString('mn-MN')}</p>
              </div>
              <div>
                <span className="text-slate-500">Сүүлд засагдсан:</span>
                <p className="text-slate-300 mt-1">{new Date(currentSubmission.updated_at).toLocaleString('mn-MN')}</p>
              </div>
              <div>
                <span className="text-slate-500">Статус:</span>
                <p className="text-slate-300 mt-1 font-medium">
                  {currentSubmission.status === 'submitted' ? 'Илгээсэн' : 'Хүлээгдэж буй'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubmissionPage;