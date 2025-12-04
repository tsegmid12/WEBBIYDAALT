import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../utils/api";

import { ArrowLeft, Edit, FileText } from "lucide-react";

const ExamVariantDetail = () => {
  const { exam_id, id: variant_id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // FETCH exam + variant detail
  // ===============================
  useEffect(() => {
    const loadData = async () => {
      try {
        const examRes = await API.get(`/exams/${exam_id}`);
        setExam(examRes.data);

        const variantRes = await API.get(
          `/exams/${exam_id}/variants/${variant_id}`
        );
        setVariant(variantRes.data);
      } catch (err) {
        console.error("Error loading variant:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [exam_id, variant_id]);

  // ===============================
  // LOADING state
  // ===============================
  if (loading)
    return <div className="text-center mt-10 text-gray-600">Уншиж байна...</div>;

  // ===============================
  // ERROR state
  // ===============================
  if (!exam || !variant) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Хувилбар олдсонгүй</p>
        <Link
          to="/team6"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Нүүр хуудас руу буцах
        </Link>
      </div>
    );
  }

  const questions = variant.questions || [];

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

        <div className="flex-1">
          <Link
            to={`/team6/exams/${exam_id}/variants`}
            className="text-blue-600 hover:underline text-sm mb-2 inline-block"
          >
            ← Хувилбарууд руу буцах
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            {variant.variant_name}
          </h1>
          <p className="text-gray-600 mt-2">{variant.description}</p>
        </div>

        <button
          onClick={() =>
            navigate(`/team6/exams/${exam_id}/variants/${variant_id}/edit`)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Edit size={20} />
          Засах
        </button>
      </div>

      {/* VARIANT INFO */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Мэдээлэл</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Шалгалт:</span>
            <span className="ml-2 font-medium">{exam.name}</span>
          </div>

          <div>
            <span className="text-sm text-gray-600">Үүсгэсэн:</span>
            <span className="ml-2 font-medium">
              {new Date(variant.created_at).toLocaleDateString("mn-MN")}
            </span>
          </div>

          <div>
            <span className="text-sm text-gray-600">Асуултын тоо:</span>
            <span className="ml-2 font-medium">{questions.length}</span>
          </div>
        </div>
      </div>

      {/* QUESTIONS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Асуултууд</h2>

        {questions.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Асуулт байхгүй байна</p>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.question_id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {index + 1}
                  </span>

                  <span className="text-sm text-gray-600">
                    {question.type} • {question.point} оноо
                  </span>
                </div>

                <p className="text-gray-900 mb-2">
                  {question.question_text}
                </p>

                {/* OPTIONS (multiple-choice) */}
                {question.options && (
                  <div className="mt-2 space-y-1">
                    {question.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`text-sm p-2 rounded ${
                          opt.is_correct
                            ? "bg-green-50 text-green-800"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {opt.text}
                        {opt.is_correct && (
                          <span className="ml-2 text-xs">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamVariantDetail;
