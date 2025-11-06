// ==========================================
// 7. VariantCreate.jsx - Вариант үүсгэх
// ==========================================

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VariantCreate() {
  const { exam_id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name) {
      alert('Вариантын нэр оруулна уу!');
      return;
    }
    console.log('Вариант үүсгэх:', { exam_id, name });
    alert('Вариант амжилттай үүсгэгдлээ!');
    navigate(`/exams/${exam_id}/variants`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Шинэ вариант үүсгэх</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Вариантын нэр *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Жишээ: Вариант А"
            className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            💡 Вариант нь шалгалтын асуултуудын өөр хэлбэр юм. Нэг шалгалтад олон вариант байж болно.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/exams/${exam_id}/variants`)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
          >
            Болих
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Үүсгэх
          </button>
        </div>
      </div>
    </div>
  );
}
