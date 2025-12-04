import React from "react";
import { useParams, Link } from "react-router-dom";

// CourseReport: /courses/:course_id/report
export default function CourseReport() {
  const { course_id } = useParams();

  // static current user (change role to test permission)
  const currentUser = { email: "schoolteacher@must.edu.mn", role: "schoolteacher" };

  // small in-memory course data (to show code/name in header)
  const courses = [
    { id: 1, code: "ITM301", name: "Вэб Системс" },
    { id: 2, code: "ITM302", name: "Мобайл Апп" },
  ];

  const courseId = Number(course_id);
  const course = courses.find((c) => c.id === courseId) || courses[0];

  // Static arrays simulating DB tables
  const students = [
    { id: 1, regNo: "2025-001", name: "А.Бат", group: "101", major: "МТ", avgGrade: 72 },
    { id: 2, regNo: "2025-002", name: "Б.Сайн", group: "101", major: "МТ", avgGrade: 65 },
    { id: 3, regNo: "2025-003", name: "Ц.Анударья", group: "102", major: "МТ", avgGrade: 85 },
    { id: 4, regNo: "2025-004", name: "Д.Од", group: "102", major: "МТ", avgGrade: 58 },
    { id: 5, regNo: "2025-005", name: "Э.Чулуу", group: "101", major: "МТ", avgGrade: 61 },
    { id: 6, regNo: "2025-006", name: "Ж.Сувд", group: "103", major: "МТ", avgGrade: 90 },
    { id: 7, regNo: "2025-007", name: "Н.Цагаан", group: "103", major: "МТ", avgGrade: 55 },
    { id: 8, regNo: "2025-008", name: "О.Батзориг", group: "101", major: "МТ", avgGrade: 47 },
  ];

  const exams = [
    { id: 1, name: "Дунд шатны шалгалт", date: "2025-10-15", maxScore: 100, averageScore: 72, participants: 40 },
    { id: 2, name: "Төгсөлтийн шалгалт", date: "2025-12-20", maxScore: 100, averageScore: 80, participants: 41 },
  ];

  const assignments = [
    { id: 1, title: "Жишиг төсөл", lessonTitle: "React бүрэлдэхүүн хэсгүүд", submittedCount: 38, gradedCount: 36 },
    { id: 2, title: "Сайжруулалт", lessonTitle: "State & Props", submittedCount: 39, gradedCount: 39 },
    { id: 3, title: "Практик дасгал", lessonTitle: "DOM Manipulation", submittedCount: 35, gradedCount: 34 },
  ];

  const attendanceSummary = [
    { lessonNo: 1, lessonTitle: "HTML & CSS үндэс", present: 40, absent: 2, late: 0 },
    { lessonNo: 2, lessonTitle: "JavaScript Basics", present: 38, absent: 4, late: 0 },
    { lessonNo: 3, lessonTitle: "DOM Manipulation", present: 36, absent: 6, late: 0 },
    { lessonNo: 4, lessonTitle: "React Components", present: 37, absent: 5, late: 0 },
  ];

  // Helper calculations
  const totalStudents = students.length;
  const totalLessons = attendanceSummary.length;
  const totalExams = exams.length;
  const avgGradeAll = Math.round((students.reduce((s, x) => s + x.avgGrade, 0) / students.length) * 10) / 10;

  const pct = (part, total) => (total === 0 ? 0 : Math.round((part / total) * 100));

  // Attendance rows with percentages
  const attendanceRows = attendanceSummary.map((r) => {
    const total = r.present + r.absent + r.late;
    return {
      ...r,
      total,
      pctPresent: pct(r.present, total),
      pctAbsent: pct(r.absent, total),
      pctLate: pct(r.late, total),
    };
  });

  // Exams details with participation rate
  const examRows = exams.map((e) => ({
    ...e,
    participationRate: pct(e.participants, totalStudents),
  }));

  // Assignments with completion rate
  const assignmentRows = assignments.map((a) => ({
    ...a,
    completionRate: pct(a.submittedCount, totalStudents),
    gradedRate: pct(a.gradedCount, totalStudents),
  }));

  // Risk students: compute simple risk score (lower avgGrade and attendance)
  // For demo: assume attendance percent = average of attendanceRows present/total
  const avgAttendancePct = Math.round((attendanceRows.reduce((s, r) => s + r.pctPresent, 0) / (attendanceRows.length || 1)) * 10) / 10;

  const riskCandidates = students.map((st) => {
    // dummy score: weight average grade (0-100) and attendance (use class average)
    const score = (st.avgGrade * 0.7) + (avgAttendancePct * 0.3);
    return { ...st, riskScore: score };
  }).sort((a, b) => a.riskScore - b.riskScore).slice(0, 5);

  // Permission check: only admin/teacher/schooladmin allowed
  if (currentUser.role === "schoolstudent") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Энэ тайланг зөвхөн багш болон админ харах боломжтой.</h2>
          <p className="text-sm text-slate-300 mb-4">Хандалтанд харах эрхгүй байна.</p>
          <Link to={`/courses/${course.id}`} className="inline-block px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600">Буцах</Link>
        </div>
      </div>
    );
  }

  // Small UI components
  const StatisticCard = ({ label, value }) => (
    <div className="bg-white/5 rounded-lg p-4 text-center">
      <div className="text-sm text-slate-300">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
    </div>
  );

  const ProgressBar = ({ percent, color = "bg-emerald-500" }) => (
    <div className="w-full bg-white/5 rounded h-3 overflow-hidden">
      <div className={`${color} h-3`} style={{ width: `${percent}%` }} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <nav className="text-sm text-slate-400">
            <ol className="flex gap-2 items-center">
              <li><Link to="/" className="text-slate-300 hover:underline">Сургууль</Link></li>
              <li>›</li>
              <li><Link to="/courses" className="text-slate-300 hover:underline">Хичээлүүд</Link></li>
              <li>›</li>
              <li className="text-white">{course.code}</li>
            </ol>
          </nav>
          <h1 className="text-2xl md:text-3xl font-semibold text-white mt-2">Хичээлийн тайлан, статистик — {course.code}</h1>
        </div>
      </div>

      {/* Statistic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatisticCard label="Нийт оюутан" value={totalStudents} />
        <StatisticCard label="Нийт сэдэв" value={totalLessons} />
        <StatisticCard label="Нийт шалгалт" value={totalExams} />
        <StatisticCard label="Дундаж дүн" value={`${avgGradeAll}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left column: Attendance & Exams */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-3">Оюутны ирцийн тойм</h2>
            <div className="space-y-3">
              {attendanceRows.map((r) => (
                <div key={r.lessonNo} className="p-3 bg-white/2 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-slate-300">{r.lessonNo}. {r.lessonTitle}</div>
                    <div className="text-sm text-slate-300">Нийт: {r.total}</div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <div>Орц: {r.pctPresent}%</div>
                      <div>Absent: {r.pctAbsent}%</div>
                      <div>Late: {r.pctLate}%</div>
                    </div>
                    <div className="space-y-1">
                      <ProgressBar percent={r.pctPresent} color="bg-emerald-500" />
                      <ProgressBar percent={r.pctAbsent} color="bg-rose-500" />
                      <ProgressBar percent={r.pctLate} color="bg-amber-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-3">Шалгалтын үр дүн</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-slate-400">
                    <th className="py-2 pr-4">Нэр</th>
                    <th className="py-2 pr-4">Огноо</th>
                    <th className="py-2 pr-4">Дундаж</th>
                    <th className="py-2 pr-4">Макс</th>
                    <th className="py-2 pr-4">Оролцсон</th>
                  </tr>
                </thead>
                <tbody>
                  {examRows.map((e) => (
                    <tr key={e.id} className="border-t border-white/5">
                      <td className="py-3 pr-4 text-slate-200">{e.name}</td>
                      <td className="py-3 pr-4 text-slate-200">{e.date}</td>
                      <td className="py-3 pr-4 text-slate-200">{e.averageScore}</td>
                      <td className="py-3 pr-4 text-slate-200">{e.maxScore}</td>
                      <td className="py-3 pr-4 text-slate-200">{e.participationRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Assignments & Risk Students */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-3">Даалгаврын гүйцэтгэл</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-slate-400">
                    <th className="py-2 pr-4">Даалгавар</th>
                    <th className="py-2 pr-4">Сэдэв</th>
                    <th className="py-2 pr-4">Илгээсэн</th>
                    <th className="py-2 pr-4">Шалгасан</th>
                    <th className="py-2 pr-4">Биелэлт</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentRows.map((a) => (
                    <tr key={a.id} className="border-t border-white/5">
                      <td className="py-3 pr-4 text-slate-200">{a.title}</td>
                      <td className="py-3 pr-4 text-slate-200">{a.lessonTitle}</td>
                      <td className="py-3 pr-4 text-slate-200">{a.submittedCount}</td>
                      <td className="py-3 pr-4 text-slate-200">{a.gradedCount}</td>
                      <td className="py-3 pr-4 text-slate-200">{a.completionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-3">Эрсдэлтэй оюутнууд</h2>
            <div className="space-y-2">
              {riskCandidates.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2 bg-white/2 rounded">
                  <div>
                    <div className="text-sm text-slate-200 font-medium">{s.name} ({s.regNo})</div>
                    <div className="text-xs text-slate-400">Анги: {s.group} · Салбар: {s.major}</div>
                  </div>
                  <div className="text-sm text-rose-400">Риск: {Math.round(100 - s.riskScore)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}