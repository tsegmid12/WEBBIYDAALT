import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader, Card, Button, Table, Input } from "../components/UI";

// ERD-д таарсан талбаруудтай mock өгөгдөл
const MOCK_COURSES = [
  { id: 11, name: "Вэб систем", clone_id: null, picture: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=240&fit=crop", start_date: "2025-02-01", end_date: "2025-05-25" },
  { id: 12, name: "Мэдээллийн аюулгүй байдал", clone_id: 11, picture: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=240&fit=crop", start_date: "2025-03-01", end_date: "2025-06-01" },
  { id: 13, name: "Өгөгдлийн бүтэц", clone_id: null, picture: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=240&fit=crop", start_date: "2025-01-15", end_date: "2025-04-30" },
  { id: 14, name: "Алгоритм ба анализ", clone_id: 13, picture: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&h=240&fit=crop", start_date: "2025-02-10", end_date: "2025-06-10" },
];

export default function CoursesList(){
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("start_asc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    let list = [...MOCK_COURSES];
    if (query.trim()){
      const q = query.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || String(c.clone_id || "").includes(q));
    }
    switch (sort){
      case "name_asc": list.sort((a,b)=> a.name.localeCompare(b.name)); break;
      case "start_asc": list.sort((a,b)=> a.start_date.localeCompare(b.start_date)); break;
      case "end_asc": list.sort((a,b)=> a.end_date.localeCompare(b.end_date)); break;
      default: break;
    }
    return list;
  }, [query, sort]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  const exportCSV = () => {
    const headers = ["ID","Нэр","Хуулбарын ID","Эхлэх","Дуусах","Зураг"];
    const rows = filtered.map(c => [c.id, c.name, c.clone_id ?? "", c.start_date, c.end_date, c.picture]);
    const csv = [headers, ...rows].map(r => r.map(x => `"${String(x).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Хичээлийн жагсаалт"
        right={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={exportCSV}>CSV</Button>
            <Link to="create"><Button>➕ Нэмэх</Button></Link>
          </div>
        }
      />

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            label="Хайлт"
            placeholder="Нэр эсвэл Хуулбарын ID..."
            value={query}
            onChange={(e)=>{ setPage(1); setQuery(e.target.value); }}
          />
          <label className="block text-sm">
            <div className="text-slate-200 mb-1">Эрэмбэ</div>
            <select className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100" value={sort} onChange={(e)=> setSort(e.target.value)}>
              <option value="start_asc">Эхлэх огноо</option>
              <option value="end_asc">Дуусах огноо</option>
              <option value="name_asc">Нэр (A→Я)</option>
            </select>
          </label>
        </div>
      </Card>

      <Card>
        <Table columns={["ID","Нэр","Хуулбарын ID","Эхлэх","Дуусах","Зураг","Үйлдэл"]}>
          {paged.map((c)=> (
            <tr key={c.id}>
              <td className="px-4 py-3">{c.id}</td>
              <td className="px-4 py-3 font-medium text-slate-100">{c.name}</td>
              <td className="px-4 py-3">{c.clone_id ?? "-"}</td>
              <td className="px-4 py-3">{c.start_date}</td>
              <td className="px-4 py-3">{c.end_date}</td>
              <td className="px-4 py-3">
                {c.picture ? <img className="h-10 w-16 object-cover rounded" src={c.picture} alt={c.name} /> : <span className="text-slate-400">-</span>}
              </td>
              <td className="px-4 py-3 flex flex-wrap gap-2">
                <Link to={`${c.id}`}><Button variant="ghost">Харах</Button></Link>
                <Link to={`${c.id}/edit`}><Button variant="ghost">Засах</Button></Link>
                <Link to={`${c.id}/lessons`}><Button variant="ghost">Сэдвүүд</Button></Link>
              </td>
            </tr>
          ))}
        </Table>

        <div className="flex items-center justify-between mt-3 text-sm text-slate-300">
          <div>Нийт {filtered.length} мөр</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={()=> setPage(p=> Math.max(1, p-1))} disabled={page===1}>Өмнөх</Button>
            <div>Хуудас {page} / {pageCount}</div>
            <Button variant="ghost" onClick={()=> setPage(p=> Math.min(pageCount, p+1))} disabled={page===pageCount}>Дараах</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}