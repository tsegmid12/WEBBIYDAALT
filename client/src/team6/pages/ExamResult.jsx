import { useParams, Link } from "react-router-dom";
import { exams, studentSubmissions, courses } from "../data/mockData";
import {
  Award,
  CheckCircle,
  XCircle,
  Eye,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

const ExamResult = () => {
  const { exam_id, student_id } = useParams();

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

  // Load submissions from both mockData and localStorage
  const localStorageSubmissions = JSON.parse(
    localStorage.getItem("all_exam_submissions") || "[]"
  );
  const allSubmissions = [...studentSubmissions];
  localStorageSubmissions.forEach((lsSub) => {
    const existingIndex = allSubmissions.findIndex(
      (s) =>
        s.exam_id === lsSub.exam_id &&
        s.student_id === lsSub.student_id &&
        s.attempt_number === lsSub.attempt_number
    );
    if (existingIndex >= 0) {
      allSubmissions[existingIndex] = lsSub;
    } else {
      allSubmissions.push(lsSub);
    }
  });

  const submission = allSubmissions.find(
    (s) =>
      s.exam_id === parseInt(exam_id) && s.student_id === parseInt(student_id)
  );

  // Ensure submission has required fields with defaults
  if (submission && !submission.answers) {
    submission.answers = [];
  }
  if (submission && submission.grade_point === undefined) {
    submission.grade_point = 0;
  }
  if (submission && submission.total_possible === undefined) {
    submission.total_possible = 0;
  }
  if (submission && submission.total_earned === undefined) {
    submission.total_earned = 0;
  }

  const course = exam ? courses.find((c) => c.id === exam.course_id) : null;

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

  const passed = submission.grade_point >= 60;
  const correctCount = submission.answers.filter((a) => a.is_correct).length;
  const totalCount = submission.answers.length;

  // Color coding based on score
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

      {/* Main Result Card */}
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
          <div className="space-y-1">
            <p className="text-gray-600">
              {submission.submit_time &&
                `Илгээсэн: ${new Date(submission.submit_time).toLocaleString(
                  "mn-MN"
                )}`}
            </p>
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

        {/* Score Display with Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div
            className={`rounded-lg p-6 border-4 ${getScoreBgColor(
              submission.grade_point
            )}`}
          >
            <p className="text-sm font-medium text-gray-700 mb-2">Оноо</p>
            <p
              className={`text-4xl font-bold ${getScoreColor(
                submission.grade_point
              )}`}
            >
              {submission.total_earned}/{submission.total_possible}
            </p>
            <p className="text-sm text-gray-600 mt-1">Нийт оноо</p>
          </div>
          <div
            className={`rounded-lg p-6 border-4 ${getScoreBgColor(
              submission.grade_point
            )}`}
          >
            <p className="text-sm font-medium text-gray-700 mb-2">Эзлэх хувь</p>
            <p
              className={`text-4xl font-bold ${getScoreColor(
                submission.grade_point
              )}`}
            >
              {submission.grade_point.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 mt-1">Амжилт</p>
          </div>
        </div>

        {/* Correct/Incorrect Stats */}
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

        {submission.status === "submitted" && (
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {submission.teacher_checked
                ? "✅ Багш шалгасан"
                : "⏳ Багш шалгах хүлээгдэж байна"}
            </p>
          </div>
        )}
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Дэлгэрэнгүй мэдээлэл
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Эхлэсэн цаг</p>
            <p className="font-medium text-gray-900">
              {submission.start_time
                ? new Date(submission.start_time).toLocaleString("mn-MN")
                : "-"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Илгээсэн цаг</p>
            <p className="font-medium text-gray-900">
              {submission.submit_time
                ? new Date(submission.submit_time).toLocaleString("mn-MN")
                : "-"}
            </p>
            {submission.completion_time_minutes && (
              <p className="text-xs text-gray-500 mt-1">
                Дуусгасан: {submission.completion_time_minutes} минут
              </p>
            )}
          </div>
          {submission.attempt_number && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Оролдлого</p>
              <p className="font-medium text-gray-900">
                {submission.attempt_number}-р оролдлого
              </p>
            </div>
          )}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Төлөв</p>
            <p className="font-medium text-gray-900">
              {submission.status === "submitted"
                ? "Илгээсэн"
                : submission.status === "in_progress"
                ? "Явж байна"
                : "Эхэлсэн"}
            </p>
          </div>
          {submission.checked_by && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Шалгасан</p>
              <p className="font-medium text-gray-900">
                {submission.checked_at
                  ? new Date(submission.checked_at).toLocaleDateString("mn-MN")
                  : "-"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {exam.show_correct_answer && (
          <Link
            to={`/team6/exams/${exam_id}/students/${student_id}/check`}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Eye size={20} />
            Зөв хариултууд харах
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
