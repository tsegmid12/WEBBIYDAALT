import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  exams,
  examQuestions,
  questionBank,
  studentSubmissions,
} from "../data/mockData";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  GripVertical,
  Save,
} from "lucide-react";

const ExamTake = () => {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();

  // Load exams from both mockData and localStorage
  const localStorageExams = JSON.parse(
    localStorage.getItem("all_exams") || "[]"
  );
  const allExams = [...exams];
  localStorageExams.forEach((lsExam) => {
    const existingIndex = allExams.findIndex((e) => e.id === lsExam.id);
    if (existingIndex >= 0) {
      allExams[existingIndex] = lsExam;
    } else {
      allExams.push(lsExam);
    }
  });

  const exam = allExams.find((e) => e.id === parseInt(exam_id));

  // Load exam questions from both mockData and localStorage
  const localStorageExamQuestions = JSON.parse(
    localStorage.getItem("all_exam_questions") || "[]"
  );
  const allExamQuestions = [...examQuestions];
  localStorageExamQuestions.forEach((lsEq) => {
    const existingIndex = allExamQuestions.findIndex(
      (eq) => eq.exam_id === lsEq.exam_id && eq.question_id === lsEq.question_id
    );
    if (existingIndex >= 0) {
      allExamQuestions[existingIndex] = lsEq;
    } else {
      allExamQuestions.push(lsEq);
    }
  });

  const examQuestionsList = allExamQuestions.filter(
    (eq) => eq.exam_id === parseInt(exam_id)
  );
  const questions = examQuestionsList
    .map((eq) => ({
      ...eq,
      question: questionBank.find((q) => q.id === eq.question_id),
    }))
    .filter((q) => q.question);

  // Load saved answers from localStorage
  const loadSavedAnswers = () => {
    const saved = localStorage.getItem(
      `exam_${exam_id}_student_${student_id}_answers`
    );
    return saved ? JSON.parse(saved) : {};
  };

  const loadSavedTime = () => {
    const saved = localStorage.getItem(
      `exam_${exam_id}_student_${student_id}_time`
    );
    if (saved) {
      const { startTime, duration } = JSON.parse(saved);
      const elapsed = Math.floor((new Date() - new Date(startTime)) / 1000);
      return Math.max(0, duration - elapsed);
    }
    return exam?.duration * 60 || 0;
  };

  const [answers, setAnswers] = useState(loadSavedAnswers());
  const [timeRemaining, setTimeRemaining] = useState(loadSavedTime());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = localStorage.getItem(
      `exam_${exam_id}_student_${student_id}_current`
    );
    return saved ? parseInt(saved) : 0;
  });
  const [startTime] = useState(() => {
    const saved = localStorage.getItem(
      `exam_${exam_id}_student_${student_id}_time`
    );
    if (saved) {
      const { startTime: savedTime } = JSON.parse(saved);
      return new Date(savedTime);
    }
    const now = new Date();
    localStorage.setItem(
      `exam_${exam_id}_student_${student_id}_time`,
      JSON.stringify({
        startTime: now.toISOString(),
        duration: exam?.duration * 60 || 0,
      })
    );
    return now;
  });
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [orderingAnswers, setOrderingAnswers] = useState(() => {
    const saved = localStorage.getItem(
      `exam_${exam_id}_student_${student_id}_ordering`
    );
    return saved ? JSON.parse(saved) : {};
  });
  const [questionsPerPage, setQuestionsPerPage] = useState(() => {
    const saved = localStorage.getItem(
      `exam_${exam_id}_student_${student_id}_perPage`
    );
    return saved || 1;
  });
  const [showQuestionBlocks, setShowQuestionBlocks] = useState(true);
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [showHeaderDetails, setShowHeaderDetails] = useState(true);

  // Auto-save answers to localStorage
  const autoSave = useCallback(() => {
    setIsSaving(true);
    localStorage.setItem(
      `exam_${exam_id}_student_${student_id}_answers`,
      JSON.stringify(answers)
    );
    localStorage.setItem(
      `exam_${exam_id}_student_${student_id}_ordering`,
      JSON.stringify(orderingAnswers)
    );
    localStorage.setItem(
      `exam_${exam_id}_student_${student_id}_current`,
      currentQuestionIndex.toString()
    );
    localStorage.setItem(
      `exam_${exam_id}_student_${student_id}_perPage`,
      questionsPerPage.toString()
    );
    setLastSaveTime(new Date());
    setTimeout(() => setIsSaving(false), 500);
  }, [
    answers,
    orderingAnswers,
    currentQuestionIndex,
    questionsPerPage,
    exam_id,
    student_id,
  ]);

  // Auto-save every 5 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      autoSave();
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [autoSave]);

  // Save immediately when answers change
  useEffect(() => {
    autoSave();
  }, [answers, orderingAnswers, currentQuestionIndex, questionsPerPage]);

  // Save time remaining every second
  useEffect(() => {
    const timeSaveInterval = setInterval(() => {
      localStorage.setItem(
        `exam_${exam_id}_student_${student_id}_time`,
        JSON.stringify({
          startTime: startTime.toISOString(),
          duration: exam?.duration * 60 || 0,
          remaining: timeRemaining,
        })
      );
    }, 1000);

    return () => clearInterval(timeSaveInterval);
  }, [timeRemaining, startTime, exam_id, student_id, exam?.duration]);

  const handleSubmit = () => {
    // Clear saved data
    localStorage.removeItem(`exam_${exam_id}_student_${student_id}_answers`);
    localStorage.removeItem(`exam_${exam_id}_student_${student_id}_time`);
    localStorage.removeItem(`exam_${exam_id}_student_${student_id}_current`);
    localStorage.removeItem(`exam_${exam_id}_student_${student_id}_ordering`);
    localStorage.removeItem(`exam_${exam_id}_student_${student_id}_perPage`);

    const endTime = new Date();
    const completionTime = Math.floor((endTime - startTime) / 1000 / 60); // minutes

    // In a real app, this would submit to API
    const submission = {
      exam_id: parseInt(exam_id),
      student_id: parseInt(student_id),
      start_time: startTime.toISOString(),
      submit_time: endTime.toISOString(),
      completion_time_minutes: completionTime,
      attempt_number: 1, // Calculate based on existing submissions
      status: "submitted",
      answers: Object.entries(answers).map(([qId, answer]) => ({
        question_id: parseInt(qId),
        answer,
      })),
      question_ids: questions.map((q) => q.question.id), // Store question IDs for tracking
    };
    console.log("Submitting exam:", submission);
    console.log("Completion time:", completionTime, "minutes");
    navigate(`/team6/exams/${exam_id}/students/${student_id}/result`);
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    // Show warning when 5 minutes remaining
    if (timeRemaining === 300 && !showTimeWarning) {
      setShowTimeWarning(true);
      setTimeout(() => setShowTimeWarning(false), 5000);
    }

    // Show warning when 1 minute remaining
    if (timeRemaining === 60 && !showTimeWarning) {
      setShowTimeWarning(true);
      setTimeout(() => setShowTimeWarning(false), 5000);
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
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
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: answer };
      // Immediate save for critical changes
      setTimeout(() => {
        localStorage.setItem(
          `exam_${exam_id}_student_${student_id}_answers`,
          JSON.stringify(newAnswers)
        );
      }, 0);
      return newAnswers;
    });
  };

  // Initialize ordering answers
  useEffect(() => {
    const newOrderingAnswers = {};
    questions.forEach((q) => {
      if (q.question?.type === "ordering") {
        const items = [...(q.question.items || [])];
        newOrderingAnswers[q.question.id] =
          orderingAnswers[q.question.id] || items.map((item) => item.id);
      }
    });
    if (Object.keys(newOrderingAnswers).length > 0) {
      setOrderingAnswers((prev) => ({ ...prev, ...newOrderingAnswers }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length]);

  const handleOrderingChange = (questionId, itemId, direction) => {
    const currentOrder = orderingAnswers[questionId] || [];
    const index = currentOrder.indexOf(itemId);
    if (index === -1) return;

    const newOrder = [...currentOrder];
    if (direction === "up" && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [
        newOrder[index - 1],
        newOrder[index],
      ];
    } else if (direction === "down" && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [
        newOrder[index + 1],
        newOrder[index],
      ];
    }

    setOrderingAnswers((prev) => ({ ...prev, [questionId]: newOrder }));
    handleAnswerChange(questionId, newOrder);
  };

  // Warn before leaving page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Та шалгалтаас гарахдаа итгэлтэй байна уу? Хадгалсан хариултууд хадгалагдана.";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  if (!exam || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Шалгалт олдсонгүй</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const isLowTime = timeRemaining < 300; // Less than 5 minutes

  const renderQuestion = () => {
    const q = currentQuestion.question;
    const questionId = q.id;

    switch (q.type) {
      case "single_choice":
      case "image_question":
        return (
          <div className="space-y-3">
            {q.type === "image_question" && q.image_url && (
              <div className="mb-4 border-2 border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={q.image_url}
                  alt="Question"
                  className="w-full h-auto max-h-96 object-contain bg-gray-50"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/500x300?text=Image+Not+Found";
                  }}
                />
              </div>
            )}
            {q.options?.map((option) => (
              <label
                key={option.id}
                className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[questionId] === option.id
                    ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${questionId}`}
                  value={option.id}
                  checked={answers[questionId] === option.id}
                  onChange={() => handleAnswerChange(questionId, option.id)}
                  className="mt-1 w-5 h-5 text-blue-600"
                />
                <span className="flex-1 text-gray-800">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case "multiple_choice":
        return (
          <div className="space-y-3">
            {q.options?.map((option) => (
              <label
                key={option.id}
                className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[questionId]?.includes(option.id)
                    ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={answers[questionId]?.includes(option.id) || false}
                  onChange={(e) => {
                    const current = answers[questionId] || [];
                    const newAnswer = e.target.checked
                      ? [...current, option.id]
                      : current.filter((id) => id !== option.id);
                    handleAnswerChange(questionId, newAnswer);
                  }}
                  className="mt-1 w-5 h-5 text-blue-600"
                />
                <span className="flex-1 text-gray-800">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case "true_false":
        return (
          <div className="space-y-3">
            {[true, false].map((value) => (
              <label
                key={value.toString()}
                className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[questionId] === value
                    ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${questionId}`}
                  checked={answers[questionId] === value}
                  onChange={() => handleAnswerChange(questionId, value)}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-lg font-medium text-gray-800">
                  {value ? "Үнэн" : "Худал"}
                </span>
              </label>
            ))}
          </div>
        );

      case "text_answer":
        return (
          <div className="space-y-2">
            <textarea
              value={answers[questionId] || ""}
              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800"
              placeholder="Хариултаа энд бичнэ үү..."
            />
            {answers[questionId] && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Save size={12} />
                Хадгалагдсан
              </p>
            )}
          </div>
        );

      case "fill_blank":
        const fillAnswer = answers[questionId] || {};
        return (
          <div className="space-y-4">
            {q.blanks?.map((blank, index) => (
              <div key={blank.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хоосон {index + 1}:
                </label>
                <input
                  type="text"
                  value={fillAnswer[blank.id] || ""}
                  onChange={(e) => {
                    const newFillAnswer = {
                      ...fillAnswer,
                      [blank.id]: e.target.value,
                    };
                    handleAnswerChange(questionId, newFillAnswer);
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={`Хариулт ${index + 1}...`}
                />
                {fillAnswer[blank.id] && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Save size={12} />
                    Хадгалагдсан
                  </p>
                )}
              </div>
            ))}
          </div>
        );

      case "matching":
        const matchingAnswer = answers[questionId] || {};
        const rightOptions = q.pairs?.map((p) => p.right) || [];
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Зүүн талын утгыг баруун талын утгатай харгалзуулна уу:
            </p>
            {q.pairs?.map((pair) => (
              <div
                key={pair.id}
                className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex-1 font-medium text-gray-900">
                  {pair.left}
                </div>
                <div className="text-gray-400">→</div>
                <select
                  value={matchingAnswer[pair.id] || ""}
                  onChange={(e) => {
                    const newMatchingAnswer = {
                      ...matchingAnswer,
                      [pair.id]: e.target.value,
                    };
                    handleAnswerChange(questionId, newMatchingAnswer);
                  }}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Сонгох...</option>
                  {rightOptions.map((right, idx) => (
                    <option key={idx} value={right}>
                      {right}
                    </option>
                  ))}
                </select>
                {matchingAnswer[pair.id] && (
                  <Save size={16} className="text-green-600" />
                )}
              </div>
            ))}
          </div>
        );

      case "ordering":
        const order = orderingAnswers[questionId] || [];
        const orderedItems = order
          .map((id) => q.items?.find((item) => item.id === id))
          .filter(Boolean);
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              Дарааллыг зөв байрлуулахын тулд дээш/доош товч ашиглана уу:
            </p>
            {orderedItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-50"
              >
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleOrderingChange(questionId, item.id, "up")
                    }
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="rotate-90" size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleOrderingChange(questionId, item.id, "down")
                    }
                    disabled={index === orderedItems.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="rotate-90" size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="flex-1 text-gray-800 font-medium">
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "number_answer":
        return (
          <div className="space-y-4">
            <input
              type="number"
              value={answers[questionId] || ""}
              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              min={q.number_range?.min}
              max={q.number_range?.max}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
              placeholder={
                q.number_range
                  ? `${q.number_range.min}-${q.number_range.max} хооронд тоо`
                  : "Тоон хариулт..."
              }
            />
            {q.number_range && (
              <p className="text-sm text-gray-600">
                Утга: {q.number_range.min} - {q.number_range.max} хооронд байх
                ёстой
              </p>
            )}
            {answers[questionId] && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Save size={12} />
                Хадгалагдсан
              </p>
            )}
          </div>
        );

      default:
        return (
          <p className="text-gray-600">
            Энэ төрлийн асуулт дэмжигдэхгүй байна.
          </p>
        );
    }
  };

  // Calculate which questions to show based on questionsPerPage
  const getVisibleQuestions = () => {
    if (questionsPerPage === "all") {
      return questions;
    }
    const perPage = parseInt(questionsPerPage) || 1;
    const startIndex = Math.floor(currentQuestionIndex / perPage) * perPage;
    return questions.slice(startIndex, startIndex + perPage);
  };

  const visibleQuestions = getVisibleQuestions();
  const visibleStartIndex =
    questionsPerPage === "all"
      ? 0
      : Math.floor(currentQuestionIndex / (parseInt(questionsPerPage) || 1)) *
        (parseInt(questionsPerPage) || 1);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-6">
      {/* Auto-save indicator */}
      <div className="fixed bottom-4 right-4 z-30 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2 flex items-center gap-2">
        {isSaving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm text-gray-600">Хадгалж байна...</span>
          </>
        ) : (
          <>
            <Save size={16} className="text-green-600" />
            <span className="text-sm text-gray-600">
              Хадгалагдсан
              {lastSaveTime && (
                <span className="text-xs text-gray-500 ml-1">
                  (
                  {lastSaveTime.toLocaleTimeString("mn-MN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  )
                </span>
              )}
            </span>
          </>
        )}
      </div>

      {/* Question Blocks Sidebar - Top Right */}
      {showQuestionBlocks && (
        <div className="fixed top-20 right-4 z-20 bg-white rounded-lg shadow-xl border-2 border-blue-500 p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">Асуултууд</h3>
            <button
              onClick={() => setShowQuestionBlocks(false)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, index) => {
              const isAnswered = !!answers[q.question.id];
              const isCurrent = index === currentQuestionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                    isCurrent
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-110"
                      : isAnswered
                      ? "border-green-500 bg-green-50 text-green-900 hover:border-green-600"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  title={`Асуулт ${index + 1}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t text-xs text-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Хариулсан</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span>Хариулаагүй</span>
            </div>
          </div>
        </div>
      )}

      {!showQuestionBlocks && (
        <button
          onClick={() => setShowQuestionBlocks(true)}
          className="fixed top-20 right-4 z-20 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Асуултууд харах
        </button>
      )}

      {/* Time Warning Banner */}
      {showTimeWarning && (
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} />
            <div>
              <p className="font-bold text-lg">
                Анхааруулга: {timeRemaining < 60 ? "1 минут" : "5 минут"}{" "}
                үлдлээ!
              </p>
              <p className="text-sm">Шалгалтаа хурдан дуусгах хэрэгтэй.</p>
            </div>
          </div>
        </div>
      )}

      {/* Compact / hideable Header */}
      {!headerCollapsed ? (
        <div className="bg-white rounded-lg shadow-sm px-4 py-3 sticky top-0 z-20 border-b border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setHeaderCollapsed(true)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                title="Hide header"
              >
                Нуух
              </button>
              <div className="min-w-0">
                <h2
                  className="font-semibold text-lg text-gray-900 truncate"
                  title={exam.name}
                >
                  {exam.name}
                </h2>
                <div className="text-xs text-gray-500 truncate">
                  Нийт {questions.length} асуулт
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`px-3 py-1 rounded-full text-sm font-mono ${
                  isLowTime
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                <Clock size={14} className="inline mr-1" />
                {formatTime(timeRemaining)}
              </div>

              <div className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                 {currentQuestionIndex + 1}/
                {questions.length}
              </div>

              <button
                onClick={() => setShowHeaderDetails((s) => !s)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                title="Toggle details"
              >
                {showHeaderDetails ? "−" : "+"}
              </button>
            </div>
          </div>

          {showHeaderDetails && (
            <div className="mt-3 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-green-600">
                    Хариулсан: {answeredCount}
                  </div>
                  <div className="text-orange-600">
                    Хариулаагүй: {unansweredCount}
                  </div>
                </div>
                <div className="hidden sm:block w-1/3">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setHeaderCollapsed(false)}
          className="fixed top-4 right-4 z-30 bg-blue-600 text-white px-3 py-2 rounded-md shadow-md"
          title="Show header"
        >
          Нээх
        </button>
      )}

      {/* Question Cards - Show multiple if questionsPerPage > 1 */}
      <div className="space-y-6">
        {visibleQuestions.map((questionItem, visibleIndex) => {
          const actualIndex = visibleStartIndex + visibleIndex;
          const q = questionItem.question;
          const questionId = q.id;

          return (
            <div
              key={questionItem.id}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-md">
                    {actualIndex + 1}
                  </span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {q.type === "image_question" && (
                      <ImageIcon size={14} className="inline mr-1" />
                    )}
                    {q.type === "matching" && "↔️ "}
                    {q.type === "fill_blank" && "___ "}
                    {q.type === "ordering" && (
                      <GripVertical size={14} className="inline mr-1" />
                    )}
                    {q.type} • {questionItem.point} оноо
                  </span>
                  {answers[questionId] && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                      <Save size={12} />
                      Хадгалагдсан
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {q.question}
                </h2>
              </div>

              <div className="mt-6">
                {(() => {
                  // Render question based on type
                  switch (q.type) {
                    case "single_choice":
                    case "image_question":
                      return (
                        <div className="space-y-3">
                          {q.type === "image_question" && q.image_url && (
                            <div className="mb-4 border-2 border-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={q.image_url}
                                alt="Question"
                                className="w-full h-auto max-h-96 object-contain bg-gray-50"
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/500x300?text=Image+Not+Found";
                                }}
                              />
                            </div>
                          )}
                          {q.options?.map((option) => (
                            <label
                              key={option.id}
                              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                answers[questionId] === option.id
                                  ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${questionId}`}
                                value={option.id}
                                checked={answers[questionId] === option.id}
                                onChange={() =>
                                  handleAnswerChange(questionId, option.id)
                                }
                                className="mt-1 w-5 h-5 text-blue-600"
                              />
                              <span className="flex-1 text-gray-800">
                                {option.text}
                              </span>
                            </label>
                          ))}
                        </div>
                      );

                    case "multiple_choice":
                      return (
                        <div className="space-y-3">
                          {q.options?.map((option) => (
                            <label
                              key={option.id}
                              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                answers[questionId]?.includes(option.id)
                                  ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={
                                  answers[questionId]?.includes(option.id) ||
                                  false
                                }
                                onChange={(e) => {
                                  const current = answers[questionId] || [];
                                  const newAnswer = e.target.checked
                                    ? [...current, option.id]
                                    : current.filter((id) => id !== option.id);
                                  handleAnswerChange(questionId, newAnswer);
                                }}
                                className="mt-1 w-5 h-5 text-blue-600"
                              />
                              <span className="flex-1 text-gray-800">
                                {option.text}
                              </span>
                            </label>
                          ))}
                        </div>
                      );

                    case "true_false":
                      return (
                        <div className="space-y-3">
                          {[true, false].map((value) => (
                            <label
                              key={value.toString()}
                              className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                answers[questionId] === value
                                  ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${questionId}`}
                                checked={answers[questionId] === value}
                                onChange={() =>
                                  handleAnswerChange(questionId, value)
                                }
                                className="w-5 h-5 text-blue-600"
                              />
                              <span className="text-lg font-medium text-gray-800">
                                {value ? "Үнэн" : "Худал"}
                              </span>
                            </label>
                          ))}
                        </div>
                      );

                    case "text_answer":
                      return (
                        <div className="space-y-2">
                          <textarea
                            value={answers[questionId] || ""}
                            onChange={(e) =>
                              handleAnswerChange(questionId, e.target.value)
                            }
                            rows={8}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800"
                            placeholder="Хариултаа энд бичнэ үү..."
                          />
                          {answers[questionId] && (
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <Save size={12} />
                              Хадгалагдсан
                            </p>
                          )}
                        </div>
                      );

                    case "fill_blank":
                      const fillAnswer = answers[questionId] || {};
                      return (
                        <div className="space-y-4">
                          {q.blanks?.map((blank, index) => (
                            <div key={blank.id} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Хоосон {index + 1}:
                              </label>
                              <input
                                type="text"
                                value={fillAnswer[blank.id] || ""}
                                onChange={(e) => {
                                  const newFillAnswer = {
                                    ...fillAnswer,
                                    [blank.id]: e.target.value,
                                  };
                                  handleAnswerChange(questionId, newFillAnswer);
                                }}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder={`Хариулт ${index + 1}...`}
                              />
                              {fillAnswer[blank.id] && (
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                  <Save size={12} />
                                  Хадгалагдсан
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      );

                    case "matching":
                      const matchingAnswer = answers[questionId] || {};
                      const rightOptions = q.pairs?.map((p) => p.right) || [];
                      return (
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Зүүн талын утгыг баруун талын утгатай харгалзуулна
                            уу:
                          </p>
                          {q.pairs?.map((pair) => (
                            <div
                              key={pair.id}
                              className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg bg-gray-50"
                            >
                              <div className="flex-1 font-medium text-gray-900">
                                {pair.left}
                              </div>
                              <div className="text-gray-400">→</div>
                              <select
                                value={matchingAnswer[pair.id] || ""}
                                onChange={(e) => {
                                  const newMatchingAnswer = {
                                    ...matchingAnswer,
                                    [pair.id]: e.target.value,
                                  };
                                  handleAnswerChange(
                                    questionId,
                                    newMatchingAnswer
                                  );
                                }}
                                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                              >
                                <option value="">Сонгох...</option>
                                {rightOptions.map((right, idx) => (
                                  <option key={idx} value={right}>
                                    {right}
                                  </option>
                                ))}
                              </select>
                              {matchingAnswer[pair.id] && (
                                <Save size={16} className="text-green-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      );

                    case "ordering":
                      const order = orderingAnswers[questionId] || [];
                      const orderedItems = order
                        .map((id) => q.items?.find((item) => item.id === id))
                        .filter(Boolean);
                      return (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600 mb-4">
                            Дарааллыг зөв байрлуулахын тулд дээш/доош товч
                            ашиглана уу:
                          </p>
                          {orderedItems.map((item, index) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-50"
                            >
                              <div className="flex flex-col gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOrderingChange(
                                      questionId,
                                      item.id,
                                      "up"
                                    )
                                  }
                                  disabled={index === 0}
                                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <ChevronLeft
                                    className="rotate-90"
                                    size={20}
                                  />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOrderingChange(
                                      questionId,
                                      item.id,
                                      "down"
                                    )
                                  }
                                  disabled={index === orderedItems.length - 1}
                                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <ChevronRight
                                    className="rotate-90"
                                    size={20}
                                  />
                                </button>
                              </div>
                              <div className="flex items-center gap-3 flex-1">
                                <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold">
                                  {index + 1}
                                </div>
                                <span className="flex-1 text-gray-800 font-medium">
                                  {item.text}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      );

                    case "number_answer":
                      return (
                        <div className="space-y-4">
                          <input
                            type="number"
                            value={answers[questionId] || ""}
                            onChange={(e) =>
                              handleAnswerChange(questionId, e.target.value)
                            }
                            min={q.number_range?.min}
                            max={q.number_range?.max}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                            placeholder={
                              q.number_range
                                ? `${q.number_range.min}-${q.number_range.max} хооронд тоо`
                                : "Тоон хариулт..."
                            }
                          />
                          {q.number_range && (
                            <p className="text-sm text-gray-600">
                              Утга: {q.number_range.min} - {q.number_range.max}{" "}
                              хооронд байх ёстой
                            </p>
                          )}
                          {answers[questionId] && (
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <Save size={12} />
                              Хадгалагдсан
                            </p>
                          )}
                        </div>
                      );

                    default:
                      return (
                        <p className="text-gray-600">
                          Энэ төрлийн асуулт дэмжигдэхгүй байна.
                        </p>
                      );
                  }
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              if (questionsPerPage === "all") {
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
              } else {
                const perPage = parseInt(questionsPerPage) || 1;
                const currentPage = Math.floor(currentQuestionIndex / perPage);
                if (currentPage > 0) {
                  setCurrentQuestionIndex((currentPage - 1) * perPage);
                } else {
                  setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
                }
              }
            }}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700 transition-all"
          >
            <ChevronLeft size={20} />
            Өмнөх
          </button>

          <div className="flex gap-3">
            {(() => {
              const perPage =
                questionsPerPage === "all"
                  ? questions.length
                  : parseInt(questionsPerPage) || 1;
              const currentPage = Math.floor(currentQuestionIndex / perPage);
              const totalPages = Math.ceil(questions.length / perPage);
              const isLastPage = currentPage === totalPages - 1;
              const isLastQuestion =
                currentQuestionIndex === questions.length - 1;

              if (isLastQuestion) {
                return (
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <CheckCircle size={20} />
                    Илгээх
                  </button>
                );
              }

              return (
                <button
                  onClick={() => {
                    if (questionsPerPage === "all") {
                      setCurrentQuestionIndex((prev) =>
                        Math.min(questions.length - 1, prev + 1)
                      );
                    } else {
                      const nextIndex = Math.min(
                        questions.length - 1,
                        currentQuestionIndex + perPage
                      );
                      setCurrentQuestionIndex(nextIndex);
                    }
                  }}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Дараах
                  <ChevronRight size={20} />
                </button>
              );
            })()}
          </div>
        </div>
        {questionsPerPage !== "all" && (
          <div className="text-center text-sm text-gray-600 mt-4">
            Хуудас{" "}
            {Math.floor(
              currentQuestionIndex / (parseInt(questionsPerPage) || 1)
            ) + 1}{" "}
            / {Math.ceil(questions.length / (parseInt(questionsPerPage) || 1))}
          </div>
        )}
      </div>

      {/* Completed Questions Summary */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Хариулсан асуултууд
              </h3>
              <p className="text-sm text-gray-600">
                {answeredCount} / {questions.length} асуултанд хариулсан •
                Хугацаа: {formatTime(timeRemaining)} үлдлээ
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-700">
              {answeredCount}
            </div>
            <div className="text-xs text-gray-600">асуулт</div>
          </div>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {questions.map((q, index) => {
            const isAnswered = !!answers[q.question.id];
            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                  isAnswered
                    ? "border-green-500 bg-green-100 text-green-900 hover:border-green-600 hover:bg-green-200"
                    : "border-gray-300 bg-gray-100 text-gray-500 hover:border-gray-400"
                }`}
                title={`Асуулт ${index + 1}${
                  isAnswered ? " - Хариулсан" : " - Хариулаагүй"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-green-300 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-700">Хариулсан ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span className="text-gray-700">
              Хариулаагүй ({unansweredCount})
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-gray-600">
            <Clock size={14} />
            <span>Үлдсэн хугацаа: {formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>

      {/* Question Navigator
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Бүх асуултууд</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                index === currentQuestionIndex
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-110"
                  : answers[q.question.id]
                  ? "border-green-500 bg-green-50 text-green-900 hover:border-green-600"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div> */}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Шалгалт илгээх
              </h3>
              <p className="text-gray-700 mb-4">
                Та шалгалтаа илгээхдээ итгэлтэй байна уу? Илгээсний дараа засах
                боломжгүй.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Хариулсан:</strong> {answeredCount} /{" "}
                  {questions.length} асуулт
                </p>
                {unansweredCount > 0 && (
                  <p className="text-sm text-orange-600 mt-1">
                    <strong>Хариулаагүй:</strong> {unansweredCount} асуулт байна
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors"
              >
                Цуцлах
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
              >
                Тийм, илгээх
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamTake;
