import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  FileText,
  Play,
  AlertCircle,
  X,
  Users,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";

const API = "https://todu.mn/bs/lms/open-api-catalog/v1/"; // ★★★ API root

const ExamStart = () => {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [course, setCourse] = useState(null);
  const [studentAttempts, setStudentAttempts] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showClosedWarning, setShowClosedWarning] = useState(false);
  const [showBeginConfirm, setShowBeginConfirm] = useState(false);

  // -----------------------------
  // FETCH exam, course, attempts, questions
  // -----------------------------
  const fetchExam = async () => {
    const res = await fetch(`${API}exams/${exam_id}`);
    return await res.json();
  };

  const fetchCourse = async (courseId) => {
    const res = await fetch(`${API}courses/${courseId}`);
    return await res.json();
  };

  const fetchAttempts = async () => {
    const res = await fetch(
      `${API}exams/${exam_id}/submissions?student_id=${student_id}`
    );
    return await res.json();
  };

  const fetchQuestions = async () => {
    const res = await fetch(`${API}exams/${exam_id}/questions`);
    return await res.json();
  };

  useEffect(() => {
    const load = async () => {
      try {
        const examData = await fetchExam();
        setExam(examData);

        if (examData?.course_id) {
          const courseData = await fetchCourse(examData.course_id);
          setCourse(courseData);
        }

        const attemptsData = await fetchAttempts();
        setStudentAttempts(attemptsData || []);

        const questionsData = await fetchQuestions();
        setExamQuestions(questionsData || []);
      } catch (err) {
        console.error("Error loading exam:", err);
      }
      setLoading(false);
    };
    load();
  }, []);

  // -----------------------------
  // LOADING
  // -----------------------------
  if (loading) return <p className="p-6 text-center">Түр хүлээнэ үү…</p>;

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

  // -----------------------------
  // TIME LOGIC
  // -----------------------------
  const now = new Date();
  const startDate = new Date(exam.start_date);
  const closeDate = new Date(exam.close_date);

  const isAvailable = now >= startDate && now <= closeDate;
  const isUpcoming = now < startDate;
  const isExpired = now > closeDate;

  // Attempts
  const nextAttemptNumber = studentAttempts.length + 1;
  const canTakeExam = nextAttemptNumber <= exam.max_attempt;

  // Total Points
  const totalPoints = examQuestions.reduce((sum, q) => sum + q.point, 0);

  // -----------------------------
  // Start exam actions
  // -----------------------------
  const handleStart = () => {
    if (isExpired) {
      setShowClosedWarning(true);
      return;
    }
    if (!isAvailable || !canTakeExam) return;
    setShowBeginConfirm(true);
  };

  const handleBegin = () => {
    navigate(`/team6/exams/${exam_id}/students/${student_id}/edit`);
  };

  const handleBack = () => navigate("/team6");

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{exam.name}</h1>

        {course && <p className="text-gray-600 mb-6">Хичээл: {course.name}</p>}

        {/* Description */}
        {exam.description && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Тайлбар
            </h2>
            <p className="text-gray-700">{exam.description}</p>
          </div>
        )}

        {/* Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar size={20} className="text-blue-600" />
            <div>
              <span className="font-medium">Огноо:</span>{" "}
              {startDate.toLocaleDateString("mn-MN")} -{" "}
              {closeDate.toLocaleDateString("mn-MN")}
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Clock size={20} className="text-green-600" />
            <div>
              <span className="font-medium">Хугацаа:</span> {exam.duration} минут
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FileText size={20} className="text-purple-600" />
            <div>
              <span className="font-medium">Хэдэн удаа өгөх:</span>{" "}
              {exam.max_attempt} удаа
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Award size={20} className="text-yellow-600" />
            <div>
              <span className="font-medium">Нийт оноо:</span>{" "}
              {totalPoints} / {exam.total_score}
            </div>
          </div>

          {exam.course_grade_contribution && (
            <div className="flex items-center gap-3 text-gray-700">
              <Users size={20} className="text-indigo-600" />
              <div>
                <span className="font-medium">Хичээлд эзлэх хувь:</span>{" "}
                {exam.course_grade_contribution}%
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {isUpcoming && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
            <div className="flex gap-3">
              <AlertCircle className="text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-900 text-lg">
                  Шалгалт хараахан эхлээгүй байна
                </p>
                <p className="text-yellow-800 text-sm">
                  Эхлэх:{" "}
                  {startDate.toLocaleString("mn-MN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {isExpired && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <div className="flex gap-3">
              <AlertCircle className="text-red-600" />
              <div>
                <p className="font-semibold text-red-900 text-lg">
                  Шалгалт дууссан байна
                </p>
                <p className="text-red-800 text-sm">
                  Дууссан:{" "}
                  {closeDate.toLocaleString("mn-MN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Attempts */}
        {isAvailable && (
          <div className="space-y-4 mb-6">
            {studentAttempts.length > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <div className="flex gap-3">
                  <Users className="text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900 text-lg">
                      Таны оролдлогууд
                    </p>

                    <p className="text-blue-800 text-sm mb-2">
                      {studentAttempts.length} удаа оролдсон
                    </p>

                    {studentAttempts.map((a, i) => (
                      <p
                        key={i}
                        className="text-xs text-blue-700 mt-1 border-b border-blue-100 py-1"
                      >
                        {i + 1}-р оролдлого: {a.grade_point.toFixed(1)}% —{" "}
                        {new Date(a.submit_time).toLocaleDateString("mn-MN")}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!canTakeExam && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex gap-3">
                  <AlertCircle className="text-red-600" />
                  <div>
                    <p className="font-semibold text-red-900 text-lg">
                      Оролдлогын хязгаарт хүрсэн
                    </p>
                    <p className="text-red-800 text-sm">
                      Та {exam.max_attempt} удаа оролдсон.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleBack}
            className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
          >
            Буцах
          </button>

          {isAvailable && canTakeExam ? (
            <button
              onClick={handleStart}
              className="flex-1 bg-green-600 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-green-700 text-lg font-semibold shadow"
            >
              <Play size={24} />
              Шалгалт өгөх
            </button>
          ) : (
            isAvailable && (
              <div className="flex-1 py-4 bg-gray-200 rounded-lg text-center text-gray-600">
                Оролдлого дууссан
              </div>
            )
          )}
        </div>
      </div>

      {/* CONFIRM START MODAL */}
      {showBeginConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Шалгалт эхлүүлэх</h3>
              <button onClick={() => setShowBeginConfirm(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <p className="text-gray-700 mb-4">
              Шалгалт эхлүүлнэ үү? Танд {exam.duration} минут хугацаа өгөгдөнө.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBeginConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
              >
                Болих
              </button>
              <button
                onClick={handleBegin}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg"
              >
                Эхлүүлэх
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLOSED WARNING MODAL */}
      {showClosedWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Шалгалт дууссан</h3>
              <button onClick={() => setShowClosedWarning(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <p className="text-gray-700 mb-4">
              Энэ шалгалтын хугацаа дууссан байна.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowClosedWarning(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              >
                Ойлголоо
              </button>
              <button
                onClick={handleBack}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
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
