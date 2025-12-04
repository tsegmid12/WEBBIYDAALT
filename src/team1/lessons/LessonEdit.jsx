import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, Card, Button, Input, Textarea } from "../components/UI";

export default function LessonEdit(){
  const nav = useNavigate();
  const { course_id, lesson_id } = useParams();
  
  // Бүх сэдвүүдийн жагсаалт - courses-тай холбоотой
  const allLessons = [
    // Хичээл #11 - Вэб систем
    { id: 101, course_id: 11, name: "HTML & CSS үндэс", type_id: 1, parent_id: null, point: 5, is_attainable: true, content: "HTML тэмдэглэгээний хэл болон CSS загварчлалын үндсэн ойлголтууд. Selector, Box model, Flexbox зэрэг." },
    { id: 102, course_id: 11, name: "JavaScript Basics", type_id: 1, parent_id: null, point: 10, is_attainable: true, content: "JavaScript хэлний үндсэн синтакс, хувьсагч, функц, объект зэрэг суурь ойлголтууд." },
    { id: 103, course_id: 11, name: "DOM Manipulation", type_id: 2, parent_id: 102, point: 8, is_attainable: true, content: "Document Object Model-тай ажиллах арга, элемент сонгох, өөрчлөх, event handling." },
    { id: 104, course_id: 11, name: "React Components", type_id: 1, parent_id: null, point: 15, is_attainable: true, content: "React компонентын бүтэц, JSX синтакс, функц болон класс компонентууд." },
    { id: 105, course_id: 11, name: "State & Props", type_id: 2, parent_id: 104, point: 12, is_attainable: true, content: "React дахь state удирдлага, props дамжуулах, компонентын харилцан үйлчлэл." },
    
    // Хичээл #12 - Мэдээллийн аюулгүй байдал
    { id: 201, course_id: 12, name: "Аюулгүй байдлын үндэс", type_id: 1, parent_id: null, point: 10, is_attainable: true, content: "Мэдээллийн аюулгүй байдлын үндсэн ойлголтууд, халдлагын төрлүүд, хамгаалалтын аргууд." },
    { id: 202, course_id: 12, name: "Authentication & Authorization", type_id: 1, parent_id: null, point: 15, is_attainable: true, content: "Хэрэглэгчийг баталгаажуулах, эрх олгох механизмууд. Session, Cookie, Token based auth." },
    { id: 203, course_id: 12, name: "JWT Токен", type_id: 2, parent_id: 202, point: 10, is_attainable: true, content: "JSON Web Token ашиглан баталгаажуулалт хийх, токен үүсгэх, шалгах, хадгалах." },
    { id: 204, course_id: 12, name: "Encryption Basics", type_id: 1, parent_id: null, point: 12, is_attainable: true, content: "Шифрлэлтийн үндсэн ойлголтууд, симметр болон асимметр шифрлэлт, hash функцууд." },
    { id: 205, course_id: 12, name: "SSL/TLS", type_id: 2, parent_id: 204, point: 8, is_attainable: true, content: "Аюулгүй холболт үүсгэх SSL/TLS protocol, сертификат, HTTPS тохиргоо." },
    
    // Хичээл #13 - Өгөгдлийн бүтэц
    { id: 301, course_id: 13, name: "Array & List", type_id: 1, parent_id: null, point: 8, is_attainable: true, content: "Массив болон жагсаалтын бүтэц, үйлдлүүд, цаг хугацааны нарийн төвөгтэй байдал." },
    { id: 302, course_id: 13, name: "Stack & Queue", type_id: 1, parent_id: null, point: 10, is_attainable: true, content: "Стек болон дарааллын өгөгдлийн бүтэц, LIFO ба FIFO зарчим, ашиглалтын жишээнүүд." },
    { id: 303, course_id: 13, name: "Stack Implementations", type_id: 2, parent_id: 302, point: 7, is_attainable: true, content: "Стек өгөгдлийн бүтцийг массив болон холбоост жагсаалтаар хэрэгжүүлэх." },
    { id: 304, course_id: 13, name: "Tree Structures", type_id: 1, parent_id: null, point: 15, is_attainable: true, content: "Модны өгөгдлийн бүтэц, terminology, модны төрлүүд, traversal аргууд." },
    { id: 305, course_id: 13, name: "Binary Search Tree", type_id: 2, parent_id: 304, point: 12, is_attainable: true, content: "Хоёртын хайлтын мод, оруулах, устгах, хайх үйлдлүүд." },
    
    // Хичээл #14 - Алгоритм ба анализ
    { id: 401, course_id: 14, name: "Time Complexity", type_id: 1, parent_id: null, point: 10, is_attainable: true, content: "Алгоритмын цаг хугацааны нарийн төвөгтэй байдал, Big O notation, анализын аргууд." },
    { id: 402, course_id: 14, name: "Sorting Algorithms", type_id: 1, parent_id: null, point: 15, is_attainable: true, content: "Эрэмбэлэх алгоритмууд: Bubble sort, Selection sort, Insertion sort, Merge sort, Quick sort." },
    { id: 403, course_id: 14, name: "Quick Sort", type_id: 2, parent_id: 402, point: 10, is_attainable: true, content: "Quick sort алгоритмын дэлгэрэнгүй тайлбар, partition функц, recursion ашиглалт." },
    { id: 404, course_id: 14, name: "Searching Algorithms", type_id: 1, parent_id: null, point: 12, is_attainable: true, content: "Хайлтын алгоритмууд: Linear search, Binary search, Hash table based search." },
    { id: 405, course_id: 14, name: "Graph Algorithms", type_id: 1, parent_id: null, point: 20, is_attainable: true, content: "График өгөгдлийн бүтэц, DFS, BFS, Dijkstra алгоритм, богино зам олох." },
  ];
  
  // Тухайн сэдвийг олох
  const currentLesson = allLessons.find(l => 
    l.id === parseInt(lesson_id) && l.course_id === parseInt(course_id)
  ) || {
    name: "React Router Basics",
    type_id: 1,
    parent_id: null,
    content: "Route, Outlet, NavLink ашиглах суурь. Динамик параметр, nested routes.",
    point: 10,
    is_attainable: true
  };
  
  // ERD-д нийцсэн талбаруудтай mock өгөгдөл
  const [name, setName] = useState(currentLesson.name);
  const [typeId, setTypeId] = useState(currentLesson.type_id);
  const [parentId, setParentId] = useState(currentLesson.parent_id || "");
  const [content, setContent] = useState(currentLesson.content);
  const [point, setPoint] = useState(currentLesson.point);
  const [isAttainable, setIsAttainable] = useState(currentLesson.is_attainable);

  const errors = useMemo(() => {
    const e = {};
    if (!name.trim()) e.name = "Нэр шаардлагатай";
    if (point !== "" && Number(point) < 0) e.point = "Эерэг тоо эсвэл 0 оруулна уу";
    return e;
  }, [name, point]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) return;
    // TODO: call API with course_id, type_id, parent_id, name, content, point, is_attainable
    nav("..");
  };

  const onKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (!Object.keys(errors).length) nav("..");
    }
  };
  
  return (
    <div className="space-y-4">
      <PageHeader title={`Сэдэв засах #${lesson_id}`} subtitle={`Хичээл #${course_id}`} />
      <Card>
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleSubmit} onKeyDown={onKeyDown}>
          <Input 
            label="Нэр" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            required 
            hint={errors.name} 
          />
          <Input 
            label="Төрлийн ID" 
            type="number" 
            value={typeId} 
            onChange={(e)=>setTypeId(e.target.value)} 
          />

          <Input 
            label="Эцэг сэдвийн ID" 
            type="number" 
            placeholder="Дэд сэдэв бол..." 
            value={parentId} 
            onChange={(e)=>setParentId(e.target.value)} 
          />
          <Input 
            label="Оноо" 
            type="number" 
            value={point} 
            onChange={(e)=>setPoint(e.target.value)} 
            hint={errors.point} 
          />

          <div className="sm:col-span-2">
            <Textarea 
              label="Агуулга" 
              value={content} 
              onChange={(e)=>setContent(e.target.value)} 
              rows={6}
            />
            <div className="mt-1 text-xs text-slate-400">{content.length} тэмдэгт</div>
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 text-slate-200">
              <input 
                type="checkbox" 
                checked={isAttainable} 
                onChange={(e)=>setIsAttainable(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Хүртэж авах боломжтой</span>
            </label>
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" onClick={()=>nav(-1)}>Болих</Button>
            <Button type="submit" disabled={Object.keys(errors).length>0}>Хадгалах</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
