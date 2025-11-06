import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exams, questionBank, questionTypes, categories, levels } from '../data/mockData';
import { ArrowLeft, Save, Plus, X, Filter, Trash2 } from 'lucide-react';

const ExamCreate = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    close_date: '',
    duration: 60,
    max_attempt: 1,
    is_shuffled: true,
    show_result_after: true,
    show_correct_answer: true,
    total_score: 100,
  });

  // Rules for question selection: { type, category_id, level_id, count, point }
  const [questionRules, setQuestionRules] = useState([]);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [currentRule, setCurrentRule] = useState({
    type: 'single_choice',
    category_id: 'all',
    level_id: 'all',
    count: 1,
    point: 5,
  });

  const handleAddRule = () => {
    if (currentRule.count < 1) {
      alert('Асуултын тоо 1-ээс их байх ёстой!');
      return;
    }

    const rule = {
      id: Date.now(),
      type: currentRule.type,
      category_id: currentRule.category_id === 'all' ? null : parseInt(currentRule.category_id),
      level_id: currentRule.level_id === 'all' ? null : parseInt(currentRule.level_id),
      count: parseInt(currentRule.count),
      point: parseInt(currentRule.point),
    };

    setQuestionRules([...questionRules, rule]);
    setShowRuleModal(false);
    setCurrentRule({
      type: 'single_choice',
      category_id: 'all',
      level_id: 'all',
      count: 1,
      point: 5,
    });
  };

  const handleRemoveRule = (ruleId) => {
    setQuestionRules(questionRules.filter(r => r.id !== ruleId));
  };

  // Generate questions based on rules
  const generateQuestionsFromRules = () => {
    const selectedQuestions = [];
    let order = 1;

    questionRules.forEach(rule => {
      const matchingQuestions = questionBank.filter(q => {
        if (rule.type && q.type !== rule.type) return false;
        if (rule.category_id && q.category_id !== rule.category_id) return false;
        if (rule.level_id && q.level_id !== rule.level_id) return false;
        return true;
      });

      // Randomly select questions
      const shuffled = [...matchingQuestions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(rule.count, shuffled.length));

      selected.forEach(question => {
        selectedQuestions.push({
          question_id: question.id,
          point: rule.point,
          order: order++,
        });
      });
    });

    return selectedQuestions;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (questionRules.length === 0) {
      alert('Хамгийн багадаа нэг асуултын дүрэм нэмнэ үү!');
      return;
    }

    const generatedQuestions = generateQuestionsFromRules();
    
    if (generatedQuestions.length === 0) {
      alert('Сонгосон дүрэмд тохирох асуулт олдсонгүй!');
      return;
    }

    // In a real app, this would make an API call
    const newExam = {
      id: exams.length + 1,
      course_id: parseInt(course_id),
      ...formData,
      created_by: 4,
      created_at: new Date().toISOString().split('T')[0],
    };
    
    console.log('Creating exam:', newExam);
    console.log('Question rules:', questionRules);
    console.log('Generated questions:', generatedQuestions);
    
    // Navigate back to exam list
    navigate(`/team6/courses/${course_id}/exams`);
  };

  const totalQuestions = questionRules.reduce((sum, rule) => sum + rule.count, 0);
  const totalPoints = questionRules.reduce((sum, rule) => sum + (rule.count * rule.point), 0);

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => navigate(`/team6/courses/${course_id}/exams`)}
          className='p-2 hover:bg-gray-100 rounded-lg'>
          <ArrowLeft size={20} />
        </button>
        <h1 className='text-3xl font-bold text-gray-900'>Шинэ шалгалт үүсгэх</h1>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='bg-white rounded-lg shadow p-6 space-y-6'>
          <h2 className='text-xl font-semibold text-gray-900'>Шалгалтын мэдээлэл</h2>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Шалгалтын нэр *
            </label>
            <input
              type='text'
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Жишээ: Дунд шалгалт'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Тайлбар
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Шалгалтын тайлбар...'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Эхлэх огноо *
              </label>
              <input
                type='datetime-local'
                required
                value={formData.start_date}
                onChange={e =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Дуусах огноо *
              </label>
              <input
                type='datetime-local'
                required
                value={formData.close_date}
                onChange={e =>
                  setFormData({ ...formData, close_date: e.target.value })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Хугацаа (минут) *
              </label>
              <input
                type='number'
                required
                min={1}
                value={formData.duration}
                onChange={e =>
                  setFormData({ ...formData, duration: parseInt(e.target.value) })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Хэдэн удаа өгч болох *
              </label>
              <input
                type='number'
                required
                min={1}
                value={formData.max_attempt}
                onChange={e =>
                  setFormData({
                    ...formData,
                    max_attempt: parseInt(e.target.value),
                  })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Нийт оноо *
            </label>
            <input
              type='number'
              required
              min={1}
              value={formData.total_score}
              onChange={e =>
                setFormData({
                  ...formData,
                  total_score: parseInt(e.target.value),
                })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Жишээ: 100'
            />
            <p className='text-xs text-gray-500 mt-1'>
              Хамгийн өндөр оноотой оюутан энэ оноог авна. Бусад оюутнуудын оноо пропорциональ тооцогдоно.
            </p>
          </div>

          <div className='space-y-3'>
            <label className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={formData.is_shuffled}
                onChange={e =>
                  setFormData({ ...formData, is_shuffled: e.target.checked })
                }
                className='w-5 h-5 text-blue-600 rounded'
              />
              <span className='text-sm font-medium text-gray-700'>
                Асуултын дараалал холих
              </span>
            </label>

            <label className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={formData.show_result_after}
                onChange={e =>
                  setFormData({
                    ...formData,
                    show_result_after: e.target.checked,
                  })
                }
                className='w-5 h-5 text-blue-600 rounded'
              />
              <span className='text-sm font-medium text-gray-700'>
                Дууссаны дараа үр дүн харуулах
              </span>
            </label>

            <label className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={formData.show_correct_answer}
                onChange={e =>
                  setFormData({
                    ...formData,
                    show_correct_answer: e.target.checked,
                  })
                }
                className='w-5 h-5 text-blue-600 rounded'
              />
              <span className='text-sm font-medium text-gray-700'>
                Зөв хариулт харуулах
              </span>
            </label>
          </div>
        </div>

        {/* Question Rules */}
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>
                Асуултын дүрэм
              </h2>
              <p className='text-sm text-gray-600 mt-1'>
                Нийт: {totalQuestions} асуулт • {totalPoints} оноо
              </p>
            </div>
            <button
              type='button'
              onClick={() => setShowRuleModal(true)}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
              <Plus size={20} />
              Дүрэм нэмэх
            </button>
          </div>

          {questionRules.length === 0 ? (
            <div className='text-center py-8 border-2 border-dashed border-gray-300 rounded-lg'>
              <p className='text-gray-500 mb-4'>Асуултын дүрэм нэмээгүй байна</p>
              <button
                type='button'
                onClick={() => setShowRuleModal(true)}
                className='text-blue-600 hover:underline'>
                Эхний дүрмээ нэмэх
              </button>
            </div>
          ) : (
            <div className='space-y-3'>
              {questionRules.map((rule, index) => {
                const typeLabel = questionTypes.find(t => t.value === rule.type)?.label || rule.type;
                const categoryName = rule.category_id
                  ? categories.find(c => c.id === rule.category_id)?.name || 'Бүх сэдэв'
                  : 'Бүх сэдэв';
                const levelName = rule.level_id
                  ? levels.find(l => l.id === rule.level_id)?.name || 'Бүх түвшин'
                  : 'Бүх түвшин';

                return (
                  <div
                    key={rule.id}
                    className='flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                          Дүрэм {index + 1}
                        </span>
                        <span className='text-sm font-semibold text-gray-900'>
                          {rule.count} асуулт
                        </span>
                        <span className='text-sm text-gray-600'>
                          • {rule.point} оноо/асуулт
                        </span>
                      </div>
                      <div className='text-sm text-gray-600 space-y-1'>
                        <p>
                          <span className='font-medium'>Төрөл:</span> {typeLabel}
                        </p>
                        <p>
                          <span className='font-medium'>Сэдэв:</span> {categoryName}
                        </p>
                        <p>
                          <span className='font-medium'>Түвшин:</span> {levelName}
                        </p>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => handleRemoveRule(rule.id)}
                      className='ml-4 p-2 hover:bg-red-100 rounded'>
                      <Trash2 size={18} className='text-red-600' />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Rule Modal */}
        {showRuleModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Асуултын дүрэм нэмэх
              </h3>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Асуултын төрөл *
                  </label>
                  <select
                    value={currentRule.type}
                    onChange={e => setCurrentRule({ ...currentRule, type: e.target.value })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                    {questionTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Сэдэв
                    </label>
                    <select
                      value={currentRule.category_id}
                      onChange={e =>
                        setCurrentRule({ ...currentRule, category_id: e.target.value })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                      <option value='all'>Бүх сэдэв</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Түвшин
                    </label>
                    <select
                      value={currentRule.level_id}
                      onChange={e =>
                        setCurrentRule({ ...currentRule, level_id: e.target.value })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                      <option value='all'>Бүх түвшин</option>
                      {levels.map(level => (
                        <option key={level.id} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Асуултын тоо *
                    </label>
                    <input
                      type='number'
                      required
                      min={1}
                      value={currentRule.count}
                      onChange={e =>
                        setCurrentRule({
                          ...currentRule,
                          count: parseInt(e.target.value) || 1,
                        })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Жишээ: 5'
                    />
                    <p className='text-xs text-gray-500 mt-1'>
                      Энэ төрлийн хэдэн асуулт сонгох вэ?
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Нэг асуултын оноо *
                    </label>
                    <input
                      type='number'
                      required
                      min={1}
                      value={currentRule.point}
                      onChange={e =>
                        setCurrentRule({
                          ...currentRule,
                          point: parseInt(e.target.value) || 5,
                        })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Жишээ: 5'
                    />
                  </div>
                </div>

                {/* Preview available questions */}
                {(() => {
                  const available = questionBank.filter(q => {
                    if (q.type !== currentRule.type) return false;
                    if (currentRule.category_id !== 'all' && q.category_id !== parseInt(currentRule.category_id)) return false;
                    if (currentRule.level_id !== 'all' && q.level_id !== parseInt(currentRule.level_id)) return false;
                    return true;
                  });

                  return (
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                      <p className='text-sm text-blue-800'>
                        <span className='font-medium'>Боломжтой асуулт:</span>{' '}
                        {available.length} асуулт олдлоо
                        {available.length < currentRule.count && (
                          <span className='text-red-600 ml-2'>
                            (Сонгосон тооноос цөөн байна!)
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })()}
              </div>

              <div className='flex gap-4 mt-6 pt-4 border-t'>
                <button
                  type='button'
                  onClick={() => {
                    setShowRuleModal(false);
                    setCurrentRule({
                      type: 'single_choice',
                      category_id: 'all',
                      level_id: 'all',
                      count: 1,
                      point: 5,
                    });
                  }}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'>
                  Цуцлах
                </button>
                <button
                  type='button'
                  onClick={handleAddRule}
                  className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                  Нэмэх
                </button>
              </div>
            </div>
          </div>
        )}

        <div className='flex justify-end gap-4 pt-4 border-t'>
          <button
            type='button'
            onClick={() => navigate(`/team6/courses/${course_id}/exams`)}
            className='px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'>
            Цуцлах
          </button>
          <button
            type='submit'
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
            <Save size={20} />
            Хадгалах
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamCreate;

