// 1. АСУУЛТЫН САН - ОЛОН ТӨРӨЛ
export const questionBank = [
  // 1. SINGLE CHOICE - Нэг хувилбар сонгох
  {
    id: 1,
    category_id: 1,
    category_name: "React",
    level_id: 1,
    level_name: "Хялбар",
    type: "single_choice",
    question: "React нь юу вэ?",
    options: [
      { id: 'a', text: "JavaScript сан", is_correct: true },
      { id: 'b', text: "CSS framework", is_correct: false },
      { id: 'c', text: "Backend framework", is_correct: false },
      { id: 'd', text: "Database", is_correct: false }
    ],
    default_point: 5,
    explanation: "React бол Facebook-с бүтээсэн JavaScript сан юм.",
    created_by: "team1"
  },

  // 2. MULTIPLE CHOICE - Олон хувилбар сонгох
  {
    id: 2,
    category_id: 1,
    category_name: "React",
    level_id: 2,
    level_name: "Дунд",
    type: "multiple_choice",
    question: "React Hooks-д аль нь багтдаг вэ? (Олон хариулт сонгоно)",
    options: [
      { id: 'a', text: "useState", is_correct: true },
      { id: 'b', text: "useEffect", is_correct: true },
      { id: 'c', text: "useQuery", is_correct: false },
      { id: 'd', text: "useContext", is_correct: true }
    ],
    default_point: 10,
    explanation: "useState, useEffect, useContext нь React-ийн үндсэн hooks юм.",
    created_by: "team1"
  },

  // 3. TRUE/FALSE
  {
    id: 3,
    category_id: 1,
    category_name: "React",
    level_id: 1,
    level_name: "Хялбар",
    type: "true_false",
    question: "React нь virtual DOM ашигладаг.",
    correct_answer: true,
    default_point: 5,
    explanation: "React нь virtual DOM ашиглан гүйцэтгэлийг сайжруулдаг.",
    created_by: "team2"
  },

  // 4. TEXT ANSWER - Нээлттэй хариулт
  {
    id: 4,
    category_id: 2,
    category_name: "Node.js",
    level_id: 2,
    level_name: "Дунд",
    type: "text_answer",
    question: "Node.js-д package.json файлын үүрэг юу вэ?",
    sample_answer: "Package.json файл нь төслийн мэдээлэл болон dependencies-ийг хадгалдаг.",
    keywords: ["dependencies", "төсөл", "мэдээлэл", "package"],
    default_point: 10,
    explanation: "Package.json нь Node.js төслийн тохиргоо, хамаарлуудыг агуулна.",
    created_by: "team3"
  },

  // 5. FILL IN BLANK - Хоосон зайд нөхөх
  {
    id: 5,
    category_id: 1,
    category_name: "React",
    level_id: 1,
    level_name: "Хялбар",
    type: "fill_blank",
    question: "React component-ийг үүсгэхдээ _____ эсвэл _____ ашиглана.",
    blanks: [
      { id: 1, correct_answers: ["function", "функц"] },
      { id: 2, correct_answers: ["class", "класс"] }
    ],
    default_point: 8,
    explanation: "React component-ийг function эсвэл class ашиглан үүсгэнэ.",
    created_by: "team1"
  },

  // 6. MATCHING - Харгалзуулах
  {
    id: 6,
    category_id: 2,
    category_name: "Node.js",
    level_id: 2,
    level_name: "Дунд",
    type: "matching",
    question: "HTTP методуудыг үйлдэлтэй нь харгалзуулна уу:",
    pairs: [
      { id: 1, left: "GET", right: "Өгөгдөл унших", correct_match: "A" },
      { id: 2, left: "POST", right: "Өгөгдөл үүсгэх", correct_match: "B" },
      { id: 3, left: "PUT", right: "Өгөгдөл засах", correct_match: "C" },
      { id: 4, left: "DELETE", right: "Өгөгдөл устгах", correct_match: "D" }
    ],
    default_point: 12,
    explanation: "REST API-д өөр өөр HTTP метод өөр өөр үүрэгтэй.",
    created_by: "team2"
  },

  // 7. ORDERING - Дараалал тавих
  {
    id: 7,
    category_id: 1,
    category_name: "React",
    level_id: 3,
    level_name: "Хүнд",
    type: "ordering",
    question: "React component-ийн lifecycle дарааллыг зөв байрлуулна уу:",
    items: [
      { id: 1, text: "componentDidMount", correct_order: 2 },
      { id: 2, text: "constructor", correct_order: 1 },
      { id: 3, text: "render", correct_order: 3 },
      { id: 4, text: "componentWillUnmount", correct_order: 4 }
    ],
    default_point: 15,
    explanation: "React class component lifecycle: constructor → render → componentDidMount → componentWillUnmount",
    created_by: "team1"
  },

  // 8. IMAGE QUESTION - Зураг бүхий
  {
    id: 8,
    category_id: 4,
    category_name: "HTML/CSS",
    level_id: 2,
    level_name: "Дунд",
    type: "single_choice",
    question: "Зурган дээрх layout хийхэд ямар CSS property ашигласан байх вэ?",
    image_url: "https://via.placeholder.com/400x200?text=Flexbox+Layout",
    options: [
      { id: 'a', text: "display: flexbox", is_correct: false },
      { id: 'b', text: "display: flex", is_correct: true },
      { id: 'c', text: "display: grid", is_correct: false },
      { id: 'd', text: "display: inline", is_correct: false }
    ],
    default_point: 8,
    explanation: "Flexbox layout үүсгэхдээ display: flex ашиглана.",
    created_by: "team5"
  },

  // Нэмэлт асуултууд...
  {
    id: 9,
    category_id: 3,
    category_name: "Database",
    level_id: 1,
    level_name: "Хялбар",
    type: "single_choice",
    question: "SQL нь юу гэсэн үг вэ?",
    options: [
      { id: 'a', text: "Structured Query Language", is_correct: true },
      { id: 'b', text: "Simple Query Language", is_correct: false },
      { id: 'c', text: "Server Query Language", is_correct: false }
    ],
    default_point: 5,
    created_by: "team4"
  },
  
  {
    id: 10,
    category_id: 3,
    category_name: "Database",
    level_id: 2,
    level_name: "Дунд",
    type: "true_false",
    question: "NoSQL өгөгдлийн сан нь зөвхөн JSON форматтай ажилладаг.",
    correct_answer: false,
    default_point: 6,
    explanation: "NoSQL нь олон төрлийн өгөгдлийн формат (document, key-value, graph) дэмждэг.",
    created_by: "team3"
  },

  // JavaScript Questions
  {
    id: 11,
    category_id: 6,
    category_name: "JavaScript",
    level_id: 1,
    level_name: "Хялбар",
    type: "single_choice",
    question: "JavaScript-д var, let, const-ийн ялгаа юу вэ?",
    options: [
      { id: 'a', text: "var нь block scope, let/const нь function scope", is_correct: false },
      { id: 'b', text: "var нь function scope, let/const нь block scope", is_correct: true },
      { id: 'c', text: "Бүгд ижил scope-той", is_correct: false },
      { id: 'd', text: "Зөвхөн const нь block scope", is_correct: false }
    ],
    default_point: 5,
    explanation: "var нь function scope, let болон const нь block scope-той.",
    created_by: "team6"
  },
  {
    id: 12,
    category_id: 6,
    category_name: "JavaScript",
    level_id: 2,
    level_name: "Дунд",
    type: "multiple_choice",
    question: "JavaScript-ийн array method-ууд аль нь вэ? (Олон хариулт сонгоно)",
    options: [
      { id: 'a', text: "map()", is_correct: true },
      { id: 'b', text: "filter()", is_correct: true },
      { id: 'c', text: "reduce()", is_correct: true },
      { id: 'd', text: "forEach()", is_correct: true }
    ],
    default_point: 8,
    explanation: "map, filter, reduce, forEach нь JavaScript-ийн үндсэн array method-ууд юм.",
    created_by: "team6"
  },
  {
    id: 13,
    category_id: 6,
    category_name: "JavaScript",
    level_id: 2,
    level_name: "Дунд",
    type: "number_answer",
    question: "Дараах код ямар утга буцаана? Math.floor(Math.random() * 10) + 1",
    correct_answer: "1-10 хооронд тоо",
    number_range: { min: 1, max: 10 },
    default_point: 5,
    explanation: "Math.random() нь 0-1 хооронд тоо буцаана, Math.floor нь доош бөөрөнхийлнө.",
    created_by: "team6"
  },

  // Python Questions
  {
    id: 14,
    category_id: 7,
    category_name: "Python",
    level_id: 1,
    level_name: "Хялбар",
    type: "single_choice",
    question: "Python-д list-ийг хэрхэн үүсгэх вэ?",
    options: [
      { id: 'a', text: "list = []", is_correct: true },
      { id: 'b', text: "list = {}", is_correct: false },
      { id: 'c', text: "list = ()", is_correct: false },
      { id: 'd', text: "list = <>", is_correct: false }
    ],
    default_point: 5,
    explanation: "Python-д list нь [] хаалт ашиглан үүсгэнэ.",
    created_by: "team6"
  },
  {
    id: 15,
    category_id: 7,
    category_name: "Python",
    level_id: 2,
    level_name: "Дунд",
    type: "text_answer",
    question: "Python-д dictionary гэж юу вэ? Тайлбарлана уу.",
    sample_answer: "Dictionary нь key-value хос агуулсан өгөгдлийн бүтэц юм. {} хаалт ашиглан үүсгэнэ.",
    keywords: ["key", "value", "dictionary", "өгөгдөл"],
    default_point: 8,
    explanation: "Dictionary нь key-value хос агуулсан өгөгдлийн бүтэц.",
    created_by: "team6"
  },
  {
    id: 16,
    category_id: 7,
    category_name: "Python",
    level_id: 3,
    level_name: "Хүнд",
    type: "fill_blank",
    question: "Python-д list comprehension ашиглан 1-ээс 10 хүртэлх тоонуудын квадратыг олох: [_____ for x in range(1, 11)]",
    blanks: [
      { id: 1, correct_answers: ["x**2", "x*x", "x^2"] }
    ],
    default_point: 10,
    explanation: "List comprehension: [x**2 for x in range(1, 11)]",
    created_by: "team6"
  },

  // Java Questions
  {
    id: 17,
    category_id: 8,
    category_name: "Java",
    level_id: 1,
    level_name: "Хялбар",
    type: "true_false",
    question: "Java нь compiled хэл юм.",
    correct_answer: true,
    default_point: 5,
    explanation: "Java нь compiled хэл бөгөөд bytecode руу compile хийдэг.",
    created_by: "team6"
  },
  {
    id: 18,
    category_id: 8,
    category_name: "Java",
    level_id: 2,
    level_name: "Дунд",
    type: "matching",
    question: "Java-ийн access modifier-уудыг тайлбартай нь харгалзуулна уу:",
    pairs: [
      { id: 1, left: "public", right: "Бүх class-аас хандах боломжтой", correct_match: "A" },
      { id: 2, left: "private", right: "Зөвхөн тухайн class дотор", correct_match: "B" },
      { id: 3, left: "protected", right: "Subclass болон package дотор", correct_match: "C" },
      { id: 4, left: "default", right: "Package дотор л", correct_match: "D" }
    ],
    default_point: 12,
    explanation: "Java-д 4 төрлийн access modifier байна.",
    created_by: "team6"
  },

  // Image Questions
  {
    id: 19,
    category_id: 4,
    category_name: "HTML/CSS",
    level_id: 2,
    level_name: "Дунд",
    type: "image_question",
    question: "Зурган дээрх CSS код ямар layout үүсгэх вэ?",
    image_url: "https://via.placeholder.com/500x300?text=CSS+Grid+Layout",
    options: [
      { id: 'a', text: "Flexbox layout", is_correct: false },
      { id: 'b', text: "Grid layout", is_correct: true },
      { id: 'c', text: "Table layout", is_correct: false },
      { id: 'd', text: "Float layout", is_correct: false }
    ],
    default_point: 8,
    explanation: "display: grid нь Grid layout үүсгэнэ.",
    created_by: "team6"
  },
  {
    id: 20,
    category_id: 1,
    category_name: "React",
    level_id: 2,
    level_name: "Дунд",
    type: "image_question",
    question: "Зурган дээрх React component-ийн төрөл юу вэ?",
    image_url: "https://via.placeholder.com/500x300?text=React+Component+Structure",
    options: [
      { id: 'a', text: "Functional Component", is_correct: true },
      { id: 'b', text: "Class Component", is_correct: false },
      { id: 'c', text: "HOC Component", is_correct: false },
      { id: 'd', text: "Container Component", is_correct: false }
    ],
    default_point: 8,
    explanation: "Functional component нь function ашиглан бичигддэг.",
    created_by: "team6"
  },

  // TypeScript Questions
  {
    id: 21,
    category_id: 10,
    category_name: "TypeScript",
    level_id: 2,
    level_name: "Дунд",
    type: "single_choice",
    question: "TypeScript-ийн гол давуу тал юу вэ?",
    options: [
      { id: 'a', text: "Static typing", is_correct: true },
      { id: 'b', text: "Faster execution", is_correct: false },
      { id: 'c', text: "Smaller file size", is_correct: false },
      { id: 'd', text: "No compilation needed", is_correct: false }
    ],
    default_point: 6,
    explanation: "TypeScript-ийн гол давуу тал нь static typing юм.",
    created_by: "team6"
  },
  {
    id: 22,
    category_id: 10,
    category_name: "TypeScript",
    level_id: 3,
    level_name: "Хүнд",
    type: "text_answer",
    question: "TypeScript-д interface болон type-ийн ялгаа юу вэ?",
    sample_answer: "Interface нь extend болон merge хийх боломжтой, type нь union болон intersection type үүсгэх боломжтой.",
    keywords: ["interface", "type", "extend", "merge"],
    default_point: 10,
    explanation: "Interface болон type нь өөр өөр зорилготой.",
    created_by: "team6"
  },

  // Vue.js Questions
  {
    id: 23,
    category_id: 11,
    category_name: "Vue.js",
    level_id: 1,
    level_name: "Хялбар",
    type: "single_choice",
    question: "Vue.js-д data-г хэрхэн тодорхойлох вэ?",
    options: [
      { id: 'a', text: "data() function", is_correct: true },
      { id: 'b', text: "data: object", is_correct: false },
      { id: 'c', text: "const data = {}", is_correct: false },
      { id: 'd', text: "export data", is_correct: false }
    ],
    default_point: 5,
    explanation: "Vue.js-д data нь function байх ёстой.",
    created_by: "team6"
  },
  {
    id: 24,
    category_id: 11,
    category_name: "Vue.js",
    level_id: 2,
    level_name: "Дунд",
    type: "multiple_choice",
    question: "Vue.js-ийн lifecycle hooks аль нь вэ? (Олон хариулт сонгоно)",
    options: [
      { id: 'a', text: "created", is_correct: true },
      { id: 'b', text: "mounted", is_correct: true },
      { id: 'c', text: "updated", is_correct: true },
      { id: 'd', text: "destroyed", is_correct: true }
    ],
    default_point: 10,
    explanation: "Vue.js-д олон lifecycle hooks байдаг.",
    created_by: "team6"
  },

  // MongoDB Questions
  {
    id: 25,
    category_id: 13,
    category_name: "MongoDB",
    level_id: 2,
    level_name: "Дунд",
    type: "single_choice",
    question: "MongoDB нь ямар төрлийн database вэ?",
    options: [
      { id: 'a', text: "Relational Database", is_correct: false },
      { id: 'b', text: "NoSQL Document Database", is_correct: true },
      { id: 'c', text: "Graph Database", is_correct: false },
      { id: 'd', text: "Key-Value Database", is_correct: false }
    ],
    default_point: 6,
    explanation: "MongoDB нь NoSQL document database юм.",
    created_by: "team6"
  },
  {
    id: 26,
    category_id: 13,
    category_name: "MongoDB",
    level_id: 3,
    level_name: "Хүнд",
    type: "text_answer",
    question: "MongoDB-д aggregation pipeline-ийн үүрэг юу вэ?",
    sample_answer: "Aggregation pipeline нь өгөгдлийг дамжуулж боловсруулах, шүүх, бүлэглэх зэрэг үйлдлүүдийг хийхэд ашиглана.",
    keywords: ["aggregation", "pipeline", "боловсруулах", "шүүх"],
    default_point: 10,
    explanation: "Aggregation pipeline нь өгөгдөл боловсруулахад ашиглана.",
    created_by: "team6"
  },

  // Algorithms Questions
  {
    id: 27,
    category_id: 17,
    category_name: "Algorithms",
    level_id: 2,
    level_name: "Дунд",
    type: "number_answer",
    question: "Binary search algorithm-ийн time complexity юу вэ? (Big O notation-д)",
    correct_answer: "O(log n)",
    number_range: null,
    default_point: 8,
    explanation: "Binary search нь O(log n) time complexity-тай.",
    created_by: "team6"
  },
  {
    id: 28,
    category_id: 17,
    category_name: "Algorithms",
    level_id: 3,
    level_name: "Хүнд",
    type: "ordering",
    question: "Quick sort algorithm-ийн дарааллыг зөв байрлуулна уу:",
    items: [
      { id: 1, text: "Choose pivot", correct_order: 1 },
      { id: 2, text: "Partition array", correct_order: 2 },
      { id: 3, text: "Recursively sort left", correct_order: 3 },
      { id: 4, text: "Recursively sort right", correct_order: 4 }
    ],
    default_point: 12,
    explanation: "Quick sort: pivot сонгох → partition → recursive sort.",
    created_by: "team6"
  },

  // Data Structures Questions
  {
    id: 29,
    category_id: 18,
    category_name: "Data Structures",
    level_id: 2,
    level_name: "Дунд",
    type: "matching",
    question: "Өгөгдлийн бүтцийг түүний онцлогтой нь харгалзуулна уу:",
    pairs: [
      { id: 1, left: "Stack", right: "LIFO (Last In First Out)", correct_match: "A" },
      { id: 2, left: "Queue", right: "FIFO (First In First Out)", correct_match: "B" },
      { id: 3, left: "Tree", right: "Hierarchical structure", correct_match: "C" },
      { id: 4, left: "Graph", right: "Nodes and edges", correct_match: "D" }
    ],
    default_point: 12,
    explanation: "Өөр өөр өгөгдлийн бүтэц өөр өөр онцлогтой.",
    created_by: "team6"
  },
  {
    id: 30,
    category_id: 18,
    category_name: "Data Structures",
    level_id: 1,
    level_name: "Хялбар",
    type: "true_false",
    question: "Array нь dynamic size-тай байж болно.",
    correct_answer: true,
    default_point: 5,
    explanation: "Зарим хэл дээр array dynamic size-тай байж болно.",
    created_by: "team6"
  },

  // Docker Questions
  {
    id: 31,
    category_id: 15,
    category_name: "Docker",
    level_id: 2,
    level_name: "Дунд",
    type: "single_choice",
    question: "Docker container-ийг яаж ажиллуулах вэ?",
    options: [
      { id: 'a', text: "docker run", is_correct: true },
      { id: 'b', text: "docker start", is_correct: false },
      { id: 'c', text: "docker execute", is_correct: false },
      { id: 'd', text: "docker launch", is_correct: false }
    ],
    default_point: 6,
    explanation: "docker run командаар container ажиллуулна.",
    created_by: "team6"
  },
  {
    id: 32,
    category_id: 15,
    category_name: "Docker",
    level_id: 3,
    level_name: "Хүнд",
    type: "text_answer",
    question: "Dockerfile болон Docker image-ийн ялгаа юу вэ?",
    sample_answer: "Dockerfile нь image үүсгэх зааварчилгаа агуулсан файл, image нь container үүсгэхэд ашиглах executable package.",
    keywords: ["dockerfile", "image", "container", "зааварчилгаа"],
    default_point: 10,
    explanation: "Dockerfile нь image үүсгэх заавар, image нь executable package.",
    created_by: "team6"
  },

  // Git Questions
  {
    id: 33,
    category_id: 5,
    category_name: "Git",
    level_id: 1,
    level_name: "Хялбар",
    type: "single_choice",
    question: "Git-д commit хийх командад юу вэ?",
    options: [
      { id: 'a', text: "git commit", is_correct: true },
      { id: 'b', text: "git save", is_correct: false },
      { id: 'c', text: "git push", is_correct: false },
      { id: 'd', text: "git store", is_correct: false }
    ],
    default_point: 5,
    explanation: "git commit командаар commit хийнэ.",
    created_by: "team6"
  },
  {
    id: 34,
    category_id: 5,
    category_name: "Git",
    level_id: 2,
    level_name: "Дунд",
    type: "fill_blank",
    question: "Git-д branch үүсгэх: git _____ branch-name",
    blanks: [
      { id: 1, correct_answers: ["checkout", "checkout -b", "branch"] }
    ],
    default_point: 6,
    explanation: "git checkout -b branch-name командаар branch үүсгэнэ.",
    created_by: "team6"
  },

  // PostgreSQL Questions
  {
    id: 35,
    category_id: 14,
    category_name: "PostgreSQL",
    level_id: 2,
    level_name: "Дунд",
    type: "single_choice",
    question: "PostgreSQL нь ямар төрлийн database вэ?",
    options: [
      { id: 'a', text: "NoSQL Database", is_correct: false },
      { id: 'b', text: "Relational Database", is_correct: true },
      { id: 'c', text: "Document Database", is_correct: false },
      { id: 'd', text: "Graph Database", is_correct: false }
    ],
    default_point: 6,
    explanation: "PostgreSQL нь relational database юм.",
    created_by: "team6"
  },
  {
    id: 36,
    category_id: 14,
    category_name: "PostgreSQL",
    level_id: 3,
    level_name: "Хүнд",
    type: "text_answer",
    question: "SQL-д JOIN-ийн төрлүүд юу вэ?",
    sample_answer: "INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN зэрэг төрлүүд байна.",
    keywords: ["join", "inner", "left", "right", "outer"],
    default_point: 10,
    explanation: "SQL-д олон төрлийн JOIN байдаг.",
    created_by: "team6"
  }
];

