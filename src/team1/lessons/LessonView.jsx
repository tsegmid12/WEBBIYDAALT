import React from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader, Card, Button } from "../components/UI";
import { isStudent } from "../utils/role";

export default function LessonView(){
  const { course_id, lesson_id } = useParams();
  
  // ERD-д нийцсэн талбаруудтай mock өгөгдөл - бүх сэдвүүд
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
  const data = allLessons.find(lesson => 
    lesson.id === parseInt(lesson_id) && lesson.course_id === parseInt(course_id)
  ) || {
    id: lesson_id,
    course_id: course_id,
    type_id: 1,
    parent_id: null,
    name: "Сэдэв олдсонгүй",
    content: "Энэ сэдвийн мэдээлэл олдсонгүй.",
    point: 0,
    is_attainable: false,
  };
  
  const printPage = () => window.print();
  
  return (
    <div className="space-y-4">
      <PageHeader
        title={`Сэдэв харах #${data.id}`}
        subtitle={`Хичээл #${data.course_id}`}
        right={
          <div className="flex gap-2">
            {!isStudent() && <Button variant="ghost" onClick={printPage}>Хэвлэх</Button>}
            {!isStudent() && <Link to={`edit`}><Button>Засах</Button></Link>}
          </div>
        }
      />
      <Card>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <dt className="text-slate-400 text-sm">Нэр</dt>
            <dd className="text-white font-medium">{data.name}</dd>
          </div>
          <div>
            <dt className="text-slate-400 text-sm">Төрлийн ID</dt>
            <dd className="text-white font-medium">{data.type_id}</dd>
          </div>

          <div>
            <dt className="text-slate-400 text-sm">Эцэг сэдвийн ID</dt>
            <dd className="text-slate-200">{data.parent_id ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-slate-400 text-sm">Оноо</dt>
            <dd className="text-white font-medium">{data.point}</dd>
          </div>

          <div>
            <dt className="text-slate-400 text-sm">Хүртэж авах боломжтой</dt>
            <dd>
              <span className={
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium " +
                (data.is_attainable ? "bg-emerald-600/20 text-emerald-300 border border-emerald-400/20" : "bg-slate-500/20 text-slate-300 border border-white/10")
              }>
                {data.is_attainable ? "Тийм" : "Үгүй"}
              </span>
            </dd>
          </div>

          <div className="sm:col-span-2 pt-4 border-t border-white/10">
            <dt className="text-slate-400 text-sm mb-2">Агуулга</dt>
            <dd className="text-slate-200 leading-relaxed whitespace-pre-wrap">{data.content}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
