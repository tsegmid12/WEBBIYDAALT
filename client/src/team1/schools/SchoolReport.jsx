// pages/SchoolReport.jsx
import { useMemo, useState } from "react";

// Энгийн демо өгөгдөл (шийдвэрлэхээс өмнө backend-тэй холбож болно)
const SCHOOLS = [
  {
    id: 1,
    name: "Улаанбаатар Их Сургууль",
    founded: 1995,
    status: "Идэвхтэй",
    students: 620,
    teachers: 58,
    courses: 120,
    approved_by: "admin",
    approved_on: "2023-08-01",
  },
  {
    id: 2,
    name: "Эрдэнэт Политехник Коллеж",
    founded: 1980,
    status: "Идэвхтэй",
    students: 410,
    teachers: 36,
    courses: 85,
    approved_by: "admin",
    approved_on: "2023-07-12",
  },
  {
    id: 3,
    name: "Дархан Их Сургууль",
    founded: 2001,
    status: "Идэвхтэй",
    students: 510,
    teachers: 42,
    courses: 90,
    approved_by: "editor",
    approved_on: "2023-09-02",
  },
  {
    id: 4,
    name: "Хөвсгөл Политехник Коллеж",
    founded: 1998,
    status: "Идэвхгүй",
    students: 140,
    teachers: 16,
    courses: 32,
    approved_by: "editor",
    approved_on: "2022-11-20",
  },
  {
    id: 5,
    name: "ШУТИС — Механик инженер",
    founded: 1960,
    status: "Идэвхтэй",
    students: 980,
    teachers: 110,
    courses: 210,
    approved_by: "admin",
    approved_on: "2024-01-15",
  },
  {
    id: 6,
    name: "Монгол-Герман хамтарсан сургууль",
    founded: 2014,
    status: "Идэвхтэй",
    students: 260,
    teachers: 24,
    courses: 55,
    approved_by: "admin",
    approved_on: "2023-06-05",
  },
  {
    id: 7,
    name: "СЭЗИС",
    founded: 1924,
    status: "Идэвхтэй",
    students: 1200,
    teachers: 150,
    courses: 320,
    approved_by: "admin",
    approved_on: "2023-03-10",
  },
  {
    id: 8,
    name: "Өмнөговь Политехник Коллеж",
    founded: 2003,
    status: "Идэвхтэй",
    students: 180,
    teachers: 20,
    courses: 40,
    approved_by: "editor",
    approved_on: "2023-02-04",
  },
  {
    id: 9,
    name: "Говь-Алтай Их Сургууль",
    founded: 1999,
    status: "Идэвхгүй",
    students: 90,
    teachers: 12,
    courses: 20,
    approved_by: null,
    approved_on: null,
  },
  {
    id: 10,
    name: "Завхан Их Сургууль",
    founded: 2005,
    status: "Идэвхтэй",
    students: 330,
    teachers: 28,
    courses: 60,
    approved_by: "admin",
    approved_on: "2023-05-09",
  },
];

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-slate-500 text-sm">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {sub ? <div className="text-xs text-slate-400 mt-1">{sub}</div> : null}
    </div>
  );
}