// ========================
// 2. ШАЛГАЛТЫН ТОХИРГОО
// ========================

export const examConfigs = [
  {
    id: 1,
    name: "Дунд шалгалт",
    description: "React болон Node.js сэдвийн дунд шалгалт",
    rules: [
      {
        category_id: 1,
        category_name: "React",
        level_id: 1,
        level_name: "Хялбар",
        type: "single_choice",
        count: 2 // 2 асуулт авна
      },
      {
        category_id: 1,
        category_name: "React",
        level_id: 2,
        level_name: "Дунд",
        type: "multiple_choice",
        count: 1
      },
      {
        category_id: 2,
        category_name: "Node.js",
        level_id: 1,
        level_name: "Хялбар",
        type: "true_false",
        count: 1
      },
      {
        category_id: 2,
        category_name: "Node.js",
        level_id: 2,
        level_name: "Дунд",
        type: "text_answer",
        count: 1
      }
    ]
  }
];

// ========================
// 3. ШАЛГАЛТ
// ========================

// Helper function to get dates relative to today
const getDateString = (daysOffset, hour = 10) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour, 0, 0, 0);
  // Return full ISO string to ensure proper timezone handling
  return date.toISOString();
};

export const exams = [
  {
    id: 1,
    course_id: 1,
    name: "Веб хөгжүүлэлтийн үндэс",
    description: "React, JavaScript, HTML/CSS сэдвийн дунд шалгалт. Олон төрлийн асуултууд багтсан.",
    // Active exam - started yesterday, closes tomorrow
    start_date: getDateString(-1, 10),
    close_date: getDateString(1, 18),
    duration: 60,
    max_attempt: 3,
    is_shuffled: true,
    show_result_after: true,
    show_correct_answer: true,
    total_score: 100,
    course_grade_contribution: 30,
    created_by: 4,
    created_at: "2025-02-01"
  },
  {
    id: 2,
    course_id: 1,
    name: "Програмчлалын хэлүүд",
    description: "Python, Java, JavaScript, TypeScript сэдвийн шалгалт. Зураг, текст, тоон хариулт зэрэг олон төрөл.",
    // Upcoming exam - starts in 3 days
    start_date: getDateString(3, 9),
    close_date: getDateString(4, 11),
    duration: 75,
    max_attempt: 2,
    is_shuffled: true,
    show_result_after: true,
    show_correct_answer: true,
    total_score: 100,
    course_grade_contribution: 25,
    created_by: 4,
    created_at: "2025-03-15"
  },
  {
    id: 3,
    course_id: 1,
    name: "Өгөгдлийн сан ба Алгоритм",
    description: "MongoDB, PostgreSQL, Algorithms, Data Structures сэдвийн эцсийн шалгалт. Харгалзуулах, дараалал зэрэг асуултууд.",
    // Upcoming exam - starts in 7 days
    start_date: getDateString(7, 9),
    close_date: getDateString(8, 12),
    duration: 90,
    max_attempt: 1,
    is_shuffled: true,
    show_result_after: true,
    show_correct_answer: false,
    total_score: 100,
    course_grade_contribution: 40,
    created_by: 4,
    created_at: "2025-04-01"
  }
];

