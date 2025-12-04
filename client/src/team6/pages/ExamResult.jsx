import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Award,
  CheckCircle,
  XCircle,
  Eye,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

const API = "https://todu.mn/bs/lms/open-api-catalog/v1/"; // ★★★ API ROOT

const ExamResult = () => {
  const { exam_id, student_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [course, setCourse] = useState(null);
  const [submission, setSubmission] = useState(null);

  // --------------------------
  // FETCH EXAM
  // --------------------------
  const fetchExam = async () => {
    const res = await fetch(`${API}exams/${exam_id}`);
    return await res.json();
  };

  // --------------------------
  // FETCH SUBMISSION (latest)
  // --------------------------
  const fetchSubmission = async () => {
    const res = await fetch(
      `${API}exams/${exam_id}/submissions?student_id=${student_id}`
    );
    const data = await res.json();
    return data?.[0] || null;
  };

  // --------------------------
  // FETCH COURSE
  // --------------------------
  const fetchCourse = async (courseId) => {
    const res = await fetch(`${API}courses/${courseId}`);
    return await res.json();
  };

  useEffect(() => {
  const loadResult = async () => {
    const token = localStorage.getItem("access_token");

    const res = await fetch(
      `${API}exams/${exam_id}/users/${student_id}/attempts/${attempt}/evaluation`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setResult(data);
  };

  loadResult();
}, []);


  // --------------------------
  // LOADING
  // --------------------------
  if (loading) return <p className="p-6 text-center">Түр хүлээнэ үү...</p>;

  // --------------------------
  // EXAM NOT FOUND
  // --------------------------
  if (!exam) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Шалгалт олдсонгүй</p>
        <Link
          to="/team6"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Нүүр хуудас руу буцах
        </Link>
      </div>
    );
  }

  // --------------------------
  // RESULT NOT FOUND
  // --------------------------
  if (!submission) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <p className="text-gray-600 text-lg mb-4">Үр дүн олдсонгүй</p>
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}`}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Шалгалт эхлүүлэх
        </Link>
      </div>
    );
  }

  // --------------------------
  // STATS
  // --------------------------
  const passed = submission.grade_point >= 60;
  const correctCount = submission.answers.filter((a) => a.is_correct).length;
  const totalCount = submission.answers.length;

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return "bg-green-100 border-green-500";
    if (score >= 80) return "bg-green-50 border-green-400";
    if (score >= 70) return "bg-blue-50 border-blue-400";
    if (score >= 60) return "bg-yellow-50 border-yellow-400";
    return "bg-red-50 border-red-400";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}`}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            {exam.name} - Үр дүн
          </h1>
          {course && (
            <p className="text-gray-600 mt-1">Хичээл: {course.name}</p>
          )}
        </div>
      </div>

      {/* MAIN RESULT CARD */}
      <div
        className={`bg-white rounded-lg shadow-xl p-8 text-center border-4 ${
          passed ? "border-green-500" : "border-red-500"
        }`}
      >
        <div className="mb-6">
          {passed ? (
            <div className="mb-4">
              <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                <CheckCircle className="text-green-600" size={64} />
              </div>
              <h2 className="text-3xl font-bold text-green-900 mb-2">
                Тэнцсэн байна! 🎉
              </h2>
            </div>
          ) : (
            <div className="mb-4">
              <div className="inline-flex p-4 bg-red-100 rounded-full mb-4">
                <XCircle className="text-red-600" size={64} />
              </div>
              <h2 className="text-3xl font-bold text-red-900 mb-2">
                Тэнцээгүй байна
              </h2>
            </div>
          )}

          <div className="space-y-1 text-gray-700">
            {submission.submit_time && (
              <p>
                Илгээсэн:{" "}
                {new Date(submission.submit_time).toLocaleString("mn-MN")}
              </p>
            )}

            {submission.completion_time_minutes && (
              <p className="text-sm text-gray-500">
                Дуусгасан хугацаа: {submission.completion_time_minutes} минут
              </p>
            )}

            {submission.attempt_number && (
              <p className="text-sm text-gray-500">
                {submission.attempt_number}-р оролдлого
              </p>
            )}
          </div>
        </div>

        {/* SCORE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div
            className={`rounded-lg p-6 border-4 ${getScoreBgColor(
              submission.grade_point
            )}`}
          >
            <p className="text-sm text-gray-700 mb-2">Оноо</p>
            <p
              className={`text-4xl font-bold ${getScoreColor(
                submission.grade_point
              )}`}
            >
              {submission.total_earned}/{submission.total_possible}
            </p>
          </div>

          <div
            className={`rounded-lg p-6 border-4 ${getScoreBgColor(
              submission.grade_point
            )}`}
          >
            <p className="text-sm text-gray-700 mb-2">Эзлэх хувь</p>
            <p
              className={`text-4xl font-bold ${getScoreColor(
                submission.grade_point
              )}`}
            >
              {submission.grade_point.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* CORRECT / WRONG */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-gray-700 font-medium">
              Зөв:{" "}
              <span className="text-green-700 font-bold">{correctCount}</span>/
              {totalCount}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
            <XCircle className="text-red-600" size={20} />
            <span className="text-gray-700 font-medium">
              Буруу:{" "}
              <span className="text-red-700 font-bold">
                {totalCount - correctCount}
              </span>
              /{totalCount}
            </span>
          </div>
        </div>

        {/* TEACHER CHECKING INFO */}
        {submission.status === "submitted" && (
          <div className="pt-6 border-t border-gray-200 text-sm text-gray-600">
            {submission.teacher_checked
              ? "✅ Багш шалгасан"
              : "⏳ Багш шалгах хүлээгдэж байна"}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Дэлгэрэнгүй мэдээлэл
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Эхлэсэн цаг</p>
            <p className="font-medium">
              {submission.start_time
                ? new Date(submission.start_time).toLocaleString("mn-MN")
                : "-"}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Илгээсэн цаг</p>
            <p className="font-medium">
              {submission.submit_time
                ? new Date(submission.submit_time).toLocaleString("mn-MN")
                : "-"}
            </p>

            {submission.completion_time_minutes && (
              <p className="text-xs text-gray-500 mt-1">
                Дуусгасан: {submission.completion_time_minutes} мин
              </p>
            )}
          </div>

          {submission.attempt_number && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Оролдлого</p>
              <p className="font-medium">{submission.attempt_number}-р</p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Төлөв</p>
            <p className="font-medium">
              {submission.status === "submitted"
                ? "Илгээсэн"
                : submission.status === "in_progress"
                ? "Явж байна"
                : "Эхэлсэн"}
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {exam.show_correct_answer && (
          <Link
            to={`/team6/exams/${exam_id}/students/${student_id}/check`}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Eye size={20} />
            Зөв хариулт харах
          </Link>
        )}

        <Link
          to={`/team6/exams/${exam_id}/students/${student_id}`}
          className="flex items-center justify-center gap-2 bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
        >
          <RotateCcw size={20} />
          Дахин оролдох
        </Link>
      </div>
    </div>
  );
};

export default ExamResult;
