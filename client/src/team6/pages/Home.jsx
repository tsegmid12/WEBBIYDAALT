import { Link } from 'react-router-dom';
import { courses, exams, studentSubmissions, users } from '../data/mockData';
import { getSelectedRole, isTeacher, isStudent } from '../utils/role';
import { BookOpen, FileText, Award, Clock, Calendar } from 'lucide-react';

const Home = () => {
  const selectedRole = getSelectedRole();
  const teacherRole = isTeacher();
  const studentRole = isStudent();

  // Get a mock user based on role
  const mockUser = selectedRole === 'teacher' 
    ? users.find(u => u.role === 'teacher')
    : users.find(u => u.role === 'student');

  if (!selectedRole) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600 text-lg'>Эрх сонгох шаардлагатай</p>
        <Link to='/team6/select-role' className='text-blue-600 hover:underline mt-2 inline-block'>
          Эрх сонгох хуудас руу очих
        </Link>
      </div>
    );
  }

  if (teacherRole) {
    const teacherId = users.find(u => u.role === 'teacher')?.id || 4;
    const teacherCourses = courses.filter(c => c.teacher_id === teacherId);
    
    return (
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Сайн байна уу, {mockUser?.first_name || 'Багш'}!
          </h1>
          <p className='text-gray-600 mt-2'>Таны зааж буй хичээлүүд</p>
        </div>

        {teacherCourses.length === 0 ? (
          <div className='bg-white rounded-lg shadow p-8 text-center'>
            <BookOpen size={48} className='mx-auto text-gray-400 mb-4' />
            <p className='text-gray-600 text-lg'>Одоогоор хичээл байхгүй байна</p>
          </div>
        ) : (
          <div className='grid gap-4'>
            {teacherCourses.map(course => {
              const courseExams = exams.filter(e => e.course_id === course.id);
              return (
                <Link
                  key={course.id}
                  to={`/team6/courses/${course.id}/exams`}
                  className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        {course.name}
                      </h3>
                      <div className='flex items-center gap-4 text-sm text-gray-600'>
                        <span className='flex items-center gap-1'>
                          <FileText size={16} />
                          {courseExams.length} шалгалт
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (studentRole) {
    const studentId = users.find(u => u.role === 'student')?.id || 5;
    const now = new Date();
    
    // Categorize exams
    const activeExams = exams.filter(exam => {
      const startDate = new Date(exam.start_date);
      const closeDate = new Date(exam.close_date);
      const studentAttempts = studentSubmissions.filter(
        s => s.exam_id === exam.id && s.student_id === studentId
      );
      const canTake = studentAttempts.length < (exam.max_attempt || 1);
      const isActive = now >= startDate && now <= closeDate;
      // Show active exams if they're within date range and student can still take them
      return isActive && canTake;
    });

    const upcomingExams = exams.filter(exam => {
      const startDate = new Date(exam.start_date);
      const closeDate = new Date(exam.close_date);
      const isUpcoming = now < startDate;
      const isNotExpired = now <= closeDate;
      const studentAttempts = studentSubmissions.filter(
        s => s.exam_id === exam.id && s.student_id === studentId
      );
      const canTake = studentAttempts.length < (exam.max_attempt || 1);
      // Show upcoming exams if they haven't started yet and student can take them
      return isUpcoming && isNotExpired && canTake;
    });

    const mySubmissions = studentSubmissions.filter(
      s => s.student_id === studentId
    );
    const resultExams = mySubmissions.map(submission => {
      const exam = exams.find(e => e.id === submission.exam_id);
      return exam ? { exam, submission } : null;
    }).filter(Boolean);

    return (
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Сайн байна уу, {mockUser?.first_name || 'Оюутан'}!
          </h1>
          <p className='text-gray-600 mt-2'>Таны шалгалтууд</p>
        </div>

        {/* Active Exams */}
        {activeExams.length > 0 && (
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <span className='w-3 h-3 bg-green-500 rounded-full'></span>
              Идэвхтэй шалгалтууд
            </h2>
            <div className='grid gap-4'>
              {activeExams.map(exam => (
                <Link
                  key={exam.id}
                  to={`/team6/exams/${exam.id}/students/${studentId}`}
                  className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        {exam.name}
                      </h3>
                      <div className='flex items-center gap-4 text-sm text-gray-600'>
                        <span className='flex items-center gap-1'>
                          <Clock size={16} />
                          {exam.duration} минут
                        </span>
                        <span className='px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium'>
                          Идэвхтэй
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Exams */}
        {upcomingExams.length > 0 && (
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <span className='w-3 h-3 bg-yellow-500 rounded-full'></span>
              Ирээдүйн шалгалтууд
            </h2>
            <div className='grid gap-4'>
              {upcomingExams.map(exam => (
                <Link
                  key={exam.id}
                  to={`/team6/exams/${exam.id}/students/${studentId}`}
                  className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-yellow-500'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        {exam.name}
                      </h3>
                      <div className='flex items-center gap-4 text-sm text-gray-600'>
                        <span className='flex items-center gap-1'>
                          <Calendar size={16} />
                          {new Date(exam.start_date).toLocaleDateString('mn-MN')} эхлэх
                        </span>
                        <span className='px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium'>
                          Ирээдүй
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {resultExams.length > 0 && (
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <span className='w-3 h-3 bg-blue-500 rounded-full'></span>
              Үр дүн
            </h2>
            <div className='grid gap-4'>
              {resultExams.map(({ exam, submission }) => (
                <Link
                  key={submission.id}
                  to={`/team6/exams/${exam.id}/students/${studentId}/result`}
                  className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        {exam.name}
                      </h3>
                      <div className='flex items-center gap-4 text-sm'>
                        <span className='flex items-center gap-1 text-gray-600'>
                          <Award size={16} />
                          {submission.grade_point.toFixed(1)}%
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            submission.grade_point >= 60
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                          {submission.grade_point >= 60 ? 'Тэнцсэн' : 'Тэнцээгүй'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeExams.length === 0 && upcomingExams.length === 0 && resultExams.length === 0 && (
          <div className='bg-white rounded-lg shadow p-8 text-center'>
            <FileText size={48} className='mx-auto text-gray-400 mb-4' />
            <p className='text-gray-600 text-lg'>Одоогоор шалгалт байхгүй байна</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='text-center py-12'>
      <p className='text-gray-600 text-lg'>Эрх олгоогүй байна</p>
    </div>
  );
};

export default Home;

