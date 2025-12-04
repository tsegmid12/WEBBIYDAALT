import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../utils/api";

import {
  Calendar,
  Clock,
  Edit,
  FileText,
  BarChart3,
  Settings,
  Users,
  Award,
} from "lucide-react";

const ExamDetail = () => {
  const { exam_id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // 1. EXAM DATA
  // =========================================================
  useEffect(() => {
    setLoading(true);

    const fetchExamData = async () => {
      try {
        const examRes = await API.get(`/exams/${exam_id}`);
        setExam(examRes.data);

        const qRes = await API.get(`/exams/${exam_id}/questions`);
        setQuestions(qRes.data || []);

        const studentsRes = await API.get(`/exams/${exam_id}/users`);
        setEligibleStudents(studentsRes.data || []);
      } catch (err) {
        console.error("Error loading exam:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [exam_id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Уншиж байна...</div>;
  }

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

  const now = new Date();
  const startDate = new Date(exam.start_date);
  const closeDate = new Date(exam.close_date);

  const isUpcoming = now < startDate;
  const isActive = now >= startDate && now <= closeDate;
  const isCompleted = now > closeDate;

  const totalPoints = questions.reduce(
    (sum, q) => sum + (q.point || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <Link
            to={`/team6/courses/${exam.course_id}/exams`}
            className="text-blue-600 hover:underline text-sm mb-2 inline-block"
          >
            ← Хичээл рүү буцах
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">{exam.name}</h1>
          <p className="text-gray-600 mt-2">{exam.description}</p>
        </div>

        <div>
          <button
            onClick={() =>
              navigate(`/team6/courses/${exam.course_id}/exams/${exam_id}/edit`)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Edit size={20} />
            Засах
          </button>
        </div>
      </div>

      {/* STATUS */}
      <div className="bg-white rounded-lg shadow p-4">
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
      </div>

      {/* INFO BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dates */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-blue-600" size={24} />
            <h3 className="font-semibold text-gray-900">Огноо</h3>
          </div>
          <p className="text-sm text-gray-600">
            Эхлэх: {startDate.toLocaleString("mn-MN")}
          </p>
          <p className="text-sm text-gray-600">
            Дуусах: {closeDate.toLocaleString("mn-MN")}
          </p>
        </div>

        {/* Duration */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-green-600" size={24} />
            <h3 className="font-semibold text-gray-900">Хугацаа</h3>
          </div>
          <p className="text-sm text-gray-600">{exam.duration} минут</p>
          <p className="text-xs text-gray-500 mt-1">
            Оролдлого: {exam.max_attempt} удаа
          </p>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-purple-600" size={24} />
            <h3 className="font-semibold text-gray-900">Асуулт</h3>
          </div>
          <p className="text-sm text-gray-600">{questions.length} асуулт</p>
          <p className="text-sm text-gray-600">
            Нийт оноо: {totalPoints} / {exam.total_score}
          </p>
        </div>
      </div>

      {/* ELIGIBLE STUDENTS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users size={24} />
          Шалгалт өгөх боломжтой оюутнууд
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Нийт {eligibleStudents.length} оюутан
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
          {eligibleStudents.map((student) => (
            <div
              key={student.user_id}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <p className="text-sm font-medium text-gray-900">
                {student.first_name} {student.last_name}
              </p>
              <p className="text-xs text-gray-500">ID: {student.user_id}</p>
            </div>
          ))}
        </div>
      </div>

      {/* QUESTIONS LIST */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Асуултууд</h2>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={q.question_id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-600">
                  {q.type} • {q.point} оноо
                </span>
              </div>

              <p className="text-gray-900">{q.question_text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* REPORT BUTTON */}
      <div className="flex justify-end">
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
