import { School } from "lucide-react";

const BASE_URL = "https://todu.mn/bs/lms/v1";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const fetchWithAuth = async (url, options = {}) => {
  const token =
    localStorage.getItem("access_token") || localStorage.getItem("authToken");
  console.log("myToken:", token);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return handleResponse(response);
};

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/token/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    // Token хадгалах
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("authToken", data.access_token);
    }
    if (data.refresh_token) {
      localStorage.setItem("refreshToken", data.refresh_token);
    }
    return data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refreshToken");
    return { success: true };
  },

  // Get current user - одоо нэвтэрсэн хэрэглэгч
  getCurrentUser: async () => {
    return fetchWithAuth(`${BASE_URL}/users/me?current_user=me`);
  },

  // Change password
  changePassword: async (password, new_password) => {
    return fetchWithAuth(`${BASE_URL}/users/me/password`, {
      method: "PUT",
      body: JSON.stringify({
        password,
        new_password,
        current_user: "me",
      }),
    });
  },
};

// Course APIs
export const courseAPI = {
  getMyCourses: async () => {
    const me = await authAPI.getCurrentUser();

    const schools = await userAPI.getUserSchools(me.id);

    if (!schools.items || schools.items.length === 0) {
      throw new Error("User has no schools");
    }

    const school_id = schools.items[0].id;
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/courses`);
  },

  // Get course by ID
  getCourseById: async (id) => {
    return fetchWithAuth(`${BASE_URL}/courses/${id}`);
  },

  // Get course lessons
  getCourseLessons: async (courseId) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/lessons`);
  },

  // Get course users (багш, оюутан гэх мэт)
  getCourseUsers: async (courseId) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/users?limit=200`);
  },

  // Get course groups
  getCourseGroups: async (courseId) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/groups`);
  },

  // Get course exams
  getCourseExams: async (courseId) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/exams`);
  },

  // Get course attendances
  getCourseAttendances: async (courseId) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/attendances`);
  },

  // Get course questions
  getCourseQuestions: async (courseId) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/questions`);
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    });
  },

  // Delete course
  deleteCourse: async (courseId) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}`, {
      method: "DELETE",
    });
  },
};

// Student APIs
export const studentAPI = {
  // Get current user profile
  getProfile: async () => {
    return fetchWithAuth(`${BASE_URL}/users/me?current_user=me`);
  },

  // Update profile
  updateProfile: async (profileData) => {
    return fetchWithAuth(`${BASE_URL}/users/me`, {
      method: "PUT",
      body: JSON.stringify({
        ...profileData,
        current_user: "me",
      }),
    });
  },

  // Get my exams
  getMyExams: async () => {
    return fetchWithAuth(`${BASE_URL}/users/me/exams?current_user=me`);
  },

  // Get specific exam
  getMyExam: async (examId) => {
    return fetchWithAuth(
      `${BASE_URL}/users/me/exams/${examId}?current_user=me`
    );
  },

  // Start exam
  startExam: async (examId) => {
    return fetchWithAuth(`${BASE_URL}/users/me/exams/${examId}`, {
      method: "POST",
      body: JSON.stringify({ current_user: "me" }),
    });
  },

  // Get exam questions
  getExamQuestions: async (examId) => {
    return fetchWithAuth(
      `${BASE_URL}/users/me/exams/${examId}/questions?current_user=me`
    );
  },

  // Submit exam answers
  submitExamAnswers: async (examId, answers) => {
    return fetchWithAuth(`${BASE_URL}/users/me/exams/${examId}/questions`, {
      method: "PUT",
      body: JSON.stringify({
        answer: answers,
        id: examId,
      }),
    });
  },
};

