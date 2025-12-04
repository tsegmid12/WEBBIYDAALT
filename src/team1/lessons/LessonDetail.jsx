// src/team1/lessons/LessonDetail.jsx
import { Link, useParams } from "react-router-dom";

export default function LessonDetail() {
  const { course_id, lesson_id } = useParams();

  // Бүх сэдвүүдийн жагсаалт - courses-тай холбоотой
  const allLessons = [
    // Хичээл #11 - Вэб систем
    { id: 101, course_id: 11, title: "HTML & CSS үндэс", order: 1, duration: "45 мин", published: true, content: "HTML тэмдэглэгээний хэл болон CSS загварчлалын үндсэн ойлголтууд. Selector, Box model, Flexbox зэрэг." },
    { id: 102, course_id: 11, title: "JavaScript Basics", order: 2, duration: "60 мин", published: true, content: "JavaScript хэлний үндсэн синтакс, хувьсагч, функц, объект зэрэг суурь ойлголтууд." },
    { id: 103, course_id: 11, title: "DOM Manipulation", order: 3, duration: "50 мин", published: true, content: "Document Object Model-тай ажиллах арга, элемент сонгох, өөрчлөх, event handling." },
    { id: 104, course_id: 11, title: "React Components", order: 4, duration: "75 мин", published: true, content: "React компонентын бүтэц, JSX синтакс, функц болон класс компонентууд." },
    { id: 105, course_id: 11, title: "State & Props", order: 5, duration: "60 мин", published: true, content: "React дахь state удирдлага, props дамжуулах, компонентын харилцан үйлчлэл." },
    
    // Хичээл #12 - Мэдээллийн аюулгүй байдал
    { id: 201, course_id: 12, title: "Аюулгүй байдлын үндэс", order: 1, duration: "60 мин", published: true, content: "Мэдээллийн аюулгүй байдлын үндсэн ойлголтууд, халдлагын төрлүүд, хамгаалалтын аргууд." },
    { id: 202, course_id: 12, title: "Authentication & Authorization", order: 2, duration: "75 мин", published: true, content: "Хэрэглэгчийг баталгаажуулах, эрх олгох механизмууд. Session, Cookie, Token based auth." },
    { id: 203, course_id: 12, title: "JWT Токен", order: 3, duration: "50 мин", published: true, content: "JSON Web Token ашиглан баталгаажуулалт хийх, токен үүсгэх, шалгах, хадгалах." },
    { id: 204, course_id: 12, title: "Encryption Basics", order: 4, duration: "60 мин", published: true, content: "Шифрлэлтийн үндсэн ойлголтууд, симметр болон асимметр шифрлэлт, hash функцууд." },
    { id: 205, course_id: 12, title: "SSL/TLS", order: 5, duration: "45 мин", published: true, content: "Аюулгүй холболт үүсгэх SSL/TLS protocol, сертификат, HTTPS тохиргоо." },
    
    // Хичээл #13 - Өгөгдлийн бүтэц
    { id: 301, course_id: 13, title: "Array & List", order: 1, duration: "50 мин", published: true, content: "Массив болон жагсаалтын бүтэц, үйлдлүүд, цаг хугацааны нарийн төвөгтэй байдал." },
    { id: 302, course_id: 13, title: "Stack & Queue", order: 2, duration: "60 мин", published: true, content: "Стек болон дарааллын өгөгдлийн бүтэц, LIFO ба FIFO зарчим, ашиглалтын жишээнүүд." },
    { id: 303, course_id: 13, title: "Stack Implementations", order: 3, duration: "45 мин", published: true, content: "Стек өгөгдлийн бүтцийг массив болон холбоост жагсаалтаар хэрэгжүүлэх." },
    { id: 304, course_id: 13, title: "Tree Structures", order: 4, duration: "75 мин", published: true, content: "Модны өгөгдлийн бүтэц, terminology, модны төрлүүд, traversal аргууд." },
    { id: 305, course_id: 13, title: "Binary Search Tree", order: 5, duration: "60 мин", published: true, content: "Хоёртын хайлтын мод, оруулах, устгах, хайх үйлдлүүд." },
    
    // Хичээл #14 - Алгоритм ба анализ
    { id: 401, course_id: 14, title: "Time Complexity", order: 1, duration: "60 мин", published: true, content: "Алгоритмын цаг хугацааны нарийн төвөгтэй байдал, Big O notation, анализын аргууд." },
    { id: 402, course_id: 14, title: "Sorting Algorithms", order: 2, duration: "75 мин", published: true, content: "Эрэмбэлэх алгоритмууд: Bubble sort, Selection sort, Insertion sort, Merge sort, Quick sort." },
    { id: 403, course_id: 14, title: "Quick Sort", order: 3, duration: "50 мин", published: true, content: "Quick sort алгоритмын дэлгэрэнгүй тайлбар, partition функц, recursion ашиглалт." },
    { id: 404, course_id: 14, title: "Searching Algorithms", order: 4, duration: "60 мин", published: true, content: "Хайлтын алгоритмууд: Linear search, Binary search, Hash table based search." },
    { id: 405, course_id: 14, title: "Graph Algorithms", order: 5, duration: "100 мин", published: true, content: "График өгөгдлийн бүтэц, DFS, BFS, Dijkstra алгоритм, богино зам олох." },
  ];

  const lesson = allLessons.find(l => 
    l.id === parseInt(lesson_id) && l.course_id === parseInt(course_id)
  ) || {
    id: Number(lesson_id),
    course_id: Number(course_id),
    title: "Сэдэв олдсонгүй",
    order: 0,
    duration: "0 мин",
    published: false,
    content: "Энэ сэдвийн мэдээлэл олдсонгүй.",
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <div className="flex gap-2">
          {/* relative */}
          <Link to="edit" className="px-3 py-2 border rounded">
            Засах
          </Link>
          <Link to=".." className="underline">
            Буцах
          </Link>
        </div>
      </div>

      <div className="p-4 border rounded bg-white whitespace-pre-wrap">{lesson.content}</div>
    </div>
  );
}
