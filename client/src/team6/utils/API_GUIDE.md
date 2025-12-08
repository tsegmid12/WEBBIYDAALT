# Team6 Шалгалтын Систем API Guide

## Танилцуулга

Энэ файл нь Team6 шалгалтын системд ашиглагдаж буй API-н бүрэн гарын авлага юм. API нь `https://todu.mn/bs/lms/v1` хаягт байрладаг.

## Тохиргоо

### Authentication

API нь Bearer Token ашиглан authentication хийдэг:

```javascript
import api from './utils/api';

// Login хийх
const response = await api.auth.loginWithEmail('email@example.com', 'password');
api.setAuthToken(response.access_token);

// Logout хийх
await api.auth.logout();
api.clearAuthToken();
```

### Token Storage

Token нь `localStorage`-д `team6_auth_token` нэртэй хадгалагдана.

## API Endpoints

### 1. Authentication (Нэвтрэх)

#### Email-ээр нэвтрэх
```javascript
const result = await api.auth.loginWithEmail(email, password, push_token);
```

#### Утасны дугаараар нэвтрэх
```javascript
const result = await api.auth.loginWithPhone(phone, password, push_token);
```

#### OTP авах (Email)
```javascript
await api.auth.requestEmailOTP(email);
const result = await api.auth.loginWithEmailOTP(email, code, push_token);
```

#### OTP авах (Phone)
```javascript
await api.auth.requestPhoneOTP(phone);
const result = await api.auth.loginWithPhoneOTP(phone, code, push_token);
```

---

### 2. Users (Хэрэглэгчид)

#### Одоогийн хэрэглэгчийн мэдээлэл авах
```javascript
const user = await api.users.getCurrentUser();
```

#### Хэрэглэгчийн мэдээлэл засах
```javascript
await api.users.updateCurrentUser({
  first_name: 'Нэр',
  last_name: 'Овог',
  email: 'email@example.com'
});
```

#### Нууц үг солих
```javascript
await api.users.updatePassword(current_user, old_password, new_password);
```

---

### 3. Courses (Хичээлүүд)

#### Хичээл авах
```javascript
const course = await api.courses.getCourse(course_id);
```

#### Хичээлийн шалгалтууд авах
```javascript
const exams = await api.courses.getCourseExams(course_id);
// Response: { items: [...], total: number }
```

#### Хичээлд шалгалт үүсгэх
```javascript
const newExam = await api.courses.createCourseExam(course_id, {
  name: 'Дунд шалгалт',
  description: 'React сэдвийн дунд шалгалт',
  start_date: '2025-12-10T10:00:00Z',
  close_date: '2025-12-10T12:00:00Z',
  duration: 60,
  max_attempt: 3,
  total_score: 100,
  grade_point: 30,
  is_shuffled: true,
  show_result_after: true,
  show_correct_answer: true
});
```

---

### 4. Exams (Шалгалтууд)

#### Шалгалтын дэлгэрэнгүй мэдээлэл авах
```javascript
const exam = await api.exams.getExam(exam_id);
```

#### Шалгалт засах
```javascript
await api.exams.updateExam(exam_id, {
  name: 'Шинэ нэр',
  duration: 90
});
```

#### Шалгалт устгах
```javascript
await api.exams.deleteExam(exam_id);
```

#### Шалгалтын асуултууд авах
```javascript
const questions = await api.exams.getExamQuestions(exam_id);
// Response: { items: [...] } эсвэл [...]
```

#### Шалгалтын хувилбарууд авах
```javascript
const variants = await api.exams.getExamVariants(exam_id);
```

#### Шалгалт өгсөн оюутнуудын жагсаалт
```javascript
const users = await api.exams.getExamUsers(exam_id);
// Response: { items: [...] } эсвэл [...]
```

---

### 5. Student Exam Flow (Оюутны шалгалтын урсгал)

#### Миний шалгалтууд
```javascript
const myExams = await api.exams.getMyExams();
```

#### Шалгалтын дэлгэрэнгүй
```javascript
const examDetail = await api.exams.getMyExam(exam_id);
```

#### Шалгалт эхлүүлэх
```javascript
const attempt = await api.exams.startMyExam(exam_id);
```

#### Шалгалтын асуултууд авах
```javascript
const questions = await api.exams.getMyExamQuestions(exam_id);
```

#### Хариулт илгээх
```javascript
await api.exams.submitMyExamAnswer(exam_id, {
  answers: [
    {
      question_id: 1,
      answer: 'A',
      is_correct: true
    }
  ]
});
```

