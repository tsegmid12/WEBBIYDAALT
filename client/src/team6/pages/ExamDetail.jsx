import { useParams, Link, useNavigate } from 'react-router-dom';
import { exams, examQuestions, questionBank, courses, studentSubmissions } from '../data/mockData';
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  BarChart3,
  Settings,
} from 'lucide-react';

const ExamDetail = () => {
  const { exam_id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.id === parseInt(exam_id));
  const course = exam
    ? courses.find(c => c.id === exam.course_id)
    : null;
  const questions = examQuestions
    .filter(eq => eq.exam_id === parseInt(exam_id))
    .map(eq => ({
      ...eq,
      question: questionBank.find(q => q.id === eq.question_id),
    }));

  // Check if exam has been taken
  const hasSubmissions = studentSubmissions.some(s => s.exam_id === parseInt(exam_id));

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

  const totalPoints = questions.reduce((sum, q) => sum + q.point, 0);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-start'>
        <div>
          <Link
            to={`/team6/courses/${exam.course_id}/exams`}
            className='text-blue-600 hover:underline text-sm mb-2 inline-block'>
            ← {course?.name || 'Хичээл'} руу буцах
          </Link>
          <h1 className='text-3xl font-bold text-gray-900'>{exam.name}</h1>
          <p className='text-gray-600 mt-2'>{exam.description}</p>
        </div>
        <div className='flex gap-2'>
          {!hasSubmissions && (
            <button
              onClick={() => navigate(`/team6/exams/${exam_id}/edit`)}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
              <Edit size={20} />
              Засах
            </button>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Calendar className='text-blue-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Огноо</h3>
          </div>
          <p className='text-sm text-gray-600'>
            {new Date(exam.start_date).toLocaleDateString('mn-MN')} -{' '}
            {new Date(exam.close_date).toLocaleDateString('mn-MN')}
          </p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Clock className='text-green-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Хугацаа</h3>
          </div>
          <p className='text-sm text-gray-600'>{exam.duration} минут</p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <FileText className='text-purple-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Асуулт</h3>
          </div>
          <p className='text-sm text-gray-600'>
            {questions.length} асуулт ({totalPoints} оноо)
          </p>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-900'>Тохиргоо</h2>
          <Link
            to={`/team6/exams/${exam_id}/variants`}
            className='text-blue-600 hover:underline text-sm flex items-center gap-1'>
            <Settings size={16} />
            Хувилбарууд
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <span className='text-sm text-gray-600'>Хувилбар:</span>
            <span className='ml-2 font-medium'>
              {exam.max_attempt === 1
                ? '1 удаа'
                : `${exam.max_attempt} удаа`}{' '}
              өгч болно
            </span>
          </div>
          <div>
            <span className='text-sm text-gray-600'>Асуулт холих:</span>
            <span className='ml-2 font-medium'>
              {exam.is_shuffled ? 'Тийм' : 'Үгүй'}
            </span>
          </div>
          <div>
            <span className='text-sm text-gray-600'>Үр дүн харуулах:</span>
            <span className='ml-2 font-medium'>
              {exam.show_result_after ? 'Тийм' : 'Үгүй'}
            </span>
          </div>
          <div>
            <span className='text-sm text-gray-600'>Зөв хариулт:</span>
            <span className='ml-2 font-medium'>
              {exam.show_correct_answer ? 'Тийм' : 'Үгүй'}
            </span>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-900'>Асуултууд</h2>
        </div>
        <div className='space-y-4'>
          {questions.map((eq, index) => (
            <div
              key={eq.id}
              className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50'>
              <div className='flex justify-between items-start mb-2'>
                <div className='flex items-center gap-3'>
                  <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                    {index + 1}
                  </span>
                  <span className='text-sm text-gray-600'>
                    {eq.question?.type || 'Unknown'} • {eq.point} оноо
                  </span>
                </div>
              </div>
              <p className='text-gray-900'>{eq.question?.question || 'Асуулт олдсонгүй'}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-end'>
        <Link
          to={`/team6/exams/${exam_id}/report`}
          className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2'>
          <BarChart3 size={20} />
          Тайлан харах
        </Link>
      </div>
    </div>
  );
};

export default ExamDetail;

