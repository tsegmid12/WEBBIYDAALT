export const mockCourses = [
  {
    id: 1,
    name: "Веб Програмчлалын Үндэс",
    clone_id: null,
    picture: "https://i.pinimg.com/736x/95/8d/a3/958da3fd05dfdd51465ba25c14447be9.jpg",
    start_date: "2025-09-01",
    end_date: "2026-01-15"
  },
  {
    id: 2,
    name: "Мэдээллийн Сан",
    clone_id: null,
    picture: "https://i.pinimg.com/736x/a8/68/a5/a868a5faaa92dfb5f3e2a2b86a32ccd8.jpg",
    start_date: "2025-09-01",
    end_date: "2026-01-15"
  }
];

export const mockLessons = [
  {
    id: 101,
    course_id: 1,
    lesson_type_id: 1,
    name: "React Үндэс",
    content: "React-ын үндсэн ойлголтууд",
    point: 100,
    is_attendable: true,
    parent_id: null
  },
  {
    id: 102,
    course_id: 1,
    lesson_type_id: 1,
    name: "React Hooks",
    content: "useState, useEffect ашиглалт",
    point: 100,
    is_attendable: true,
    parent_id: 101
  },
  {
    id: 103,
    course_id: 2,
    lesson_type_id: 2,
    name: "SQL Үндэс",
    content: "SQL queries үндсэн мэдлэг",
    point: 100,
    is_attendable: true,
    parent_id: null
  }
];

export const mockUsers = [
  {
    id: 1,
    first_name: "Бат",
    last_name: "Дорж",
    father_name: "Болд",
    picture: "https://i.pinimg.com/1200x/7b/ae/7d/7bae7d85f91b70ca18bdf0cd07f16ad7.jpg",
    username: "bat.dorj",
    email: "bat.dorj@school.mn",
    role_id: 1, // Teacher
    password: "hashed_password"
  },
  {
    id: 2,
    first_name: "Сар",
    last_name: "Цэцэг",
    father_name: "Гантулга",
    picture: "https://i.pinimg.com/736x/4f/16/88/4f16884e6c034f04fd8df26d27937189.jpg",
    username: "sar.tsetseg",
    email: "sar.tsetseg@student.mn",
    role_id: 2, // Student
    password: "hashed_password"
  },
  {
    id: 3,
    first_name: "Болд",
    last_name: "Эрдэнэ",
    father_name: "Баяр",
    picture: "https://i.pinimg.com/736x/4f/16/88/4f16884e6c034f04fd8df26d27937189.jpg",
    username: "bold.erdene",
    email: "bold.erdene@student.mn",
    role_id: 2,
    password: "hashed_password"
  },
  {
    id: 4,
    first_name: "Номин",
    last_name: "Төмөр",
    father_name: "Цэнд",
    picture: "https://i.pinimg.com/736x/4f/16/88/4f16884e6c034f04fd8df26d27937189.jpg",
    username: "nomin.tumor",
    email: "nomin.tumor@student.mn",
    role_id: 2,
    password: "hashed_password"
  }
];

export const mockSubmissions = [
  {
    id: 1,
    lesson_id: 101,
    user_id: 2,
    content: "React компонент үүсгэх үндсэн ойлголтыг судалж, Counter app хийлээ.",
    file_url: "https://example.com/files/submission_1.zip",
    grade_point: 85,
    status: "graded", // pending, submitted, graded
    created_at: "2025-11-10T10:30:00Z",
    updated_at: "2025-11-11T14:20:00Z",
    graded_at: "2025-11-11T14:20:00Z",
    teacher_comment: "Сайн ажил! Гэхдээ useEffect-ийг илүү сайн ашиглах хэрэгтэй."
  },
  {
    id: 2,
    lesson_id: 101,
    user_id: 3,
    content: "React-н props болон state-ийг ашиглан TODO list үүсгэлээ.",
    file_url: "https://example.com/files/submission_2.zip",
    grade_point: 95,
    status: "graded",
    created_at: "2025-11-10T11:15:00Z",
    updated_at: "2025-11-11T15:00:00Z",
    graded_at: "2025-11-11T15:00:00Z",
    teacher_comment: "Маш сайн! Код цэвэрхэн, ойлгомжтой бичигдсэн."
  },
  {
    id: 3,
    lesson_id: 102,
    user_id: 2,
    content: "useState болон useEffect hooks-г ашиглан API дуудах жишээ хийлээ.",
    file_url: null,
    grade_point: null,
    status: "submitted",
    created_at: "2025-11-12T09:00:00Z",
    updated_at: "2025-11-12T09:00:00Z",
    graded_at: null,
    teacher_comment: null
  },
  {
    id: 4,
    lesson_id: 102,
    user_id: 4,
    content: "Custom hook үүсгэж, form validation хийлээ.",
    file_url: "https://example.com/files/submission_4.zip",
    grade_point: null,
    status: "submitted",
    created_at: "2025-11-12T10:30:00Z",
    updated_at: "2025-11-12T10:30:00Z",
    graded_at: null,
    teacher_comment: null
  },
  {
    id: 5,
    lesson_id: 103,
    user_id: 3,
    content: "SQL JOIN queries ашиглан database-с мэдээлэл татах даалгавар.",
    file_url: "https://example.com/files/submission_5.sql",
    grade_point: 78,
    status: "graded",
    created_at: "2025-11-11T14:00:00Z",
    updated_at: "2025-11-12T11:00:00Z",
    graded_at: "2025-11-12T11:00:00Z",
    teacher_comment: "LEFT JOIN-г зөв ашигласан. INNER JOIN талаараа илүү сурах хэрэгтэй."
  }
  ,{
    id: 6,
    lesson_id: 103,
    user_id: 3,
    content: "SQL JOIN queries ашиглан database-с мэдээлэл татах даалгавар.",
    file_url: null,
    grade_point: null,
    status: "pending",
    created_at: "2025-11-11T14:00:00Z",
    updated_at: "2025-11-12T11:00:00Z",
    graded_at: "2025-11-12T11:00:00Z",
    teacher_comment: null
  }
];

export const mockLessonTypes = [
  { id: 1, name: "Лекц", priority: 1 },
  { id: 2, name: "Лаборатори", priority: 2 },
  { id: 3, name: "Даалгавар", priority: 3 }
];

// Helper functions
export const getSubmissionsByLesson = (lessonId) => {
  return mockSubmissions.filter(s => s.lesson_id === lessonId);
};

export const getSubmissionsByCourse = (courseId) => {
  const courseLessons = mockLessons.filter(l => l.course_id === courseId);
  const lessonIds = courseLessons.map(l => l.id);
  return mockSubmissions.filter(s => lessonIds.includes(s.lesson_id));
};

export const getSubmissionById = (submissionId) => {
  return mockSubmissions.find(s => s.id === submissionId);
};

export const getUserById = (userId) => {
  return mockUsers.find(u => u.id === userId);
};

export const getLessonById = (lessonId) => {
  return mockLessons.find(l => l.id === lessonId);
};

export const getCourseById = (courseId) => {
  return mockCourses.find(c => c.id === courseId);
};