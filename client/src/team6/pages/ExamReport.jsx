import { useParams, Link } from 'react-router-dom';
import {
  exams,
  examQuestions,
  questionBank,
  studentSubmissions,
  getExamStats,
  users,
} from '../data/mockData';
import { BarChart3, Users, TrendingUp, Award, Trophy, CheckCircle, XCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const ExamReport = () => {
  const { exam_id } = useParams();
  const exam = exams.find(e => e.id === parseInt(exam_id));
  const submissions = studentSubmissions.filter(
    s => s.exam_id === parseInt(exam_id)
  );
  const stats = exam ? getExamStats(parseInt(exam_id)) : null;
  const examQuestionsList = examQuestions.filter(eq => eq.exam_id === parseInt(exam_id));

  // Get total students enrolled in the course
  const totalStudentsInCourse = users.filter(u => u.role === 'student').length;

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

  const averageScore =
    submissions.length > 0
      ? submissions.reduce((sum, s) => sum + s.grade_point, 0) /
        submissions.length
      : 0;
  
  const highScore =
    submissions.length > 0
      ? Math.max(...submissions.map(s => s.grade_point))
      : 0;
  
  const passedCount = submissions.filter(s => s.grade_point >= 60).length;
  const failedCount = submissions.length - passedCount;

  // Calculate per-question statistics
  const questionStats = examQuestionsList.map(eq => {
    const question = questionBank.find(q => q.id === eq.question_id);
    if (!question) return null;

    let correctCount = 0;
    let wrongCount = 0;
    let notAnsweredCount = 0;

    submissions.forEach(submission => {
      const answer = submission.answers.find(a => a.question_id === eq.question_id);
      if (!answer) {
        notAnsweredCount++;
      } else if (answer.is_correct) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    return {
      question_id: eq.question_id,
      question: question,
      order: eq.order,
      point: eq.point,
      correctCount,
      wrongCount,
      notAnsweredCount,
      totalAnswered: correctCount + wrongCount,
      correctPercentage: submissions.length > 0 
        ? ((correctCount / submissions.length) * 100).toFixed(1)
        : 0
    };
  }).filter(q => q !== null);

  // Prepare data for score distribution chart
  const scoreRanges = [
    { range: '0-20', min: 0, max: 20, count: 0 },
    { range: '21-40', min: 21, max: 40, count: 0 },
    { range: '41-60', min: 41, max: 60, count: 0 },
    { range: '61-80', min: 61, max: 80, count: 0 },
    { range: '81-100', min: 81, max: 100, count: 0 },
  ];

  submissions.forEach(sub => {
    const score = sub.grade_point;
    scoreRanges.forEach(range => {
      if (score >= range.min && score <= range.max) {
        range.count++;
      }
    });
  });

  const scoreDistributionData = scoreRanges.map(r => ({
    name: r.range,
    Оюутнууд: r.count,
  }));

  // Prepare data for pass/fail pie chart
  const passFailData = [
    { name: 'Тэнцсэн', value: passedCount, color: '#10B981' },
    { name: 'Тэнцээгүй', value: failedCount, color: '#EF4444' },
  ];

  // Prepare data for question performance chart
  const questionPerformanceData = questionStats.map((stat, index) => ({
    name: `Асуулт ${index + 1}`,
    'Зөв': stat.correctCount,
    'Буруу': stat.wrongCount,
    'Зөв хувь': parseFloat(stat.correctPercentage),
  }));

  // Prepare data for score trend (sorted by score)
  const scoreTrendData = submissions
    .sort((a, b) => a.grade_point - b.grade_point)
    .map((sub, index) => ({
      name: `Оюутан ${index + 1}`,
      Оноо: sub.grade_point,
    }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <Link
            to={`/team6/exams/${exam_id}`}
            className='text-blue-600 hover:underline text-sm mb-2 inline-block'>
            ← Шалгалтын дэлгэрэнгүй руу буцах
          </Link>
          <h1 className='text-3xl font-bold text-gray-900'>
            {exam.name} - Тайлан
          </h1>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Users className='text-blue-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Оюутнууд</h3>
          </div>
          <p className='text-2xl font-bold text-gray-900'>{submissions.length}</p>
          <p className='text-sm text-gray-600'>
            Нийт өгсөн / {totalStudentsInCourse} оюутан
          </p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <TrendingUp className='text-green-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Дундаж</h3>
          </div>
          <p className='text-2xl font-bold text-gray-900'>
            {averageScore.toFixed(1)}%
          </p>
          <p className='text-sm text-gray-600'>Оноо</p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Trophy className='text-yellow-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Хамгийн өндөр</h3>
          </div>
          <p className='text-2xl font-bold text-gray-900'>
            {highScore.toFixed(1)}%
          </p>
          <p className='text-sm text-gray-600'>Оноо</p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Award className='text-green-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Тэнцсэн</h3>
          </div>
          <p className='text-2xl font-bold text-gray-900'>{passedCount}</p>
          <p className='text-sm text-gray-600'>60% дээш</p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <BarChart3 className='text-red-600' size={24} />
            <h3 className='font-semibold text-gray-900'>Тэнцээгүй</h3>
          </div>
          <p className='text-2xl font-bold text-gray-900'>{failedCount}</p>
          <p className='text-sm text-gray-600'>60% доош</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Score Distribution Chart */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            Онооны тархалт
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={scoreDistributionData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='Оюутнууд' fill='#3B82F6' />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pass/Fail Pie Chart */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            Тэнцсэн/Тэнцээгүй
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={passFailData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill='#8884d8'
                dataKey='value'>
                {passFailData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Question Performance Chart */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            Асуулт бүрийн гүйцэтгэл
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={questionPerformanceData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='Зөв' fill='#10B981' />
              <Bar dataKey='Буруу' fill='#EF4444' />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Trend Chart */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            Онооны дараалал
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={scoreTrendData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='Оноо'
                stroke='#3B82F6'
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Question Statistics */}
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
          Асуулт бүрийн статистик
        </h2>
        {questionStats.length === 0 ? (
          <p className='text-gray-600 text-center py-8'>
            Асуултын статистик байхгүй байна
          </p>
        ) : (
          <div className='space-y-4'>
            {questionStats.map((stat, index) => (
              <div
                key={stat.question_id}
                className='border border-gray-200 rounded-lg p-4'>
                <div className='flex justify-between items-start mb-3'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                        Асуулт {index + 1}
                      </span>
                      <span className='text-sm text-gray-600'>
                        {stat.point} оноо • {stat.question.type}
                      </span>
                    </div>
                    <p className='text-gray-900 font-medium mb-2'>
                      {stat.question.question}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='text-green-600' size={20} />
                    <div>
                      <p className='text-sm font-semibold text-gray-900'>
                        {stat.correctCount}
                      </p>
                      <p className='text-xs text-gray-600'>Зөв</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <XCircle className='text-red-600' size={20} />
                    <div>
                      <p className='text-sm font-semibold text-gray-900'>
                        {stat.wrongCount}
                      </p>
                      <p className='text-xs text-gray-600'>Буруу</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='text-gray-600' size={20} />
                    <div>
                      <p className='text-sm font-semibold text-gray-900'>
                        {stat.totalAnswered}
                      </p>
                      <p className='text-xs text-gray-600'>Хариулсан</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <TrendingUp className='text-blue-600' size={20} />
                    <div>
                      <p className='text-sm font-semibold text-gray-900'>
                        {stat.correctPercentage}%
                      </p>
                      <p className='text-xs text-gray-600'>Зөв хувь</p>
                    </div>
                  </div>
                </div>
                {stat.notAnsweredCount > 0 && (
                  <div className='mt-2 text-sm text-gray-500'>
                    Хариулаагүй: {stat.notAnsweredCount} оюутан
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {stats && (
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            Шалгалтын статистик
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <h3 className='font-medium text-gray-700 mb-2'>Нийт асуулт</h3>
              <p className='text-2xl font-bold text-blue-600'>
                {stats.total_questions}
              </p>
            </div>
            <div>
              <h3 className='font-medium text-gray-700 mb-2'>Нийт оноо</h3>
              <p className='text-2xl font-bold text-green-600'>
                {stats.total_points}
              </p>
            </div>
            <div>
              <h3 className='font-medium text-gray-700 mb-2'>Төрөл</h3>
              <div className='space-y-1'>
                {stats.by_type.map((t, i) => (
                  <p key={i} className='text-sm text-gray-600'>
                    {t.type}: {t.count}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
          Оюутнуудын үр дүн
        </h2>
        {submissions.length === 0 ? (
          <p className='text-gray-600 text-center py-8'>
            Оюутнуудын үр дүн байхгүй байна
          </p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                    Оюутан ID
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                    Оноо
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                    Эзлэх хувь
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                    Төлөв
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                    Үйлдэл
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {submissions
                  .sort((a, b) => b.grade_point - a.grade_point)
                  .map((submission, index) => (
                  <tr key={submission.id} className='hover:bg-gray-50'>
                    <td className='px-4 py-3 text-sm text-gray-900'>
                      <div className='flex items-center gap-2'>
                        {index === 0 && (
                          <Trophy className='text-yellow-600' size={16} />
                        )}
                        {submission.student_id}
                      </div>
                    </td>
                    <td className='px-4 py-3 text-sm text-gray-900'>
                      {submission.total_earned}/{submission.total_possible}
                    </td>
                    <td className='px-4 py-3 text-sm text-gray-900'>
                      {submission.grade_point.toFixed(1)}%
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.grade_point >= 60
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {submission.grade_point >= 60 ? 'Тэнцсэн' : 'Тэнцээгүй'}
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <Link
                        to={`/team6/exams/${exam_id}/students/${submission.student_id}/result`}
                        className='text-blue-600 hover:underline text-sm'>
                        Дэлгэрэнгүй
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamReport;
