const BASE_URL = 'https://todu.mn/bs/lms/v1';

// Helper to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('team6_auth_token');
};

// Helper to set auth token
export const setAuthToken = (token) => {
  localStorage.setItem('team6_auth_token', token);
};

// Helper to clear auth token
export const clearAuthToken = () => {
  localStorage.removeItem('team6_auth_token');
};

// HTTP helper methods
const request = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    // Handle non-JSON responses (like 204 No Content)
    if (response.status === 204) {
      return { success: true };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

const get = (endpoint) => request(endpoint, { method: 'GET' });
const post = (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) });
const put = (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
const del = (endpoint, body) => request(endpoint, { method: 'DELETE', body: body ? JSON.stringify(body) : undefined });

// ========================
// AUTHENTICATION
// ========================

export const auth = {
  // Login with email and password
  loginWithEmail: (email, password, push_token = null) => 
    post('/token/email', { email, password, push_token }),
  
  // Login with phone and password
  loginWithPhone: (phone, password, push_token = null) => 
    post('/token/phone', { phone, password, push_token }),
  
  // Request OTP via email
  requestEmailOTP: (email) => 
    post('/otp/email', { email }),
  
  // Login with email OTP
  loginWithEmailOTP: (email, code, push_token = null) => 
    post('/otp/email/login', { email, code, push_token }),
  
  // Request OTP via phone
  requestPhoneOTP: (phone) => 
    post('/otp/phone', { phone }),
  
  // Login with phone OTP
  loginWithPhoneOTP: (phone, code, push_token = null) => 
    post('/otp/phone/login', { phone, code, push_token }),
  
  // Refresh token
  refreshToken: (refresh_token) => 
    post('/token/refresh', { refresh_token }),
  
  // Logout
  logout: () => {
    const current_user = localStorage.getItem('team6_current_user_id');
    return del('/token', { current_user }).finally(() => {
      clearAuthToken();
    });
  },
};

// ========================
// USERS
// ========================

export const users = {
  // Get current user info
  getCurrentUser: () => 
    get('/users/me'),
  
  // Update current user profile
  updateCurrentUser: (userData) => 
    put('/users/me', userData),
  
  // Update password
  updatePassword: (current_user, password, new_password) => 
    put('/users/me/password', { current_user, password, new_password }),
  
  // Delete current user account
  deleteCurrentUser: () => {
    const current_user = localStorage.getItem('team6_current_user_id');
    return del('/users/me', { current_user });
  },
  
  // Get all users (admin)
  getUsers: () => 
    get('/users'),
  
  // Create user
  createUser: (userData) => 
    post('/users', userData),
  
  // Get user's schools
  getUserSchools: (user_id) => 
    get(`/users/${user_id}/schools`),
};

// ========================
// SCHOOLS
// ========================

export const schools = {
  // Get all schools
  getSchools: () => 
    get('/schools'),
  
  // Get school by ID
  getSchool: (school_id) => 
    get(`/schools/${school_id}`),
  
  // Create school
  createSchool: (schoolData) => 
    post('/schools', schoolData),
  
  // Update school
  updateSchool: (school_id, schoolData) => 
    put(`/schools/${school_id}`, schoolData),
  
  // Delete school
  deleteSchool: (school_id) => 
    del(`/schools/${school_id}`),
  
  // Get school categories
  getSchoolCategories: (school_id) => 
    get(`/schools/${school_id}/categories`),
  
  // Create category in school
  createSchoolCategory: (school_id, categoryData) => 
    post(`/schools/${school_id}/categories`, categoryData),
  
  // Get school courses
  getSchoolCourses: (school_id) => 
    get(`/schools/${school_id}/courses`),
  
  // Create course in school
  createSchoolCourse: (school_id, courseData) => 
    post(`/schools/${school_id}/courses`, courseData),
  
  // Get school users
  getSchoolUsers: (school_id) => 
    get(`/schools/${school_id}/users`),
  
  // Add user to school
  addUserToSchool: (school_id, userData) => 
    post(`/schools/${school_id}/users`, userData),
  
  // Remove user from school
  removeUserFromSchool: (school_id, user_id) => 
    del(`/schools/${school_id}/users/${user_id}`),
};

// ========================
// CATEGORIES
// ========================

export const categories = {
  // Get category by ID
  getCategory: (category_id) => 
    get(`/categories/${category_id}`),
  
  // Update category
  updateCategory: (category_id, categoryData) => 
    put(`/categories/${category_id}`, categoryData),
  
  // Delete category
  deleteCategory: (category_id) => 
    del(`/categories/${category_id}`),
  
  // Get courses in category
  getCategoryCourses: (category_id) => 
    get(`/categories/${category_id}/courses`),
  
  // Remove course from category
  removeCourseFromCategory: (category_id, course_id, data) => 
    del(`/categories/${category_id}/courses/${course_id}`, data),
};

// ========================
// COURSES
// ========================

export const courses = {
  // Get course by ID
  getCourse: (course_id) => 
    get(`/courses/${course_id}`),
  
  // Update course
  updateCourse: (course_id, courseData) => 
    put(`/courses/${course_id}`, courseData),
  
  // Delete course
  deleteCourse: (course_id) => 
    del(`/courses/${course_id}`),
  
  // Clone/copy course
  cloneCourse: (course_id, cloneData) => 
    post(`/courses/${course_id}`, cloneData),
  
  // Get course exams
  getCourseExams: (course_id) => 
    get(`/courses/${course_id}/exams`),
  
  // Create exam in course
  createCourseExam: (course_id, examData) => 
    post(`/courses/${course_id}/exams`, examData),
  
  // Get course lessons
  getCourseLessons: (course_id) => 
    get(`/courses/${course_id}/lessons`),
  
  // Create lesson in course
  createCourseLesson: (course_id, lessonData) => 
    post(`/courses/${course_id}/lessons`, lessonData),
  
  // Get course groups
  getCourseGroups: (course_id) => 
    get(`/courses/${course_id}/groups`),
  
  // Create group in course
  createCourseGroup: (course_id, groupData) => 
    post(`/courses/${course_id}/groups`, groupData),
  
  // Get course users
  getCourseUsers: (course_id) => 
    get(`/courses/${course_id}/users`),
  
  // Add user to course
  addUserToCourse: (course_id, userData) => 
    post(`/courses/${course_id}/users`, userData),
  
  // Get course user details
  getCourseUser: (course_id, user_id) => 
    get(`/courses/${course_id}/users/${user_id}`),
  
  // Update course user (group, role)
  updateCourseUser: (course_id, user_id, userData) => 
    put(`/courses/${course_id}/users/${user_id}`, userData),
  
  // Remove user from course
  removeUserFromCourse: (course_id, user_id, data) => 
    del(`/courses/${course_id}/users/${user_id}`, data),
  
  // Get course questions
  getCourseQuestions: (course_id) => 
    get(`/courses/${course_id}/questions`),
  
  // Create question in course
  createCourseQuestion: (course_id, questionData) => 
    post(`/courses/${course_id}/questions`, questionData),
  
  // Get course points/grades
  getCoursePoints: (course_id) => 
    get(`/courses/${course_id}/points`),
  
  // Add course point
  addCoursePoint: (course_id, pointData) => 
    post(`/courses/${course_id}/points`, pointData),
  
  // Get course attendances
  getCourseAttendances: (course_id) => 
    get(`/courses/${course_id}/attendances`),
};

// ========================
// EXAMS
// ========================

export const exams = {
  // Get exam by ID
  getExam: (exam_id) => 
    get(`/exams/${exam_id}`),
  
  // Update exam
  updateExam: (exam_id, examData) => 
    put(`/exams/${exam_id}`, examData),
  
  // Delete exam
  deleteExam: (exam_id) => 
    del(`/exams/${exam_id}`),
  
  // Get exam questions/configuration
  getExamQuestions: (exam_id) => 
    get(`/exams/${exam_id}/questions`),
  
  // Get exam variants
  getExamVariants: (exam_id) => 
    get(`/exams/${exam_id}/variants`),
  
  // Get exam users (all attempts)
  getExamUsers: (exam_id) => 
    get(`/exams/${exam_id}/users`),
  
  // Get user's exam attempts
  getUserExamAttempts: (exam_id, user_id) => 
    get(`/exams/${exam_id}/users/${user_id}`),
  
  // Create exam attempt for user
  createExamAttempt: (exam_id, user_id) => 
    post(`/exams/${exam_id}/users/${user_id}`, {}),
  
  // Get all attempts for user
  getUserAttempts: (exam_id, user_id) => 
    get(`/exams/${exam_id}/users/${user_id}/attempts`),
  
  // Get specific attempt
  getAttempt: (exam_id, user_id, attempt) => 
    get(`/exams/${exam_id}/users/${user_id}/attempts/${attempt}`),
  
  // Delete attempt
  deleteAttempt: (exam_id, user_id, attempt, data) => 
    del(`/exams/${exam_id}/users/${user_id}/attempts/${attempt}`, data),
  
  // Get attempt evaluation/results
  getAttemptEvaluation: (exam_id, user_id, attempt) => 
    get(`/exams/${exam_id}/users/${user_id}/attempts/${attempt}/evaluation`),
  
  // Get attempt questions
  getAttemptQuestions: (exam_id, user_id, attempt) => 
    get(`/exams/${exam_id}/users/${user_id}/attempts/${attempt}/questions`),
  
  // Get all user exams (for current user)
  getCurrentUserExams: () => {
    const current_user = localStorage.getItem('team6_current_user_id');
    return get(`/exams?current_user=${current_user}`);
  },
  
  // Get current user's exams
  getMyExams: () => 
    get('/users/me/exams'),
  
  // Get current user's exam details
  getMyExam: (exam_id) => 
    get(`/users/me/exams/${exam_id}`),
  
  // Start exam (create attempt for current user)
  startMyExam: (exam_id) => 
    post(`/users/me/exams/${exam_id}`, {}),
  
  // Submit exam (finish attempt)
  submitMyExam: (exam_id, body_text) => 
    put(`/users/me/exams/${exam_id}`, { body_text }),
  
  // Get current user's exam questions
  getMyExamQuestions: (exam_id) => 
    get(`/users/me/exams/${exam_id}/questions`),
  
  // Submit answer to question
  submitMyExamAnswer: (exam_id, answersData) => 
    put(`/users/me/exams/${exam_id}/questions`, answersData),
};

// ========================
// EXAM VARIANTS
// ========================

export const variants = {
  // Get variant questions
  getVariantQuestions: (variant_id) => 
    get(`/variants/${variant_id}/questions`),
  
  // Add question to variant
  addQuestionToVariant: (variant_id, questionData) => 
    post(`/variants/${variant_id}/questions`, questionData),
  
  // Remove question from variant
  removeQuestionFromVariant: (variant_id, question_id) => 
    del(`/variants/${variant_id}/questions/${question_id}`),
};

// ========================
// QUESTIONS
// ========================

export const questions = {
  // Get question by ID
  getQuestion: (question_id) => 
    get(`/questions/${question_id}`),
  
  // Update question
  updateQuestion: (question_id, questionData) => 
    put(`/questions/${question_id}`, questionData),
  
  // Get question levels
  getQuestionLevels: () => 
    get('/question-levels'),
  
  // Create question level
  createQuestionLevel: (levelData) => 
    post('/question-levels', levelData),
  
  // Get question level
  getQuestionLevel: (question_level_id) => 
    get(`/question-levels/${question_level_id}`),
  
  // Update question level
  updateQuestionLevel: (question_level_id, levelData) => 
    put(`/question-levels/${question_level_id}`, levelData),
  
  // Delete question level
  deleteQuestionLevel: (question_level_id, data) => 
    del(`/question-levels/${question_level_id}`, data),
  
  // Get question types
  getQuestionTypes: () => 
    get('/question-types'),
  
  // Create question type
  createQuestionType: (typeData) => 
    post('/question-types', typeData),
  
  // Delete question type
  deleteQuestionType: (question_type_id, data) => 
    del(`/question-types/${question_type_id}`, data),
};

// ========================
// LESSONS
// ========================

export const lessons = {
  // Get lesson by ID
  getLesson: (lesson_id) => 
    get(`/lessons/${lesson_id}`),
  
  // Update lesson
  updateLesson: (lesson_id, lessonData) => 
    put(`/lessons/${lesson_id}`, lessonData),
  
  // Delete lesson
  deleteLesson: (lesson_id) => 
    del(`/lessons/${lesson_id}`),
  
  // Get lesson attendances
  getLessonAttendances: (lesson_id) => 
    get(`/lessons/${lesson_id}/attendances`),
  
  // Mark attendance
  markAttendance: (lesson_id, attendanceData) => 
    post(`/lessons/${lesson_id}/attendances`, attendanceData),
  
  // Update attendance
  updateAttendance: (lesson_id, user_id, attendanceData) => 
    put(`/lessons/${lesson_id}/attendances/${user_id}`, attendanceData),
  
  // Delete attendance
  deleteAttendance: (lesson_id, user_id) => 
    del(`/lessons/${lesson_id}/attendances/${user_id}`),
  
  // Get lesson submissions
  getLessonSubmissions: (lesson_id) => 
    get(`/lessons/${lesson_id}/submissions`),
  
  // Get lesson types
  getLessonTypes: () => 
    get('/lesson-types'),
};

// ========================
// SUBMISSIONS
// ========================

export const submissions = {
  // Get submission by ID
  getSubmission: (submission_id) => 
    get(`/submissions/${submission_id}`),
  
  // Update submission
  updateSubmission: (submission_id, submissionData) => 
    put(`/submissions/${submission_id}`, submissionData),
  
  // Delete submission
  deleteSubmission: (submission_id, data) => 
    del(`/submissions/${submission_id}`, data),
};

// ========================
// GROUPS
// ========================

export const groups = {
  // Get group by ID
  getGroup: (group_id) => 
    get(`/groups/${group_id}`),
  
  // Update group
  updateGroup: (group_id, groupData) => 
    put(`/groups/${group_id}`, groupData),
  
  // Delete group
  deleteGroup: (group_id) => 
    del(`/groups/${group_id}`),
};

// ========================
// ROLES
// ========================

export const roles = {
  // Get all roles
  getRoles: () => 
    get('/roles'),
  
  // Delete role
  deleteRole: (role_id, data) => 
    del(`/roles/${role_id}`, data),
};

// ========================
// ATTENDANCE TYPES
// ========================

export const attendanceTypes = {
  // Get all attendance types
  getAttendanceTypes: () => 
    get('/attendance-types'),
  
  // Create attendance type
  createAttendanceType: (typeData) => 
    post('/attendance-types', typeData),
  
  // Update attendance type
  updateAttendanceType: (attendance_type_id, typeData) => 
    put(`/attendance-types/${attendance_type_id}`, typeData),
  
  // Delete attendance type
  deleteAttendanceType: (attendance_type_id) => 
    del(`/attendance-types/${attendance_type_id}`),
};

// Export all as default object for convenience
export default {
  auth,
  users,
  schools,
  categories,
  courses,
  exams,
  variants,
  questions,
  lessons,
  submissions,
  groups,
  roles,
  attendanceTypes,
  setAuthToken,
  clearAuthToken,
};
