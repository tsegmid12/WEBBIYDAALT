import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../utils/api";
import { getSelectedRole, isTeacher, isStudent } from "../utils/role";
import {
  BookOpen,
  FileText,
  Award,
  Clock,
  Calendar,
  Play,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Plus,
} from "lucide-react";

const Home = () => {
  const selectedRole = getSelectedRole();
  const teacherRole = isTeacher();
  const studentRole = isStudent();

  // Teacher state
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [teacherLoading, setTeacherLoading] = useState(true);

  // Student state
  const [allExams, setAllExams] = useState([]);
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [studentLoading, setStudentLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);

  // Fetch teacher courses
  useEffect(() => {
    if (teacherRole) {
      const fetchTeacherCourses = async () => {
        try {
          setTeacherLoading(true);
          // Get current user's courses (assuming API returns courses for logged-in teacher)
          const response = await API.get("/courses");
          const courses = response.data?.courses || response.data || [];
          setTeacherCourses(courses);
        } catch (err) {
          console.error("Error fetching teacher courses:", err);
          setTeacherCourses([]);
        } finally {
          setTeacherLoading(false);
        }
      };
      fetchTeacherCourses();
    }
  }, [teacherRole]);

  // Fetch student exams and submissions
  useEffect(() => {
    if (studentRole) {
      const fetchStudentData = async () => {
        try {
          setStudentLoading(true);
          
          // Get student ID from localStorage or API
          const token = localStorage.getItem("access_token");
          let currentStudentId = studentId;
          
          // If no student ID, try to get from API or use a default
          if (!currentStudentId) {
            // Try to get current user info
            try {
              const userResponse = await API.get("/users/me");
              currentStudentId = userResponse.data?.id || userResponse.data?.user_id;
              setStudentId(currentStudentId);
            } catch (e) {
              // Fallback: use a default student ID or get from localStorage
              currentStudentId = localStorage.getItem("student_id") || "1";
              setStudentId(currentStudentId);
            }
          }

          // Fetch all exams (or exams available to student)
          const examsResponse = await API.get("/exams");
          const exams = examsResponse.data?.exams || examsResponse.data || [];
          setAllExams(Array.isArray(exams) ? exams : []);

          // Fetch student submissions
          if (currentStudentId) {
            try {
              const submissionsResponse = await API.get(`/users/${currentStudentId}/submissions`);
              const submissions = submissionsResponse.data?.submissions || submissionsResponse.data || [];
              setStudentSubmissions(Array.isArray(submissions) ? submissions : []);
            } catch (e) {
              console.error("Error fetching submissions:", e);
              setStudentSubmissions([]);
            }
          }
        } catch (err) {
          console.error("Error fetching student data:", err);
          setAllExams([]);
          setStudentSubmissions([]);
        } finally {
          setStudentLoading(false);
        }
      };
      fetchStudentData();
    }
  }, [studentRole, studentId]);

  if (!selectedRole) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Эрх сонгох шаардлагатай</p>
        <Link
          to="/team6"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Эрх сонгох хуудас руу очих
        </Link>
      </div>
    );
  }

  if (teacherRole) {

    if (teacherLoading) {
      return (
        <div className="text-center mt-10 text-gray-600">
          Уншиж байна...
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Back arrow and header */}
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/team6"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Буцах"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Сайн байна уу, Багш!
            </h1>
            <p className="text-gray-600 mt-2">Таны зааж буй хичээлүүд</p>
          </div>
        </div>

        {/* Quick action - Create exam info */}
        {teacherCourses.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              💡 <strong>Зөвлөмж:</strong> Хичээл сонгоод шалгалт үүсгэх боломжтой
            </p>
          </div>
        )}

        {teacherCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">
              Одоогоор хичээл байхгүй байна
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {teacherCourses.map((course) => {
              const courseId = course.id || course.course_id;
              return (
                <Link
                  key={courseId}
                  to={`/team6/courses/${courseId}/exams`}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {course.name || course.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FileText size={16} />
                          {course.exam_count || 0} шалгалт
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (studentRole) {
    const now = new Date();
    
    if (studentLoading) {
      return (
        <div className="text-center mt-10 text-gray-600">
          Уншиж байна...
        </div>
      );
    }

    // Process exams with student submissions
    const processExam = (exam) => {
      const examId = exam.id || exam.exam_id;
      const startDate = new Date(exam.start_date);
      const closeDate = new Date(exam.close_date);
      const studentAttempts = studentSubmissions.filter(
        (s) => (s.exam_id === examId || s.exam_id === exam.id) && 
               (s.student_id === studentId || s.student_id === parseInt(studentId))
      );
      const submission = studentAttempts[studentAttempts.length - 1]; // Latest submission
      const canTake = studentAttempts.length < (exam.max_attempt || 1);
      const isActive = now >= startDate && now <= closeDate;
      const isUpcoming = now < startDate;
      const isExpired = now > closeDate;

      return {
        ...exam,
        id: examId,
        status: submission
          ? "completed"
          : isExpired
          ? "expired"
          : isActive
          ? "active"
          : "upcoming",
        canTake,
        submission,
        attemptsCount: studentAttempts.length,
      };
    };

    // Process all exams
    const processedExams = allExams.map(processExam);

    // Categorize exams for quick access
    const activeExams = processedExams.filter((exam) => {
      const startDate = new Date(exam.start_date);
      const closeDate = new Date(exam.close_date);
      const isActive = now >= startDate && now <= closeDate;
      return isActive && exam.canTake;
    });

    const upcomingExams = processedExams.filter((exam) => {
      const startDate = new Date(exam.start_date);
      const closeDate = new Date(exam.close_date);
      const isUpcoming = now < startDate;
      const isNotExpired = now <= closeDate;
      return isUpcoming && isNotExpired && exam.canTake;
    });

    const expiredExams = processedExams.filter((exam) => {
      const closeDate = new Date(exam.close_date);
      return now > closeDate && exam.attemptsCount === 0;
    });

    // Get result exams (exams with submissions)
    const resultExams = processedExams
      .filter((exam) => exam.submission)
      .map((exam) => ({ exam, submission: exam.submission }));

    // Helper function to check if exam is in progress
    const isExamInProgress = (exam) => {
      const examId = exam.id || exam.exam_id;
      const answersKey = `exam_${examId}_student_${studentId}_answers`;
      const savedAnswers = localStorage.getItem(answersKey);
      const hasProgress =
        savedAnswers &&
        Object.keys(JSON.parse(savedAnswers || "{}")).length > 0;
      if (!hasProgress) return false;

      const submissionsKey = `exam_submissions_${examId}_${studentId}`;
      const savedSubmissions = JSON.parse(
        localStorage.getItem(submissionsKey) || "[]"
      );
      const hasSubmitted = savedSubmissions.length > 0;

      return !hasSubmitted;
    };

    // Check for in-progress exams (saved in localStorage but not submitted)
    const inProgressExams = processedExams.filter((exam) => {
      const startDate = new Date(exam.start_date);
      const closeDate = new Date(exam.close_date);
      const isActive = now >= startDate && now <= closeDate;
      return isActive && isExamInProgress(exam);
    });

    // Filter active exams to exclude in-progress ones for "new exams to start" section
    const newActiveExams = activeExams.filter(
      (exam) => !isExamInProgress(exam)
    );

    // Separate previous exams (completed or expired with attempts)
    const previousExams = processedExams.filter((exam) => {
      const closeDate = new Date(exam.close_date);
      return (exam.submission || exam.attemptsCount > 0) || now > closeDate;
    });

    return (
      <div className="space-y-6">
        {/* Back arrow and header */}
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/team6"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Буцах"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Сайн байна уу, Оюутан!
            </h1>
            <p className="text-gray-600 mt-2">Таны шалгалтууд</p>
          </div>
        </div>

        {/* Exam Taking Section - Prominent section for active exams */}
        {(newActiveExams.length > 0 || inProgressExams.length > 0) && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Play className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Шалгалт өгөх
                </h2>
                <p className="text-gray-600 text-sm">
                  Идэвхтэй шалгалтууд болон үргэлжлүүлэх шалгалтууд
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* In-Progress Exams */}
              {inProgressExams.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="text-orange-500" size={18} />
                    Үргэлжлүүлэх шалгалтууд
                  </h3>
                  <div className="grid gap-3">
                    {inProgressExams.map((exam) => {
                      const examId = exam.id || exam.exam_id;
                      const answersKey = `exam_${examId}_student_${studentId}_answers`;
                      const savedAnswers = JSON.parse(
                        localStorage.getItem(answersKey) || "{}"
                      );
                      const answeredCount = Object.keys(savedAnswers).length;
                      // Get question count from exam or use a default
                      const examQuestionsCount = exam.question_count || exam.questions?.length || 10;

                      return (
                        <Link
                          key={examId}
                          to={`/team6/exams/${examId}/students/${studentId}/edit`}
                          className="bg-white rounded-lg p-5 border-2 border-orange-400 hover:border-orange-500 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-bold text-gray-900">
                                  {exam.name}
                                </h4>
                                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                                  Үргэлжлүүлэх
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  {exam.duration} минут
                                </span>
                                <span className="flex items-center gap-1">
                                  <CheckCircle size={14} />
                                  {answeredCount} асуултанд хариулсан
                                </span>
                              </div>
                              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-orange-500 h-2 rounded-full transition-all"
                                  style={{
                                    width: `${
                                      (answeredCount / examQuestionsCount) * 100
                                    }%`,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                                <Play size={18} />
                                <span className="font-semibold">
                                  Үргэлжлүүлэх
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Available Exams to Start */}
              {newActiveExams.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={18} />
                    Шинэ шалгалт эхлүүлэх
                  </h3>
                  <div className="grid gap-3">
                    {newActiveExams.map((exam) => {
                      const examId = exam.id || exam.exam_id;

                      return (
                        <Link
                          key={examId}
                          to={`/team6/exams/${examId}/students/${studentId}/edit`}
                          className="bg-white rounded-lg p-5 border-2 border-green-400 hover:border-green-500 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-bold text-gray-900">
                                  {exam.name}
                                </h4>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                  Идэвхтэй
                                </span>
                              </div>
                              {exam.description && (
                                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                                  {exam.description}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  {exam.duration} минут
                                </span>
                                <span className="flex items-center gap-1">
                                  <FileText size={14} />
                                  {exam.max_attempt === 1
                                    ? "1 удаа"
                                    : `${exam.max_attempt} удаа`}{" "}
                                  оролдох
                                </span>
                                {exam.course_grade_contribution && (
                                  <span className="flex items-center gap-1">
                                    <Award size={14} />
                                    {exam.course_grade_contribution}% хувь
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                Эхлэх:{" "}
                                {new Date(exam.start_date).toLocaleString(
                                  "mn-MN",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}{" "}
                                • Дуусах:{" "}
                                {new Date(exam.close_date).toLocaleString(
                                  "mn-MN",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg">
                                <Play size={20} />
                                <span className="font-semibold">Эхлүүлэх</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upcoming Exams Section */}
        {upcomingExams.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Calendar className="text-yellow-600" size={28} />
              Ирээдүйн шалгалтууд
              <span className="ml-auto text-sm font-normal text-gray-500">
                ({upcomingExams.length})
              </span>
            </h2>
            <div className="grid gap-4">
              {upcomingExams.map((exam) => {
                const examId = exam.id || exam.exam_id;
                return (
                  <Link
                    key={examId}
                    to={`/team6/exams/${examId}/students/${studentId}`}
                    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-yellow-500"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {exam.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(exam.start_date).toLocaleDateString(
                              "mn-MN"
                            )}{" "}
                            эхлэх
                          </span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            Ирээдүй
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Previous Exams Section */}
        {previousExams.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <FileText className="text-gray-600" size={28} />
              Өмнөх шалгалтууд
              <span className="ml-auto text-sm font-normal text-gray-500">
                ({previousExams.length})
              </span>
            </h2>
            <div className="grid gap-4">
              {previousExams.map((exam) => {
                const examId = exam.id || exam.exam_id;
                const hasSubmission = exam.submission;
                
                return (
                  <Link
                    key={examId}
                    to={
                      hasSubmission
                        ? `/team6/exams/${examId}/students/${studentId}/result`
                        : `/team6/exams/${examId}/students/${studentId}`
                    }
                    className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {exam.name}
                          </h3>
                          {hasSubmission && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              Дууссан
                            </span>
                          )}
                          {!hasSubmission && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                              Дууссан
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(exam.close_date).toLocaleDateString("mn-MN")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {exam.duration} минут
                          </span>
                        </div>
                        {hasSubmission && (
                          <div className="flex items-center gap-2 mt-2">
                            <Award size={16} className="text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">
                              Оноо: {exam.submission.grade_point.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        {hasSubmission ? (
                          <span className="text-sm text-blue-600 font-medium">
                            Үр дүн харах →
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Дэлгэрэнгүй →
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}


        {/* Expired Exams */}
        {expiredExams.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
              Дууссан шалгалтууд
            </h2>
            <div className="grid gap-4">
              {expiredExams.map((exam) => {
                const examId = exam.id || exam.exam_id;
                return (
                  <div
                    key={examId}
                    className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-400 opacity-75"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {exam.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            Дууссан:{" "}
                            {new Date(exam.close_date).toLocaleDateString(
                              "mn-MN"
                            )}
                          </span>
                        </div>
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          Дууссан
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Exams */}
        {processedExams.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
              Бүх шалгалтууд
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid gap-3">
                  {processedExams.map((exam) => {
                      const statusColors = {
                        active: "border-green-500 bg-green-50",
                        upcoming: "border-yellow-500 bg-yellow-50",
                        completed: "border-blue-500 bg-blue-50",
                        expired: "border-gray-400 bg-gray-50 opacity-75",
                      };
                      const statusLabels = {
                        active: "Идэвхтэй",
                        upcoming: "Ирээдүй",
                        completed: "Дууссан",
                        expired: "Дууссан",
                      };

                      return (
                        <Link
                          key={exam.id || exam.exam_id}
                          to={
                            exam.submission
                              ? `/team6/exams/${exam.id || exam.exam_id}/students/${studentId}/result`
                              : `/team6/exams/${exam.id || exam.exam_id}/students/${studentId}`
                          }
                          className={`rounded-lg p-4 border-l-4 hover:shadow-md transition-shadow ${
                            statusColors[exam.status] || "border-gray-300"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {exam.name}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  {exam.duration} минут
                                </span>
                                {exam.attemptsCount > 0 && (
                                  <span className="text-xs">
                                    {exam.attemptsCount}/{exam.max_attempt}{" "}
                                    оролдлого
                                  </span>
                                )}
                              </div>
                              {exam.submission && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Award size={14} className="text-blue-600" />
                                  <span className="text-sm font-medium text-blue-900">
                                    {exam.submission.grade_point.toFixed(1)}%
                                  </span>
                                </div>
                              )}
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                exam.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : exam.status === "upcoming"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : exam.status === "completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {statusLabels[exam.status]}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeExams.length === 0 &&
          upcomingExams.length === 0 &&
          resultExams.length === 0 &&
          expiredExams.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">
                Одоогоор шалгалт байхгүй байна
              </p>
            </div>
          )}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg">Эрх олгоогүй байна</p>
    </div>
  );
};

export default Home;
