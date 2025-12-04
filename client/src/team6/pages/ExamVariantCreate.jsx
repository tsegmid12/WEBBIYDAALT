import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils/api";
import { ArrowLeft, Save, Plus, X } from "lucide-react";

const ExamVariantCreate = () => {
  const { exam_id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questionBank, setQuestionBank] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    variant_name: "",
    description: "",
    question_ids: [],
  });

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // ================================
  // LOAD exam + question bank
  // ================================
  useEffect(() => {
    const loadData = async () => {
      try {
        const examRes = await API.get(`/exams/${exam_id}`);
        setExam(examRes.data);

        // Question bank - depending on your API:
        const qRes = await API.get("/question-bank");
        setQuestionBank(qRes.data || []);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [exam_id]);

  if (loading) return <div className="text-center mt-10">Уншиж байна...</div>;

  if (!exam) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Шалгалт олдсонгүй</p>
      </div>
    );
  }

  // ================================
  // ADD / REMOVE questions
  // ================================
  const handleAddQuestion = (questionId) => {
    if (!selectedQuestions.includes(questionId)) {
      setSelectedQuestions([...selectedQuestions, questionId]);

      setFormData({
        ...formData,
        question_ids: [...formData.question_ids, questionId],
      });
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));

    setFormData({
      ...formData,
      question_ids: formData.question_ids.filter((id) => id !== questionId),
    });
  };

  // ================================
  // SUBMIT to API
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        variant_name: formData.variant_name,
        description: formData.description,
        question_ids: formData.question_ids,
      };

      console.log("Submitting variant:", payload);

      await API.post(`/exams/${exam_id}/variants`, payload);

      navigate(`/team6/exams/${exam_id}/variants`);
    } catch (err) {
      console.error("Error creating variant:", err);
      alert("Хувилбар үүсгэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/team6/exams/${exam_id}/variants`)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          Шинэ хувилбар үүсгэх
        </h1>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Variant info */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Хувилбарын нэр *
            </label>
            <input
              type="text"
              required
              value={formData.variant_name}
              onChange={(e) =>
                setFormData({ ...formData, variant_name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Жишээ: Хувилбар A"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тайлбар
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Хувилбарын тайлбар..."
            />
          </div>
        </div>

        {/* Selected Questions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Сонгосон асуултууд ({selectedQuestions.length})
          </h2>

          {selectedQuestions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Асуулт сонгоогүй байна
            </p>
          ) : (
            <div className="space-y-2">
              {selectedQuestions.map((qId) => {
                const question = questionBank.find((q) => q.id === qId);

                return (
                  <div
                    key={qId}
                    className="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {question.question_text}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {question.category_name} • {question.type}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qId)}
                      className="ml-4 p-1 hover:bg-red-100 rounded"
                    >
                      <X size={16} className="text-red-600" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Question Bank */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Асуултын сан
          </h2>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {questionBank
              .filter((q) => !selectedQuestions.includes(q.id))
              .map((question) => (
                <div
                  key={question.id}
                  className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {question.question_text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {question.category_name} • {question.type}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddQuestion(question.id)}
                    className="ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(`/team6/exams/${exam_id}/variants`)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Цуцлах
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={20} />
            Хадгалах
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamVariantCreate;
