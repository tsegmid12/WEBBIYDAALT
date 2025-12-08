import React from "react";
import { Link, useParams } from "react-router-dom";
import { PageHeader, Card, Button, Table } from "../components/UI";
import { isStudent } from "../utils/role";

export default function LessonsList(){
  const { course_id } = useParams();
  
  // ERD-д нийцсэн талбаруудтай mock өгөгдөл - course_id-тай холбоотой
  const allLessons = [
    // Хичээл #11 - Вэб систем
    { id: 101, course_id: 11, name: "HTML & CSS үндэс", type_id: 1, parent_id: null, point: 5, is_attainable: true },
    { id: 102, course_id: 11, name: "JavaScript Basics", type_id: 1, parent_id: null, point: 10, is_attainable: true },
    { id: 103, course_id: 11, name: "DOM Manipulation", type_id: 2, parent_id: 102, point: 8, is_attainable: true },
    { id: 104, course_id: 11, name: "React Components", type_id: 1, parent_id: null, point: 15, is_attainable: true },
    { id: 105, course_id: 11, name: "State & Props", type_id: 2, parent_id: 104, point: 12, is_attainable: true },
    
    // Хичээл #12 - Мэдээллийн аюулгүй байдал
    { id: 201, course_id: 12, name: "Аюулгүй байдлын үндэс", type_id: 1, parent_id: null, point: 10, is_attainable: true },
    { id: 202, course_id: 12, name: "Authentication & Authorization", type_id: 1, parent_id: null, point: 15, is_attainable: true },
    { id: 203, course_id: 12, name: "JWT Токен", type_id: 2, parent_id: 202, point: 10, is_attainable: true },
    { id: 204, course_id: 12, name: "Encryption Basics", type_id: 1, parent_id: null, point: 12, is_attainable: true },
    { id: 205, course_id: 12, name: "SSL/TLS", type_id: 2, parent_id: 204, point: 8, is_attainable: true },
    
    // Хичээл #13 - Өгөгдлийн бүтэц
    { id: 301, course_id: 13, name: "Array & List", type_id: 1, parent_id: null, point: 8, is_attainable: true },
    { id: 302, course_id: 13, name: "Stack & Queue", type_id: 1, parent_id: null, point: 10, is_attainable: true },
    { id: 303, course_id: 13, name: "Stack Implementations", type_id: 2, parent_id: 302, point: 7, is_attainable: true },
    { id: 304, course_id: 13, name: "Tree Structures", type_id: 1, parent_id: null, point: 15, is_attainable: true },
    { id: 305, course_id: 13, name: "Binary Search Tree", type_id: 2, parent_id: 304, point: 12, is_attainable: true },
    
    // Хичээл #14 - Алгоритм ба анализ
    { id: 401, course_id: 14, name: "Time Complexity", type_id: 1, parent_id: null, point: 10, is_attainable: true },
    { id: 402, course_id: 14, name: "Sorting Algorithms", type_id: 1, parent_id: null, point: 15, is_attainable: true },
    { id: 403, course_id: 14, name: "Quick Sort", type_id: 2, parent_id: 402, point: 10, is_attainable: true },
    { id: 404, course_id: 14, name: "Searching Algorithms", type_id: 1, parent_id: null, point: 12, is_attainable: true },
    { id: 405, course_id: 14, name: "Graph Algorithms", type_id: 1, parent_id: null, point: 20, is_attainable: true },
  ];
  
  // Тухайн хичээлд хамаарах сэдвүүдийг шүүх
  const mock = allLessons.filter(lesson => lesson.course_id === parseInt(course_id));
  
  return (
    <div className="space-y-4">
      <PageHeader 
        title={`Сэдвийн жагсаалт (Хичээл #${course_id})`} 
        right={!isStudent() ? <Link to={`create`}><Button>➕ Сэдэв нэмэх</Button></Link> : null} 
      />
      
      {isStudent() && (
        <Card className="border-green-500/30 bg-green-500/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍🎓</span>
            <div>
              <div className="text-white font-medium">Оюутны харагдац</div>
              <div className="text-slate-300 text-sm">
                Та зөвхөн сэдвийн мэдээллийг харах боломжтой. Засах, нэмэх боломжгүй.
              </div>
            </div>
          </div>
        </Card>
      )}
      <Card>
        {mock.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-2">📚 Сэдэв олдсонгүй</div>
            <div className="text-slate-500 text-sm">
              Хичээл #{course_id}-д сэдэв байхгүй байна эсвэл хичээлийн ID буруу байна.
            </div>
          </div>
        ) : (
          <Table columns={["ID","Нэр","Төрлийн ID","Эцэг ID","Оноо","Хүртэх боломжтой","Үйлдэл"]}>
            {mock.map((l)=> (
              <tr key={l.id}>
                <td className="px-4 py-3">{l.id}</td>
                <td className="px-4 py-3 font-medium text-slate-100">{l.name}</td>
                <td className="px-4 py-3">{l.type_id}</td>
                <td className="px-4 py-3">{l.parent_id ?? "-"}</td>
                <td className="px-4 py-3">{l.point}</td>
                <td className="px-4 py-3">
                  <span className={
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium " +
                    (l.is_attainable ? "bg-emerald-600/20 text-emerald-300 border border-emerald-400/20" : "bg-slate-500/20 text-slate-300 border border-white/10")
                  }>
                    {l.is_attainable ? "Тийм" : "Үгүй"}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <Link to={`${l.id}`}><Button variant="ghost">Харах</Button></Link>
                  {!isStudent() && <Link to={`${l.id}/edit`}><Button variant="ghost">Засах</Button></Link>}
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}
