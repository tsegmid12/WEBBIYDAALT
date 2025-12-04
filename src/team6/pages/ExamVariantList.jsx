import { useParams, Link } from 'react-router-dom';
import { exams } from '../data/mockData';
import { FileText, Plus, Edit } from 'lucide-react';

// Mock variants data - in real app this would come from API
const mockVariants = [
  {
    id: 1,
    exam_id: 1,
    name: 'Хувилбар A',
    description: 'Эхний хувилбар',
    created_at: '2025-02-01',
  },
  {
    id: 2,
    exam_id: 1,
    name: 'Хувилбар B',
    description: 'Хоёрдугаар хувилбар',
    created_at: '2025-02-02',
  },
];

const ExamVariantList = () => {
  const { exam_id } = useParams();
  const exam = exams.find(e => e.id === parseInt(exam_id));
  const variants = mockVariants.filter(v => v.exam_id === parseInt(exam_id));

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

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <Link
            to={`/team6/exams/${exam_id}`}
            className='text-blue-600 hover:underline text-sm mb-2 inline-block'>
            ← {exam.name} руу буцах
          </Link>
          <h1 className='text-3xl font-bold text-gray-900'>
            {exam.name} - Хувилбарууд
          </h1>
          <p className='text-gray-600 mt-2'>
            Нийт {variants.length} хувилбар байна
          </p>
        </div>
        <Link
          to={`/team6/exams/${exam_id}/variants/create`}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
          <Plus size={20} />
          Шинэ хувилбар
        </Link>
      </div>

      {variants.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-lg shadow'>
          <FileText size={48} className='mx-auto text-gray-400 mb-4' />
          <p className='text-gray-600 text-lg'>Хувилбар байхгүй байна</p>
          <Link
            to={`/team6/exams/${exam_id}/variants/create`}
            className='text-blue-600 hover:underline mt-2 inline-block'>
            Эхний хувилбараа үүсгэх
          </Link>
        </div>
      ) : (
        <div className='grid gap-4'>
          {variants.map(variant => (
            <div
              key={variant.id}
              className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow'>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {variant.name}
                  </h3>
                  <p className='text-gray-600 mb-2'>{variant.description}</p>
                  <p className='text-sm text-gray-500'>
                    Үүсгэсэн: {new Date(variant.created_at).toLocaleDateString('mn-MN')}
                  </p>
                </div>
                <div className='flex gap-2 ml-4'>
                  <Link
                    to={`/team6/exams/${exam_id}/variants/${variant.id}`}
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm'>
                    Харах
                  </Link>
                  <Link
                    to={`/team6/exams/${exam_id}/variants/${variant.id}/edit`}
                    className='bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm flex items-center gap-1'>
                    <Edit size={16} />
                    Засах
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamVariantList;

