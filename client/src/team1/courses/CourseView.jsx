import React from "react";
import { useParams, Link } from "react-router-dom";

// CourseView for /courses/:course_id
export default function CourseView() {
  const { course_id } = useParams();

  // static current user for role-based UI
  const currentUser = { email: "schoolteacher@must.edu.mn", role: "schoolteacher" };

  // small in-memory courses array matching the requested fields
  const courses = [
    {
      id: 1,
      code: "ITM301",
      name: "Вэб Системс",
      description: "Вэб програмчлал, React + Router + Tailwind төсөл.",
      schoolName: "МУБИС",
      year: "2025-2026",
      semester: "1-р семестр",
      categoryName: "МТ",
      credit: 3,
      teacherName: "Б. Баяр",
      studentCount: 42,
      lessonCount: 12,
      assignmentCount: 4,
      examCount: 2,
      avgGrade: 78.4,
    },
    {
      id: 2,
      code: "ITM302",
      name: "Мобайл Апп",
      description: "Мобайл апп хөгжүүлэлт.",
      schoolName: "МУБИС",
      year: "2025-2026",
      semester: "1-р семестр",
      categoryName: "МТ",
      credit: 2,
      teacherName: "Ж. Энх",
      studentCount: 28,
      lessonCount: 10,
      assignmentCount: 3,
      examCount: 1,
      avgGrade: 84.1,
    },
  ];

  const courseIdNum = Number(course_id);
  const course = courses.find((c) => c.id === courseIdNum) || courses[0];

  // static related data: lessons and exams
  const lessons = [
    { id: 1, courseId: 1, title: "Оролт: HTML ба CSS", duration: "2 цаг", updatedAt: "2025-09-01" },
    { id: 2, courseId: 1, title: "Tailwind CSS танилцуулга", duration: "1.5 цаг", updatedAt: "2025-09-05" },
    { id: 3, courseId: 1, title: "React бүрэлдэхүүн хэсгүүд", duration: "2 цаг", updatedAt: "2025-09-12" },
    { id: 4, courseId: 2, title: "Android суурь", duration: "2 цаг", updatedAt: "2025-09-03" },
  ].filter((l) => l.courseId === course.id);

  const exams = [
    { id: 1, courseId: 1, name: "Дунд шатны шалгалт", date: "2025-10-15", participants: 40, avgScore: 72.5 },
    { id: 2, courseId: 1, name: "Төгсөлтийн шалгалт", date: "2025-12-20", participants: 41, avgScore: 80.1 },
    { id: 3, courseId: 2, name: "Практик шалгалт", date: "2025-11-10", participants: 28, avgScore: 85.2 },
  ].filter((e) => e.courseId === course.id);

  const StatisticCard = ({ label, value }) => (
    <div className="bg-white/5 rounded-lg p-4 text-center">
      <div className="text-sm text-slate-300">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
    </div>
  );

  const Breadcrumbs = () => (
    <nav className="text-sm text-slate-400" aria-label="Breadcrumb">
      <ol className="flex gap-2 items-center">
        <li><Link to="/" className="text-slate-300 hover:underline">Сургууль</Link></li>
        <li>›</li>
        <li><Link to="/courses" className="text-slate-300 hover:underline">Хичээлүүд</Link></li>
        <li>›</li>
        <li className="text-white">{course.code}</li>
      </ol>
    </nav>
  );

  const Actions = () => {
    const base = `/courses/${course.id}`;
    if (["admin", "schooladmin", "schoolteacher"].includes(currentUser.role)) {
      return (
        <div className="flex flex-wrap gap-2">
          <Link to={`${base}/edit`} className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-500">Хичээл засах</Link>
          <Link to={`${base}/report`} className="px-3 py-1.5 bg-sky-600 text-white rounded hover:bg-sky-500">Тайлан харах</Link>
          <Link to={`${base}/lessons`} className="px-3 py-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-500">Сэдэв удирдах</Link>
        </div>
      );
    }
    if (currentUser.role === "schoolstudent") {
      return (
        <div>
          <Link to={`/courses/${course.id}/lessons`} className="px-3 py-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-500">Хичээлийн агуулга харах</Link>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Breadcrumbs />
          <h1 className="text-2xl md:text-3xl font-semibold text-white mt-2">{course.code} — {course.name}</h1>
          <div className="text-sm text-slate-400">{course.teacherName} · {course.schoolName}</div>
        </div>
        <div className="flex items-center gap-3">
          <Actions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Ерөнхий мэдээлэл</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-300">
              <div><dt className="text-slate-400">Код</dt><dd className="text-white font-medium">{course.code}</dd></div>
              <div><dt className="text-slate-400">Нэр</dt><dd className="text-white font-medium">{course.name}</dd></div>
              <div><dt className="text-slate-400">Сургууль</dt><dd className="text-white font-medium">{course.schoolName}</dd></div>
              <div><dt className="text-slate-400">Хичээлийн жил / семестр</dt><dd className="text-white font-medium">{course.year} / {course.semester}</dd></div>
              <div><dt className="text-slate-400">Ангилал</dt><dd className="text-white font-medium">{course.categoryName}</dd></div>
              <div><dt className="text-slate-400">Кредит</dt><dd className="text-white font-medium">{course.credit}</dd></div>
              <div><dt className="text-slate-400">Статус</dt><dd className="text-white font-medium">{course.lessonCount > 0 ? 'Идэвхитэй' : 'Төлөвгүй'}</dd></div>
              <div className="sm:col-span-2"><dt className="text-slate-400">Тайлбар</dt><dd className="text-slate-200">{course.description}</dd></div>
            </dl>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Сэдвийн товч жагсаалт</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-slate-400">
                    <th className="py-2 pr-4">№</th>
                    <th className="py-2 pr-4">Сэдвийн нэр</th>
                    <th className="py-2 pr-4">Үргэлжлэх хугацаа</th>
                    <th className="py-2 pr-4">Сүүлийн өөрчлөлт</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.length === 0 ? (
                    <tr><td colSpan={4} className="py-4 text-slate-300">Сэдэв олдсонгүй</td></tr>
                  ) : (
                    lessons.map((l, idx) => (
                      <tr key={l.id} className="border-t border-white/5">
                        <td className="py-3 pr-4 text-slate-200">{idx + 1}</td>
                        <td className="py-3 pr-4 text-slate-200">{l.title}</td>
                        <td className="py-3 pr-4 text-slate-200">{l.duration}</td>
                        <td className="py-3 pr-4 text-slate-200">{l.updatedAt}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatisticCard label="Оюутны тоо" value={course.studentCount} />
            <StatisticCard label="Сэдэв" value={course.lessonCount} />
            <StatisticCard label="Шалгалт" value={course.examCount} />
            <StatisticCard label="Дундаж оноо" value={`${course.avgGrade}%`} />
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">Сүүлийн шалгалтууд</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-slate-400">
                    <th className="py-2 pr-4">Нэр</th>
                    <th className="py-2 pr-4">Огноо</th>
                    <th className="py-2 pr-4">Оролцсон</th>
                    <th className="py-2 pr-4">Дундаж</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.length === 0 ? (
                    <tr><td colSpan={4} className="py-4 text-slate-300">Шалгалт байхгүй</td></tr>
                  ) : (
                    exams.map((ex) => (
                      <tr key={ex.id} className="border-t border-white/5">
                        <td className="py-3 pr-4 text-slate-200">{ex.name}</td>
                        <td className="py-3 pr-4 text-slate-200">{ex.date}</td>
                        <td className="py-3 pr-4 text-slate-200">{ex.participants}</td>
                        <td className="py-3 pr-4 text-slate-200">{ex.avgScore}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
