import { useParams, Link } from "react-router-dom";
import {
  exams as mockExams,
  examQuestions as mockExamQuestions,
  questionBank as mockQuestionBank,
  studentSubmissions as mockSubmissions,
} from "../data/mockData";

import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

// ------------------------------
const loadFromLocalOrMock = (key, mock) => {
  const ls = JSON.parse(localStorage.getItem(key) || "[]");
  return ls.length > 0 ? ls : mock;
};

const ExamCheck = () => {
  const { exam_id, student_id } = useParams();
  const examId = parseInt(exam_id);
  const studentId = parseInt(student_id);

  // Load everything
  const exams = loadFromLocalOrMock("all_exams", mockExams);
  const examQuestions = loadFromLocalOrMock("all_exam_questions", mockExamQuestions);
  const submissions = loadFromLocalOrMock("all_exam_submissions", mockSubmissions);
  const questionBank = mockQuestionBank; // static, no LS save

  // Get exam
  const exam = exams.find((e) => e.id === examId);

  // Get student submission
  const submission = submissions.find(
    (s) => s.exam_id === examId && s.student_id === studentId
  );

  // Map exam questions to full question data
  const questions = examQuestions
    .filter((eq) => eq.exam_id === examId)
    .map((eq) => ({
      ...eq,
      question: questionBank.find((q) => q.id === eq.question_id),
    }))
    .filter((q) => q.question);

  // If exam not found
  if (!exam) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Шалгалт олдсонгүй</p>
        <Link to="/team6" className="text-blue-600 hover:underline mt-2 inline-block">
          Нүүр хуудас руу буцах
        </Link>
      </div>
    );
  }

  // If no submission or teacher disabled showing correct answers
  if (!submission || !exam.show_correct_answer) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <p className="text-gray-600 text-lg mb-4">
          {!submission
            ? "Хариулт олдсонгүй"
            : "Энэ шалгалтад зөв хариулт харуулахгүй"}
        </p>
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}/result`}
          className="text-blue-600 hover:underline"
        >
          Үр дүн руу буцах
        </Link>
      </div>
    );
  }

  const getAnswerForQuestion = (qid) =>
    submission.answers?.find((a) => a.question_id === qid);

  // Categorize into answered & unanswered
  const completedQuestions = questions.filter((q) => {
    const ans = getAnswerForQuestion(q.question.id);
    return ans && ans.answer !== "" && ans.answer !== null && ans.answer !== undefined;
  });

  const incompleteQuestions = questions.filter((q) => {
    const ans = getAnswerForQuestion(q.question.id);
    return !ans || ans.answer === "" || ans.answer === null || ans.answer === undefined;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}/result`}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {exam.name} - Зөв хариултууд
          </h1>
          <p className="text-gray-600 mt-2">
            Оюутан ID: {student_id} • Оноо: {submission.total_earned}/
            {submission.total_possible} ({submission.grade_point.toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Асуултуудын тойм</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Completed */}
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-green-600" size={24} />
              <h3 className="font-bold text-green-900 text-lg">Хариулсан</h3>
            </div>
            <p className="text-3xl font-bold text-green-700 mb-1">
              {completedQuestions.length}
            </p>
            <p className="text-sm text-green-800">Нийт {questions.length} асуултаас</p>
          </div>

          {/* Incomplete */}
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="text-orange-600" size={24} />
              <h3 className="font-bold text-orange-900 text-lg">Хариулаагүй</h3>
            </div>
            <p className="text-3xl font-bold text-orange-700 mb-1">
              {incompleteQuestions.length}
            </p>
            <p className="text-sm text-orange-800">Нийт {questions.length} асуултаас</p>
          </div>
        </div>
      </div>

      {/* Completed Questions */}
      {completedQuestions.length > 0 && (
        <CompletedSection
          questions={completedQuestions}
          allQuestions={questions}
          getAnswer={getAnswerForQuestion}
        />
      )}

      {/* Incomplete Questions */}
      {incompleteQuestions.length > 0 && (
        <IncompleteSection
          questions={incompleteQuestions}
          allQuestions={questions}
        />
      )}
    </div>
  );
};

