import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/lmsApi";
// Import mock data for student section (temporary - for localStorage exam progress tracking)
import {
  studentSubmissions,
  users,
  examQuestions,
} from "../data/mockData";
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
} from "lucide-react";

const Home = () => {
  const selectedRole = getSelectedRole();
  const teacherRole = isTeacher();
  const studentRole = isStudent();

  // State for API data
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user and courses data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current user info (requires authentication)
        let authenticatedUser = null;
        try {
          const userData = await api.users.getCurrentUser();
          authenticatedUser = userData;
          setCurrentUser(userData);
          console.log('Current user:', userData);
        } catch (err) {
          console.log('User not logged in or auth failed:', err.message);
          console.log('💡 To use authenticated APIs, you need to login first or set an auth token.');
          // Continue without authentication
        }

        // Fetch courses based on role
        if (teacherRole) {
          let fetchedCourses = [];

          // Try multiple approaches to fetch courses
          try {
            // Approach 1: Try to fetch from user's school (requires auth)
            if (authenticatedUser?.school_id) {
              console.log('Fetching courses from school:', authenticatedUser.school_id);
              const schoolCoursesData = await api.schools.getSchoolCourses(authenticatedUser.school_id);
              fetchedCourses = schoolCoursesData.items || [];
              console.log('School courses:', fetchedCourses);
            }
          } catch (err) {
            console.log('Failed to fetch school courses:', err.message);
          }

          // Approach 2: If no courses yet, try fetching a specific course (may work without auth)
          if (fetchedCourses.length === 0) {
            try {
              console.log('Trying to fetch course 204 directly...');
              const course204 = await api.courses.getCourse(204);
              fetchedCourses = [course204];
              console.log('✅ Fetched course 204:', course204);
            } catch (err) {
              console.log('❌ Failed to fetch course 204:', err.message);
              if (err.message.includes('Unauthorized')) {
                console.log('💡 Authentication required. The course exists but requires login to access.');
              }
            }
          }

          setCourses(fetchedCourses);
          console.log('Final teacher courses:', fetchedCourses);

          // Fetch exams for these courses
          const allExams = [];
          for (const course of fetchedCourses) {
            try {
              const courseExams = await api.courses.getCourseExams(course.id);
              allExams.push(...(courseExams.items || []));
            } catch (err) {
              console.log(`Failed to fetch exams for course ${course.id}:`, err.message);
            }
          }
          setExams(allExams);

        } else if (studentRole) {
          // For students, exams endpoint requires authentication
          try {
            console.log('Fetching student exams (requires authentication)...');
            const myExams = await api.exams.getMyExams();
            setExams(myExams.items || []);
            console.log('Student exams:', myExams.items);

            // Extract unique courses from exams
            const uniqueCourses = [];
            const courseIds = new Set();
            for (const exam of (myExams.items || [])) {
              if (exam.course_id && !courseIds.has(exam.course_id)) {
                courseIds.add(exam.course_id);
                try {
                  const course = await api.courses.getCourse(exam.course_id);
                  uniqueCourses.push(course);
                } catch (err) {
                  console.log(`Failed to fetch course ${exam.course_id}:`, err.message);
                }
              }
            }
            setCourses(uniqueCourses);
            console.log('Student courses:', uniqueCourses);
          } catch (err) {
            console.log('❌ Failed to fetch student exams:', err.message);
            if (err.message.includes('Unauthorized')) {
              console.log('💡 You need to login as a student to see your exams.');
              setError('Please login to view your exams');
            }
            setExams([]);
          }
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (selectedRole) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [selectedRole, teacherRole, studentRole]);

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Мэдээлэл уншиж байна...</p>
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

  // No role selected
  if (!selectedRole) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Эрх сонгох шаардлагатай</p>
        <Link
          to="/team6/select-role"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Эрх сонгох хуудас руу очих
        </Link>
      </div>
    );
  }

  if (teacherRole) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Сайн байна уу, {currentUser?.first_name || "Багш"}!
          </h1>
          <p className="text-gray-600 mt-2">Таны зааж буй хичээлүүд</p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">
              Одоогоор хичээл байхгүй байна
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {courses.map((course) => {
              const courseExams = exams.filter(
                (e) => e.course_id === course.id
              );
              return (
                <Link
                  key={course.id}
                  to={`/team6/courses/${course.id}/exams`}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {course.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FileText size={16} />
                          {courseExams.length} шалгалт
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
    const studentId = currentUser?.id || 5;
    const now = new Date();

    // For student, we use exams from state (fetched from API)
    // Safe JSON parse helper
    const safeJSONParse = (key, fallback) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.error(`Error parsing ${key} from localStorage:`, e);
        return fallback;
      }
    };

    // Load exams from both mockData and localStorage
    const localStorageExams = safeJSONParse("all_exams", []);

    const allExams = [...exams];
    if (Array.isArray(localStorageExams)) {
      localStorageExams.forEach((lsExam) => {
        const existingIndex = allExams.findIndex((e) => e.id === lsExam.id);
        if (existingIndex >= 0) {
          allExams[existingIndex] = lsExam;
        } else {
          allExams.push(lsExam);
        }
      });
    }

    // Load submissions from both mockData and localStorage
    const localStorageSubmissions = safeJSONParse("studentSubmissions", []);

    const allSubmissions = [...(Array.isArray(studentSubmissions) ? studentSubmissions : []), ...(Array.isArray(localStorageSubmissions) ? localStorageSubmissions : [])];

    // Get all exams organized by course
    const examsByCourse = courses
      .map((course) => {
        const courseExams = allExams.filter((e) => e.course_id === course.id);
        return {
          course,
          exams: courseExams.map((exam) => {
            const startDate = new Date(exam.start_date || exam.start_on);
            const closeDate = new Date(exam.close_date || exam.close_on);
            const studentAttempts = allSubmissions.filter(
              (s) => s.exam_id === exam.id && s.student_id === studentId
            );
            const submission = studentAttempts[studentAttempts.length - 1]; // Latest submission
            const canTake = studentAttempts.length < (exam.max_attempt || 1);
            const isActive = now >= startDate && now <= closeDate;
            const isUpcoming = now < startDate;
            const isExpired = now > closeDate;

            return {
              ...exam,
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
          }),
        };
      })
      .filter((c) => c.exams.length > 0);

    // Categorize exams for quick access
    const activeExams = allExams.filter((exam) => {
      const startDate = new Date(exam.start_date || exam.start_on);
      const closeDate = new Date(exam.close_date || exam.close_on);
      const studentAttempts = allSubmissions.filter(
        (s) => s.exam_id === exam.id && s.student_id === studentId
      );
      const canTake = studentAttempts.length < (exam.max_attempt || 1);
      return (
        now >= startDate && now <= closeDate && canTake
      );
    });

    const upcomingExams = allExams.filter((exam) => {
      const startDate = new Date(exam.start_date);
      const closeDate = new Date(exam.close_date);
      const isUpcoming = now < startDate;
      const isNotExpired = now <= closeDate;
      const studentAttempts = studentSubmissions.filter(
        (s) => s.exam_id === exam.id && s.student_id === studentId
      );
      const canTake = studentAttempts.length < (exam.max_attempt || 1);
      return isUpcoming && isNotExpired && canTake;
    });

    const expiredExams = allExams.filter((exam) => {
      const closeDate = new Date(exam.close_date);
      const studentAttempts = studentSubmissions.filter(
        (s) => s.exam_id === exam.id && s.student_id === studentId
      );
      return now > closeDate && studentAttempts.length === 0;
    });

    // Get submissions from both mockData and localStorage
    const mySubmissions = studentSubmissions.filter(
      (s) => s.student_id === studentId
    );


    const resultExams = allSubmissions
      .map((submission) => {
        const exam = allExams.find((e) => e.id === submission.exam_id);
        return exam ? { exam, submission } : null;
      })
      .filter(Boolean);

    // Helper function to check if exam is in progress
    const isExamInProgress = (exam) => {
      const answersKey = `exam_${exam.id}_student_${studentId}_answers`;
      const savedAnswers = safeJSONParse(answersKey, {});
      const hasProgress =
        savedAnswers &&
        Object.keys(savedAnswers).length > 0;
      if (!hasProgress) return false;

      const submissionsKey = `exam_submissions_${exam.id}_${studentId}`;
      const savedSubmissions = safeJSONParse(submissionsKey, []);
      const hasSubmitted = Array.isArray(savedSubmissions) && savedSubmissions.length > 0;

      return !hasSubmitted;
    };

    // Check for in-progress exams (saved in localStorage but not submitted)
    const inProgressExams = allExams.filter((exam) => {
      const startDate = new Date(exam.start_date);
      const closeDate = new Date(exam.close_date);
      const isActive = now >= startDate && now <= closeDate;
      return isActive && isExamInProgress(exam);
    });

    // Filter active exams to exclude in-progress ones for "new exams to start" section
    const newActiveExams = activeExams.filter(
      (exam) => !isExamInProgress(exam)
    );

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Сайн байна уу, {currentUser?.first_name || "Оюутан"}!
          </h1>
          <p className="text-gray-600 mt-2">Таны шалгалтууд</p>
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
                      const course = courses.find(
                        (c) => c.id === exam.course_id
                      );
                      const answersKey = `exam_${exam.id}_student_${studentId}_answers`;
                      const savedAnswers = safeJSONParse(answersKey, {});
                      const answeredCount = Object.keys(savedAnswers).length;
                      const examQuestionsList = examQuestions.filter(
                        (eq) => eq.exam_id === exam.id
                      );
                      const examQuestionsCount = examQuestionsList.length;

                      return (
                        <Link
                          key={exam.id}
                          to={`/team6/exams/${exam.id}/students/${studentId}/edit`}
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
                              {course && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {course.name}
                                </p>
                              )}
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
                                    width: `${(answeredCount / examQuestionsCount) * 100
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
                      const course = courses.find(
                        (c) => c.id === exam.course_id
                      );
                      const examQuestionsList = examQuestions.filter(
                        (eq) => eq.exam_id === exam.id
                      );

                      return (
                        <Link
                          key={exam.id}
                          to={`/team6/exams/${exam.id}/students/${studentId}`}
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
                              {course && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {course.name}
                                </p>
                              )}
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

        {/* Upcoming Exams */}
        {upcomingExams.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              Ирээдүйн шалгалтууд
            </h2>
            <div className="grid gap-4">
              {upcomingExams.map((exam) => (
                <Link
                  key={exam.id}
                  to={`/team6/exams/${exam.id}/students/${studentId}`}
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
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {resultExams.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Үр дүн
            </h2>
            <div className="grid gap-4">
              {resultExams.map((exam) => {
                const submission = studentSubmissions.find(
                  (s) => s.exam_id === exam.id && s.student_id === studentId
                );
                return (
                  <div
                    key={exam.id}
                    className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {exam.name}
                          </h3>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            ✓ Өгсөн
                          </span>
                        </div>
                        {submission && (
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-green-600 font-medium">
                              Үр дүн: {submission.grade_point?.toFixed(1)}%
                            </span>
                            <span className="text-gray-600">
                              Огноо:{" "}
                              {new Date(submission.submit_time).toLocaleDateString("mn-MN")}
                            </span>
                          </div>
                        )}
                      </div>
                      {submission && (
                        <Link
                          to={`/team6/exams/${exam.id}/students/${studentId}/result`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                        >
                          Үр дүн харах
                        </Link>
                      )}
                    </div>
                  </div>
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
                const course = courses.find((c) => c.id === exam.course_id);
                return (
                  <div
                    key={exam.id}
                    className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-400 opacity-75"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {exam.name}
                        </h3>
                        {course && (
                          <p className="text-sm text-gray-600 mb-2">
                            {course.name}
                          </p>
                        )}
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

        {/* All Exams by Course */}
        {examsByCourse.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Бүх шалгалтууд (Хичээлээр)
            </h2>
            <div className="grid gap-4">
              {examsByCourse.map(({ course, exams: courseExams }) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <FileText size={16} />
                        {courseExams.length} шалгалт
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {courseExams.map((exam) => {
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
                          key={exam.id}
                          to={
                            exam.submission
                              ? `/team6/exams/${exam.id}/students/${studentId}/result`
                              : `/team6/exams/${exam.id}/students/${studentId}`
                          }
                          className={`rounded-lg p-4 border-l-4 hover:shadow-md transition-shadow ${statusColors[exam.status] || "border-gray-300"
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
                                    {exam.submission.grade_point?.toFixed(1) || '0.0'}%
                                  </span>
                                </div>
                              )}
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${exam.status === "active"
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
              ))}
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
