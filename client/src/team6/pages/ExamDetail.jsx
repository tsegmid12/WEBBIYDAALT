import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/lmsApi";
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  BarChart3,
  Settings,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ExamDetail = () => {
  const { exam_id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [examUsers, setExamUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        setError(null);

        let examData = null;
        
        // Try to fetch exam details from API
        try {
          examData = await api.exams.getExam(exam_id);
          setExam(examData);
        } catch (apiErr) {
          // If API fails, try to load from localStorage
          const localExams = JSON.parse(localStorage.getItem("all_exams") || "[]");
          examData = localExams.find(e => e.id === parseInt(exam_id));
          
          if (!examData) {
            throw new Error("Шалгалт олдсонгүй. API болон localStorage-аас олдсонгүй.");
          }
          setExam(examData);
        }

        // Fetch course info
        if (examData && examData.course_id) {
          try {
            const courseData = await api.courses.getCourse(examData.course_id);
            setCourse(courseData);
          } catch (courseErr) {
            // Course fetch failed, but continue
            setCourse(null);
          }
        }

        // Fetch exam questions configuration
        try {
          const questionsData = await api.exams.getExamQuestions(exam_id);
          // Handle both array response and object with items property
          if (Array.isArray(questionsData)) {
            setQuestions(questionsData);
          } else if (questionsData && questionsData.items) {
            setQuestions(questionsData.items);
          } else {
            setQuestions([]);
          }
        } catch (qErr) {
          setQuestions([]);
        }

        // Fetch exam user attempts/submissions from API
        let apiSubmissions = [];
        try {
          const usersData = await api.exams.getExamUsers(exam_id);
          // Handle both array response and object with items property
          if (Array.isArray(usersData)) {
            apiSubmissions = usersData;
          } else if (usersData && usersData.items) {
            apiSubmissions = usersData.items;
          }
          setExamUsers(apiSubmissions);
        } catch (uErr) {
          setExamUsers([]);
        }

        // Also load submissions from localStorage (support both studentSubmissions and all_exam_submissions)
        try {
          const localStudentSubs = JSON.parse(
            localStorage.getItem("studentSubmissions") || "[]"
          );
          const localAllSubs = JSON.parse(
            localStorage.getItem("all_exam_submissions") || "[]"
          );

          const combinedLocal = [
            ...(Array.isArray(localStudentSubs) ? localStudentSubs : []),
            ...(Array.isArray(localAllSubs) ? localAllSubs : []),
          ];
          const examLocalSubmissions = combinedLocal.filter(
            (s) => s.exam_id === parseInt(exam_id)
          );

          // Merge with API submissions (if any)
          // Filter out duplicates by id or by student_id+attempt_number
          const mergedSubmissions = [...apiSubmissions];
          examLocalSubmissions.forEach((localSub) => {
            const exists = mergedSubmissions.some(
              (apiSub) =>
                apiSub.id === localSub.id ||
                (apiSub.student_id === localSub.student_id &&
                  apiSub.attempt_number === localSub.attempt_number &&
                  apiSub.exam_id === localSub.exam_id)
            );
            if (!exists) {
              mergedSubmissions.push(localSub);
            }
          });
          setExamUsers(mergedSubmissions);
        } catch (storageErr) {
          // Failed to load from localStorage - continue with API data only
        }
      } catch (err) {
        setError(err.message || "Шалгалтын мэдээлэл татахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [exam_id]);

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Шалгалтын мэдээлэл уншиж байна...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
        <p className="text-red-800 text-lg font-medium">Алдаа гарлаа</p>
        <p className="text-red-600 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Дахин оролдох
        </button>
      </div>
    );
  }

  // Check if exam exists before accessing its properties
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

  // Additional calculations (safe to access exam properties now)
  const hasSubmissions = examUsers.length > 0;
  const totalPoints = questions.reduce((sum, q) => sum + (q.point || q.quantity || 1), 0);
  const totalScore = exam.total_point || exam.total_score || totalPoints;
  const courseGradeContribution = exam.grade_point || 20;

  const now = new Date();
  const startDate = new Date(exam.start_on || exam.open_on || exam.start_date);
  const closeDate = new Date(exam.close_on || exam.end_on || exam.close_date);
  const isUpcoming = now < startDate;
  const isActive = now >= startDate && now <= closeDate;
  const isCompleted = now > closeDate;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Link
            to={`/team6/courses/${exam.course_id}/exams`}
            className="text-blue-600 hover:underline text-sm mb-2 inline-block"
          >
            ← {course?.name || "Хичээл"} руу буцах
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{exam.name}</h1>
          <p className="text-gray-600 mt-2">
            {exam.description || "Тайлбар байхгүй"}
          </p>
        </div>
        <div className="flex gap-2">
          {!hasSubmissions && (
            <button
              onClick={() => navigate(`/team6/exams/${exam_id}/edit`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Edit size={20} />
              Засах
            </button>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              isUpcoming
                ? "bg-yellow-100 text-yellow-800"
                : isActive
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {isUpcoming ? "Ирээдүйд" : isActive ? "Идэвхтэй" : "Дууссан"}
          </span>
          {examUsers.length > 0 && (
            <span className="text-sm text-gray-600">
              {examUsers.length} удаа өгсөн
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-blue-600" size={24} />
            <h3 className="font-semibold text-gray-900">Огноо</h3>
          </div>
          <p className="text-sm text-gray-600">
            Эхлэх: {new Date(startDate).toLocaleString("mn-MN")}
          </p>
          <p className="text-sm text-gray-600">
            Дуусах: {new Date(closeDate).toLocaleString("mn-MN")}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-green-600" size={24} />
            <h3 className="font-semibold text-gray-900">Хугацаа</h3>
          </div>
          <p className="text-sm text-gray-600">{exam.duration} минут</p>
          <p className="text-xs text-gray-500 mt-1">
            Хэдэн удаа өгч болох:{" "}
            {exam.max_attempt === 1 ? "1 удаа" : `${exam.max_attempt} удаа`}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-purple-600" size={24} />
            <h3 className="font-semibold text-gray-900">Асуулт</h3>
          </div>
          <p className="text-sm text-gray-600">{questions.length} асуулт</p>
          <p className="text-sm text-gray-600">
            Нийт оноо: {totalScore}
          </p>
        </div>
      </div>

      {/* Score and Contribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award size={24} />
          Оноо ба хувь нэмэр
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Нийт оноо</p>
            <p className="text-2xl font-bold text-blue-600">
              {totalScore}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Хамгийн өндөр оноотой оюутан {totalScore} оноо авна
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">
              Хичээлийн дүнд эзлэх хувь
            </p>
            <p className="text-2xl font-bold text-green-600">
              {courseGradeContribution}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Энэ шалгалт хичээлийн дүнд {courseGradeContribution}% эзлэнэ
            </p>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Тохиргоо</h2>
          <Link
            to={`/team6/exams/${exam_id}/variants`}
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
          >
            <Settings size={16} />
            Хувилбарууд
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Хувилбар:</span>
            <span className="ml-2 font-medium">
              {exam.max_attempt === 1 ? "1 удаа" : `${exam.max_attempt} удаа`}{" "}
              өгч болно
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Асуулт холих:</span>
            <span className="ml-2 font-medium">
              {exam.is_shuffled ? "Тийм" : "Үгүй"}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Үр дүн харуулах:</span>
            <span className="ml-2 font-medium">
              {exam.show_result_after ? "Тийм" : "Үгүй"}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Зөв хариулт:</span>
            <span className="ml-2 font-medium">
              {exam.show_correct_answer ? "Тийм" : "Үгүй"}
            </span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Асуултууд</h2>
        </div>
        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Одоогоор асуулт нэмэгдээгүй байна.</p>
            </div>
          ) : (
            questions.map((eq, index) => (
              <div
                key={eq.id || index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">
                      {eq.question?.type || eq.type || "Асуулт"} • {eq.point || eq.default_point || 0} оноо
                    </span>
                  </div>
                </div>
                <p className="text-gray-900">
                  {eq.question?.question || eq.question_text || eq.text || "Асуулт олдсонгүй"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Student Submissions Summary */}
      {examUsers.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={24} />
            Оюутнуудын үр дүн
          </h2>
          <div className="space-y-2">
            {examUsers.slice(0, 10).map((submission) => {
              const completionTime =
                submission.completion_time_minutes ||
                (submission.submit_time && submission.start_time
                  ? Math.floor(
                      (new Date(submission.submit_time) -
                        new Date(submission.start_time)) /
                        1000 /
                        60
                    )
                  : 0);
              return (
                <div
                  key={
                    submission.id ||
                    `${submission.exam_id}-${submission.student_id}`
                  }
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {submission.student_name ||
                        submission.user_name ||
                        `Оюутан ${submission.student_id}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {submission.attempt_number
                        ? `${submission.attempt_number}-р оролдлого`
                        : "1-р оролдлого"}{" "}
                      • Дуусгасан: {completionTime} минут
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {submission.grade_point
                        ? submission.grade_point.toFixed(1)
                        : "0"}
                      %
                    </p>
                    <p className="text-xs text-gray-500">
                      {submission.total_earned || 0}/
                      {submission.total_possible || totalScore}
                    </p>
                  </div>
                </div>
              );
            })}
            {examUsers.length > 10 && (
              <Link
                to={`/team6/exams/${exam_id}/report`}
                className="block text-center text-blue-600 hover:underline mt-4"
              >
                Бүх үр дүн харах ({examUsers.length} оюутан)
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Link
          to={`/team6/exams/${exam_id}/report`}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <BarChart3 size={20} />
          Тайлан харах
        </Link>
      </div>
    </div>
  );
};

export default ExamDetail;
