import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  CheckCircle,
  Circle,
  FileText,
  Video,
  File,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { courseAPI, progressAPI } from '../../services/usedAPI';

export default function LessonsTab() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('id');

  const [openWeek, setOpenWeek] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [error, setError] = useState(null);
  // Modal state for lesson details
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
      fetchLessonProgress();
    }
  }, [courseId]);

  /** 🔎 type_id → lesson type */
  const determineLessonType = typeId => {
    switch (typeId) {
      case 10:
        return 'video';
      case 20:
        return 'file';
      case 30:
        return 'assignment';
      case 40:
        return 'exam';
      default:
        return 'other';
    }
  };

  /** 🔎 Backend → weeks[] формат руу хөрвүүлэх */
  const fetchCourseDetails = async () => {
    try {
      setLoading(true);

      const data = await courseAPI.getCourseLessons(courseId);
      const items = data.items || [];

      // Parent (module) — parent_id = null
      const modules = items.filter(i => i.parent_id === null);

      const formatted = modules.map(module => {
        // Children lessons
        const children = items.filter(i => i.parent_id === module.id);

        return {
          id: module.id,
          title: module.name,
          lessons:
            children.length > 0
              ? children.map(ch => ({
                  id: ch.id,
                  title: ch.name,
                  type: determineLessonType(ch.type_id),
                  duration: ch.duration || null,
                  content: ch.content || null,
                }))
              : [
                  {
                    id: module.id,
                    title: module.name,
                    type: determineLessonType(module.type_id),
                    duration: module.duration || null,
                    content: module.content || null,
                  },
                ],
        };
      });

      setWeeks(formatted);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /** ✔ Progress */
  const fetchLessonProgress = async () => {
    try {
      const data = await progressAPI.getLessonCompletion(courseId);
      setCompletedLessons(new Set(data.completedLessons || []));
    } catch (err) {
      console.error('Progress error:', err);
    }
  };

  /** ✔ Mark Complete */
  const markLessonComplete = async lessonId => {
    try {
      await progressAPI.markLessonComplete(lessonId);
      setCompletedLessons(prev => new Set([...prev, lessonId]));
    } catch (err) {
      console.error('Mark complete error:', err);
    }
  };

  // Show lesson details in modal
  const handleLessonClick = lesson => {
    setSelectedLesson(lesson);
  };

  /** ✔ Icons */
  const getLessonIcon = type => {
    switch (type) {
      case 'video':
        return <Video size={18} className='text-blue-500' />;
      case 'assignment':
        return <FileText size={18} className='text-orange-500' />;
      case 'file':
        return <File size={18} className='text-gray-500' />;
      case 'exam':
        return <FileText size={18} className='text-red-500' />;
      default:
        return <Circle size={16} className='text-gray-400' />;
    }
  };

  if (loading) {
    return (
      <div className='max-w-2xl mx-auto text-center py-12'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4'></div>
        <p className='text-gray-600'>Хичээлийн агуулгыг ачааллаж байна...</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto space-y-3'>
      {weeks.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500'>Хичээлийн агуулга олдсонгүй</p>
        </div>
      ) : (
        weeks.map(week => (
          <div
            key={week.id}
            className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
            <button
              onClick={() => setOpenWeek(openWeek === week.id ? null : week.id)}
              className='w-full px-6 py-4 flex items-center justify-between text-left'>
              <div className='flex items-center gap-3'>
                <span className='font-semibold text-gray-900'>
                  {week.title}
                </span>
                {week.lessons.length > 0 && (
                  <span className='text-sm text-gray-500'>
                    ({week.lessons.length} хичээл)
                  </span>
                )}
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  openWeek === week.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openWeek === week.id && (
              <div className='px-6 pb-4 border-t'>
                <div className='pt-4 space-y-2'>
                  {week.lessons.map((lesson, idx) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson)}
                      className='w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left'>
                      <div className='flex-shrink-0'>
                        {completedLessons.has(lesson.id) ? (
                          <CheckCircle size={20} className='text-green-500' />
                        ) : (
                          getLessonIcon(lesson.type)
                        )}
                      </div>
                      <div className='flex-1'>
                        <div className='text-gray-800 text-sm font-medium'>
                          {lesson.title || lesson.name || `Lesson ${idx + 1}`}
                        </div>
                        {lesson.duration && (
                          <div className='text-gray-500 text-xs mt-0.5'>
                            {lesson.duration}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {/* Modal for lesson details */}
      {selectedLesson && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg relative'>
            <button
              onClick={() => setSelectedLesson(null)}
              className='absolute right-4 top-4 text-gray-500 hover:text-black'>
              ✕
            </button>

            <h2 className='text-lg font-semibold mb-4'>
              {selectedLesson.title}
            </h2>

            <div
              className='prose max-w-full'
              dangerouslySetInnerHTML={{
                __html: selectedLesson.content,
              }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
