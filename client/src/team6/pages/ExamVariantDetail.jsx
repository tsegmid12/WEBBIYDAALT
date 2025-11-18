import { useParams, Link, useNavigate } from 'react-router-dom';
import { exams, questionBank } from '../data/mockData';
import { ArrowLeft, Edit, FileText } from 'lucide-react';

// Mock variant data
const mockVariants = [
  {
    id: 1,
    exam_id: 1,
    name: 'Хувилбар A',
    description: 'Эхний хувилбар',  
    question_ids: [1, 2, 3],
    created_at: '2025-02-01',
  },
  {
    id: 2,
    exam_id: 1,
    name: 'Хувилбар B',
    description: 'Хоёрдугаар хувилбар',
    question_ids: [4, 5, 6],
    created_at: '2025-02-02',
  },
];

const ExamVariantDetail = () => {
  const { exam_id, id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.id === parseInt(exam_id));
  const variant = mockVariants.find(
    v => v.exam_id === parseInt(exam_id) && v.id === parseInt(id)
  );

  if (!exam || !variant) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 text-lg'>Хувилбар олдсонгүй</p>
        <Link to='/team6' className='text-blue-600 hover:underline mt-2 inline-block'>
          Нүүр хуудас руу буцах
        </Link>
      </div>
    );
  }

  const questions = variant.question_ids
    .map(qId => questionBank.find(q => q.id === qId))
    .filter(q => q !== undefined);

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => navigate(`/team6/exams/${exam_id}/variants`)}
          className='p-2 hover:bg-gray-100 rounded-lg'>
          <ArrowLeft size={20} />
        </button>
        <div className='flex-1'>
          <Link
            to={`/team6/exams/${exam_id}/variants`}
            className='text-blue-600 hover:underline text-sm mb-2 inline-block'>
            ← Хувилбарууд руу буцах
          </Link>
          <h1 className='text-3xl font-bold text-gray-900'>{variant.name}</h1>
          <p className='text-gray-600 mt-2'>{variant.description}</p>
        </div>
        <button
          onClick={() => navigate(`/team6/exams/${exam_id}/variants/${id}/edit`)}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
          <Edit size={20} />
          Засах
        </button>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex items-center gap-3 mb-4'>
          <FileText className='text-blue-600' size={24} />
          <h2 className='text-xl font-semibold text-gray-900'>Мэдээлэл</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <span className='text-sm text-gray-600'>Шалгалт:</span>
            <span className='ml-2 font-medium'>{exam.name}</span>
          </div>
          <div>
            <span className='text-sm text-gray-600'>Үүсгэсэн:</span>
            <span className='ml-2 font-medium'>
              {new Date(variant.created_at).toLocaleDateString('mn-MN')}
            </span>
          </div>
          <div>
            <span className='text-sm text-gray-600'>Асуултын тоо:</span>
            <span className='ml-2 font-medium'>{questions.length}</span>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>Асуултууд</h2>
        {questions.length === 0 ? (
          <p className='text-gray-600 text-center py-8'>
            Асуулт байхгүй байна
          </p>
        ) : (
          <div className='space-y-4'>
            {questions.map((question, index) => (
              <div
                key={question.id}
                className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50'>
                <div className='flex justify-between items-start mb-2'>
                  <div className='flex items-center gap-3'>
                    <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                      {index + 1}
                    </span>
                    <span className='text-sm text-gray-600'>
                      {question.type} • {question.level_name} • {question.default_point}{' '}
                      оноо
                    </span>
                  </div>
                </div>
                <p className='text-gray-900 mb-2'>{question.question}</p>
                {question.options && (
                  <div className='mt-2 space-y-1'>
                    {question.options.map(opt => (
                      <div
                        key={opt.id}
                        className={`text-sm p-2 rounded ${
                          opt.is_correct
                            ? 'bg-green-50 text-green-800'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                        {opt.id}. {opt.text}
                        {opt.is_correct && (
                          <span className='ml-2 text-xs'>✓</span>
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