export default function SchoolReport() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Бүгд");
  const [sort, setSort] = useState("students_desc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    let list = [...SCHOOLS];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    if (status !== "Бүгд") list = list.filter((s) => s.status === status);

    switch (sort) {
      case "students_asc":
        list.sort((a, b) => a.students - b.students);
        break;
      case "students_desc":
        list.sort((a, b) => b.students - a.students);
        break;
      case "teachers_desc":
        list.sort((a, b) => b.teachers - a.teachers);
        break;
      case "courses_desc":
        list.sort((a, b) => b.courses - a.courses);
        break;
      case "name_asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [query, status, sort]);

  const totalSchools = filtered.length;
  const sums = useMemo(() => {
    return filtered.reduce(
      (acc, s) => {
        acc.students += s.students;
        acc.teachers += s.teachers;
        acc.courses += s.courses;
        return acc;
      },
      { students: 0, teachers: 0, courses: 0 }
    );
  }, [filtered]);

  const avgStudents = totalSchools ? Math.round(sums.students / totalSchools) : 0;
  const ratio = sums.students && sums.teachers
    ? (sums.students / sums.teachers).toFixed(1)
    : "-";

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  const exportCSV = () => {
    const headers = [
      "#",
      "Сургуулийн нэр",
      "Байгуулагдсан",
      "Төлөв",
      "Оюутан",
      "Багш",
      "Курс",
    ];
    const rows = filtered.map((s, i) => [
      i + 1,
      s.name,
      s.founded,
      s.status,
      s.students,
      s.teachers,
      s.courses,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "school-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 text-slate-800 print:text-black">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-3xl font-bold">Сургуулийн тайлан</h1>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="px-3 py-2 text-sm rounded bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            CSV export
          </button>
          <button
            onClick={printPage}
            className="px-3 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Хэвлэх
          </button>
        </div>
      </div>

      {/* Статикийн хурдан харагдац (мэдээлэл харагдахгүй тохиолдолд ч харагдана) */}
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-slate-900">
        <div className="font-semibold mb-2 text-lg">Статик товч мэдээлэл</div>
        <ul className="list-disc pl-5 space-y-1 text-base">
          <li>Нийт 10 сургууль бүртгэлтэй</li>
          <li>Нийт 4,720 оюутан</li>
          <li>Нийт 496 багш</li>
          <li>Нийт 1,032 курс</li>
        </ul>
        <div className="mt-2 text-sm text-slate-700">
          Топ сургуулиуд (оюутны тоогоор): СЭЗИС (1200), ШУТИС — Механик инженер (980), Улаанбаатар Их Сургууль (620)
        </div>
      </div>

      {/* Шүүлтүүр */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={query}
          onChange={(e) => { setPage(1); setQuery(e.target.value); }}
          className="w-full rounded border border-slate-400 px-3 py-2 text-slate-900 placeholder-slate-500"
          placeholder="Сургуулийн нэрээр хайх..."
        />
        <select
          value={status}
          onChange={(e) => { setPage(1); setStatus(e.target.value); }}
          className="w-full rounded border border-slate-400 px-3 py-2 text-slate-900"
        >
          {['Бүгд', 'Идэвхтэй', 'Идэвхгүй'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded border border-slate-400 px-3 py-2 text-slate-900"
        >
          <option value="students_desc">Оюутан (их→бага)</option>
          <option value="students_asc">Оюутан (бага→их)</option>
          <option value="teachers_desc">Багш (их→бага)</option>
          <option value="courses_desc">Курс (их→бага)</option>
          <option value="name_asc">Нэр (A→Я)</option>
        </select>
      </div>

      {/* Нэгдсэн үзүүлэлт */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Нийт сургуулиуд" value={totalSchools} />
        <StatCard label="Нийт оюутан" value={sums.students.toLocaleString()} sub={`Дундаж: ${avgStudents.toLocaleString()}`} />
        <StatCard label="Нийт багш" value={sums.teachers.toLocaleString()} sub={`Харьцаа: 1 багшид ${ratio} оюутан`} />
        <StatCard label="Нийт курс" value={sums.courses.toLocaleString()} />
      </div>

      {/* Хүснэгт */}
      <div className="rounded-xl border border-slate-300 overflow-hidden bg-white">
        <table className="min-w-full text-[15px]">
          <thead className="bg-slate-100 text-slate-900 font-semibold">
            <tr>
              <th className="text-left px-4 py-2">#</th>
              <th className="text-left px-4 py-2">Сургуулийн нэр</th>
              <th className="text-left px-4 py-2">Байгуулагдсан</th>
              <th className="text-right px-4 py-2">Оюутан</th>
              <th className="text-right px-4 py-2">Багш</th>
              <th className="text-right px-4 py-2">Курс</th>
              <th className="text-left px-4 py-2">Төлөв</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-700">Илэрц олдсонгүй</td>
              </tr>
            ) : (
              paged.map((s, idx) => (
                <tr key={s.id} className="border-t border-slate-200">
                  <td className="px-4 py-2">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="px-4 py-2">
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-sm text-slate-700">{s.founded}</div>
                  </td>
                  <td className="px-4 py-2">{s.founded}</td>
                  <td className="px-4 py-2 text-right text-slate-900">{s.students.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-slate-900">{s.teachers.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-slate-900">{s.courses.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span className={
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium " +
                      (s.status === "Идэвхтэй"
                        ? "bg-green-100 text-green-800 ring-1 ring-green-300"
                        : "bg-slate-200 text-slate-800 ring-1 ring-slate-300")
                    }>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Хуудаслалт */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-slate-50 text-base">
          <div className="text-slate-800">Нийт {filtered.length} мөр</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2 py-1 rounded border border-slate-400 disabled:opacity-50 text-slate-900"
            >Өмнөх</button>
            <div>Хуудас {page} / {pageCount}</div>
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="px-2 py-1 rounded border border-slate-400 disabled:opacity-50 text-slate-900"
            >Дараах</button>
          </div>
        </div>
      </div>
    </div>
  );
}