// School APIs
export const schoolAPI = {
  // Get all schools
  getAllSchools: async () => {
    return fetchWithAuth(`${BASE_URL}/schools`);
  },

  // Get school by ID
  getSchoolById: async (id) => {
    return fetchWithAuth(`${BASE_URL}/schools/${id}`);
  },

  // Get school categories
  getSchoolCategories: async (school_id) => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/categories`);
  },

  // Get school courses
  getSchoolCourses: async (school_id) => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/courses`);
  },

  // Get school users
  getSchoolUsers: async (school_id) => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/users`);
  },

  // Create school
  createSchool: async (schoolData) => {
    return fetchWithAuth(`${BASE_URL}/schools`, {
      method: "POST",
      body: JSON.stringify(schoolData),
    });
  },

  // Update school
  updateSchool: async (school_id, schoolData) => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}`, {
      method: "PUT",
      body: JSON.stringify(schoolData),
    });
  },

  // Delete school
  deleteSchool: async (school_id) => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}`, {
      method: "DELETE",
    });
  },
};

// Lesson APIs
export const lessonAPI = {
  // Get lesson by ID
  getLessonById: async (id) => {
    return fetchWithAuth(`${BASE_URL}/lessons/${id}`);
  },

  // Get lesson attendances
  getLessonAttendances: async (lessonId) => {
    return fetchWithAuth(`${BASE_URL}/lessons/${lessonId}/attendances`);
  },

  // Get lesson submissions
  getLessonSubmissions: async (lessonId) => {
    return fetchWithAuth(`${BASE_URL}/lessons/${lessonId}/submissions`);
  },

  // Create attendance
  createAttendance: async (lessonId, typeId, userId) => {
    return fetchWithAuth(`${BASE_URL}/lessons/${lessonId}/attendances`, {
      method: "POST",
      body: JSON.stringify({ type_id: typeId, user_id: userId }),
    });
  },

  // Update lesson
  updateLesson: async (lessonId, lessonData) => {
    return fetchWithAuth(`${BASE_URL}/lessons/${lessonId}`, {
      method: "PUT",
      body: JSON.stringify(lessonData),
    });
  },

  // Delete lesson
  deleteLesson: async (lessonId) => {
    return fetchWithAuth(`${BASE_URL}/lessons/${lessonId}`, {
      method: "DELETE",
    });
  },
};

// Exam APIs
export const examAPI = {
  // Get all exams
  getAllExams: async () => {
    return fetchWithAuth(`${BASE_URL}/exams?current_user=me`);
  },

  // Get exam by ID
  getExamById: async (id) => {
    return fetchWithAuth(`${BASE_URL}/exams/${id}`);
  },

  // Get exam questions
  getExamQuestions: async (examId) => {
    return fetchWithAuth(`${BASE_URL}/exams/${examId}/questions`);
  },

  // Get exam variants
  getExamVariants: async (examId) => {
    return fetchWithAuth(`${BASE_URL}/exams/${examId}/variants`);
  },

  // Get user's exam attempts
  getUserExamAttempts: async (examId, userId) => {
    return fetchWithAuth(
      `${BASE_URL}/exams/${examId}/users/${userId}/attempts`
    );
  },

  // Update exam
  updateExam: async (examId, examData) => {
    return fetchWithAuth(`${BASE_URL}/exams/${examId}`, {
      method: "PUT",
      body: JSON.stringify(examData),
    });
  },

  // Delete exam
  deleteExam: async (examId) => {
    return fetchWithAuth(`${BASE_URL}/exams/${examId}`, {
      method: "DELETE",
    });
  },
};

// Group APIs
export const groupAPI = {
  // Get group by ID
  getGroupById: async (id) => {
    return fetchWithAuth(`${BASE_URL}/groups/${id}`);
  },

  // Update group
  updateGroup: async (id, groupData) => {
    return fetchWithAuth(`${BASE_URL}/groups/${id}`, {
      method: "PUT",
      body: JSON.stringify(groupData),
    });
  },

  // Delete group
  deleteGroup: async (id) => {
    return fetchWithAuth(`${BASE_URL}/groups/${id}`, {
      method: "DELETE",
    });
  },
};

// Reference Data APIs (attendance types, lesson types, etc.)
export const referenceAPI = {
  // Get attendance types
  getAttendanceTypes: async () => {
    return fetchWithAuth(`${BASE_URL}/attendance-types`);
  },

  // Get lesson types
  getLessonTypes: async () => {
    return fetchWithAuth(`${BASE_URL}/lesson-types`);
  },

  // Get question levels
  getQuestionLevels: async () => {
    return fetchWithAuth(`${BASE_URL}/question-levels`);
  },

  // Get question types
  getQuestionTypes: async () => {
    return fetchWithAuth(`${BASE_URL}/question-types`);
  },

  // Get roles
  getRoles: async () => {
    return fetchWithAuth(`${BASE_URL}/roles`);
  },
};

// User APIs
export const userAPI = {
  getUserSchools: async (userId) => {
    return fetchWithAuth(`${BASE_URL}/users/${userId}/schools`);
  },

  getUserExams: async (userId) => {
    return fetchWithAuth(`${BASE_URL}/users/${userId}/exams`);
  },

  // Get all users
  getAllUsers: async () => {
    return fetchWithAuth(`${BASE_URL}/users`);
  },

  // Create user
  createUser: async (userData) => {
    return fetchWithAuth(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Delete current user
  deleteMe: async () => {
    return fetchWithAuth(`${BASE_URL}/users/me`, {
      method: "DELETE",
      body: JSON.stringify({ current_user: "me" }),
    });
  },
};

// Teacher APIs
export const teacherAPI = {
  // Get all teachers from a school
  getAllTeachers: async () => {
    const me = await authAPI.getCurrentUser(); // ✔ JSON
    const schools = await userAPI.getUserSchools(me.id); // ✔ JSON

    console.log("schools", schools);

    if (!schools.items || schools.items.length === 0) {
      throw new Error("User has no schools");
    }

    const school_id = schools.items[0].id;

    const response = await fetchWithAuth(
      `${BASE_URL}/schools/${school_id}/users`
    );

    const data = response.items ? response.items : [];

    return data.filter((user) => user.role_id === 20);
  },

  // Get teacher by ID``
  getTeacherById: async (school_id, userId) => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/users/${userId}`);
  },

  // Get teacher's courses
  getTeacherCourses: async (school_id, teacherId) => {
    const coursesResponse = await fetchWithAuth(
      `${BASE_URL}/schools/${school_id}/courses`
    );

    if (!coursesResponse.items) return { items: [] };

    const teacherCourses = [];
    for (const course of coursesResponse.items) {
      try {
        const users = await fetchWithAuth(
          `${BASE_URL}/courses/${course.id}/users`
        );
        if (
          users.items &&
          users.items.some(
            (u) =>
              u.user_id === teacherId && (u.role_id === 3 || u.role_id === 4)
          )
        ) {
          teacherCourses.push(course);
        }
      } catch (err) {
        console.warn(`Could not fetch users for course ${course.id}`, err);
      }
    }

    return { items: teacherCourses };
  },

  // Get teacher profile
  getTeacherProfile: async () => {
    return fetchWithAuth(`${BASE_URL}/users/me?current_user=me`);
  },
};

