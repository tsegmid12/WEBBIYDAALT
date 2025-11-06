import { Link } from 'react-router-dom';
import { courses, exams, studentSubmissions, users } from '../data/mockData';
import { getSelectedRole, isTeacher, isStudent } from '../utils/role';
import { BookOpen, FileText, Award, Clock } from 'lucide-react';

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
    const availableExams = exams.filter(exam => {
      const hasSubmission = studentSubmissions.some(
        s => s.exam_id === exam.id && s.student_id === studentId
      );
      return !hasSubmission;
    });

    const mySubmissions = studentSubmissions.filter(
      s => s.student_id === studentId
    );

    return (
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Сайн байна уу, {mockUser?.first_name || 'Оюутан'}!
          </h1>
          <p className='text-gray-600 mt-2'>Таны шалгалтууд</p>
        </div>

        {availableExams.length > 0 && (
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Өгөх шалгалтууд
            </h2>
            <div className='grid gap-4'>
              {availableExams.map(exam => (
                <Link
                  key={exam.id}
                  to={`/team6/exams/${exam.id}/students/${studentId}`}
                  className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow'>
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
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {mySubmissions.length > 0 && (
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Миний үр дүн
            </h2>
            <div className='grid gap-4'>
              {mySubmissions.map(submission => {
                const exam = exams.find(e => e.id === submission.exam_id);
                if (!exam) return null;
                return (
                  <Link
                    key={submission.id}
                    to={`/team6/exams/${exam.id}/students/${studentId}/result`}
                    className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow'>
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
                );
              })}
            </div>
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