// ========================
// 4. ШАЛГАЛТ ДАХЬ АСУУЛТУУД
// ========================

export const examQuestions = [
  // Шалгалт 1: Веб хөгжүүлэлтийн үндэс (8 асуулт)
  { id: 1, exam_id: 1, question_id: 1, point: 5, order: 1 }, // React single choice
  { id: 2, exam_id: 1, question_id: 2, point: 10, order: 2 }, // React multiple choice
  { id: 3, exam_id: 1, question_id: 3, point: 5, order: 3 }, // React true/false
  { id: 4, exam_id: 1, question_id: 5, point: 8, order: 4 }, // React fill blank
  { id: 5, exam_id: 1, question_id: 4, point: 10, order: 5 }, // Node.js text answer
  { id: 6, exam_id: 1, question_id: 11, point: 6, order: 6 }, // JavaScript single choice
  { id: 7, exam_id: 1, question_id: 12, point: 8, order: 7 }, // JavaScript multiple choice
  { id: 8, exam_id: 1, question_id: 19, point: 8, order: 8 }, // HTML/CSS image question
  
  // Шалгалт 2: Програмчлалын хэлүүд (10 асуулт)
  { id: 9, exam_id: 2, question_id: 14, point: 5, order: 1 }, // Python single choice
  { id: 10, exam_id: 2, question_id: 15, point: 10, order: 2 }, // Python text answer
  { id: 11, exam_id: 2, question_id: 16, point: 10, order: 3 }, // Python fill blank
  { id: 12, exam_id: 2, question_id: 17, point: 5, order: 4 }, // Java true/false
  { id: 13, exam_id: 2, question_id: 18, point: 12, order: 5 }, // Java matching
  { id: 14, exam_id: 2, question_id: 13, point: 6, order: 6 }, // JavaScript number answer
  { id: 15, exam_id: 2, question_id: 21, point: 6, order: 7 }, // TypeScript single choice
  { id: 16, exam_id: 2, question_id: 22, point: 10, order: 8 }, // TypeScript text answer
  { id: 17, exam_id: 2, question_id: 23, point: 5, order: 9 }, // Vue.js single choice
  { id: 18, exam_id: 2, question_id: 24, point: 10, order: 10 }, // Vue.js multiple choice
  
  // Шалгалт 3: Өгөгдлийн сан ба Алгоритм (9 асуулт)
  { id: 19, exam_id: 3, question_id: 25, point: 6, order: 1 }, // MongoDB single choice
  { id: 20, exam_id: 3, question_id: 26, point: 10, order: 2 }, // MongoDB text answer
  { id: 21, exam_id: 3, question_id: 35, point: 6, order: 3 }, // PostgreSQL single choice
  { id: 22, exam_id: 3, question_id: 36, point: 10, order: 4 }, // PostgreSQL text answer
  { id: 23, exam_id: 3, question_id: 27, point: 8, order: 5 }, // Algorithms number answer
  { id: 24, exam_id: 3, question_id: 28, point: 12, order: 6 }, // Algorithms ordering
  { id: 25, exam_id: 3, question_id: 29, point: 12, order: 7 }, // Data Structures matching
  { id: 26, exam_id: 3, question_id: 30, point: 5, order: 8 }, // Data Structures true/false
  { id: 27, exam_id: 3, question_id: 6, point: 12, order: 9 } // Node.js matching
];

