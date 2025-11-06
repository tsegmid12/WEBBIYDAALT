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

export const exams = [
  {
    id: 1,
    course_id: 1,
    name: "Дунд шалгалт",
    description: "React болон Node.js сэдвийн дунд шалгалт. Нийт 5 асуулт байна.",
    start_date: "2025-03-15T10:00",
    close_date: "2025-03-15T12:00",
    duration: 60, // минут
    max_attempt: 1, // Хэдэн удаа өгч болох
    is_shuffled: true, // Асуултын дараалал холих
    show_result_after: true, // Дууссаны дараа үр дүн харуулах
    show_correct_answer: true, // Зөв хариулт харуулах
    created_by: 4,
    created_at: "2025-02-01"
  },
  {
    id: 2,
    course_id: 1,
    name: "Эцсийн шалгалт",
    description: "Бүх сэдвийн эцсийн шалгалт. 90 минут.",
    start_date: "2025-05-20T09:00",
    close_date: "2025-05-20T12:00",
    duration: 90,
    max_attempt: 1,
    is_shuffled: true,
    show_result_after: true,
    show_correct_answer: false, // Зөв хариулт харуулахгүй
    created_by: 4,
    created_at: "2025-04-01"
  }
];

// ========================
// 4. ШАЛГАЛТ ДАХЬ АСУУЛТУУД
// ========================

export const examQuestions = [
  // Шалгалт 1-ийн асуултууд
  { id: 1, exam_id: 1, question_id: 1, point: 5, order: 1 },
  { id: 2, exam_id: 1, question_id: 2, point: 10, order: 2 },
  { id: 3, exam_id: 1, question_id: 3, point: 5, order: 3 },
  { id: 4, exam_id: 1, question_id: 4, point: 10, order: 4 },
  { id: 5, exam_id: 1, question_id: 5, point: 8, order: 5 },
  
  // Шалгалт 2-ийн асуултууд
  { id: 6, exam_id: 2, question_id: 1, point: 5, order: 1 },
  { id: 7, exam_id: 2, question_id: 6, point: 12, order: 2 },
  { id: 8, exam_id: 2, question_id: 7, point: 15, order: 3 },
  { id: 9, exam_id: 2, question_id: 8, point: 10, order: 4 },
  { id: 10, exam_id: 2, question_id: 9, point: 8, order: 5 }
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
    status: "submitted", // started, in_progress, submitted
    answers: [
      {
        question_id: 1,
        question_type: "single_choice",
        answer: 'a', // Зөв хариулт
        is_correct: true,
        point_earned: 5,
        point_possible: 5
      },
      {
        question_id: 2,
        question_type: "multiple_choice",
        answer: ['a', 'b'], // useContext алдсан
        is_correct: false,
        point_earned: 6, // Хэсэгчлэн зөв
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
        is_correct: true, // Багш шалгана
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
      }
    ],
    total_earned: 32,
    total_possible: 38,
    grade_point: 84.2, // (32/38) * 100
    teacher_checked: true,
    checked_by: 4,
    checked_at: "2025-03-15T14:00:00"
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
  { id: 5, name: "Git", color: "#F05032" }
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
  { value: "ordering", label: "Дараалал", icon: "🔢" }
];

export const users = [
  { id: 1, email: "admin@must.edu.mn", password: "123", first_name: "Админ", role: "admin" },
  { id: 2, email: "user@must.edu.mn", password: "123", first_name: "Хэрэглэгч", role: "user" },
  { id: 3, email: "schooladmin@must.edu.mn", password: "123", first_name: "Сургуулийн Админ", role: "school_admin" },
  { id: 4, email: "schoolteacher@must.edu.mn", password: "123", first_name: "Багш", role: "teacher" },
  { id: 5, email: "schoolstudent@must.edu.mn", password: "123", first_name: "Оюутан", role: "student" }
];

export const courses = [
  {
    id: 1,
    name: "Веб систем ба технологи",
    teacher_id: 4,
    start_date: "2025-01-15",
    end_date: "2025-05-30"
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