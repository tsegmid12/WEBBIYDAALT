import { useParams, Link } from 'react-router-dom';
import {
  exams,
  examQuestions,
  questionBank,
  studentSubmissions,
} from '../data/mockData';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

const ExamCheck = () => {
  const { exam_id, student_id } = useParams();
  
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
  
  // Load submissions from both mockData and localStorage
  const localStorageSubmissions = JSON.parse(localStorage.getItem('all_exam_submissions') || '[]');
  const allSubmissions = [...studentSubmissions];
  localStorageSubmissions.forEach(lsSub => {
    const existingIndex = allSubmissions.findIndex(
      s => s.exam_id === lsSub.exam_id && s.student_id === lsSub.student_id && s.attempt_number === lsSub.attempt_number
    );
    if (existingIndex >= 0) {
      allSubmissions[existingIndex] = lsSub;
    } else {
      allSubmissions.push(lsSub);
    }
  });
  
  const submission = allSubmissions.find(
    s => s.exam_id === parseInt(exam_id) && s.student_id === parseInt(student_id)
  );
  
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
  
  const examQuestionsList = allExamQuestions.filter(
    eq => eq.exam_id === parseInt(exam_id)
  );
  const questions = examQuestionsList
    .map(eq => ({
      ...eq,
      question: questionBank.find(q => q.id === eq.question_id),
    }))
    .filter(q => q.question);

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

  if (!submission || !exam.show_correct_answer) {
    return (
      <div className='max-w-3xl mx-auto text-center py-12'>
        <p className='text-gray-600 text-lg mb-4'>
          {!submission
            ? 'Хариулт олдсонгүй'
            : 'Энэ шалгалтад зөв хариулт харуулахгүй'}
        </p>
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}/result`}
          className='text-blue-600 hover:underline'>
          Үр дүн руу буцах
        </Link>
      </div>
    );
  }

  const getAnswerForQuestion = (questionId) => {
    return submission?.answers?.find(a => a.question_id === questionId);
  };

  // Categorize questions into completed and incomplete
  const completedQuestions = questions.filter(eq => {
    const answerData = getAnswerForQuestion(eq.question.id);
    return answerData && answerData.answer !== null && answerData.answer !== undefined && answerData.answer !== '';
  });
  
  const incompleteQuestions = questions.filter(eq => {
    const answerData = getAnswerForQuestion(eq.question.id);
    return !answerData || answerData.answer === null || answerData.answer === undefined || answerData.answer === '';
  });

  if (!submission) {
    return (
      <div className='max-w-3xl mx-auto text-center py-12'>
        <p className='text-gray-600 text-lg mb-4'>Хариулт олдсонгүй</p>
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}/result`}
          className='text-blue-600 hover:underline'>
          Үр дүн руу буцах
        </Link>
      </div>
    );
  }

  if (!exam.show_correct_answer) {
    return (
      <div className='max-w-3xl mx-auto text-center py-12'>
        <p className='text-gray-600 text-lg mb-4'>Энэ шалгалтад зөв хариулт харуулахгүй</p>
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}/result`}
          className='text-blue-600 hover:underline'>
          Үр дүн руу буцах
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div className='flex items-center gap-4'>
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}/result`}
          className='p-2 hover:bg-gray-100 rounded-lg'>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            {exam.name} - Зөв хариултууд
          </h1>
          <p className='text-gray-600 mt-2'>
            Оюутан ID: {student_id} • Оноо:{' '}
            {submission.total_earned}/{submission.total_possible} (
            {submission.grade_point.toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Summary Section - Completed vs Incomplete */}
      <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200'>
        <h2 className='text-xl font-bold text-gray-900 mb-4'>Асуултуудын тойм</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-green-50 border-2 border-green-300 rounded-lg p-4'>
            <div className='flex items-center gap-3 mb-2'>
              <CheckCircle className='text-green-600' size={24} />
              <h3 className='font-bold text-green-900 text-lg'>Хариулсан асуултууд</h3>
            </div>
            <p className='text-3xl font-bold text-green-700 mb-1'>{completedQuestions.length}</p>
            <p className='text-sm text-green-800'>Нийт {questions.length} асуултаас</p>
          </div>
          <div className='bg-orange-50 border-2 border-orange-300 rounded-lg p-4'>
            <div className='flex items-center gap-3 mb-2'>
              <XCircle className='text-orange-600' size={24} />
              <h3 className='font-bold text-orange-900 text-lg'>Хариулаагүй асуултууд</h3>
            </div>
            <p className='text-3xl font-bold text-orange-700 mb-1'>{incompleteQuestions.length}</p>
            <p className='text-sm text-orange-800'>Нийт {questions.length} асуултаас</p>
          </div>
        </div>
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <div className='flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-green-500 rounded'></div>
              <span className='text-gray-700'>Хариулсан ({completedQuestions.length})</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-orange-400 rounded'></div>
              <span className='text-gray-700'>Хариулаагүй ({incompleteQuestions.length})</span>
            </div>
            <div className='ml-auto text-gray-600'>
              Нийт оноо: {submission.total_earned} / {submission.total_possible}
            </div>
          </div>
        </div>
      </div>

      {/* Completed Questions Section */}
      {completedQuestions.length > 0 && (
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <CheckCircle className='text-green-600' size={28} />
            Хариулсан асуултууд ({completedQuestions.length})
          </h2>
          <div className='space-y-6'>
            {completedQuestions.map((eq, index) => {
              const originalIndex = questions.findIndex(q => q.id === eq.id);
              const answerData = getAnswerForQuestion(eq.question.id);
              const isCorrect = answerData?.is_correct;

              return (
                <div
                  key={eq.id}
                  className={`bg-white rounded-lg shadow p-6 border-2 ${
                    isCorrect ? 'border-green-200' : 'border-red-200'
                  }`}>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                        {originalIndex + 1}
                      </span>
                      <span className='text-sm text-gray-600'>
                        {eq.question.type} • {eq.point} оноо
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      {isCorrect ? (
                        <>
                          <CheckCircle className='text-green-600' size={20} />
                          <span className='text-green-600 font-medium'>
                            {answerData.point_earned}/{answerData.point_possible}
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className='text-red-600' size={20} />
                          <span className='text-red-600 font-medium'>
                            {answerData?.point_earned || 0}/{answerData?.point_possible || eq.point}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    {eq.question.question}
                  </h3>

                  {eq.question.type === 'single_choice' && (
                    <div className='space-y-2'>
                      {eq.question.options?.map(option => {
                        const isSelected = answerData?.answer === option.id;
                        const isCorrectOption = option.is_correct;
                        return (
                          <div
                        key={option.id}
                        className={`p-3 rounded-lg border-2 ${
                          isCorrectOption
                            ? 'border-green-500 bg-green-50'
                            : isSelected
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200'
                        }`}>
                        <div className='flex items-center gap-2'>
                          {isCorrectOption && (
                            <CheckCircle className='text-green-600' size={16} />
                          )}
                          {isSelected && !isCorrectOption && (
                            <XCircle className='text-red-600' size={16} />
                          )}
                          <span
                            className={
                              isCorrectOption
                                ? 'font-medium text-green-900'
                                : isSelected
                                ? 'font-medium text-red-900'
                                : ''
                            }>
                            {option.id}. {option.text}
                          </span>
                          {isCorrectOption && (
                            <span className='ml-auto text-xs text-green-700'>
                              (Зөв хариулт)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                    </div>
                  )}

                  {eq.question.type === 'multiple_choice' && (
                    <div className='space-y-2'>
                      {eq.question.options?.map(option => {
                        const selectedAnswers =
                          answerData?.answer || [];
                        const isSelected = selectedAnswers.includes(option.id);
                        const isCorrectOption = option.is_correct;
                        return (
                          <div
                        key={option.id}
                        className={`p-3 rounded-lg border-2 ${
                          isCorrectOption
                            ? 'border-green-500 bg-green-50'
                            : isSelected
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200'
                        }`}>
                        <div className='flex items-center gap-2'>
                          {isCorrectOption && (
                            <CheckCircle className='text-green-600' size={16} />
                          )}
                          {isSelected && !isCorrectOption && (
                            <XCircle className='text-red-600' size={16} />
                          )}
                          <span
                            className={
                              isCorrectOption
                                ? 'font-medium text-green-900'
                                : isSelected
                                ? 'font-medium text-red-900'
                                : ''
                            }>
                            {option.id}. {option.text}
                          </span>
                          {isCorrectOption && (
                            <span className='ml-auto text-xs text-green-700'>
                              (Зөв)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                    </div>
                  )}

                  {eq.question.type === 'true_false' && (
                    <div className='space-y-2'>
                      {[true, false].map(value => {
                        const isSelected = answerData?.answer === value;
                        const isCorrect = eq.question.correct_answer === value;
                        return (
                          <div
                            key={value.toString()}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrect
                                ? 'border-green-500 bg-green-50'
                                : isSelected
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200'
                            }`}>
                            <div className='flex items-center gap-2'>
                          {isCorrect && (
                            <CheckCircle className='text-green-600' size={16} />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className='text-red-600' size={16} />
                          )}
                          <span
                            className={
                              isCorrect
                                ? 'font-medium text-green-900'
                                : isSelected
                                ? 'font-medium text-red-900'
                                : ''
                            }>
                            {value ? 'Үнэн' : 'Худал'}
                          </span>
                          {isCorrect && (
                            <span className='ml-auto text-xs text-green-700'>
                              (Зөв хариулт)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                    </div>
                  )}

                  {eq.question.type === 'text_answer' && (
                    <div className='space-y-3'>
                      <div>
                        <p className='text-sm font-medium text-gray-700 mb-2'>
                          Таны хариулт:
                        </p>
                        <div className='p-3 bg-gray-50 rounded-lg border border-gray-200'>
                          {answerData?.answer || 'Хариулт байхгүй'}
                        </div>
                      </div>
                      {eq.question.sample_answer && (
                        <div>
                          <p className='text-sm font-medium text-green-700 mb-2'>
                            Зөв хариултын жишээ:
                          </p>
                          <div className='p-3 bg-green-50 rounded-lg border border-green-200'>
                            {eq.question.sample_answer}
                          </div>
                        </div>
                      )}
                      {answerData?.teacher_comment && (
                        <div>
                          <p className='text-sm font-medium text-blue-700 mb-2'>
                            Багшийн сэтгэгдэл:
                          </p>
                          <div className='p-3 bg-blue-50 rounded-lg border border-blue-200'>
                            {answerData.teacher_comment}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {eq.question.explanation && (
                    <div className='mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200'>
                      <p className='text-sm font-medium text-blue-900 mb-1'>
                        Тайлбар:
                      </p>
                      <p className='text-sm text-blue-800'>
                        {eq.question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Incomplete Questions Section */}
      {incompleteQuestions.length > 0 && (
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <XCircle className='text-orange-600' size={28} />
            Хариулаагүй асуултууд ({incompleteQuestions.length})
          </h2>
          <div className='space-y-6'>
            {incompleteQuestions.map((eq) => {
              const originalIndex = questions.findIndex(q => q.id === eq.id);
              return (
                <div
                  key={eq.id}
                  className='bg-white rounded-lg shadow p-6 border-2 border-orange-200'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <span className='bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium'>
                        {originalIndex + 1}
                      </span>
                      <span className='text-sm text-gray-600'>
                        {eq.question.type} • {eq.point} оноо
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <XCircle className='text-orange-600' size={20} />
                      <span className='text-orange-600 font-medium'>
                        0/{eq.point}
                      </span>
                    </div>
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    {eq.question.question}
                  </h3>
                  <div className='bg-orange-50 border-2 border-orange-300 rounded-lg p-4'>
                    <p className='text-orange-800 font-medium'>
                      Энэ асуултанд хариулаагүй байна
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamCheck;

