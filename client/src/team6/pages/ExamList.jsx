import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, FileText, Plus, CheckCircle, AlertCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API } from '../utils/api';
import { isTeacher, getSelectedRole } from '../utils/role';
import { useRole } from '../utils/RoleContext';

const ExamList = () => {
  const { course_id } = useParams();
  const { role } = useRole();
  const [courseExams, setCourseExams] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const now = new Date();

  // DEBUG LOGS
  useEffect(() => {
    console.log('=== ExamList Debug ===');
    console.log('Role from context:', role);
    console.log('Selected role from localStorage:', getSelectedRole());
    console.log('isTeacher():', isTeacher());
    console.log('Should show button:', role && isTeacher());
  }, [role]);

  useEffect(() => {
    setLoading(true);
    API.get(`/courses/${course_id}/exams`)
      .then(res => {
        const exams = res.data?.exams || res.data || [];
        setCourseExams(Array.isArray(exams) ? exams : []);
      })
      .catch(err => {
        console.error("Error fetching exams:", err);
        setCourseExams([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [course_id]);

  const active = [];
  const upcoming = [];
  const completed = [];

  courseExams.forEach(exam => {
    const startDate = new Date(exam.start_date);
    const closeDate = new Date(exam.close_date);

    if (now < startDate) {
      upcoming.push(exam);
    } else if (now >= startDate && now <= closeDate) {
      active.push(exam);
    } else {
      completed.push(exam);
    }
  });

  const getFilteredExams = () => {
    switch (filter) {
      case 'active': return active;
      case 'upcoming': return upcoming;
      case 'completed': return completed;
      default: return courseExams;
    }
  };

  const filteredExams = getFilteredExams();

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-600">
        Уншиж байна...
      </div>
    );

  return (
    <div className='space-y-6'>
      {/* DEBUG INFO */}
      <div className='bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg'>
        <p className='text-sm'><strong>Debug:</strong> Role = {role || 'null'}, isTeacher = {String(isTeacher())}</p>
      </div>

      {/* Back arrow, header, and create button */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-4 flex-1'>
          <Link
            to="/team6/exams"
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            title="Буцах"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Шалгалтын жагсаалт
            </h1>
            <p className='text-gray-600 mt-2'>
              Нийт {courseExams.length} шалгалт байна
            </p>
          </div>
        </div>
        
        {/* Create exam button in header - Only for teachers */}
        {role && isTeacher() && (
          <Link
            to={`/team6/courses/${course_id}/exams/create`}
            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md hover:shadow-lg transition-all font-semibold'>
            <Plus size={20} />
            Шинэ шалгалт
          </Link>
        )}
      </div>

      {/* Create exam button - Prominent card - Only for teachers */}
      {role && isTeacher() && (
        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border-2 border-blue-200'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <h2 className='text-xl font-bold text-gray-900 mb-1'>Шинэ шалгалт үүсгэх</h2>
              <p className='text-sm text-gray-600'>Энэ хичээлд шинэ шалгалт нэмэх</p>
            </div>
            <Link
              to={`/team6/courses/${course_id}/exams/create`}
              className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all font-bold text-lg whitespace-nowrap'>
              <Plus size={24} />
              Шинэ шалгалт
            </Link>
          </div>
        </div>
      )}

      {/* FILTER BUTTONS */}
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex gap-2 flex-wrap'>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}>
            Бүгд ({courseExams.length})
          </button>

          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'upcoming' ? 'bg-yellow-600 text-white' : 'bg-gray-100'
            }`}>
            <AlertCircle size={16} /> Ирээдүйд ({upcoming.length})
          </button>

          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray100'
            }`}>
            <CheckCircle size={16} /> Идэвхтэй ({active.length})
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'completed' ? 'bg-gray-600 text-white' : 'bg-gray-100'
            }`}>
            <XCircle size={16} /> Дууссан ({completed.length})
          </button>
        </div>
      </div>

      <div className='grid gap-4'>
        {filteredExams.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-lg shadow'>
            <FileText size={48} className='mx-auto text-gray-400 mb-4' />
            <p className='text-gray-600 text-lg'>
              Энэ категорид шалгалт алга.
            </p>
          </div>
        ) : (
          filteredExams.map(exam => {
            const start = new Date(exam.start_date);
            const end = new Date(exam.close_date);

            const isUpcoming = now < start;
            const isActive = now >= start && now <= end;

            return (
              <Link
                key={exam.id}
                to={`/team6/exams/${exam.id}`}
                className='bg-white rounded-lg shadow p-6 hover:shadow-lg'>
                <div className='flex justify-between'>
                  <div className='flex-1'>
                    <h3 className='text-xl font-semibold'>{exam.name}</h3>

                    <span className={`px-3 py-1 rounded-full text-sm inline-block mt-2
                      ${
                        isUpcoming
                          ? 'bg-yellow-100 text-yellow-800'
                          : isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    `}>
                      {isUpcoming ? 'Ирээдүйд' : isActive ? 'Идэвхтэй' : 'Дууссан'}
                    </span>

                    <p className='text-gray-600 mt-3'>{exam.description}</p>

                    <div className='flex flex-wrap gap-4 mt-4 text-sm text-gray-500'>
                      <div className='flex items-center gap-2'>
                        <Calendar size={16} />
                        {start.toLocaleDateString('mn-MN')} – {end.toLocaleDateString('mn-MN')}
                      </div>

                      <div className='flex items-center gap-2'>
                        <Clock size={16} />
                        {exam.duration} минут
                      </div>

                      <span>Нийт оноо: {exam.total_score}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExamList;