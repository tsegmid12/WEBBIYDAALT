// ==========================================
// 11. ExamTaking.jsx - Шалгалт өгөх
// ==========================================

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const exam = { name: "Сорил 1", duration: 60 };

const questions = [
  {
    id: 1,
    type: "single_choice",
    question: "React нь юу вэ?",
    point: 5,
    options: [
      { id: 'a', text: "JavaScript сан" },
      { id: 'b', text: "CSS framework" },
      { id: 'c', text: "Backend framework" },
      { id: 'd', text: "Database" }
    ]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "React Hooks-д аль нь багтдаг вэ?",
    point: 10,
    options: [
      { id: 'a', text: "useState" },
      { id: 'b', text: "useEffect" },
      { id: 'c', text: "useQuery" },
      { id: 'd', text: "useContext" }
    ]
  },
  {
    id: 3,
    type: "true_false",
    question: "React нь virtual DOM ашигладаг.",
    point: 5
  },
  {
    id: 4,
    type: "text_answer",
    question: "Node.js-д package.json файлын үүрэг юу вэ?",
    point: 10
  }
];

export default function ExamTaking() {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(exam.duration * 60);

  const currentQuestion = questions[currentIndex];

  // ✅ handleSubmit-г useCallback болгож анхааруулга арилгав
  const handleSubmit = useCallback(() => {
    console.log('Шалгалт дуусгах:', answers);
    navigate(`/exams/${exam_id}/students/${student_id}/result`);
  }, [answers, exam_id, student_id, navigate]);

  useEffect(() => {
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
  }, [handleSubmit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleMultipleChoice = (questionId, optionId) => {
    const current = answers[questionId] || [];
    const updated = current.includes(optionId)
      ? current.filter(id => id !== optionId)
      : [...current, optionId];
    handleAnswer(questionId, updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-gray-800">{exam.name}</h1>
              <p className="text-sm text-gray-500">Асуулт {currentIndex + 1} / {questions.length}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-red-600">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-xs text-gray-500">Үлдсэн хугацаа</div>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
              >
                ✓ Дуусгах
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                  Асуулт {currentIndex + 1}
                </span>
                <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                  {currentQuestion.point} оноо
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{currentQuestion.question}</h2>
            </div>
          </div>

          <div className="mt-6">
            {currentQuestion.type === 'single_choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map(option => (
                  <label
                    key={option.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      answers[currentQuestion.id] === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${currentQuestion.id}`}
                      value={option.id}
                      checked={answers[currentQuestion.id] === option.id}
                      onChange={() => handleAnswer(currentQuestion.id, option.id)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multiple_choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map(option => (
                  <label
                    key={option.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      (answers[currentQuestion.id] || []).includes(option.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={(answers[currentQuestion.id] || []).includes(option.id)}
                      onChange={() => handleMultipleChoice(currentQuestion.id, option.id)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span className="ml-3 text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'true_false' && (
              <div className="flex gap-4">
                <label className={`flex-1 p-6 border-2 rounded-lg cursor-pointer text-center transition ${
                  answers[currentQuestion.id] === true ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name={`q${currentQuestion.id}`}
                    checked={answers[currentQuestion.id] === true}
                    onChange={() => handleAnswer(currentQuestion.id, true)}
                    className="hidden"
                  />
                  <div className="text-4xl mb-2">✓</div>
                  <div className="font-semibold">Үнэн</div>
                </label>

                <label className={`flex-1 p-6 border-2 rounded-lg cursor-pointer text-center transition ${
                  answers[currentQuestion.id] === false ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name={`q${currentQuestion.id}`}
                    checked={answers[currentQuestion.id] === false}
                    onChange={() => handleAnswer(currentQuestion.id, false)}
                    className="hidden"
                  />
                  <div className="text-4xl mb-2">✗</div>
                  <div className="font-semibold">Худал</div>
                </label>
              </div>
            )}

            {currentQuestion.type === 'text_answer' && (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder="Хариултаа энд бичнэ үү..."
                className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-blue-500 focus:outline-none min-h-[150px]"
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50"
          >
            ← Өмнөх
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-10 h-10 rounded-lg font-semibold ${
                  index === currentIndex
                    ? 'bg-blue-600 text-white'
                    : answers[questions[index].id]
                    ? 'bg-green-100 text-green-700 border-2 border-green-500'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            Дараах →
          </button>
        </div>
      </div>
    </div>
  );
}
