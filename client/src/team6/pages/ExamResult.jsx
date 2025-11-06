import { useParams, Link } from 'react-router-dom';
import {
  exams,
  studentSubmissions,
  courses,
} from '../data/mockData';
import { Award, CheckCircle, XCircle, Eye, ArrowLeft } from 'lucide-react';

const ExamResult = () => {
  const { exam_id, student_id } = useParams();
  const exam = exams.find(e => e.id === parseInt(exam_id));
  const submission = studentSubmissions.find(
    s => s.exam_id === parseInt(exam_id) && s.student_id === parseInt(student_id)
  );
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

  if (!submission) {
    return (
      <div className='max-w-3xl mx-auto text-center py-12'>
        <p className='text-gray-600 text-lg mb-4'>Үр дүн олдсонгүй</p>
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}`}
          className='text-blue-600 hover:underline'>
          Шалгалт эхлүүлэх
        </Link>
      </div>
    );
  }

  const passed = submission.grade_point >= 60;
  const correctCount = submission.answers.filter(a => a.is_correct).length;
  const totalCount = submission.answers.length;

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div className='flex items-center gap-4'>
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}`}
          className='p-2 hover:bg-gray-100 rounded-lg'>
          <ArrowLeft size={20} />
        </Link>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {exam.name} - Үр дүн
          </h1>
          {course && (
            <p className='text-gray-600 mt-1'>Хичээл: {course.name}</p>
          )}
        </div>
      </div>

      <div
        className={`bg-white rounded-lg shadow-lg p-8 text-center ${
          passed ? 'border-2 border-green-500' : 'border-2 border-red-500'
        }`}>
        <div className='mb-6'>
          {passed ? (
            <CheckCircle className='mx-auto text-green-600 mb-4' size={64} />
          ) : (
            <XCircle className='mx-auto text-red-600 mb-4' size={64} />
          )}
          <h2
            className={`text-2xl font-bold mb-2 ${
              passed ? 'text-green-900' : 'text-red-900'
            }`}>
            {passed ? 'Тэнцсэн байна!' : 'Тэнцээгүй байна'}
          </h2>
          <p className='text-gray-600'>
            {submission.submit_time &&
              `Илгээсэн: ${new Date(submission.submit_time).toLocaleString('mn-MN')}`}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-6 mb-6'>
          <div className='bg-gray-50 rounded-lg p-4'>
            <p className='text-sm text-gray-600 mb-1'>Оноо</p>
            <p className='text-3xl font-bold text-gray-900'>
              {submission.total_earned}/{submission.total_possible}
            </p>
          </div>
          <div className='bg-gray-50 rounded-lg p-4'>
            <p className='text-sm text-gray-600 mb-1'>Эзлэх хувь</p>
            <p className='text-3xl font-bold text-gray-900'>
              {submission.grade_point.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className='flex items-center justify-center gap-4 mb-6'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='text-green-600' size={20} />
            <span className='text-gray-700'>
              Зөв: {correctCount}/{totalCount}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <XCircle className='text-red-600' size={20} />
            <span className='text-gray-700'>
              Буруу: {totalCount - correctCount}/{totalCount}
            </span>
          </div>
        </div>

        {submission.status === 'submitted' && (
          <div className='pt-6 border-t'>
            <p className='text-sm text-gray-600 mb-4'>
              {submission.teacher_checked
                ? 'Багш шалгасан'
                : 'Багш шалгах хүлээгдэж байна'}
            </p>
          </div>
        )}
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
          Дэлгэрэнгүй мэдээлэл
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-gray-600'>Эхлэсэн цаг</p>
            <p className='font-medium'>
              {submission.start_time
                ? new Date(submission.start_time).toLocaleString('mn-MN')
                : '-'}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Илгээсэн цаг</p>
            <p className='font-medium'>
              {submission.submit_time
                ? new Date(submission.submit_time).toLocaleString('mn-MN')
                : '-'}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Төлөв</p>
            <p className='font-medium'>
              {submission.status === 'submitted'
                ? 'Илгээсэн'
                : submission.status === 'in_progress'
                ? 'Явж байна'
                : 'Эхэлсэн'}
            </p>
          </div>
          {submission.checked_by && (
            <div>
              <p className='text-sm text-gray-600'>Шалгасан</p>
              <p className='font-medium'>
                {submission.checked_at
                  ? new Date(submission.checked_at).toLocaleDateString('mn-MN')
                  : '-'}
              </p>
            </div>
          )}
        </div>
      </div>

      {exam.show_correct_answer && (
        <div className='flex justify-center'>
          <Link
            to={`/team6/exams/${exam_id}/students/${student_id}/check`}
            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
            <Eye size={20} />
            Зөв хариултууд харах
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExamResult;

