import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { exams, examQuestions, questionBank, courses, studentSubmissions, users } from '../data/mockData';
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  BarChart3,
  Settings,
  Users,
  Award,
  CheckCircle,
} from 'lucide-react';

const ExamDetail = () => {
  const { exam_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [examData, setExamData] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  
  // Load exams from both mockData and localStorage
  useEffect(() => {
    const localStorageExams = JSON.parse(localStorage.getItem('all_exams') || '[]');
    const allExams = [...exams];
    localStorageExams.forEach(lsExam => {
      const existingIndex = allExams.findIndex(e => e.id === lsExam.id);
      if (existingIndex >= 0) {
        allExams[existingIndex] = lsExam;
      } else {
        allExams.push(lsExam);
      }
    });
    
    const foundExam = allExams.find(e => e.id === parseInt(exam_id));
    setExamData(foundExam);
    
    // Load exam questions from both mockData and localStorage
    const localStorageExamQuestions = JSON.parse(localStorage.getItem('all_exam_questions') || '[]');
    const allExamQuestions = [...examQuestions];
    localStorageExamQuestions.forEach(lsEq => {
      const existingIndex = allExamQuestions.findIndex(eq => eq.exam_id === lsEq.exam_id && eq.question_id === lsEq.question_id);
      if (existingIndex >= 0) {
        allExamQuestions[existingIndex] = lsEq;
      } else {
        allExamQuestions.push(lsEq);
      }
    });
    
    const examQs = allExamQuestions
      .filter(eq => eq.exam_id === parseInt(exam_id))
      .map(eq => ({
        ...eq,
        question: questionBank.find(q => q.id === eq.question_id),
      }));
    setQuestionsData(examQs);
  }, [exam_id]);
  
  const exam = examData;
  const course = exam ? courses.find(c => c.id === exam.course_id) : null;
  const questions = questionsData;

  // Check if exam has been taken
  const hasSubmissions = exam ? studentSubmissions.some(s => s.exam_id === parseInt(exam_id)) : false;
  const submissions = studentSubmissions.filter(s => s.exam_id === parseInt(exam_id));
  
  // Get eligible students
  const eligibleStudentIds = exam?.eligible_student_ids || users.filter(u => u.role === 'student').map(u => u.id);
  const eligibleStudents = users.filter(u => eligibleStudentIds.includes(u.id));

  // Calculate total points
  const totalPoints = questions.reduce((sum, q) => sum + q.point, 0);
  const courseGradeContribution = exam?.course_grade_contribution || 20;

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
  const isUpcoming = now < startDate;
  const isActive = now >= startDate && now <= closeDate;
  const isCompleted = now > closeDate;

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
          <p className='text-gray-600 mt-2'>{exam.description || 'Тайлбар байхгүй'}</p>
        </div>
        <div className='flex gap-2'>
          {!hasSubmissions && (
            <button
              onClick={() =>
                navigate(`/team6/courses/${exam.course_id}/exams/${exam_id}/edit`, {
                  state: { returnTo: location.pathname },
                })
              }
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
              <Edit size={20} />
              Засах
            </button>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex items-center gap-3'>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            isUpcoming
              ? 'bg-yellow-100 text-yellow-800'
              : isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {isUpcoming
              ? 'Ирээдүйд'
              : isActive
              ? 'Идэвхтэй'
              : 'Дууссан'}
          </span>
          {submissions.length > 0 && (
            <span className='text-sm text-gray-600'>
              {submissions.length} оюутан өгсөн
            </span>
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
            Эхлэх: {new Date(exam.start_date).toLocaleString('mn-MN')}
          </p>
          <p className='text-sm text-gray-600'>
            Дуусах: {new Date(exam.close_date).toLocaleString('mn-MN')}
          </p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Clock className='text-green-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Хугацаа</h3>
          </div>
          <p className='text-sm text-gray-600'>{exam.duration} минут</p>
          <p className='text-xs text-gray-500 mt-1'>
            Хэдэн удаа өгч болох: {exam.max_attempt === 1 ? '1 удаа' : `${exam.max_attempt} удаа`}
          </p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <FileText className='text-purple-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Асуулт</h3>
          </div>
          <p className='text-sm text-gray-600'>
            {questions.length} асуулт
          </p>
          <p className='text-sm text-gray-600'>
            Нийт оноо: {totalPoints} / {exam.total_score}
          </p>
        </div>
      </div>

      {/* Score and Contribution */}
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
          <Award size={24} />
          Оноо ба хувь нэмэр
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <p className='text-sm text-gray-600 mb-1'>Нийт оноо</p>
            <p className='text-2xl font-bold text-blue-600'>
              {totalPoints} / {exam.total_score}
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              Хамгийн өндөр оноотой оюутан {exam.total_score} оноо авна
            </p>
          </div>
          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <p className='text-sm text-gray-600 mb-1'>Хичээлийн дүнд эзлэх хувь</p>
            <p className='text-2xl font-bold text-green-600'>
              {courseGradeContribution}%
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              Энэ шалгалт хичээлийн дүнд {courseGradeContribution}% эзлэнэ
            </p>
          </div>
        </div>
      </div>

      {/* Eligible Students */}
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
          <Users size={24} />
          Шалгалт өгөх боломжтой оюутнууд
        </h2>
        <p className='text-sm text-gray-600 mb-4'>
          Нийт {eligibleStudents.length} оюутан
        </p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto'>
          {eligibleStudents.map(student => {
            const studentSubmissions = submissions.filter(s => s.student_id === student.id);
            const attemptCount = studentSubmissions.length;
            return (
              <div
                key={student.id}
                className='p-3 border border-gray-200 rounded-lg hover:bg-gray-50'>
                <p className='text-sm font-medium text-gray-900'>
                  {student.first_name}
                </p>
                <p className='text-xs text-gray-500'>ID: {student.id}</p>
                {attemptCount > 0 && (
                  <p className='text-xs text-blue-600 mt-1'>
                    {attemptCount} удаа өгсөн
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Configuration */}
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

      {/* Questions List */}
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

      {/* Student Submissions Summary */}
      {submissions.length > 0 && (
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <CheckCircle size={24} />
            Оюутнуудын үр дүн
          </h2>
          <div className='space-y-2'>
            {submissions.slice(0, 10).map(submission => {
              const student = users.find(u => u.id === submission.student_id);
              const completionTime = submission.completion_time_minutes || 
                Math.floor((new Date(submission.submit_time) - new Date(submission.start_time)) / 1000 / 60);
              return (
                <div
                  key={submission.id}
                  className='flex items-center justify-between p-3 border border-gray-200 rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900'>
                      {student?.first_name || `Оюутан ${submission.student_id}`}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {submission.attempt_number ? `${submission.attempt_number}-р оролдлого` : '1-р оролдлого'} • 
                      {' '}Дуусгасан: {completionTime} минут
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold text-gray-900'>
                      {submission.grade_point.toFixed(1)}%
                    </p>
                    <p className='text-xs text-gray-500'>
                      {submission.total_earned}/{submission.total_possible}
                    </p>
                  </div>
                </div>
              );
            })}
            {submissions.length > 10 && (
              <Link
                to={`/team6/exams/${exam_id}/report`}
                className='block text-center text-blue-600 hover:underline mt-4'>
                Бүх үр дүн харах ({submissions.length} оюутан)
              </Link>
            )}
          </div>
        </div>
      )}

      <div className='flex justify-end gap-4'>
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