#### Шалгалт дуусгах
```javascript
await api.exams.submitMyExam(exam_id, body_text);
```

---

### 6. Questions (Асуултууд)

#### Асуулт авах
```javascript
const question = await api.questions.getQuestion(question_id);
```

#### Асуулт засах
```javascript
await api.questions.updateQuestion(question_id, {
  question: 'Шинэ асуулт',
  type: 'single_choice',
  options: [...]
});
```

#### Асуултын төрлүүд
```javascript
const types = await api.questions.getQuestionTypes();
```

#### Асуултын түвшин
```javascript
const levels = await api.questions.getQuestionLevels();
```

---

## Error Handling

API нь алдаа гарвал Error throw хийнэ:

```javascript
try {
  const exam = await api.exams.getExam(exam_id);
} catch (error) {
  if (error.message.includes('Unauthorized')) {
    // Нэвтрэх шаардлагатай
    navigate('/team6/login');
  } else if (error.message.includes('Not Found')) {
    // Олдсонгүй
    setError('Шалгалт олдсонгүй');
  } else {
    // Бусад алдаа
    setError(error.message);
  }
}
```

## Response Formats

API нь 2 төрлийн response буцаана:

### Array Response
```javascript
[
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
]
```

### Object Response
```javascript
{
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ],
  total: 2,
  page: 1,
  per_page: 10
}
```

### Handling Both Formats

```javascript
const response = await api.exams.getExamQuestions(exam_id);

let questions = [];
if (Array.isArray(response)) {
  questions = response;
} else if (response && response.items) {
  questions = response.items;
}
```

## LocalStorage Fallback

API fail хийвэл localStorage-аас өгөгдөл авах:

```javascript
try {
  const exam = await api.exams.getExam(exam_id);
  setExam(exam);
} catch (apiErr) {
  // Fallback to localStorage
  const localExams = JSON.parse(localStorage.getItem('all_exams') || '[]');
  const exam = localExams.find(e => e.id === parseInt(exam_id));
  if (exam) {
    setExam(exam);
  } else {
    throw new Error('Шалгалт олдсонгүй');
  }
}
```

## Best Practices

1. **Үргэлж try-catch ашиглах**
```javascript
try {
  const data = await api.exams.getExam(exam_id);
} catch (error) {
  setError(error.message);
}
```

2. **Loading state удирдах**
```javascript
setLoading(true);
try {
  const data = await api.exams.getExam(exam_id);
  setExam(data);
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
}
```

3. **Response format шалгах**
```javascript
const response = await api.courses.getCourseExams(course_id);
const exams = Array.isArray(response) ? response : (response?.items || []);
```

4. **LocalStorage-тай хослуулах**
```javascript
// API-аас авах
const apiExams = await api.courses.getCourseExams(course_id);

// LocalStorage-аас авах
const localExams = JSON.parse(localStorage.getItem('all_exams') || '[]');

// Нэгтгэх
const allExams = [...apiExams];
localExams.forEach(local => {
  if (!allExams.find(api => api.id === local.id)) {
    allExams.push(local);
  }
});
```

## Common Use Cases

### Шалгалт үүсгэх workflow

```javascript
// 1. Хичээл сонгох
const courses = await api.schools.getSchoolCourses(school_id);

// 2. Шалгалт үүсгэх
const newExam = await api.courses.createCourseExam(course_id, examData);

// 3. Асуулт нэмэх
// (Variant үүсгээд асуулт нэмнэ)

// 4. Шалгалт идэвхжүүлэх
await api.exams.updateExam(newExam.id, { is_active: true });
```

### Оюутан шалгалт өгөх workflow

```javascript
// 1. Шалгалтууд харах
const myExams = await api.exams.getMyExams();

// 2. Шалгалт эхлүүлэх
const attempt = await api.exams.startMyExam(exam_id);

// 3. Асуултууд авах
const questions = await api.exams.getMyExamQuestions(exam_id);

// 4. Хариулт илгээх
await api.exams.submitMyExamAnswer(exam_id, answersData);

// 5. Шалгалт дуусгах
await api.exams.submitMyExam(exam_id);
```

## Debugging

API request-үүдийг debug хийх:

```javascript
// Browser console дээр:
// 1. Network tab нээх
// 2. Fetch/XHR filter сонгох
// 3. Request-үүдийг харах

// Code дээр:
try {
  console.log('Fetching exam:', exam_id);
  const exam = await api.exams.getExam(exam_id);
  console.log('Exam data:', exam);
} catch (error) {
  console.error('Error:', error.message);
}
```

---

**Анхааруулга:** Production code дээр console.log, console.error ашиглахгүй байх!