// ========================
// 5. ОЮУТНЫ ХАРИУЛТ
// ========================

export const studentSubmissions = [
  {
    id: 1,
    exam_id: 1,
    student_id: 5,
    start_time: "2025-03-15T10:05:00",
    submit_time: "2025-03-15T10:45:00",
    status: "submitted",
    answers: [
      {
        question_id: 1,
        question_type: "single_choice",
        answer: 'a',
        is_correct: true,
        point_earned: 5,
        point_possible: 5
      },
      {
        question_id: 2,
        question_type: "multiple_choice",
        answer: ['a', 'b'],
        is_correct: false,
        point_earned: 6,
        point_possible: 10
      },
      {
        question_id: 3,
        question_type: "true_false",
        answer: true,
        is_correct: true,
        point_earned: 5,
        point_possible: 5
      },
      {
        question_id: 4,
        question_type: "text_answer",
        answer: "Package.json файл нь төслийн dependencies болон бусад тохиргоог хадгална",
        is_correct: true,
        point_earned: 8,
        point_possible: 10,
        teacher_comment: "Сайн хариулт. Гэхдээ дэлгэрэнгүй бичих байсан."
      },
      {
        question_id: 5,
        question_type: "fill_blank",
        answer: ["function", "class"],
        is_correct: true,
        point_earned: 8,
        point_possible: 8
      },
      {
        question_id: 11,
        question_type: "single_choice",
        answer: 'b',
        is_correct: true,
        point_earned: 6,
        point_possible: 6
      },
      {
        question_id: 12,
        question_type: "multiple_choice",
        answer: ['a', 'b', 'c', 'd'],
        is_correct: true,
        point_earned: 8,
        point_possible: 8
      },
      {
        question_id: 19,
        question_type: "image_question",
        answer: 'b',
        is_correct: true,
        point_earned: 8,
        point_possible: 8
      }
    ],
    total_earned: 54,
    total_possible: 60,
    grade_point: 90.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:00:00"
  },
  {
    id: 2,
    exam_id: 1,
    student_id: 6,
    start_time: "2025-03-15T10:10:00",
    submit_time: "2025-03-15T10:50:00",
    status: "submitted",
    answers: [
      {
        question_id: 1,
        question_type: "single_choice",
        answer: 'a',
        is_correct: true,
        point_earned: 5,
        point_possible: 5
      },
      {
        question_id: 2,
        question_type: "multiple_choice",
        answer: ['a', 'b', 'd'],
        is_correct: true,
        point_earned: 10,
        point_possible: 10
      },
      {
        question_id: 3,
        question_type: "true_false",
        answer: false,
        is_correct: false,
        point_earned: 0,
        point_possible: 5
      },
      {
        question_id: 4,
        question_type: "text_answer",
        answer: "Package.json файл нь төслийн мэдээлэл агуулна",
        is_correct: true,
        point_earned: 9,
        point_possible: 10
      },
      {
        question_id: 5,
        question_type: "fill_blank",
        answer: ["function"],
        is_correct: false,
        point_earned: 4,
        point_possible: 8
      },
      {
        question_id: 11,
        question_type: "single_choice",
        answer: 'a',
        is_correct: false,
        point_earned: 0,
        point_possible: 6
      },
      {
        question_id: 12,
        question_type: "multiple_choice",
        answer: ['a', 'b'],
        is_correct: false,
        point_earned: 4,
        point_possible: 8
      },
      {
        question_id: 19,
        question_type: "image_question",
        answer: 'a',
        is_correct: false,
        point_earned: 0,
        point_possible: 8
      }
    ],
    total_earned: 36,
    total_possible: 60,
    grade_point: 60.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:05:00"
  },
  {
    id: 3,
    exam_id: 1,
    student_id: 7,
    start_time: "2025-03-15T10:15:00",
    submit_time: "2025-03-15T10:55:00",
    status: "submitted",
    answers: [
      {
        question_id: 1,
        question_type: "single_choice",
        answer: 'b',
        is_correct: false,
        point_earned: 0,
        point_possible: 5
      },
      {
        question_id: 2,
        question_type: "multiple_choice",
        answer: ['a'],
        is_correct: false,
        point_earned: 0,
        point_possible: 10
      },
      {
        question_id: 3,
        question_type: "true_false",
        answer: true,
        is_correct: true,
        point_earned: 5,
        point_possible: 5
      },
      {
        question_id: 4,
        question_type: "text_answer",
        answer: "Файл",
        is_correct: false,
        point_earned: 2,
        point_possible: 10
      },
      {
        question_id: 5,
        question_type: "fill_blank",
        answer: ["class"],
        is_correct: false,
        point_earned: 4,
        point_possible: 8
      },
      {
        question_id: 11,
        question_type: "single_choice",
        answer: 'b',
        is_correct: true,
        point_earned: 6,
        point_possible: 6
      },
      {
        question_id: 12,
        question_type: "multiple_choice",
        answer: ['a', 'b', 'c'],
        is_correct: false,
        point_earned: 6,
        point_possible: 8
      },
      {
        question_id: 19,
        question_type: "image_question",
        answer: 'c',
        is_correct: false,
        point_earned: 0,
        point_possible: 8
      }
    ],
    total_earned: 23,
    total_possible: 60,
    grade_point: 38.3,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:10:00"
  },
  {
    id: 4,
    exam_id: 1,
    student_id: 8,
    start_time: "2025-03-15T10:20:00",
    submit_time: "2025-03-15T11:00:00",
    status: "submitted",
    answers: [
      {
        question_id: 1,
        question_type: "single_choice",
        answer: 'a',
        is_correct: true,
        point_earned: 5,
        point_possible: 5
      },
      {
        question_id: 2,
        question_type: "multiple_choice",
        answer: ['a', 'b', 'd'],
        is_correct: true,
        point_earned: 10,
        point_possible: 10
      },
      {
        question_id: 3,
        question_type: "true_false",
        answer: true,
        is_correct: true,
        point_earned: 5,
        point_possible: 5
      },
      {
        question_id: 4,
        question_type: "text_answer",
        answer: "Package.json файл нь төслийн мэдээлэл, dependencies, scripts зэрэг тохиргоог агуулна",
        is_correct: true,
        point_earned: 10,
        point_possible: 10
      },
      {
        question_id: 5,
        question_type: "fill_blank",
        answer: ["function", "class"],
        is_correct: true,
        point_earned: 8,
        point_possible: 8
      },
      {
        question_id: 11,
        question_type: "single_choice",
        answer: 'b',
        is_correct: true,
        point_earned: 6,
        point_possible: 6
      },
      {
        question_id: 12,
        question_type: "multiple_choice",
        answer: ['a', 'b', 'c', 'd'],
        is_correct: true,
        point_earned: 8,
        point_possible: 8
      },
      {
        question_id: 19,
        question_type: "image_question",
        answer: 'b',
        is_correct: true,
        point_earned: 8,
        point_possible: 8
      }
    ],
    total_earned: 60,
    total_possible: 60,
    grade_point: 100.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:15:00"
  },
  // Additional submissions for exam 1 (students 9-28 = 20 more students)
  {
    id: 5,
    exam_id: 1,
    student_id: 9,
    start_time: "2025-03-15T10:25:00",
    submit_time: "2025-03-15T11:05:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл агуулна", is_correct: true, point_earned: 7, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c'], is_correct: false, point_earned: 6, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 55,
    total_possible: 60,
    grade_point: 91.7,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:20:00"
  },
  {
    id: 6,
    exam_id: 1,
    student_id: 10,
    start_time: "2025-03-15T10:30:00",
    submit_time: "2025-03-15T11:10:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b'], is_correct: false, point_earned: 6, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: false, is_correct: false, point_earned: 0, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Файл", is_correct: false, point_earned: 3, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function"], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'a', is_correct: false, point_earned: 0, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a'], is_correct: false, point_earned: 2, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'c', is_correct: false, point_earned: 0, point_possible: 8 }
    ],
    total_earned: 20,
    total_possible: 60,
    grade_point: 33.3,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:25:00"
  },
  {
    id: 7,
    exam_id: 1,
    student_id: 11,
    start_time: "2025-03-15T10:35:00",
    submit_time: "2025-03-15T11:15:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл, dependencies, scripts зэрэг тохиргоог агуулна", is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c', 'd'], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 60,
    total_possible: 60,
    grade_point: 100.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:30:00"
  },
  {
    id: 8,
    exam_id: 1,
    student_id: 12,
    start_time: "2025-03-15T10:40:00",
    submit_time: "2025-03-15T11:20:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл агуулна", is_correct: true, point_earned: 8, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c', 'd'], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'a', is_correct: false, point_earned: 0, point_possible: 8 }
    ],
    total_earned: 50,
    total_possible: 60,
    grade_point: 83.3,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:35:00"
  },
  {
    id: 9,
    exam_id: 1,
    student_id: 13,
    start_time: "2025-03-15T10:45:00",
    submit_time: "2025-03-15T11:25:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'b', is_correct: false, point_earned: 0, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a'], is_correct: false, point_earned: 0, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Файл", is_correct: false, point_earned: 2, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["class"], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b'], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'c', is_correct: false, point_earned: 0, point_possible: 8 }
    ],
    total_earned: 21,
    total_possible: 60,
    grade_point: 35.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:40:00"
  },
  {
    id: 10,
    exam_id: 1,
    student_id: 14,
    start_time: "2025-03-15T10:50:00",
    submit_time: "2025-03-15T11:30:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл агуулна", is_correct: true, point_earned: 9, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c', 'd'], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 59,
    total_possible: 60,
    grade_point: 98.3,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:45:00"
  },
  {
    id: 11,
    exam_id: 1,
    student_id: 15,
    start_time: "2025-03-15T10:55:00",
    submit_time: "2025-03-15T11:35:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b'], is_correct: false, point_earned: 6, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: false, is_correct: false, point_earned: 0, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл", is_correct: false, point_earned: 4, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function"], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'a', is_correct: false, point_earned: 0, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b'], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'a', is_correct: false, point_earned: 0, point_possible: 8 }
    ],
    total_earned: 23,
    total_possible: 60,
    grade_point: 38.3,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:50:00"
  },
  {
    id: 12,
    exam_id: 1,
    student_id: 16,
    start_time: "2025-03-15T11:00:00",
    submit_time: "2025-03-15T11:40:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл, dependencies, scripts зэрэг тохиргоог агуулна", is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c', 'd'], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 60,
    total_possible: 60,
    grade_point: 100.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:55:00"
  },
  {
    id: 13,
    exam_id: 1,
    student_id: 17,
    start_time: "2025-03-15T11:05:00",
    submit_time: "2025-03-15T11:45:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл агуулна", is_correct: true, point_earned: 8, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c'], is_correct: false, point_earned: 6, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 56,
    total_possible: 60,
    grade_point: 93.3,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T15:00:00"
  },
  {
    id: 14,
    exam_id: 1,
    student_id: 18,
    start_time: "2025-03-15T11:10:00",
    submit_time: "2025-03-15T11:50:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'b', is_correct: false, point_earned: 0, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a'], is_correct: false, point_earned: 0, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: false, is_correct: false, point_earned: 0, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Файл", is_correct: false, point_earned: 1, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["class"], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'a', is_correct: false, point_earned: 0, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a'], is_correct: false, point_earned: 2, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'c', is_correct: false, point_earned: 0, point_possible: 8 }
    ],
    total_earned: 7,
    total_possible: 60,
    grade_point: 11.7,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T15:05:00"
  },
  {
    id: 15,
    exam_id: 1,
    student_id: 19,
    start_time: "2025-03-15T11:15:00",
    submit_time: "2025-03-15T11:55:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл агуулна", is_correct: true, point_earned: 9, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c', 'd'], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 59,
    total_possible: 60,
    grade_point: 98.3,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T15:10:00"
  },
  {
    id: 16,
    exam_id: 1,
    student_id: 20,
    start_time: "2025-03-15T11:20:00",
    submit_time: "2025-03-15T12:00:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b'], is_correct: false, point_earned: 6, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл агуулна", is_correct: true, point_earned: 7, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function"], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c'], is_correct: false, point_earned: 6, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 47,
    total_possible: 60,
    grade_point: 78.3,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T15:15:00"
  },
  {
    id: 17,
    exam_id: 1,
    student_id: 21,
    start_time: "2025-03-15T11:25:00",
    submit_time: "2025-03-15T12:05:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл, dependencies, scripts зэрэг тохиргоог агуулна", is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c', 'd'], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 60,
    total_possible: 60,
    grade_point: 100.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T15:20:00"
  },
  {
    id: 18,
    exam_id: 1,
    student_id: 22,
    start_time: "2025-03-15T11:30:00",
    submit_time: "2025-03-15T12:10:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b'], is_correct: false, point_earned: 6, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: false, is_correct: false, point_earned: 0, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл", is_correct: false, point_earned: 5, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function"], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'a', is_correct: false, point_earned: 0, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b'], is_correct: false, point_earned: 4, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'a', is_correct: false, point_earned: 0, point_possible: 8 }
    ],
    total_earned: 24,
    total_possible: 60,
    grade_point: 40.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T15:25:00"
  },
  {
    id: 19,
    exam_id: 1,
    student_id: 23,
    start_time: "2025-03-15T11:35:00",
    submit_time: "2025-03-15T12:15:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл агуулна", is_correct: true, point_earned: 8, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c', 'd'], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 58,
    total_possible: 60,
    grade_point: 96.7,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T15:30:00"
  },
  {
    id: 20,
    exam_id: 1,
    student_id: 24,
    start_time: "2025-03-15T11:40:00",
    submit_time: "2025-03-15T12:20:00",
    status: "submitted",
    answers: [
      { question_id: 1, question_type: "single_choice", answer: 'a', is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 2, question_type: "multiple_choice", answer: ['a', 'b', 'd'], is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 3, question_type: "true_false", answer: true, is_correct: true, point_earned: 5, point_possible: 5 },
      { question_id: 4, question_type: "text_answer", answer: "Package.json файл нь төслийн мэдээлэл, dependencies, scripts зэрэг тохиргоог агуулна", is_correct: true, point_earned: 10, point_possible: 10 },
      { question_id: 5, question_type: "fill_blank", answer: ["function", "class"], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 11, question_type: "single_choice", answer: 'b', is_correct: true, point_earned: 6, point_possible: 6 },
      { question_id: 12, question_type: "multiple_choice", answer: ['a', 'b', 'c', 'd'], is_correct: true, point_earned: 8, point_possible: 8 },
      { question_id: 19, question_type: "image_question", answer: 'b', is_correct: true, point_earned: 8, point_possible: 8 }
    ],
    total_earned: 60,
    total_possible: 60,
    grade_point: 100.0,
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T15:35:00"
  }
];

