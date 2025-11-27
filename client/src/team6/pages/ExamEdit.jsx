import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { exams, examQuestions, questionBank, questionTypes, categories, levels, studentSubmissions } from '../data/mockData';
import { ArrowLeft, Save, Plus, X, Filter, AlertCircle } from 'lucide-react';

const ExamEdit = () => {
  const { course_id, exam_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get all exams
  const getAllExams = () => {
    const localStorageExams = JSON.parse(localStorage.getItem('all_exams') || '[]');
    const allExams = [...exams];
    localStorageExams.forEach(lsExam => {
      const existingIndex = allExams.findIndex(e => e.id === lsExam.id);
      if (existingIndex >= 0) {
        allExams[existingIndex] = lsExam;
      } else {
        allExams.push(lsExam);
      }
    });
    return allExams;
  };
  
  // Get all exam questions
  const getAllExamQuestions = () => {
    const localStorageExamQuestions = JSON.parse(localStorage.getItem('all_exam_questions') || '[]');
    const allExamQuestions = [...examQuestions];
    localStorageExamQuestions.forEach(lsEq => {
      const existingIndex = allExamQuestions.findIndex(eq => eq.exam_id === lsEq.exam_id && eq.question_id === lsEq.question_id);
      if (existingIndex >= 0) {
        allExamQuestions[existingIndex] = lsEq;
      } else {
        allExamQuestions.push(lsEq);
      }
    });
    return allExamQuestions;
  };
  
  const allExams = getAllExams();
  const exam = allExams.find(e => e.id === parseInt(exam_id));
  const allExamQuestions = getAllExamQuestions();
  const existingQuestions = allExamQuestions.filter(eq => eq.exam_id === parseInt(exam_id));
  
  // Check if exam has been taken
  const hasSubmissions = studentSubmissions.some(s => s.exam_id === parseInt(exam_id));
  
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

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionPoints, setQuestionPoints] = useState({});
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  useEffect(() => {
    if (exam) {
      setFormData({
        name: exam.name,
        description: exam.description || '',
        start_date: exam.start_date.slice(0, 16),
        close_date: exam.close_date.slice(0, 16),
        duration: exam.duration,
        max_attempt: exam.max_attempt,
        is_shuffled: exam.is_shuffled,
        show_result_after: exam.show_result_after,
        show_correct_answer: exam.show_correct_answer,
        total_score: exam.total_score || 100,
      });

      const questionIds = existingQuestions.map(eq => eq.question_id);
      setSelectedQuestions(questionIds);
      const points = {};
      existingQuestions.forEach(eq => {
        points[eq.question_id] = eq.point;
      });
      setQuestionPoints(points);
    }
  }, [parseInt(exam_id)]);

  const handleAddQuestion = (questionId) => {
    if (!selectedQuestions.includes(questionId)) {
      const question = questionBank.find(q => q.id === questionId);
      const newQuestions = [...selectedQuestions, questionId];
      setSelectedQuestions(newQuestions);
      setQuestionPoints({
        ...questionPoints,
        [questionId]: question?.default_point || 5,
      });
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    const newPoints = { ...questionPoints };
    delete newPoints[questionId];
    setQuestionPoints(newPoints);
  };

  const handlePointChange = (questionId, point) => {
    setQuestionPoints({
      ...questionPoints,
      [questionId]: parseInt(point) || 0,
    });
  };

  const filteredQuestions = questionBank.filter(q => {
    if (filterType !== 'all' && q.type !== filterType) return false;
    if (filterCategory !== 'all' && q.category_id !== parseInt(filterCategory)) return false;
    if (filterLevel !== 'all' && q.level_id !== parseInt(filterLevel)) return false;
    return true;
  });

  if (!exam) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 text-lg'>Шалгалт олдсонгүй</p>
        <Link to='/team6' className='text-blue-600 hover:underline mt-2 inline-block'>
          Нүүр хуудас руу буцах
        </Link>
      </div>
    );
  }

  const safeExamId = exam_id || (exam ? `${exam.id}` : null);
  const targetCourseId = course_id || exam?.course_id || null;
  const returnToPath = location.state?.returnTo;

  const navigateToQuestionsList = () => {
    if (returnToPath) {
      navigate(returnToPath);
      return;
    }

    const finalCourseId = course_id || exam?.course_id;
    const finalExamId = safeExamId;

    if (finalCourseId && finalExamId) {
      navigate(`/team6/courses/${finalCourseId}/exams/${finalExamId}`);
    } else if (finalExamId) {
      navigate(`/team6/exams/${finalExamId}`);
    } else {
      navigate('/team6');
    }
  };




  const handleCancel = () => {
    const confirmCancel = window.confirm('Өөрчлөлтийг цуцалж буцах уу?');
    if (confirmCancel) {
      navigateToQuestionsList();
    }
  };

  const handleBackClick = () => {
    const confirmBack = window.confirm('Өөрчлөлтийг цуцалж буцах уу?');
    if (confirmBack) {
      navigateToQuestionsList();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!hasSubmissions && selectedQuestions.length === 0) {
      alert('Хамгийн багадаа нэг асуулт сонгоно уу!');
      return;
    }

    const confirmSave = window.confirm('Өөрчлөлтийг хадгалахдаа итгэлтэй байна уу?');
    if (!confirmSave) {
      return;
    }

    // Get current localStorage data
    const localStorageExams = JSON.parse(localStorage.getItem('all_exams') || '[]');
    const localStorageExamQuestions = JSON.parse(localStorage.getItem('all_exam_questions') || '[]');

    // Save exam data to localStorage
    const updatedExam = {
      ...exam,
      ...formData,
      id: parseInt(safeExamId),
    };
    
    const updatedLocalStorageExams = localStorageExams.filter(e => e.id !== parseInt(safeExamId));
    updatedLocalStorageExams.push(updatedExam);
    localStorage.setItem('all_exams', JSON.stringify(updatedLocalStorageExams));

    // Save exam questions to localStorage
    const updatedExamQuestions = selectedQuestions.map((qId, index) => ({
      exam_id: parseInt(safeExamId),
      question_id: qId,
      point: questionPoints[qId] || 5,
      order: index + 1,
    }));

    const updatedLocalStorageExamQuestions = localStorageExamQuestions.filter(
      eq => eq.exam_id !== parseInt(safeExamId)
    );
    updatedLocalStorageExamQuestions.push(...updatedExamQuestions);
    localStorage.setItem('all_exam_questions', JSON.stringify(updatedLocalStorageExamQuestions));

    console.log('Exam saved:', updatedExam);
    console.log('Exam questions saved:', updatedExamQuestions);
    
    navigateToQuestionsList();
  };

  const totalPoints = selectedQuestions.reduce(
    (sum, qId) => sum + (questionPoints[qId] || 0),
    0
  );

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <button
          onClick={handleBackClick}
          className='p-2 hover:bg-gray-100 rounded-lg'>
          <ArrowLeft size={20} />
        </button>
        <h1 className='text-3xl font-bold text-gray-900'>Шалгалт засах</h1>
      </div>

      {hasSubmissions && (
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <AlertCircle className='text-yellow-600 flex-shrink-0 mt-0.5' size={20} />
            <div>
              <p className='font-medium text-yellow-900'>
                Анхаар: Энэ шалгалтыг оюутнууд өгсөн байна
              </p>
              <p className='text-sm text-yellow-700 mt-1'>
                Өөрчлөлтүүдийг хадгалахдаа сайн бодоорой.
              </p>
            </div>
          </div>
        </div>
      )}

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

        {/* Selected Questions */}
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Сонгосон асуултууд ({selectedQuestions.length})
            </h2>
            {selectedQuestions.length > 0 && (
              <div className='text-sm text-gray-600'>
                Нийт оноо: <span className='font-semibold text-gray-900'>{totalPoints}</span>
              </div>
            )}
          </div>
          {selectedQuestions.length === 0 ? (
            <p className='text-gray-500 text-center py-8'>
              Асуулт сонгоогүй байна. Доорх асуултын сангаас сонгоно уу.
            </p>
          ) : (
            <div className='space-y-3'>
              {selectedQuestions.map((qId, index) => {
                const question = questionBank.find(q => q.id === qId);
                return question ? (
                  <div
                    key={qId}
                    className='flex justify-between items-start p-4 border border-gray-200 rounded-lg bg-gray-50'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                          {index + 1}
                        </span>
                        <span className='text-sm text-gray-600'>
                          {questionTypes.find(t => t.value === question.type)?.label || question.type} • {question.category_name} • {question.level_name}
                        </span>
                      </div>
                      <p className='text-sm font-medium text-gray-900 mb-2'>
                        {question.question}
                      </p>
                      <div className='flex items-center gap-2'>
                        <label className='text-xs text-gray-600'>Оноо:</label>
                        <input
                          type='number'
                          min={1}
                          value={questionPoints[qId] || question.default_point}
                          onChange={e => handlePointChange(qId, e.target.value)}
                          className='w-20 px-2 py-1 border border-gray-300 rounded text-sm'
                        />
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => handleRemoveQuestion(qId)}
                      className='ml-4 p-2 hover:bg-red-100 rounded'>
                      <X size={18} className='text-red-600' />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Question Bank with Filters */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            Асуултын сан
          </h2>

          {/* Filters */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Filter size={16} className='inline mr-1' />
                Асуултын төрөл
              </label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'>
                <option value='all'>Бүх төрөл</option>
                {questionTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Сэдэв
              </label>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'>
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
                value={filterLevel}
                onChange={e => setFilterLevel(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm'>
                <option value='all'>Бүх түвшин</option>
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='space-y-2 max-h-96 overflow-y-auto'>
            {filteredQuestions
              .filter(q => !selectedQuestions.includes(q.id))
              .map(question => (
                <div
                  key={question.id}
                  className='flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50'>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>
                      {question.question}
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>
                      {question.category_name} • {questionTypes.find(t => t.value === question.type)?.label || question.type} •{' '}
                      {question.level_name} • {question.default_point} оноо
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={() => handleAddQuestion(question.id)}
                    className='ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            {filteredQuestions.filter(q => !selectedQuestions.includes(q.id)).length === 0 && (
              <p className='text-gray-500 text-center py-8'>
                Асуулт олдсонгүй эсвэл бүгдийг нь сонгосон байна.
              </p>
            )}
          </div>
        </div>

        <div className='flex justify-end gap-4 pt-4 border-t'>
          <button
            type='button'
            onClick={handleCancel}
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

export default ExamEdit;