import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  exams,
  examQuestions,
  questionBank,
  studentSubmissions,
} from '../data/mockData';
import { Clock, Save, CheckCircle } from 'lucide-react';

const ExamTake = () => {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.id === parseInt(exam_id));
  const examQuestionsList = examQuestions.filter(
    eq => eq.exam_id === parseInt(exam_id)
  );
  const questions = examQuestionsList
    .map(eq => ({
      ...eq,
      question: questionBank.find(q => q.id === eq.question_id),
    }))
    .filter(q => q.question);

  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(exam?.duration * 60 || 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime] = useState(new Date());

  const handleSubmit = () => {
    // In a real app, this would submit to API
    const submission = {
      exam_id: parseInt(exam_id),
      student_id: parseInt(student_id),
      start_time: startTime.toISOString(),
      submit_time: new Date().toISOString(),
      status: 'submitted',
      answers: Object.entries(answers).map(([qId, answer]) => ({
        question_id: parseInt(qId),
        answer,
      })),
    };
    console.log('Submitting exam:', submission);
    navigate(`/team6/exams/${exam_id}/students/${student_id}/result`);
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  if (!exam || questions.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 text-lg'>Шалгалт олдсонгүй</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>{exam.name}</h1>
          <div className='flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg'>
            <Clock className='text-red-600' size={20} />
            <span className='font-bold text-red-600'>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        <div className='mb-4'>
          <div className='flex justify-between text-sm text-gray-600 mb-2'>
            <span>
              Асуулт {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-blue-600 h-2 rounded-full transition-all'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <div className='mb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
              {currentQuestionIndex + 1}
            </span>
            <span className='text-sm text-gray-600'>
              {currentQuestion.question.type} • {currentQuestion.point} оноо
            </span>
          </div>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            {currentQuestion.question.question}
          </h2>
        </div>

        <div className='space-y-3'>
          {currentQuestion.question.type === 'single_choice' &&
            currentQuestion.question.options?.map(option => (
              <label
                key={option.id}
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  answers[currentQuestion.question.id] === option.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200'
                }`}>
                <input
                  type='radio'
                  name={`question-${currentQuestion.question.id}`}
                  value={option.id}
                  checked={answers[currentQuestion.question.id] === option.id}
                  onChange={() =>
                    handleAnswerChange(currentQuestion.question.id, option.id)
                  }
                  className='mt-1'
                />
                <span className='flex-1'>{option.text}</span>
              </label>
            ))}

          {currentQuestion.question.type === 'multiple_choice' &&
            currentQuestion.question.options?.map(option => (
              <label
                key={option.id}
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  answers[currentQuestion.question.id]?.includes(option.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200'
                }`}>
                <input
                  type='checkbox'
                  checked={answers[currentQuestion.question.id]?.includes(
                    option.id
                  )}
                  onChange={e => {
                    const current = answers[currentQuestion.question.id] || [];
                    const newAnswer = e.target.checked
                      ? [...current, option.id]
                      : current.filter(id => id !== option.id);
                    handleAnswerChange(currentQuestion.question.id, newAnswer);
                  }}
                  className='mt-1'
                />
                <span className='flex-1'>{option.text}</span>
              </label>
            ))}

          {currentQuestion.question.type === 'true_false' && (
            <div className='space-y-3'>
              {[true, false].map(value => (
                <label
                  key={value.toString()}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                    answers[currentQuestion.question.id] === value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200'
                  }`}>
                  <input
                    type='radio'
                    name={`question-${currentQuestion.question.id}`}
                    checked={answers[currentQuestion.question.id] === value}
                    onChange={() =>
                      handleAnswerChange(currentQuestion.question.id, value)
                    }
                  />
                  <span>{value ? 'Үнэн' : 'Худал'}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.question.type === 'text_answer' && (
            <textarea
              value={answers[currentQuestion.question.id] || ''}
              onChange={e =>
                handleAnswerChange(currentQuestion.question.id, e.target.value)
              }
              rows={6}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Хариултаа энд бичнэ үү...'
            />
          )}
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between'>
          <button
            onClick={() =>
              setCurrentQuestionIndex(prev => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
            className='px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'>
            Өмнөх
          </button>

          <div className='flex gap-2'>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentQuestionIndex(prev =>
                    Math.min(questions.length - 1, prev + 1)
                  )
                }
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                Дараах
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2'>
                <CheckCircle size={20} />
                Илгээх
              </button>
            )}
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <h3 className='font-semibold text-gray-900 mb-3'>Асуултууд</h3>
        <div className='grid grid-cols-5 gap-2'>
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`p-3 rounded-lg border-2 text-sm font-medium ${
                index === currentQuestionIndex
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : answers[q.question.id]
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamTake;