// ========================
// 6. ТУСЛАХ ӨГӨГДӨЛ
// ========================

export const categories = [
  { id: 1, name: "React", color: "#61DAFB" },
  { id: 2, name: "Node.js", color: "#339933" },
  { id: 3, name: "Database", color: "#4479A1" },
  { id: 4, name: "HTML/CSS", color: "#E34F26" },
  { id: 5, name: "Git", color: "#F05032" },
  { id: 6, name: "JavaScript", color: "#F7DF1E" },
  { id: 7, name: "Python", color: "#3776AB" },
  { id: 8, name: "Java", color: "#ED8B00" },
  { id: 9, name: "C++", color: "#00599C" },
  { id: 10, name: "TypeScript", color: "#3178C6" },
  { id: 11, name: "Vue.js", color: "#4FC08D" },
  { id: 12, name: "Angular", color: "#DD0031" },
  { id: 13, name: "MongoDB", color: "#47A248" },
  { id: 14, name: "PostgreSQL", color: "#336791" },
  { id: 15, name: "Docker", color: "#2496ED" },
  { id: 16, name: "AWS", color: "#FF9900" },
  { id: 17, name: "Algorithms", color: "#FF6B6B" },
  { id: 18, name: "Data Structures", color: "#4ECDC4" }
];