// Favorite APIs - localStorage ашиглана
export const favoriteAPI = {
  // Get favorite courses
  getFavoriteCourses: async () => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteCourses") || "[]"
    );
    return { items: favorites };
  },

  // Get favorite teachers
  getFavoriteTeachers: async () => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteTeachers") || "[]"
    );
    return { items: favorites };
  },

  // Get favorite groups
  getFavoriteGroups: async () => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteGroups") || "[]"
    );
    return { items: favorites };
  },

  // Add to favorites
  addFavorite: async (type, id) => {
    const key = `favorite${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const favorites = JSON.parse(localStorage.getItem(key) || "[]");
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem(key, JSON.stringify(favorites));
    }
    return { success: true };
  },

  // Remove from favorites
  removeFavorite: async (type, id) => {
    const key = `favorite${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const favorites = JSON.parse(localStorage.getItem(key) || "[]");
    const filtered = favorites.filter((fav) => fav !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    return { success: true };
  },

  // Toggle favorite
  toggleFavorite: async (type, id) => {
    const key = `favorite${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const favorites = JSON.parse(localStorage.getItem(key) || "[]");

    if (favorites.includes(id)) {
      const filtered = favorites.filter((fav) => fav !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
      return { success: true, added: false };
    } else {
      favorites.push(id);
      localStorage.setItem(key, JSON.stringify(favorites));
      return { success: true, added: true };
    }
  },

  // Check if item is favorite
  isFavorite: (type, id) => {
    const key = `favorite${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const favorites = JSON.parse(localStorage.getItem(key) || "[]");
    return favorites.includes(id);
  },
};

// Category APIs
export const categoryAPI = {
  // Get category by ID
  getCategoryById: async (id) => {
    return fetchWithAuth(`${BASE_URL}/categories/${id}`);
  },

  // Get category courses
  getCategoryCourses: async (categoryId) => {
    return fetchWithAuth(`${BASE_URL}/categories/${categoryId}/courses`);
  },

  // Update category
  updateCategory: async (categoryId, categoryData) => {
    return fetchWithAuth(`${BASE_URL}/categories/${categoryId}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  },

  // Delete category
  deleteCategory: async (categoryId) => {
    return fetchWithAuth(`${BASE_URL}/categories/${categoryId}`, {
      method: "DELETE",
    });
  },
};

// Submission APIs
export const submissionAPI = {
  // Get submission by ID
  getSubmissionById: async (id) => {
    return fetchWithAuth(`${BASE_URL}/submissions/${id}`);
  },

  // Update submission
  updateSubmission: async (submissionId, submissionData) => {
    return fetchWithAuth(`${BASE_URL}/submissions/${submissionId}`, {
      method: "PUT",
      body: JSON.stringify(submissionData),
    });
  },

  // Delete submission
  deleteSubmission: async (submissionId) => {
    return fetchWithAuth(`${BASE_URL}/submissions/${submissionId}`, {
      method: "DELETE",
      body: JSON.stringify({ SUBMISSION_ID: submissionId }),
    });
  },
};

// Question APIs
export const questionAPI = {
  // Get question by ID
  getQuestionById: async (id) => {
    return fetchWithAuth(`${BASE_URL}/questions/${id}`);
  },

  // Update question
  updateQuestion: async (questionId, questionData) => {
    return fetchWithAuth(`${BASE_URL}/questions/${questionId}`, {
      method: "PUT",
      body: JSON.stringify(questionData),
    });
  },
};

// OTP APIs
export const otpAPI = {
  // Send email OTP
  sendEmailOTP: async (email) => {
    return fetch(`${BASE_URL}/otp/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(handleResponse);
  },

  // Login with email OTP
  loginWithEmailOTP: async (email, code, push_token = null) => {
    return fetch(`${BASE_URL}/otp/email/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code, push_token }),
    }).then(handleResponse);
  },

  // Send phone OTP
  sendPhoneOTP: async (phone) => {
    return fetch(`${BASE_URL}/otp/phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    }).then(handleResponse);
  },

  // Login with phone OTP
  loginWithPhoneOTP: async (phone, code, push_token = null) => {
    return fetch(`${BASE_URL}/otp/phone/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, code, push_token }),
    }).then(handleResponse);
  },
};

// Token APIs
export const tokenAPI = {
  // Refresh token
  refreshToken: async (refresh_token) => {
    return fetch(`${BASE_URL}/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token }),
    }).then(handleResponse);
  },

  // Login with phone
  loginWithPhone: async (phone, password, push_token = null) => {
    return fetch(`${BASE_URL}/token/phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password, push_token }),
    }).then(handleResponse);
  },
};
export const progressAPI = {
  // Get course progress chart data
  getCourseProgressChart: async () => {
    return fetchWithAuth(`${BASE_URL}/students/progress/chart`);
  },

  // Get lesson completion status
  getLessonCompletion: async (courseId) => {
    return fetchWithAuth(`${BASE_URL}/students/courses/${courseId}/progress`);
  },

  // Mark lesson as completed
  markLessonComplete: async (lessonId) => {
    return fetchWithAuth(`${BASE_URL}/students/lessons/${lessonId}/complete`, {
      method: "POST",
    });
  },
};
// Export бүгдийг нэгтгэх
export default {
  auth: authAPI,
  course: courseAPI,
  student: studentAPI,
  school: schoolAPI,
  lesson: lessonAPI,
  exam: examAPI,
  group: groupAPI,
  reference: referenceAPI,
  user: userAPI,
  category: categoryAPI,
  favorite: favoriteAPI,
  teacher: teacherAPI,
  submission: submissionAPI,
  question: questionAPI,
  otp: otpAPI,
  token: tokenAPI,
  progress: progressAPI,
};
