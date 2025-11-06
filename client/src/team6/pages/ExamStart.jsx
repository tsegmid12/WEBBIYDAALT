import { useParams, Link, useNavigate } from 'react-router-dom';
import { exams, courses } from '../data/mockData';
import { Clock, Calendar, FileText, Play, AlertCircle } from 'lucide-react';

const ExamStart = () => {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.id === parseInt(exam_id));
  const course = exam
    ? courses.find(c => c.id === exam.course_id)
    : null;

  if (!exam) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 text-lg'>Шалгалт олдсонгүй</p>
        <Link to='/team6' className='text-blue-600 hover:underline mt-2 inline-block'>
          Нүүр хуудас руу буцах
        </Link>
      </div>
    );
  }

  const now = new Date();
  const startDate = new Date(exam.start_date);
  const closeDate = new Date(exam.close_date);
  const isAvailable = now >= startDate && now <= closeDate;
  const isUpcoming = now < startDate;
  const isExpired = now > closeDate;

  const handleStart = () => {
    navigate(`/team6/exams/${exam_id}/students/${student_id}/edit`);
  };

  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>{exam.name}</h1>
        {course && (
          <p className='text-gray-600 mb-6'>Хичээл: {course.name}</p>
        )}

        {exam.description && (
          <div className='mb-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-2'>
              Тайлбар
            </h2>
            <p className='text-gray-700'>{exam.description}</p>
          </div>
        )}

        <div className='space-y-4 mb-8'>
          <div className='flex items-center gap-3 text-gray-700'>
            <Calendar size={20} className='text-blue-600' />
            <div>
              <span className='font-medium'>Огноо:</span>{' '}
              {new Date(exam.start_date).toLocaleDateString('mn-MN')} -{' '}
              {new Date(exam.close_date).toLocaleDateString('mn-MN')}
            </div>
          </div>

          <div className='flex items-center gap-3 text-gray-700'>
            <Clock size={20} className='text-green-600' />
            <div>
              <span className='font-medium'>Хугацаа:</span> {exam.duration}{' '}
              минут
            </div>
          </div>

          <div className='flex items-center gap-3 text-gray-700'>
            <FileText size={20} className='text-purple-600' />
            <div>
              <span className='font-medium'>Хувилбар:</span>{' '}
              {exam.max_attempt === 1
                ? '1 удаа'
                : `${exam.max_attempt} удаа`}{' '}
              өгч болно
            </div>
          </div>
        </div>

        {isUpcoming && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='text-yellow-600 flex-shrink-0 mt-0.5' size={20} />
              <div>
                <p className='font-medium text-yellow-900'>
                  Шалгалт хараахан эхлээгүй байна
                </p>
                <p className='text-sm text-yellow-700 mt-1'>
                  Шалгалт {new Date(exam.start_date).toLocaleString('mn-MN')}{' '}
                  эхлэх болно.
                </p>
              </div>
            </div>
          </div>
        )}

        {isExpired && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='text-red-600 flex-shrink-0 mt-0.5' size={20} />
              <div>
                <p className='font-medium text-red-900'>
                  Шалгалт дууссан байна
                </p>
                <p className='text-sm text-red-700 mt-1'>
                  Шалгалт {new Date(exam.close_date).toLocaleString('mn-MN')}{' '}
                  дууссан.
                </p>
              </div>
            </div>
          </div>
        )}

        {isAvailable && (
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='text-blue-600 flex-shrink-0 mt-0.5' size={20} />
              <div>
                <p className='font-medium text-blue-900'>
                  Шалгалт өгөх боломжтой
                </p>
                <p className='text-sm text-blue-700 mt-1'>
                  Шалгалт эхлүүлэхдээ тайван орчинд байгаа эсэхээ шалгана уу.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className='flex gap-4'>
          <button
            onClick={() => navigate(-1)}
            className='px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50'>
            Буцах
          </button>
          {isAvailable && (
            <button
              onClick={handleStart}
              className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium'>
              <Play size={20} />
              Шалгалт эхлүүлэх
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamStart;

