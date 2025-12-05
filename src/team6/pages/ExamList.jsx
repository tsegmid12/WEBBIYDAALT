import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  FileText,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../utils/lmsApi";

const ExamList = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [courseExams, setCourseExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'upcoming', 'completed'

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch course info
        const courseData = await api.courses.getCourse(course_id);
        setCourse(courseData);

        // Fetch exams from API
        let apiExams = [];
        try {
          const examsData = await api.courses.getCourseExams(course_id);
          apiExams = examsData.items || [];
        } catch (err) {
          apiExams = [];
        }

        // Also get exams from localStorage (fallback for locally created exams)
        const localStorageExams = JSON.parse(
          localStorage.getItem("all_exams") || "[]"
        );
        const localExamsForCourse = localStorageExams.filter(
          (e) => e.course_id === parseInt(course_id)
        );

        // Merge API exams with localStorage exams
        // Use a Map to deduplicate by exam ID (API data takes priority)
        const examMap = new Map();

        // Add localStorage exams first
        localExamsForCourse.forEach((exam) => {
          examMap.set(exam.id, exam);
        });

        // Add API exams (will override localStorage if same ID)
        apiExams.forEach((exam) => {
          examMap.set(exam.id, exam);
        });

        const mergedExams = Array.from(examMap.values());
        setCourseExams(mergedExams); // Changed from setExams to setCourseExams
      } catch (err) {
        setError(err.message || "Failed to load exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [course_id]);

  const now = new Date();

  const categorizeExams = () => {
    const active = [];
    const upcoming = [];
    const completed = [];

    courseExams.forEach((exam) => {
      const startDate = new Date(exam.start_on || exam.start_date);
      const closeDate = new Date(exam.close_on || exam.close_date);

      if (now < startDate) {
        upcoming.push(exam);
      } else if (now >= startDate && now <= closeDate) {
        active.push(exam);
      } else {
        completed.push(exam);
      }
    });

    return { active, upcoming, completed };
  };

  const { active, upcoming, completed } = categorizeExams();

  const getFilteredExams = () => {
    switch (filter) {
      case "active":
        return active;
      case "upcoming":
        return upcoming;
      case "completed":
        return completed;
      default:
        return courseExams;
    }
  };

  const filteredExams = getFilteredExams();

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Шалгалтууд уншиж байна...</p>
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {course?.name || "Хичээлийн"} Шалгалтууд
          </h1>
          <p className="text-gray-600 mt-2">
            Нийт {courseExams.length} шалгалт байна
          </p>
        </div>
        <Link
          to={`/team6/courses/${course_id}/exams/create`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Шинэ шалгалт
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Бүгд ({courseExams.length})
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              filter === "upcoming"
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <AlertCircle size={16} />
            Ирээдүйд ({upcoming.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              filter === "active"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <CheckCircle size={16} />
            Идэвхтэй ({active.length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              filter === "completed"
                ? "bg-gray-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <XCircle size={16} />
            Дууссан ({completed.length})
          </button>
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">
            {filter === "all"
              ? "Шалгалт байхгүй байна"
              : filter === "active"
              ? "Идэвхтэй шалгалт байхгүй"
              : filter === "upcoming"
              ? "Ирээдүйн шалгалт байхгүй"
              : "Дууссан шалгалт байхгүй"}
          </p>
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Бүх шалгалт харах
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredExams.map((exam) => {
            const startDate = new Date(exam.start_on || exam.start_date);
            const closeDate = new Date(
              exam.close_on || exam.close_date || exam.end_on
            );
            const isUpcoming = now < startDate;
            const isActive = now >= startDate && now <= closeDate;
            const isCompleted = now > closeDate;

            return (
              <Link
                key={exam.id}
                to={`/team6/exams/${exam.id}`}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exam.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isUpcoming
                            ? "bg-yellow-100 text-yellow-800"
                            : isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {isUpcoming
                          ? "Ирээдүйд"
                          : isActive
                          ? "Идэвхтэй"
                          : "Дууссан"}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{exam.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>
                          {startDate.toLocaleDateString("mn-MN")} -{" "}
                          {closeDate.toLocaleDateString("mn-MN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{exam.duration} минут</span>
                      </div>
                      <span>
                        {exam.max_attempt === 1
                          ? "1 удаа"
                          : `${exam.max_attempt} удаа`}{" "}
                        өгч болно
                      </span>
                      <span>
                        Нийт оноо: {exam.total_point || exam.total_score}
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
};

export default ExamList;
