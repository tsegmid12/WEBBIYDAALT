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
import { courseAPI, progressAPI } from '../../services/api';

export default function LessonsTab() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('id');

  const [openWeek, setOpenWeek] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
      fetchLessonProgress();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const data = await courseAPI.getCourseDetails(courseId);
      const weeksData = data.weeks || data.modules || [];
      setWeeks(weeksData.length > 0 ? weeksData : getDemoWeeks());
    } catch (err) {
      console.error('Error fetching course details:', err);
      setError(err.message);
      setWeeks(getDemoWeeks());
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonProgress = async () => {
    try {
      const data = await progressAPI.getLessonCompletion(courseId);
      const completed = new Set(data.completedLessons || []);
      setCompletedLessons(completed);
    } catch (err) {
      console.error('Error fetching lesson progress:', err);
    }
  };

  const getDemoWeeks = () => [
    {
      id: 0,
      title: 'Ерөнхий',
      lessons: [
        {
          id: 'intro-1',
          title: 'Хичээлийн танилцуулга',
          type: 'video',
          duration: '15 мин',
        },
        {
          id: 'intro-2',
          title: 'Хичээлийн хөтөлбөр',
          type: 'file',
        },
      ],
    },
    {
      id: 1,
      title: 'Week 1',
      lessons: [
        {
          id: 'w1-1',
          title: 'Лабораторийн ажил 1',
          type: 'video',
          duration: '45 мин',
        },
        {
          id: 'w1-2',
          title: 'Гэрийн даалгавар',
          type: 'assignment',
        },
        {
          id: 'w1-2',
          title: 'Явцын шалгалт',
          type: 'exam',
          duration: '30 мин',
        },
      ],
    },
    { id: 2, title: 'Week 2', lessons: [] },
    { id: 3, title: 'Week 3', lessons: [] },
    { id: 4, title: 'Week 4', lessons: [] },
    { id: 5, title: 'Week 5', lessons: [] },
    { id: 6, title: 'Week 6', lessons: [] },
    { id: 7, title: 'Week 7', lessons: [] },
    { id: 8, title: 'Week 8', lessons: [] },
  ];

  const handleLessonClick = async lessonId => {
    try {
      await progressAPI.markLessonComplete(lessonId);
      setCompletedLessons(prev => new Set([...prev, lessonId]));
    } catch (err) {
      console.error('Error marking lesson complete:', err);
    }
  };

  const getLessonIcon = type => {
    switch (type) {
      case 'video':
        return <Video size={16} className='text-blue-500' />;
      case 'assignment':
        return <FileText size={16} className='text-orange-500' />;
      case 'file':
        return <File size={16} className='text-gray-500' />;
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
      {/* {error && (
        <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
          <p className='text-yellow-700'>
            Demo өгөгдөл харуулж байгаа.
          </p>
        </div>
      )} */}

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
                {week.lessons && week.lessons.length > 0 && (
                  <span className='text-sm text-gray-500'>
                    ({week.lessons.length} хичээл)
                  </span>
                )}
              </div>
              <ChevronDown
                className={`text-gray-400 transition-transform ${
                  openWeek === week.id ? 'rotate-180' : ''
                }`}
                size={20}
              />
            </button>

            {openWeek === week.id &&
              week.lessons &&
              week.lessons.length > 0 && (
                <div className='px-6 pb-4 border-t'>
                  <div className='pt-4 space-y-2'>
                    {week.lessons.map((lesson, idx) => (
                      <button
                        key={lesson.id || idx}
                        onClick={() => handleLessonClick(lesson.id)}
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
    </div>
  );
}
