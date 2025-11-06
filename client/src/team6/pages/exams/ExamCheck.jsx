// ==========================================
// 12. ExamCheck.jsx - Зөв хариулт харах
// ==========================================

import { useParams, Link } from 'react-router-dom';

const exam = { name: "Сорил 1" };

const questions = [
  {
    id: 1,
    type: "single_choice",
    question: "React нь юу вэ?",
    point: 5,
    student_answer: 'a',
    correct_answer: 'a',
    is_correct: true,
    point_earned: 5,
    options: [
      { id: 'a', text: "JavaScript сан", is_correct: true },
      { id: 'b', text: "CSS framework" },
      { id: 'c', text: "Backend framework" },
      { id: 'd', text: "Database" }
    ],
    explanation: "React бол Facebook-с бүтээсэн JavaScript сан юм."
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "React Hooks-д аль нь багтдаг вэ?",
    point: 10,
    student_answer: ['a', 'b'],
    correct_answer: ['a', 'b', 'd'],
    is_correct: false,
    point_earned: 6,
    options: [
      { id: 'a', text: "useState", is_correct: true },
      { id: 'b', text: "useEffect", is_correct: true },
      { id: 'c', text: "useQuery" },
      { id: 'd', text: "useContext", is_correct: true }
    ],
    explanation: "useState, useEffect, useContext нь React-ийн үндсэн hooks юм."
  },
  {
    id: 3,
    type: "true_false",
    question: "React нь virtual DOM ашигладаг.",
    point: 5,
    student_answer: true,
    correct_answer: true,
    is_correct: true,
    point_earned: 5,
    explanation: "React нь гүйцэтгэлийг сайжруулахын тулд virtual DOM ашигладаг."
  },
  {
    id: 4,
    type: "text_answer",
    question: "Node.js-д package.json файлын үүрэг юу вэ?",
    point: 10,
    student_answer: "Package.json файл нь төслийн dependencies болон тохиргоог хадгална",
    is_correct: true,
    point_earned: 8,
    teacher_comment: "Сайн хариулт. Гэхдээ дэлгэрэнгүй бичих байсан.",
    explanation: "Package.json нь Node.js төслийн тохиргоо, хамаарлуудыг агуулна."
  }
];

export default function ExamCheck() {
  const { exam_id, student_id } = useParams();
  
  const totalEarned = questions.reduce((sum, q) => sum + q.point_earned, 0);
  const totalPossible = questions.reduce((sum, q) => sum + q.point, 0);
  const percentage = (totalEarned / totalPossible) * 100;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{exam.name} - Зөв хариултууд</h1>
        <p className="text-gray-600 mt-1">Таны хариултыг зөв хариулттай харьцуулж үзнэ үү</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Таны оноо</div>
            <div className="text-4xl font-bold text-blue-600">{totalEarned}/{totalPossible}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Хувь</div>
            <div className="text-4xl font-bold text-purple-600">{percentage.toFixed(1)}%</div>
          </div>
          <Link
            to={`/exams/${exam_id}/students/${student_id}/result`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Үр дүн харах
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className={`bg-white rounded-lg shadow p-6 border-l-4 ${
            q.is_correct ? 'border-green-500' : 'border-red-500'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-700">Асуулт {index + 1}</span>
                  {q.is_correct ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                      ✓ Зөв
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                      ✗ Буруу
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{q.question}</h3>
              </div>
              <div className="ml-4 text-right">
                <div className="text-2xl font-bold text-blue-600">{q.point_earned}/{q.point}</div>
                <div className="text-xs text-gray-500">оноо</div>
              </div>
            </div>

            {/* Single/Multiple Choice */}
            {(q.type === 'single_choice' || q.type === 'multiple_choice') && (
              <div className="space-y-2 mb-4">
                {q.options.map(opt => {
                  const isStudentAnswer = Array.isArray(q.student_answer) 
                    ? q.student_answer.includes(opt.id)
                    : q.student_answer === opt.id;
                  const isCorrect = opt.is_correct;
                  
                  return (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-lg border-2 ${
                        isCorrect && isStudentAnswer
                          ? 'bg-green-50 border-green-500'
                          : isCorrect
                          ? 'bg-blue-50 border-blue-300'
                          : isStudentAnswer
                          ? 'bg-red-50 border-red-300'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt.text}</span>
                        <div className="flex gap-2">
                          {isStudentAnswer && <span className="text-sm">👉 Таны сонголт</span>}
                          {isCorrect && <span className="text-sm">✅ Зөв хариулт</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* True/False */}
            {q.type === 'true_false' && (
              <div className="mb-4">
                <div className="flex gap-4">
                  <div className={`flex-1 p-4 rounded-lg border-2 ${
                    q.student_answer === true && q.correct_answer === true
                      ? 'bg-green-50 border-green-500'
                      : q.student_answer === true
                      ? 'bg-red-50 border-red-300'
                      : q.correct_answer === true
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="text-center">
                      <div className="text-2xl mb-1">✓</div>
                      <div className="font-semibold">Үнэн</div>
                      {q.student_answer === true && <div className="text-sm mt-1">👉 Таны хариулт</div>}
                      {q.correct_answer === true && <div className="text-sm mt-1">✅ Зөв хариулт</div>}
                    </div>
                  </div>
                  <div className={`flex-1 p-4 rounded-lg border-2 ${
                    q.student_answer === false && q.correct_answer === false
                      ? 'bg-green-50 border-green-500'
                      : q.student_answer === false
                      ? 'bg-red-50 border-red-300'
                      : q.correct_answer === false
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="text-center">
                      <div className="text-2xl mb-1">✗</div>
                      <div className="font-semibold">Худал</div>
                      {q.student_answer === false && <div className="text-sm mt-1">👉 Таны хариулт</div>}
                      {q.correct_answer === false && <div className="text-sm mt-1">✅ Зөв хариулт</div>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Text Answer */}
            {q.type === 'text_answer' && (
              <div className="mb-4">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-2">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Таны хариулт:</div>
                  <p className="text-gray-800">{q.student_answer}</p>
                </div>
                {q.teacher_comment && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-yellow-800 mb-2">Багшийн тайлбар:</div>
                    <p className="text-yellow-900">{q.teacher_comment}</p>
                  </div>
                )}
              </div>
            )}

            {/* Тайлбар */}
            {q.explanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-blue-800 mb-2">💡 Тайлбар:</div>
                <p className="text-blue-900 text-sm">{q.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}