// ============================================================================
// COMPONENT: Completed Section
// ============================================================================
const CompletedSection = ({ questions, allQuestions, getAnswer }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
      <CheckCircle className="text-green-600" size={28} />
      Хариулсан асуултууд ({questions.length})
    </h2>

    {questions.map((eq) => {
      const index = allQuestions.findIndex((q) => q.id === eq.id);
      const ans = getAnswer(eq.question.id);
      const correct = ans?.is_correct;

      return (
        <div
          key={eq.id}
          className={`bg-white rounded-lg shadow p-6 border-2 ${
            correct ? "border-green-200" : "border-red-200"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-sm text-gray-600">
                {eq.question.type} • {eq.point} оноо
              </span>
            </div>

            <div className="flex items-center gap-2">
              {correct ? (
                <>
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-green-600 font-medium">
                    {ans.point_earned}/{ans.point_possible}
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-600" size={20} />
                  <span className="text-red-600 font-medium">
                    {ans?.point_earned || 0}/{ans?.point_possible || eq.point}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Question */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {eq.question.question}
          </h3>

          {/* Options Renderer */}
          <AnswerRenderer eq={eq} ans={ans} />
        </div>
      );
    })}
  </div>
);

// ============================================================================
// COMPONENT: Incomplete Section
// ============================================================================
const IncompleteSection = ({ questions, allQuestions }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
      <XCircle className="text-orange-600" size={28} />
      Хариулаагүй асуултууд ({questions.length})
    </h2>

    {questions.map((eq) => {
      const index = allQuestions.findIndex((q) => q.id === eq.id);

      return (
        <div
          key={eq.id}
          className="bg-white rounded-lg shadow p-6 border-2 border-orange-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-sm text-gray-600">
                {eq.question.type} • {eq.point} оноо
              </span>
            </div>

            <div className="flex items-center gap-2">
              <XCircle className="text-orange-600" size={20} />
              <span className="text-orange-600 font-medium">0/{eq.point}</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {eq.question.question}
          </h3>

          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
            <p className="text-orange-800 font-medium">
              Энэ асуултанд хариулаагүй байна
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

// ============================================================================
// REUSABLE: Answer Renderer
// ============================================================================
const AnswerRenderer = ({ eq, ans }) => {
  const q = eq.question;

  if (q.type === "single_choice") {
    return (
      <div className="space-y-2">
        {q.options?.map((opt) => {
          const selected = ans?.answer === opt.id;
          const correct = opt.is_correct;

          return (
            <div
              key={opt.id}
              className={`p-3 rounded-lg border-2 ${
                correct
                  ? "border-green-500 bg-green-50"
                  : selected
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {correct && <CheckCircle size={16} className="text-green-600" />}
                {selected && !correct && (
                  <XCircle size={16} className="text-red-600" />
                )}

                <span
                  className={
                    correct
                      ? "font-medium text-green-900"
                      : selected
                      ? "font-medium text-red-900"
                      : ""
                  }
                >
                  {opt.id}. {opt.text}
                </span>

                {correct && (
                  <span className="ml-auto text-xs text-green-700">
                    (Зөв хариулт)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (q.type === "multiple_choice") {
    const selected = ans?.answer || [];

    return (
      <div className="space-y-2">
        {q.options?.map((opt) => {
          const isSelected = selected.includes(opt.id);
          const correct = opt.is_correct;

          return (
            <div
              key={opt.id}
              className={`p-3 rounded-lg border-2 ${
                correct
                  ? "border-green-500 bg-green-50"
                  : isSelected
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {correct && <CheckCircle size={16} className="text-green-600" />}
                {isSelected && !correct && (
                  <XCircle size={16} className="text-red-600" />
                )}

                <span
                  className={
                    correct
                      ? "font-medium text-green-900"
                      : isSelected
                      ? "font-medium text-red-900"
                      : ""
                  }
                >
                  {opt.id}. {opt.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (q.type === "true_false") {
    const correct = q.correct_answer;
    const userAnswer = ans?.answer;

    return (
      <div className="space-y-2">
        {[true, false].map((val) => {
          const isCorrect = correct === val;
          const isSelected = userAnswer === val;

          return (
            <div
              key={String(val)}
              className={`p-3 rounded-lg border-2 ${
                isCorrect
                  ? "border-green-500 bg-green-50"
                  : isSelected
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <span
                className={
                  isCorrect
                    ? "text-green-900 font-medium"
                    : isSelected
                    ? "text-red-900 font-medium"
                    : ""
                }
              >
                {val ? "Үнэн" : "Худал"}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  if (q.type === "text_answer") {
    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Таны хариулт:</p>

        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          {ans?.answer || "Хариулт байхгүй"}
        </div>

        {q.sample_answer && (
          <>
            <p className="text-sm font-medium text-green-700">Зөв хариулт:</p>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              {q.sample_answer}
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default ExamCheck;