export const levels = [
  { id: 1, name: "Хялбар", color: "green", min_point: 5, max_point: 8 },
  { id: 2, name: "Дунд", color: "yellow", min_point: 8, max_point: 12 },
  { id: 3, name: "Хүнд", color: "red", min_point: 12, max_point: 20 }
];

export const questionTypes = [
  { value: "single_choice", label: "Нэг хувилбар", icon: "⭕" },
  { value: "multiple_choice", label: "Олон хувилбар", icon: "☑️" },
  { value: "true_false", label: "Үнэн/Худал", icon: "✓✗" },
  { value: "text_answer", label: "Нээлттэй хариулт", icon: "📝" },
  { value: "fill_blank", label: "Хоосон нөхөх", icon: "___" },
  { value: "matching", label: "Харгалзуулах", icon: "↔️" },
  { value: "ordering", label: "Дараалал", icon: "🔢" },
  { value: "number_answer", label: "Тоон хариулт", icon: "🔢" },
  { value: "image_question", label: "Зураг бүхий", icon: "🖼️" }
];

export const users = [
  { id: 1, email: "admin@must.edu.mn", password: "123", first_name: "Админ", role: "admin" },
  { id: 2, email: "user@must.edu.mn", password: "123", first_name: "Хэрэглэгч", role: "user" },
  { id: 3, email: "schooladmin@must.edu.mn", password: "123", first_name: "Сургуулийн Админ", role: "school_admin" },
  { id: 4, email: "schoolteacher@must.edu.mn", password: "123teacher", first_name: "Багш", role: "teacher" },
  { id: 5, email: "schoolstudent@must.edu.mn", password: "123", first_name: "Оюутан", role: "student" },
  { id: 6, email: "student1@must.edu.mn", password: "123", first_name: "Оюутан 1", role: "student" },
  { id: 7, email: "student2@must.edu.mn", password: "123", first_name: "Оюутан 2", role: "student" },
  { id: 8, email: "student3@must.edu.mn", password: "123", first_name: "Оюутан 3", role: "student" },
  { id: 9, email: "student4@must.edu.mn", password: "123", first_name: "Оюутан 4", role: "student" },
  { id: 10, email: "student5@must.edu.mn", password: "123", first_name: "Оюутан 5", role: "student" },
  { id: 11, email: "student6@must.edu.mn", password: "123", first_name: "Оюутан 6", role: "student" },
  { id: 12, email: "student7@must.edu.mn", password: "123", first_name: "Оюутан 7", role: "student" },
  { id: 13, email: "student8@must.edu.mn", password: "123", first_name: "Оюутан 8", role: "student" },
  { id: 14, email: "student9@must.edu.mn", password: "123", first_name: "Оюутан 9", role: "student" },
  { id: 15, email: "student10@must.edu.mn", password: "123", first_name: "Оюутан 10", role: "student" },
  { id: 16, email: "student11@must.edu.mn", password: "123", first_name: "Оюутан 11", role: "student" },
  { id: 17, email: "student12@must.edu.mn", password: "123", first_name: "Оюутан 12", role: "student" },
  { id: 18, email: "student13@must.edu.mn", password: "123", first_name: "Оюутан 13", role: "student" },
  { id: 19, email: "student14@must.edu.mn", password: "123", first_name: "Оюутан 14", role: "student" },
  { id: 20, email: "student15@must.edu.mn", password: "123", first_name: "Оюутан 15", role: "student" },
  { id: 21, email: "student16@must.edu.mn", password: "123", first_name: "Оюутан 16", role: "student" },
  { id: 22, email: "student17@must.edu.mn", password: "123", first_name: "Оюутан 17", role: "student" },
  { id: 23, email: "student18@must.edu.mn", password: "123", first_name: "Оюутан 18", role: "student" },
  { id: 24, email: "student19@must.edu.mn", password: "123", first_name: "Оюутан 19", role: "student" },
  { id: 25, email: "student20@must.edu.mn", password: "123", first_name: "Оюутан 20", role: "student" },
  { id: 26, email: "student21@must.edu.mn", password: "123", first_name: "Оюутан 21", role: "student" },
  { id: 27, email: "student22@must.edu.mn", password: "123", first_name: "Оюутан 22", role: "student" },
  { id: 28, email: "student23@must.edu.mn", password: "123", first_name: "Оюутан 23", role: "student" },
  { id: 29, email: "student24@must.edu.mn", password: "123", first_name: "Оюутан 24", role: "student" },
  { id: 30, email: "student25@must.edu.mn", password: "123", first_name: "Оюутан 25", role: "student" }
];

