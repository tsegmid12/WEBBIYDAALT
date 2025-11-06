// ==========================================
// 2. ExamCreate.jsx - Шалгалт үүсгэх
// ==========================================

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, name: "React" },
  { id: 2, name: "Node.js" },
  { id: 3, name: "Database" }
];

const levels = [
  { id: 1, name: "Хялбар" },
  { id: 2, name: "Дунд" },
  { id: 3, name: "Хүнд" }
];

const questionTypes = [
  { value: "single_choice", label: "Нэг хувилбар" },
  { value: "multiple_choice", label: "Олон хувилбар" },
  { value: "true_false", label: "Үнэн/Худал" },
  { value: "text_answer", label: "Нээлттэй хариулт" }
];

export default function ExamCreate() {
  const { course_id } = useParams();
  const navigate = useNavigate();
  
  const [examInfo, setExamInfo] = useState({
    name: '',
    description: '',
    duration: 60,
    start_date: '',
    start_time: '',
    close_date: '',
    close_time: ''
  });

  const [rules, setRules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRule, setCurrentRule] = useState({
    category_id: 1,
    level_id: 1,
    type: 'single_choice',
    count: 1
  });

  const addRule = () => {
    setRules([...rules, { ...currentRule, id: Date.now() }]);
    setShowModal(false);
    setCurrentRule({ category_id: 1, level_id: 1, type: 'single_choice', count: 1 });
  };

  const removeRule = (id) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const getTotalQuestions = () => {
    return rules.reduce((sum, rule) => sum + rule.count, 0);
  };

  const handleSubmit = () => {
    if (!examInfo.name || rules.length === 0) {
      alert('Шалгалтын нэр болон асуултын дүрэм шаардлагатай!');
      return;
    }
    
    console.log('Шалгалт үүсгэх:', { ...examInfo, rules, course_id });
    alert('Шалгалт амжилттай үүсгэгдлээ!');
    navigate(`/courses/${course_id}/exams`);
  };

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name;
  const getLevelName = (id) => levels.find(l => l.id === id)?.name;
  const getTypeName = (val) => questionTypes.find(t => t.value === val)?.label;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Шинэ шалгалт үүсгэх</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Үндсэн мэдээлэл</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Шалгалтын нэр *</label>
                <input
                  type="text"
                  value={examInfo.name}
                  onChange={(e) => setExamInfo({...examInfo, name: e.target.value})}
                  placeholder="Жишээ: Сорил 1"
                  className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Тайлбар</label>
                <textarea
                  value={examInfo.description}
                  onChange={(e) => setExamInfo({...examInfo, description: e.target.value})}
                  placeholder="Шалгалтын тухай..."
                  className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Үргэлжлэх хугацаа (минут)</label>
                <input
                  type="number"
                  value={examInfo.duration}
                  onChange={(e) => setExamInfo({...examInfo, duration: parseInt(e.target.value)})}
                  className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                  min="1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Эхлэх огноо</label>
                  <input
                    type="date"
                    value={examInfo.start_date}
                    onChange={(e) => setExamInfo({...examInfo, start_date: e.target.value})}
                    className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Эхлэх цаг</label>
                  <input
                    type="time"
                    value={examInfo.start_time}
                    onChange={(e) => setExamInfo({...examInfo, start_time: e.target.value})}
                    className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Дуусах огноо</label>
                  <input
                    type="date"
                    value={examInfo.close_date}
                    onChange={(e) => setExamInfo({...examInfo, close_date: e.target.value})}
                    className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Дуусах цаг</label>
                  <input
                    type="time"
                    value={examInfo.close_time}
                    onChange={(e) => setExamInfo({...examInfo, close_time: e.target.value})}
                    className="w-full border-2 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Асуултын дүрэм</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Дүрэм нэмэх
              </button>
            </div>

            {rules.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Асуултын дүрэм байхгүй</p>
              </div>
            ) : (
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div key={rule.id} className="border-2 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold mb-2">Дүрэм #{index + 1}</div>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <div><span className="text-gray-500">Сэдэв:</span> {getCategoryName(rule.category_id)}</div>
                          <div><span className="text-gray-500">Түвшин:</span> {getLevelName(rule.level_id)}</div>
                          <div><span className="text-gray-500">Төрөл:</span> {getTypeName(rule.type)}</div>
                          <div><span className="text-gray-500">Тоо:</span> {rule.count}</div>
                        </div>
                      </div>
                      <button onClick={() => removeRule(rule.id)} className="text-red-500">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-6">
          <h2 className="text-xl font-semibold mb-4">Хураангуй</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Нийт асуулт</div>
              <div className="text-3xl font-bold text-blue-600">{getTotalQuestions()}</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Дүрмийн тоо</div>
              <div className="text-3xl font-bold text-purple-600">{rules.length}</div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!examInfo.name || rules.length === 0}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300"
            >
              Шалгалт үүсгэх
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Дүрэм нэмэх</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Сэдэв</label>
                <select
                  value={currentRule.category_id}
                  onChange={(e) => setCurrentRule({...currentRule, category_id: parseInt(e.target.value)})}
                  className="w-full border-2 rounded-lg p-2"
                >
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Түвшин</label>
                <select
                  value={currentRule.level_id}
                  onChange={(e) => setCurrentRule({...currentRule, level_id: parseInt(e.target.value)})}
                  className="w-full border-2 rounded-lg p-2"
                >
                  {levels.map(lvl => <option key={lvl.id} value={lvl.id}>{lvl.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Төрөл</label>
                <select
                  value={currentRule.type}
                  onChange={(e) => setCurrentRule({...currentRule, type: e.target.value})}
                  className="w-full border-2 rounded-lg p-2"
                >
                  {questionTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Тоо ширхэг</label>
                <input
                  type="number"
                  value={currentRule.count}
                  onChange={(e) => setCurrentRule({...currentRule, count: parseInt(e.target.value)})}
                  className="w-full border-2 rounded-lg p-2"
                  min="1"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">Болих</button>
              <button onClick={addRule} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Нэмэх</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
