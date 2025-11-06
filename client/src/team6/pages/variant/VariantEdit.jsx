

// ==========================================
// 9. VariantEdit.jsx - Вариант засах
// ==========================================

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VariantEdit() {
  const { exam_id, id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('Вариант А');

  const handleSave = () => {
    console.log('Вариант шинэчлэх:', { id, name });
    alert('Вариант амжилттай шинэчлэгдлээ!');
    navigate(`/exams/${exam_id}/variants/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Вариант засах</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Вариантын нэр *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/exams/${exam_id}/variants/${id}`)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
          >
            Болих
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}