export const courses = [
  {
    id: 1,
    name: "Веб систем ба технологи",
    teacher_id: 4,
    start_date: "2025-01-15",
    end_date: "2025-05-30"
  },
  {
    id: 2,
    name: "Програмчлалын хэлүүд",
    teacher_id: 4,
    start_date: "2025-01-20",
    end_date: "2025-06-15"
  },
  {
    id: 3,
    name: "Өгөгдлийн сан",
    teacher_id: 4,
    start_date: "2025-02-01",
    end_date: "2025-06-30"
  },
  {
    id: 4,
    name: "Алгоритм ба Өгөгдлийн бүтэц",
    teacher_id: 4,
    start_date: "2025-02-10",
    end_date: "2025-07-15"
  }
];

// ========================
// 7. ТУСЛАХ ФУНКЦУУД
// ========================

// Асуултын сангаас шалгалт үүсгэх
export const generateExamQuestions = (rules) => {
  const selectedQuestions = [];
  
  rules.forEach(rule => {
    const matchingQuestions = questionBank.filter(q => 
      q.category_id === rule.category_id &&
      q.level_id === rule.level_id &&
      q.type === rule.type
    );
    
    // Random сонгох
    const shuffled = matchingQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, rule.count);
    selectedQuestions.push(...selected);
  });
  
  return selectedQuestions;
};

