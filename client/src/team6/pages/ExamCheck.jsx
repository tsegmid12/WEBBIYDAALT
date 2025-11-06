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
  const exam = exams.find(e => e.id === parseInt(exam_id));
  const submission = studentSubmissions.find(
    s => s.exam_id === parseInt(exam_id) && s.student_id === parseInt(student_id)
  );
  const examQuestionsList = examQuestions.filter(
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
    return submission.answers.find(a => a.question_id === questionId);
  };

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

      <div className='space-y-6'>
        {questions.map((eq, index) => {
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
                    {index + 1}
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
  );
};

export default ExamCheck;

