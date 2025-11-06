import { useParams, Link } from 'react-router-dom';
import { exams, courses } from '../data/mockData';
import { Calendar, Clock, FileText, Plus } from 'lucide-react';

const ExamList = () => {
  const { course_id } = useParams();
  const course = courses.find(c => c.id === parseInt(course_id));
  const courseExams = exams.filter(e => e.course_id === parseInt(course_id));

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            {course?.name || 'Хичээлийн'} Шалгалтууд
          </h1>
          <p className='text-gray-600 mt-2'>
            Нийт {courseExams.length} шалгалт байна
          </p>
        </div>
        <Link
          to={`/team6/courses/${course_id}/exams/create`}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
          <Plus size={20} />
          Шинэ шалгалт
        </Link>
      </div>

      {courseExams.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-lg shadow'>
          <FileText size={48} className='mx-auto text-gray-400 mb-4' />
          <p className='text-gray-600 text-lg'>Шалгалт байхгүй байна</p>
          <Link
            to={`/team6/courses/${course_id}/exams/create`}
            className='text-blue-600 hover:underline mt-2 inline-block'>
            Эхний шалгалтаа үүсгэх
          </Link>
        </div>
      ) : (
        <div className='grid gap-4'>
          {courseExams.map(exam => (
            <Link
              key={exam.id}
              to={`/team6/exams/${exam.id}`}
              className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow'>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {exam.name}
                  </h3>
                  <p className='text-gray-600 mb-4'>{exam.description}</p>
                  <div className='flex flex-wrap gap-4 text-sm text-gray-500'>
                    <div className='flex items-center gap-2'>
                      <Calendar size={16} />
                      <span>
                        {new Date(exam.start_date).toLocaleDateString('mn-MN')} -{' '}
                        {new Date(exam.close_date).toLocaleDateString('mn-MN')}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock size={16} />
                      <span>{exam.duration} минут</span>
                    </div>
                    <span>
                      {exam.max_attempt === 1
                        ? '1 удаа'
                        : `${exam.max_attempt} удаа`}{' '}
                      өгч болно
                    </span>
                  </div>
                </div>
                <div className='ml-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      new Date(exam.start_date) > new Date()
                        ? 'bg-yellow-100 text-yellow-800'
                        : new Date(exam.close_date) > new Date()
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                    {new Date(exam.start_date) > new Date()
                      ? 'Ирээдүйд'
                      : new Date(exam.close_date) > new Date()
                      ? 'Идэвхтэй'
                      : 'Дууссан'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamList;

