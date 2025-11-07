import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exams, questionBank, questionTypes, categories, levels, users } from '../data/mockData';
import { ArrowLeft, Save, Plus, X, Filter, Trash2, Users, CheckSquare, List } from 'lucide-react';

const ExamCreate = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();
  
  // Creation method: 'rules' or 'specific'
  const [creationMethod, setCreationMethod] = useState('rules');
  
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
    course_grade_contribution: 20, // Percentage contribution to course grade
  });

  // Method 1: Rules for question selection
  const [questionRules, setQuestionRules] = useState([]);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [currentRule, setCurrentRule] = useState({
    type: 'single_choice',
    category_id: 'all',
    level_id: 'all',
    count: 1,
    point: 5,
  });

  // Method 2: Specific question selection
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);
  const [questionFilters, setQuestionFilters] = useState({
    type: 'all',
    category_id: 'all',
    level_id: 'all',
    search: '',
  });

  // Eligible students (all students by default)
  const allStudents = users.filter(u => u.role === 'student');
  const [eligibleStudentIds, setEligibleStudentIds] = useState(
    allStudents.map(s => s.id)
  );

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

  const handleToggleQuestion = (questionId, point) => {
    const existing = selectedQuestions.find(sq => sq.question_id === questionId);
    if (existing) {
      setSelectedQuestions(selectedQuestions.filter(sq => sq.question_id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, {
        question_id: questionId,
        point: point || 5,
        order: selectedQuestions.length + 1,
      }]);
    }
  };

  const handleUpdateQuestionPoint = (questionId, newPoint) => {
    setSelectedQuestions(selectedQuestions.map(sq => 
      sq.question_id === questionId 
        ? { ...sq, point: parseInt(newPoint) || 5 }
        : sq
    ));
  };

  const handleReorderQuestions = (fromIndex, toIndex) => {
    const newQuestions = [...selectedQuestions];
    const [removed] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, removed);
    setSelectedQuestions(newQuestions.map((q, idx) => ({ ...q, order: idx + 1 })));
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
    
    let examQuestions = [];
    
    if (creationMethod === 'rules') {
      if (questionRules.length === 0) {
        alert('Хамгийн багадаа нэг асуултын дүрэм нэмнэ үү!');
        return;
      }
      examQuestions = generateQuestionsFromRules();
      if (examQuestions.length === 0) {
        alert('Сонгосон дүрэмд тохирох асуулт олдсонгүй!');
        return;
      }
    } else {
      if (selectedQuestions.length === 0) {
        alert('Хамгийн багадаа нэг асуулт сонгоно уу!');
        return;
      }
      examQuestions = selectedQuestions.map((sq, idx) => ({
        question_id: sq.question_id,
        point: sq.point,
        order: idx + 1,
      }));
    }

    // Validate required fields
    if (!formData.name || !formData.start_date || !formData.close_date) {
      alert('Бүх шаардлагатай талбаруудыг бөглөнө үү!');
      return;
    }

    // Validate dates
    const startDate = new Date(formData.start_date);
    const closeDate = new Date(formData.close_date);
    if (closeDate <= startDate) {
      alert('Дуусах огноо эхлэх огнооноос хойш байх ёстой!');
      return;
    }

    // Get existing exams from localStorage or use mockData
    const existingExams = JSON.parse(localStorage.getItem('all_exams') || '[]');
    const existingExamQuestions = JSON.parse(localStorage.getItem('all_exam_questions') || '[]');
    
    // Calculate new exam ID
    const maxId = existingExams.length > 0 
      ? Math.max(...existingExams.map(e => e.id), ...exams.map(e => e.id))
      : Math.max(...exams.map(e => e.id), 0);
    
    // Format dates as ISO strings for consistency with mockData
    const formattedStartDate = new Date(formData.start_date).toISOString();
    const formattedCloseDate = new Date(formData.close_date).toISOString();
    
    const newExam = {
      id: maxId + 1,
      course_id: parseInt(course_id),
      ...formData,
      start_date: formattedStartDate,
      close_date: formattedCloseDate,
      eligible_student_ids: eligibleStudentIds,
      created_by: 4,
      created_at: new Date().toISOString().split('T')[0],
    };
    
    // Add exam_id and unique id to examQuestions
    const existingExamQuestionIds = existingExamQuestions.length > 0
      ? Math.max(...existingExamQuestions.map(eq => eq.id || 0))
      : Math.max(...examQuestions.map(eq => eq.id || 0), 0);
    
    const newExamQuestions = examQuestions.map((eq, idx) => ({
      id: existingExamQuestionIds + idx + 1,
      exam_id: newExam.id,
      question_id: eq.question_id,
      point: eq.point,
      order: eq.order || idx + 1,
    }));
    
    // Prepare data for saving
    const updatedExams = [...existingExams, newExam];
    const updatedExamQuestions = [...existingExamQuestions, ...newExamQuestions];
    
    // Save to localStorage
    try {
      localStorage.setItem('all_exams', JSON.stringify(updatedExams));
      localStorage.setItem('all_exam_questions', JSON.stringify(updatedExamQuestions));
      
      console.log('Exam saved successfully:', newExam);
      console.log('Exam ID:', newExam.id);
      console.log('Course ID:', newExam.course_id, '(type:', typeof newExam.course_id, ')');
      console.log('Exam questions saved:', newExamQuestions.length, 'questions');
      console.log('Eligible students:', eligibleStudentIds.length, 'students');
      console.log('All exams in localStorage:', updatedExams.length);
      
      alert(`Шалгалт амжилттай үүсгэгдлээ!\n\nШалгалт: ${newExam.name}\nАсуултын тоо: ${newExamQuestions.length}\nНийт оноо: ${newExamQuestions.reduce((sum, q) => sum + q.point, 0)}`);
      navigate(`/team6/courses/${course_id}/exams`);
    } catch (error) {
      console.error('Error saving exam:', error);
      alert('Шалгалт хадгалахад алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  // Calculate totals
  const totalQuestions = creationMethod === 'rules' 
    ? questionRules.reduce((sum, rule) => sum + rule.count, 0)
    : selectedQuestions.length;
    
  const totalPoints = creationMethod === 'rules'
    ? questionRules.reduce((sum, rule) => sum + (rule.count * rule.point), 0)
    : selectedQuestions.reduce((sum, sq) => sum + sq.point, 0);

  // Filter questions for Method 2
  const filteredQuestions = questionBank.filter(q => {
    if (questionFilters.type !== 'all' && q.type !== questionFilters.type) return false;
    if (questionFilters.category_id !== 'all' && q.category_id !== parseInt(questionFilters.category_id)) return false;
    if (questionFilters.level_id !== 'all' && q.level_id !== parseInt(questionFilters.level_id)) return false;
    if (questionFilters.search && !q.question.toLowerCase().includes(questionFilters.search.toLowerCase())) return false;
    return true;
  });

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
        {/* Exam Basic Info */}
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
              Тайлбар *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Жишээ: Та сурах бичиг ашиглаж болно. Зөвхөн дэвтэр зөвшөөрөгдөнө.'
            />
            <p className='text-xs text-gray-500 mt-1'>
              Шалгалтын тайлбар, дүрэм, зөвшөөрөл зэргийг бичнэ үү
            </p>
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
                onChange={e => setFormData({ ...formData, start_date: e.target.value })}
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
                onChange={e => setFormData({ ...formData, close_date: e.target.value })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Хугацаа (минут) *
              </label>
              <input
                type='number'
                required
                min={1}
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
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
                onChange={e => setFormData({ ...formData, max_attempt: parseInt(e.target.value) })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Хичээлийн дүнд эзлэх хувь (%) *
              </label>
              <input
                type='number'
                required
                min={0}
                max={100}
                value={formData.course_grade_contribution}
                onChange={e => setFormData({ ...formData, course_grade_contribution: parseInt(e.target.value) })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <p className='text-xs text-gray-500 mt-1'>
                Энэ шалгалт хичээлийн дүнд хэдэн хувь эзлэх вэ?
              </p>
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
              onChange={e => setFormData({ ...formData, total_score: parseInt(e.target.value) })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Жишээ: 100'
            />
            <div className='mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-sm text-blue-800'>
                <strong>Тооцоолсон нийт оноо:</strong> {totalPoints} оноо ({totalQuestions} асуулт)
              </p>
              <p className='text-xs text-blue-600 mt-1'>
                Хамгийн өндөр оноотой оюутан энэ оноог авна. Бусад оюутнуудын оноо пропорциональ тооцогдоно.
              </p>
            </div>
          </div>

          <div className='space-y-3'>
            <label className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={formData.is_shuffled}
                onChange={e => setFormData({ ...formData, is_shuffled: e.target.checked })}
                className='w-5 h-5 text-blue-600 rounded'
              />
              <span className='text-sm font-medium text-gray-700'>Асуултын дараалал холих</span>
            </label>

            <label className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={formData.show_result_after}
                onChange={e => setFormData({ ...formData, show_result_after: e.target.checked })}
                className='w-5 h-5 text-blue-600 rounded'
              />
              <span className='text-sm font-medium text-gray-700'>Дууссаны дараа үр дүн харуулах</span>
            </label>

            <label className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={formData.show_correct_answer}
                onChange={e => setFormData({ ...formData, show_correct_answer: e.target.checked })}
                className='w-5 h-5 text-blue-600 rounded'
              />
              <span className='text-sm font-medium text-gray-700'>Зөв хариулт харуулах</span>
            </label>
          </div>
        </div>

        {/* Eligible Students */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <Users size={24} />
            Шалгалт өгөх боломжтой оюутнууд
          </h2>
          <p className='text-sm text-gray-600 mb-4'>
            Шалгалт өгөх боломжтой оюутнуудыг сонгоно уу (бүх оюутнуудыг сонгох: бүх сонголтыг арилгах)
          </p>
          <div className='max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4'>
            <label className='flex items-center gap-2 mb-3 pb-3 border-b'>
              <input
                type='checkbox'
                checked={eligibleStudentIds.length === allStudents.length}
                onChange={e => {
                  if (e.target.checked) {
                    setEligibleStudentIds(allStudents.map(s => s.id));
                  } else {
                    setEligibleStudentIds([]);
                  }
                }}
                className='w-5 h-5 text-blue-600 rounded'
              />
              <span className='font-medium'>Бүх оюутнууд ({allStudents.length})</span>
            </label>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {allStudents.map(student => (
                <label key={student.id} className='flex items-center gap-2 p-2 hover:bg-gray-50 rounded'>
                  <input
                    type='checkbox'
                    checked={eligibleStudentIds.includes(student.id)}
                    onChange={e => {
                      if (e.target.checked) {
                        setEligibleStudentIds([...eligibleStudentIds, student.id]);
                      } else {
                        setEligibleStudentIds(eligibleStudentIds.filter(id => id !== student.id));
                      }
                    }}
                    className='w-4 h-4 text-blue-600 rounded'
                  />
                  <span className='text-sm'>{student.first_name} (ID: {student.id})</span>
                </label>
              ))}
            </div>
          </div>
          <p className='text-sm text-gray-600 mt-4'>
            Сонгогдсон: {eligibleStudentIds.length} / {allStudents.length} оюутан
          </p>
        </div>

        {/* Question Selection Method */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Асуулт сонгох арга</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <button
              type='button'
              onClick={() => setCreationMethod('rules')}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                creationMethod === 'rules'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
              <div className='flex items-center gap-3 mb-2'>
                <Filter size={24} className={creationMethod === 'rules' ? 'text-blue-600' : 'text-gray-400'} />
                <span className='font-semibold'>Арга 1: Дүрэм ашиглан</span>
              </div>
              <p className='text-sm text-gray-600'>
                Сэдэв, түвшин, төрлөөр асуултын тоо тодорхойлж автоматаар сонгоно
              </p>
            </button>
            <button
              type='button'
              onClick={() => setCreationMethod('specific')}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                creationMethod === 'specific'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
              <div className='flex items-center gap-3 mb-2'>
                <List size={24} className={creationMethod === 'specific' ? 'text-blue-600' : 'text-gray-400'} />
                <span className='font-semibold'>Арга 2: Тодорхой асуулт сонгох</span>
              </div>
              <p className='text-sm text-gray-600'>
                Асуултын сангаас тодорхой асуултуудыг гараар сонгоно
              </p>
            </button>
          </div>

          {/* Method 1: Rules */}
          {creationMethod === 'rules' && (
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900'>Асуултын дүрэм</h3>
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
                            <p><span className='font-medium'>Төрөл:</span> {typeLabel}</p>
                            <p><span className='font-medium'>Сэдэв:</span> {categoryName}</p>
                            <p><span className='font-medium'>Түвшин:</span> {levelName}</p>
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
          )}

          {/* Method 2: Specific Questions */}
          {creationMethod === 'specific' && (
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900'>Сонгосон асуултууд</h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    Нийт: {selectedQuestions.length} асуулт • {totalPoints} оноо
                  </p>
                </div>
                <button
                  type='button'
                  onClick={() => setShowQuestionSelector(true)}
                  className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
                  <Plus size={20} />
                  Асуулт нэмэх
                </button>
              </div>

              {selectedQuestions.length === 0 ? (
                <div className='text-center py-8 border-2 border-dashed border-gray-300 rounded-lg'>
                  <p className='text-gray-500 mb-4'>Асуулт сонгоогүй байна</p>
                  <button
                    type='button'
                    onClick={() => setShowQuestionSelector(true)}
                    className='text-blue-600 hover:underline'>
                    Асуулт сонгох
                  </button>
                </div>
              ) : (
                <div className='space-y-2 border border-gray-200 rounded-lg p-4'>
                  {selectedQuestions.map((sq, index) => {
                    const question = questionBank.find(q => q.id === sq.question_id);
                    return (
                      <div
                        key={sq.question_id}
                        className='flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200'>
                        <div className='flex items-center gap-2'>
                          <span className='bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm'>
                            {sq.order}
                          </span>
                          <div className='flex flex-col gap-1'>
                            <button
                              type='button'
                              onClick={() => handleReorderQuestions(index, Math.max(0, index - 1))}
                              disabled={index === 0}
                              className='text-gray-400 hover:text-gray-600 disabled:opacity-30'>
                              ↑
                            </button>
                            <button
                              type='button'
                              onClick={() => handleReorderQuestions(index, Math.min(selectedQuestions.length - 1, index + 1))}
                              disabled={index === selectedQuestions.length - 1}
                              className='text-gray-400 hover:text-gray-600 disabled:opacity-30'>
                              ↓
                            </button>
                          </div>
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium text-gray-900 line-clamp-1'>
                            {question?.question || 'Асуулт олдсонгүй'}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {question?.type} • {question?.category_name} • {question?.level_name}
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <input
                            type='number'
                            min={1}
                            value={sq.point}
                            onChange={e => handleUpdateQuestionPoint(sq.question_id, e.target.value)}
                            className='w-20 px-2 py-1 border border-gray-300 rounded text-sm'
                          />
                          <span className='text-sm text-gray-600'>оноо</span>
                          <button
                            type='button'
                            onClick={() => handleToggleQuestion(sq.question_id)}
                            className='p-1 hover:bg-red-100 rounded'>
                            <X size={18} className='text-red-600' />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rule Modal */}
        {showRuleModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Асуултын дүрэм нэмэх</h3>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Асуултын төрөл *</label>
                  <select
                    value={currentRule.type}
                    onChange={e => setCurrentRule({ ...currentRule, type: e.target.value })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
                    {questionTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Сэдэв</label>
                    <select
                      value={currentRule.category_id}
                      onChange={e => setCurrentRule({ ...currentRule, category_id: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'>
                      <option value='all'>Бүх сэдэв</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Түвшин</label>
                    <select
                      value={currentRule.level_id}
                      onChange={e => setCurrentRule({ ...currentRule, level_id: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'>
                      <option value='all'>Бүх түвшин</option>
                      {levels.map(level => (
                        <option key={level.id} value={level.id}>{level.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Асуултын тоо *</label>
                    <input
                      type='number'
                      required
                      min={1}
                      value={currentRule.count}
                      onChange={e => setCurrentRule({ ...currentRule, count: parseInt(e.target.value) || 1 })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Нэг асуултын оноо *</label>
                    <input
                      type='number'
                      required
                      min={1}
                      value={currentRule.point}
                      onChange={e => setCurrentRule({ ...currentRule, point: parseInt(e.target.value) || 5 })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                </div>
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
                        <span className='font-medium'>Боломжтой асуулт:</span> {available.length} асуулт
                        {available.length < currentRule.count && (
                          <span className='text-red-600 ml-2'>(Сонгосон тооноос цөөн!)</span>
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
                    setCurrentRule({ type: 'single_choice', category_id: 'all', level_id: 'all', count: 1, point: 5 });
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

        {/* Question Selector Modal */}
        {showQuestionSelector && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Асуулт сонгох</h3>
              
              {/* Filters */}
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b'>
                <input
                  type='text'
                  placeholder='Хайх...'
                  value={questionFilters.search}
                  onChange={e => setQuestionFilters({ ...questionFilters, search: e.target.value })}
                  className='px-4 py-2 border border-gray-300 rounded-lg'
                />
                <select
                  value={questionFilters.type}
                  onChange={e => setQuestionFilters({ ...questionFilters, type: e.target.value })}
                  className='px-4 py-2 border border-gray-300 rounded-lg'>
                  <option value='all'>Бүх төрөл</option>
                  {questionTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <select
                  value={questionFilters.category_id}
                  onChange={e => setQuestionFilters({ ...questionFilters, category_id: e.target.value })}
                  className='px-4 py-2 border border-gray-300 rounded-lg'>
                  <option value='all'>Бүх сэдэв</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <select
                  value={questionFilters.level_id}
                  onChange={e => setQuestionFilters({ ...questionFilters, level_id: e.target.value })}
                  className='px-4 py-2 border border-gray-300 rounded-lg'>
                  <option value='all'>Бүх түвшин</option>
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>

              {/* Question List */}
              <div className='flex-1 overflow-y-auto space-y-2'>
                {filteredQuestions.map(q => {
                  const isSelected = selectedQuestions.some(sq => sq.question_id === q.id);
                  return (
                    <div
                      key={q.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleToggleQuestion(q.id, q.default_point)}>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <p className='text-sm font-medium text-gray-900 mb-1'>{q.question}</p>
                          <div className='flex items-center gap-2 text-xs text-gray-500'>
                            <span>{q.type}</span>
                            <span>•</span>
                            <span>{q.category_name}</span>
                            <span>•</span>
                            <span>{q.level_name}</span>
                            <span>•</span>
                            <span>{q.default_point} оноо</span>
                          </div>
                        </div>
                        <CheckSquare
                          size={20}
                          className={isSelected ? 'text-blue-600' : 'text-gray-400'}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className='flex gap-4 mt-4 pt-4 border-t'>
                <button
                  type='button'
                  onClick={() => setShowQuestionSelector(false)}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'>
                  Хаах
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
