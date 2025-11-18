import { useParams, Link, useNavigate } from 'react-router-dom';
import { exams, courses, studentSubmissions as allStudentSubmissions, examQuestions } from '../data/mockData';
import { Clock, Calendar, FileText, Play, AlertCircle, X, Users, Award } from 'lucide-react';
import { useState } from 'react';

const ExamStart = () => {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();
  const [showClosedWarning, setShowClosedWarning] = useState(false);
  
  // Load exams from both mockData and localStorage
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
  
  const exam = allExams.find(e => e.id === parseInt(exam_id));
  const course = exam
    ? courses.find(c => c.id === exam.course_id)
    : null;
  
  // Get student's previous attempts
  const studentAttempts = allStudentSubmissions.filter(
    s => s.exam_id === parseInt(exam_id) && s.student_id === parseInt(student_id)
  );
  const nextAttemptNumber = studentAttempts.length + 1;
  const canTakeExam = nextAttemptNumber <= (exam?.max_attempt || 1);
  
  // Get exam questions for total score display (from both mockData and localStorage)
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
  const examQuestionsList = allExamQuestions.filter(eq => eq.exam_id === parseInt(exam_id));
  const totalPoints = examQuestionsList.reduce((sum, eq) => sum + eq.point, 0);

  if (!exam) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 text-lg'>Шалгалт олдсонгүй</p>
        <Link to='/team6/exam' className='text-blue-600 hover:underline mt-2 inline-block'>
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

  const [showBeginConfirm, setShowBeginConfirm] = useState(false);

  const handleStart = () => {
    if (isExpired) {
      setShowClosedWarning(true);
      return;
    }
    if (!isAvailable || !canTakeExam) {
      return;
    }
    setShowBeginConfirm(true);
  };

  const handleBegin = () => {
    navigate(`/team6/exams/${exam_id}/students/${student_id}/edit`);
  };

  const handleBack = () => {
    navigate('/team6');
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
          
          <div className='flex items-center gap-3 text-gray-700'>
            <Award size={20} className='text-yellow-600' />
            <div>
              <span className='font-medium'>Нийт оноо:</span> {totalPoints} / {exam.total_score}
            </div>
          </div>
          
          {exam.course_grade_contribution && (
            <div className='flex items-center gap-3 text-gray-700'>
              <Users size={20} className='text-indigo-600' />
              <div>
                <span className='font-medium'>Хичээлийн дүнд эзлэх хувь:</span> {exam.course_grade_contribution}%
              </div>
            </div>
          )}
        </div>

        {isUpcoming && (
          <div className='bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 mb-6'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='text-yellow-600 flex-shrink-0 mt-0.5' size={24} />
              <div className='flex-1'>
                <p className='font-semibold text-yellow-900 text-lg mb-1'>
                  Шалгалт хараахан эхлээгүй байна
                </p>
                <p className='text-sm text-yellow-800'>
                  Шалгалт {new Date(exam.start_date).toLocaleString('mn-MN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}{' '}
                  эхлэх болно.
                </p>
              </div>
            </div>
          </div>
        )}

        {isExpired && (
          <div className='bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='text-red-600 flex-shrink-0 mt-0.5' size={24} />
              <div className='flex-1'>
                <p className='font-semibold text-red-900 text-lg mb-1'>
                  Шалгалт дууссан байна
                </p>
                <p className='text-sm text-red-800'>
                  Шалгалт {new Date(exam.close_date).toLocaleString('mn-MN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}{' '}
                  дууссан. Хараахан шалгалт өгөөгүй бол танд боломж байхгүй.
                </p>
              </div>
            </div>
          </div>
        )}

        {isAvailable && (
          <div className='space-y-4 mb-6'>
            <div className='bg-green-50 border-l-4 border-green-500 rounded-lg p-4'>
              <div className='flex items-start gap-3'>
                <AlertCircle className='text-green-600 flex-shrink-0 mt-0.5' size={24} />
                <div className='flex-1'>
                  <p className='font-semibold text-green-900 text-lg mb-1'>
                    Шалгалт өгөх боломжтой
                  </p>
                  <p className='text-sm text-green-800'>
                    Шалгалт эхлүүлэхдээ тайван орчинд байгаа эсэхээ шалгана уу. Шалгалт эхлэхэд {exam.duration} минут хугацаа өгөгдөнө.
                  </p>
                </div>
              </div>
            </div>
            
            {studentAttempts.length > 0 && (
              <div className='bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <Users className='text-blue-600 flex-shrink-0 mt-0.5' size={24} />
                  <div className='flex-1'>
                    <p className='font-semibold text-blue-900 text-lg mb-1'>
                      Таны оролдлогууд
                    </p>
                    <p className='text-sm text-blue-800 mb-2'>
                      Та {studentAttempts.length} удаа оролдсон байна. Энэ нь {nextAttemptNumber}-р оролдлого болно.
                    </p>
                    {studentAttempts.map((attempt, idx) => (
                      <div key={attempt.id} className='text-xs text-blue-700 mt-1'>
                        {idx + 1}-р оролдлого: {attempt.grade_point.toFixed(1)}% ({new Date(attempt.submit_time).toLocaleDateString('mn-MN')})
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {!canTakeExam && (
              <div className='bg-red-50 border-l-4 border-red-500 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='text-red-600 flex-shrink-0 mt-0.5' size={24} />
                  <div className='flex-1'>
                    <p className='font-semibold text-red-900 text-lg mb-1'>
                      Оролдлогын хязгаарт хүрсэн
                    </p>
                    <p className='text-sm text-red-800'>
                      Та {exam.max_attempt} удаа оролдсон. Дахин оролдох боломжгүй.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className='flex gap-4 pt-4'>
          <button
            onClick={handleBack}
            className='px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors'>
            Буцах
          </button>
          {isAvailable && canTakeExam && (
            <button
              onClick={handleStart}
              className='flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105'>
              <Play size={24} />
              Шалгалт өгөх
            </button>
          )}
          
          {isAvailable && !canTakeExam && (
            <div className='flex-1 bg-gray-100 text-gray-600 px-8 py-4 rounded-lg text-center font-medium'>
              Оролдлогын хязгаарт хүрсэн
            </div>
          )}
        </div>
      </div>

      {/* Begin Exam Confirmation Modal */}
      {showBeginConfirm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in'>
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-100 rounded-full'>
                  <Play className='text-blue-600' size={24} />
                </div>
                <h3 className='text-xl font-bold text-gray-900'>
                  Шалгалт эхлүүлэх
                </h3>
              </div>
              <button
                onClick={() => setShowBeginConfirm(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'>
                <X size={24} />
              </button>
            </div>
            <div className='mb-6'>
              <p className='text-gray-700 mb-4'>
                Та шалгалт эхлүүлэхдээ итгэлтэй байна уу? Шалгалт эхлэхэд {exam.duration} минут хугацаа өгөгдөнө.
              </p>
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2'>
                <p className='text-sm text-blue-900'>
                  <strong>Шалгалт:</strong> {exam.name}
                </p>
                <p className='text-sm text-blue-900'>
                  <strong>Хугацаа:</strong> {exam.duration} минут
                </p>
                {nextAttemptNumber > 1 && (
                  <p className='text-sm text-blue-900'>
                    <strong>Оролдлого:</strong> {nextAttemptNumber}-р удаа
                  </p>
                )}
              </div>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowBeginConfirm(false)}
                className='flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors'>
                Буцах
              </button>
              <button
                onClick={handleBegin}
                className='flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-semibold transition-all flex items-center justify-center gap-2'>
                <Play size={20} />
                Эхлүүлэх
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exam Closed Warning Modal */}
      {showClosedWarning && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in'>
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-red-100 rounded-full'>
                  <AlertCircle className='text-red-600' size={24} />
                </div>
                <h3 className='text-xl font-bold text-gray-900'>
                  Шалгалт дууссан
                </h3>
              </div>
              <button
                onClick={() => setShowClosedWarning(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'>
                <X size={24} />
              </button>
            </div>
            <div className='mb-6'>
              <p className='text-gray-700 mb-4'>
                Уучлаарай, энэ шалгалт аль хэдийн дууссан байна. Шалгалт өгөх боломжгүй.
              </p>
              <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                <p className='text-sm text-red-800'>
                  <strong>Дуусгах огноо:</strong>{' '}
                  {new Date(exam.close_date).toLocaleString('mn-MN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowClosedWarning(false)}
                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors'>
                Ойлголоо
              </button>
              <button
                onClick={handleBack}
                className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors'>
                Нүүр хуудас руу буцах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamStart;
