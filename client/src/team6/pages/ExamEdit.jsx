import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Plus, X, Filter, AlertCircle
} from 'lucide-react';

const API = "https://todu.mn/bs/lms/open-api-catalog/v1/"; // ★★★ API ROOT

const ExamEdit = () => {
  const { course_id, exam_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [hasSubmissions, setHasSubmissions] = useState(false);

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
    total_score: 100
  });

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionPoints, setQuestionPoints] = useState({});
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");

  // -------------------------------
  // FETCH FUNCTIONS
  // -------------------------------

  const fetchExam = async () => {
    const res = await fetch(`${API}exams/${exam_id}`);
    return await res.json();
  };

  const fetchExamQuestions = async () => {
    const res = await fetch(`${API}exams/${exam_id}/questions`);
    return await res.json();
  };

  const fetchQuestionBank = async () => {
    const res = await fetch(`${API}questions`);
    return await res.json();
  };

  const fetchSubmissions = async () => {
    const res = await fetch(`${API}exams/${exam_id}/submissions`);
    return await res.json();
  };

  // -------------------------------
  // INITIAL LOAD
  // -------------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const [examData, eqData, qbData, sbData] = await Promise.all([
          fetchExam(),
          fetchExamQuestions(),
          fetchQuestionBank(),
          fetchSubmissions()
        ]);

        setExam(examData);
        setExamQuestions(eqData);
        setQuestionBank(qbData);
        setHasSubmissions(sbData.length > 0);

        // Set form values
        setFormData({
          name: examData.name,
          description: examData.description || "",
          start_date: examData.start_date.slice(0, 16),
          close_date: examData.close_date.slice(0, 16),
          duration: examData.duration,
          max_attempt: examData.max_attempt,
          is_shuffled: examData.is_shuffled,
          show_result_after: examData.show_result_after,
          show_correct_answer: examData.show_correct_answer,
          total_score: examData.total_score
        });

        // Set selected questions
        const ids = eqData.map(q => q.question_id);
        setSelectedQuestions(ids);

        const points = {};
        eqData.forEach(q => {
          points[q.question_id] = q.point;
        });
        setQuestionPoints(points);

        setLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
        setLoading(false);
      }
    };

    loadData();
  }, [exam_id]);

  // -------------------------------
  // HANDLERS
  // -------------------------------
  const handleAddQuestion = (questionId) => {
    if (!selectedQuestions.includes(questionId)) {
      const q = questionBank.find(x => x.id === questionId);

      setSelectedQuestions([...selectedQuestions, questionId]);

      setQuestionPoints({
        ...questionPoints,
        [questionId]: q.default_point || 5
      });
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    const updatedPoints = { ...questionPoints };
    delete updatedPoints[questionId];
    setQuestionPoints(updatedPoints);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const confirmSave = window.confirm("Өөрчлөлтийг хадгалах уу?");
  if (!confirmSave) return;

  const updatedExam = {
    name: formData.name,
    description: formData.description,
    start_date: formData.start_date,
    close_date: formData.close_date,
    duration: formData.duration,
    max_attempt: formData.max_attempt,
    is_shuffled: formData.is_shuffled,
    show_result_after: formData.show_result_after,
    show_correct_answer: formData.show_correct_answer,
    total_score: formData.total_score,
  };

  try {
    const token = localStorage.getItem("access_token");

    // 1) UPDATE EXAM
    await fetch(`/users/me/exams/${exam_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedExam)
    });

    // 2) UPDATE EXAM QUESTIONS
    const examQuestionsPayload = selectedQuestions.map((qId, index) => ({
      question_id: qId,
      point: questionPoints[qId],
      order: index + 1
    }));

    await fetch(`/users/me/exams/${exam_id}/questions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(examQuestionsPayload),
    });

    alert("Шалгалт амжилттай хадгалагдлаа!");
    navigateToQuestionsList();
  } catch (err) {
    console.error(err);
    alert("Алдаа гарлаа");
  }
};


  if (loading) return <p className="p-6">Уншиж байна...</p>;

  if (!exam)
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 text-lg'>Шалгалт олдсонгүй</p>
        <Link to='/team6' className='text-blue-600 hover:underline mt-2 inline-block'>
          Нүүр хуудас руу буцах
        </Link>
      </div>
    );

  const filtered = questionBank.filter(q => {
    if (filterType !== "all" && q.type !== filterType) return false;
    if (filterCategory !== "all" && q.category_id !== Number(filterCategory)) return false;
    if (filterLevel !== "all" && q.level_id !== Number(filterLevel)) return false;
    return true;
  });

  const totalPoints = selectedQuestions.reduce(
    (sum, id) => sum + (questionPoints[id] || 0),
    0
  );

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <button onClick={() => navigate(-1)} className='p-2 hover:bg-gray-100 rounded-lg'>
          <ArrowLeft size={20} />
        </button>
        <h1 className='text-3xl font-bold text-gray-900'>Шалгалт засах</h1>
      </div>

      {hasSubmissions && (
        <div className='bg-yellow-50 border border-yellow-300 p-4 rounded flex gap-3'>
          <AlertCircle className='text-yellow-600' />
          <div>
            <p className='font-semibold text-yellow-900'>Оюутнууд өгсөн шалгалт!</p>
            <p className='text-sm text-yellow-700'>Анхааралтай засвар хийнэ үү.</p>
          </div>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className='space-y-6'>

        {/* Exam info */}
        <div className='bg-white p-6 rounded shadow space-y-4'>
          <h2 className='text-xl font-semibold'>Шалгалтын мэдээлэл</h2>

          {/* name */}
          <input
            type="text"
            value={formData.name}
            required
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className='w-full border p-2 rounded'
          />

          {/* description */}
          <textarea
            rows={4}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className='w-full border p-2 rounded'
          />

          {/* dates */}
          <div className='grid grid-cols-2 gap-4'>
            <input
              type="datetime-local"
              value={formData.start_date}
              required
              onChange={e => setFormData({ ...formData, start_date: e.target.value })}
              className='border p-2 rounded'
            />
            <input
              type="datetime-local"
              value={formData.close_date}
              required
              onChange={e => setFormData({ ...formData, close_date: e.target.value })}
              className='border p-2 rounded'
            />
          </div>

          {/* basic settings */}
          <div className='grid grid-cols-2 gap-4'>
            <input
              type="number"
              min={1}
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })}
              className='border p-2 rounded'
            />
            <input
              type="number"
              min={1}
              value={formData.max_attempt}
              onChange={e => setFormData({ ...formData, max_attempt: Number(e.target.value) })}
              className='border p-2 rounded'
            />
          </div>

        </div>

        {/* Selected Questions */}
        <div className='bg-white p-6 rounded shadow'>
          <h2 className='text-lg font-semibold mb-3'>
            Сонгосон асуултууд ({selectedQuestions.length}) — нийт {totalPoints} оноо
          </h2>

          {selectedQuestions.length === 0 ? (
            <p className='text-gray-500 text-center py-4'>Асуулт сонгоогүй байна</p>
          ) : (
            <div className='space-y-3'>
              {selectedQuestions.map((qId, idx) => {
                const q = questionBank.find(x => x.id === qId);
                return (
                  <div key={qId} className='p-4 border rounded bg-gray-50 flex justify-between'>
                    <div>
                      <p className='font-medium'>{idx + 1}. {q.question}</p>
                      <p className='text-sm text-gray-600'>{q.type} • {q.category_name} • {q.level_name}</p>

                      <div className='flex gap-2 mt-2'>
                        <span className='text-sm'>Оноо:</span>
                        <input
                          type='number'
                          min={1}
                          className='border px-2 py-1 w-20'
                          value={questionPoints[qId]}
                          onChange={e => setQuestionPoints({ ...questionPoints, [qId]: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <button
                      type='button'
                      onClick={() => handleRemoveQuestion(qId)}
                      className='p-2 hover:bg-red-100 rounded'
                    >
                      <X className='text-red-600' size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Question Bank */}
        <div className='bg-white p-6 rounded shadow space-y-4'>
          <h2 className='text-lg font-semibold'>Асуултын сан</h2>

          {/* filters */}
          <div className='grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded'>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className='border p-2 rounded'>
              <option value="all">Бүх төрөл</option>
            </select>

            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className='border p-2 rounded'>
              <option value="all">Бүх сэдэв</option>
            </select>

            <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} className='border p-2 rounded'>
              <option value="all">Бүх түвшин</option>
            </select>
          </div>

          {/* list */}
          <div className='max-h-96 overflow-y-auto space-y-2'>
            {filtered
              .filter(q => !selectedQuestions.includes(q.id))
              .map(q => (
                <div
                  key={q.id}
                  className='p-3 border rounded flex justify-between items-start hover:bg-gray-50'
                >
                  <div>
                    <p className='font-medium text-sm'>{q.question}</p>
                    <p className='text-xs text-gray-600'>
                      {q.category_name} • {q.type} • {q.level_name} • {q.default_point} оноо
                    </p>
                  </div>

                  <button
                    type='button'
                    onClick={() => handleAddQuestion(q.id)}
                    className='bg-blue-600 text-white px-3 py-1 rounded'
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* save buttons */}
        <div className='flex justify-end gap-4 pt-4 border-t'>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='px-6 py-2 border rounded hover:bg-gray-50'
          >
            Цуцлах
          </button>

          <button
            type='submit'
            className='px-6 py-2 bg-blue-600 text-white rounded flex items-center gap-2'
          >
            <Save size={18} />
            Хадгалах
          </button>
        </div>

      </form>
    </div>
  );
};

export default ExamEdit;