// Оноо тооцоолох - Single/Multiple choice
export const calculateChoicePoints = (question, studentAnswer) => {
  if (question.type === 'single_choice') {
    const correct = question.options.find(opt => opt.is_correct);
    return studentAnswer === correct.id;
  }
  
  if (question.type === 'multiple_choice') {
    const correctIds = question.options.filter(opt => opt.is_correct).map(opt => opt.id);
    const studentIds = Array.isArray(studentAnswer) ? studentAnswer : [studentAnswer];
    
    const correctCount = studentIds.filter(id => correctIds.includes(id)).length;
    const wrongCount = studentIds.filter(id => !correctIds.includes(id)).length;
    
    // Хэсэгчлэн оноо өгөх
    if (wrongCount > 0) return 0;
    return (correctCount / correctIds.length);
  }
  
  return false;
};

// Fill in blank шалгах
export const checkFillBlank = (question, studentAnswers) => {
  let correctCount = 0;
  question.blanks.forEach((blank, index) => {
    const studentAnswer = studentAnswers[index]?.toLowerCase().trim();
    const isCorrect = blank.correct_answers.some(ans => 
      ans.toLowerCase() === studentAnswer
    );
    if (isCorrect) correctCount++;
  });
  return correctCount / question.blanks.length;
};

// Matching шалгах
export const checkMatching = (question, studentMatches) => {
  let correctCount = 0;
  question.pairs.forEach(pair => {
    if (studentMatches[pair.id] === pair.correct_match) {
      correctCount++;
    }
  });
  return correctCount / question.pairs.length;
};

// Ordering шалгах
export const checkOrdering = (question, studentOrder) => {
  let correctCount = 0;
  question.items.forEach((item, index) => {
    if (studentOrder[index] === item.correct_order) {
      correctCount++;
    }
  });
  return correctCount / question.items.length;
};

// Нийт оноо тооцоолох
export const calculateTotalScore = (examId) => {
  const questions = examQuestions.filter(eq => eq.exam_id === examId);
  return questions.reduce((sum, q) => sum + q.point, 0);
};

// Шалгалтын оноо тооцоолох - Highest score gets full score, others calculated proportionally
export const calculateExamScores = (examId, totalScore = 100) => {
  const submissions = studentSubmissions.filter(s => s.exam_id === examId);
  if (submissions.length === 0) return [];

  // Find highest raw score
  const highestRawScore = Math.max(
    ...submissions.map(s => s.total_earned)
  );

  // Calculate adjusted scores
  return submissions.map(submission => {
    if (highestRawScore === 0) {
      return {
        ...submission,
        adjusted_score: 0,
        adjusted_grade_point: 0
      };
    }

    // Calculate proportional score
    const ratio = submission.total_earned / highestRawScore;
    const adjusted_score = Math.round(ratio * totalScore * 100) / 100;
    const adjusted_grade_point = (adjusted_score / totalScore) * 100;

    return {
      ...submission,
      adjusted_score,
      adjusted_grade_point: Math.round(adjusted_grade_point * 100) / 100
    };
  });
};

// Шалгалтын статистик
export const getExamStats = (examId) => {
  const questions = examQuestions.filter(eq => eq.exam_id === examId);
  const fullQuestions = questions.map(eq => ({
    ...eq,
    question: questionBank.find(q => q.id === eq.question_id)
  }));
  
  return {
    total_questions: questions.length,
    total_points: questions.reduce((sum, q) => sum + q.point, 0),
    by_type: questionTypes.map(type => ({
      type: type.label,
      count: fullQuestions.filter(q => q.question.type === type.value).length
    })),
    by_level: levels.map(level => ({
      level: level.name,
      count: fullQuestions.filter(q => q.question.level_id === level.id).length
    })),
    by_category: categories.map(cat => ({
      category: cat.name,
      count: fullQuestions.filter(q => q.question.category_id === cat.id).length
    }))
  };
};