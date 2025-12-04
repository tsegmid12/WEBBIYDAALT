import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, X, Filter, Trash2, Users, CheckSquare, List } from "lucide-react";
import { API } from "../utils/api"; // ← API wrapper

const ExamCreate = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  // creation method
  const [creationMethod, setCreationMethod] = useState("rules");

  // exam basic info
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    close_date: "",
    duration: 60,
    max_attempt: 1,
    is_shuffled: true,
    show_result_after: true,
    show_correct_answer: true,
    total_score: 100,
    course_grade_contribution: 20,
  });

  // fetched data
  const [questionBank, setQuestionBank] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  // API-аас асуулт ба оюутан татах
  useEffect(() => {
    API.get("/questions").then((res) => setQuestionBank(res.data.questions || []));
    API.get("/users?role=student").then((res) => setAllStudents(res.data || []));
  }, []);

  const [eligibleStudentIds, setEligibleStudentIds] = useState([]);

  useEffect(() => {
    setEligibleStudentIds(allStudents.map((s) => s.id));
  }, [allStudents]);

  // Rule method
  const [questionRules, setQuestionRules] = useState([]);
  const [showRuleModal, setShowRuleModal] = useState(false);

  const [currentRule, setCurrentRule] = useState({
    type: "single_choice",
    category_id: "all",
    level_id: "all",
    count: 1,
    point: 5,
  });

  // Specific method
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);
  const [questionFilters, setQuestionFilters] = useState({
    type: "all",
    category_id: "all",
    level_id: "all",
    search: "",
  });

  const handleToggleQuestion = (questionId) => {
    const exists = selectedQuestions.find((q) => q.question_id === questionId);

    if (exists) {
      setSelectedQuestions(selectedQuestions.filter((q) => q.question_id !== questionId));
    } else {
      const q = questionBank.find((x) => x.id === questionId);
      setSelectedQuestions([
        ...selectedQuestions,
        {
          question_id: q.id,
          point: q.default_point || 5,
          order: selectedQuestions.length + 1,
        },
      ]);
    }
  };

  // Rule generate
  const generateQuestionsFromRules = () => {
    let list = [];
    let order = 1;

    questionRules.forEach((rule) => {
      const match = questionBank.filter((q) => {
        if (rule.type && q.type !== rule.type) return false;
        if (rule.category_id !== "all" && q.category_id !== parseInt(rule.category_id)) return false;
        if (rule.level_id !== "all" && q.level_id !== parseInt(rule.level_id)) return false;
        return true;
      });

      const selected = [...match].sort(() => Math.random() - 0.5).slice(0, rule.count);

      selected.forEach((q) => {
        list.push({
          question_id: q.id,
          point: rule.point,
          order: order++,
        });
      });
    });

    return list;
  };

  // SUBMIT → API POST /exams
  const handleSubmit = async (e) => {
    e.preventDefault();

    let examQuestions = [];

    if (creationMethod === "rules") {
      examQuestions = generateQuestionsFromRules();
      if (examQuestions.length === 0) return alert("Дүрэмд тохирох асуулт алга");
    } else {
      examQuestions = selectedQuestions;
      if (examQuestions.length === 0) return alert("Асуулт сонгоно уу");
    }

    const payload = {
      course_id: parseInt(course_id),
      ...formData,
      questions: examQuestions,
      eligible_student_ids: eligibleStudentIds,
    };

    try {
      await API.post("/exams", payload);
      alert("Шалгалт амжилттай үүсгэлээ!");
      navigate(`/team6/courses/${course_id}/exams`);
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа!");
    }
  };

  const filteredQuestions = questionBank.filter((q) => {
    if (questionFilters.type !== "all" && q.type !== questionFilters.type) return false;
    if (questionFilters.category_id !== "all" && q.category_id !== parseInt(questionFilters.category_id)) return false;
    if (questionFilters.level_id !== "all" && q.level_id !== parseInt(questionFilters.level_id)) return false;
    if (questionFilters.search && !q.question.toLowerCase().includes(questionFilters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Шинэ шалгалт үүсгэх</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFO */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold">Шалгалтын мэдээлэл</h2>

          {/* name */}
          <input
            type="text"
            required
            placeholder="Шалгалтын нэр"
            className="w-full px-4 py-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* description */}
          <textarea
            required
            rows={3}
            className="w-full px-4 py-2 border rounded"
            placeholder="Тайлбар"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>

          {/* dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="datetime-local"
              required
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="px-4 py-2 border rounded"
            />

            <input
              type="datetime-local"
              required
              value={formData.close_date}
              onChange={(e) => setFormData({ ...formData, close_date: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          </div>
        </div>

        {/* QUESTION SELECTION + RULES */}
        {/* … (UI code remains the same, only data source changed) */}

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
            <Save size={20} />
            Хадгалах
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamCreate;
