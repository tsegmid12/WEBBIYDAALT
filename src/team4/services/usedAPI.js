import { School } from 'lucide-react';

const BASE_URL = 'https://todu.mn/bs/lms/v1';

const handleResponse = async response => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const fetchWithAuth = async (url, options = {}) => {
  const token =
    localStorage.getItem('access_token') || localStorage.getItem('authToken');
  console.log('myToken:', token);
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    // Token хадгалах
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('authToken', data.access_token);
    }
    if (data.refresh_token) {
      localStorage.setItem('refreshToken', data.refresh_token);
    }
    return data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refreshToken');
    return { success: true };
  },

  // Get current user - одоо нэвтэрсэн хэрэглэгч
  getCurrentUser: async () => {
    return fetchWithAuth(`${BASE_URL}/users/me?current_user=me`);
  },

  // Change password
  changePassword: async (password, new_password) => {
    return fetchWithAuth(`${BASE_URL}/users/me/password`, {
      method: 'PUT',
      body: JSON.stringify({
        password,
        new_password,
        current_user: 'me',
      }),
    });
  },
};
export const studentAPI = {
  // Get current user profile
  getProfile: async () => {
    return fetchWithAuth(`${BASE_URL}/users/me?current_user=me`);
  },

  // Update profile
  updateProfile: async profileData => {
    return fetchWithAuth(`${BASE_URL}/users/me`, {
      method: 'PUT',
      body: JSON.stringify({
        ...profileData,
        current_user: 'me',
      }),
    });
  },
};

// Favorite APIs - localStorage ашиглана
export const favoriteAPI = {
  // Get favorite courses
  getFavoriteCourses: async () => {
    const favoriteIds = JSON.parse(
      localStorage.getItem('favoriteCourses') || '[]'
    );

    const res = await courseAPI.getMyCourses();
    console.log('getMyCourses result:', res);

    // res нь JSON object тул .json() хэрэггүй
    const allCourses = res.items || res.courses || res || [];

    const favoriteCourses = allCourses.filter(c => favoriteIds.includes(c.id));

    return { items: favoriteCourses };
  },

  // Get favorite teachers
  getFavoriteTeachers: async () => {
    const favorites = JSON.parse(
      localStorage.getItem('favoriteTeachers') || '[]'
    );
    return { items: favorites };
  },

  // Get favorite groups
  getFavoriteGroups: async () => {
    const favorites = JSON.parse(
      localStorage.getItem('favoriteGroups') || '[]'
    );
    return { items: favorites };
  },

  // Add to favorites
  addFavorite: async (type, id) => {
    const key = `favorite${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const favorites = JSON.parse(localStorage.getItem(key) || '[]');
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem(key, JSON.stringify(favorites));
    }
    return { success: true };
  },

  // Remove from favorites
  removeFavorite: async (type, id) => {
    const key = `favorite${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const favorites = JSON.parse(localStorage.getItem(key) || '[]');
    const filtered = favorites.filter(fav => fav !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    return { success: true };
  },

  // Toggle favorite
  toggleFavorite: async (type, id) => {
    const key = `favorite${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const favorites = JSON.parse(localStorage.getItem(key) || '[]');

    if (favorites.includes(id)) {
      const filtered = favorites.filter(fav => fav !== id);
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
    const favorites = JSON.parse(localStorage.getItem(key) || '[]');
    return favorites.includes(id);
  },
};

export const teacherAPI = {
  // Get all teachers from a school
  getAllTeachers: async () => {
    const me = await authAPI.getCurrentUser(); // ✔ JSON
    const schools = await userAPI.getUserSchools(me.id); // ✔ JSON

    console.log('schools', schools);

    if (!schools.items || schools.items.length === 0) {
      throw new Error('User has no schools');
    }

    const school_id = schools.items[0].id;

    const response = await fetchWithAuth(
      `${BASE_URL}/schools/${school_id}/users`
    );

    const data = response.items ? response.items : [];

    console.log('teachersss', data);

    return data.filter(user => user.role_id === 20 || user.role_id !== 4);
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
            u => u.user_id === teacherId && (u.role_id === 3 || u.role_id === 4)
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
export const courseAPI = {
  getMyCourses: async () => {
    const me = await authAPI.getCurrentUser();

    const schools = await userAPI.getUserSchools(me.id);
    console.log('schools', schools);

    if (!schools.items || schools.items.length === 0) {
      throw new Error('User has no schools');
    }

    const school_id = schools.items[0].id;
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/courses`);
  },

  // Get course by ID
  getCourseById: async id => {
    return fetchWithAuth(`${BASE_URL}/courses/${id}`);
  },
  getCoursePoints: async courseId => {
    console.log(courseId);
    const response = await fetch(`/api/courses/${courseId}/points`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Auth headers нэмнэ
      },
    });
    console.log('onooo', response);
    if (!response.ok)
      throw new Error(`Failed to fetch points for course ${courseId}`);
    return response.json();
  },

  // Get course lessons
  getCourseLessons: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/lessons`);
  },

  getCourseUsers: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/users`);
  },

  // Get course groups
  getCourseGroups: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/groups`);
  },

  // Get course exams
  getCourseExams: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/exams`);
  },

  // Get course attendances
  getCourseAttendances: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/attendances`);
  },

  // Get course questions
  getCourseQuestions: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/questions`);
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  },

  // Delete course
  deleteCourse: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}`, {
      method: 'DELETE',
    });
  },
};
export const groupAPI = {
  // Get group by ID
  getGroupById: async id => {
    return fetchWithAuth(`${BASE_URL}/groups/${id}`);
  },

  // Update group
  updateGroup: async (id, groupData) => {
    return fetchWithAuth(`${BASE_URL}/groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(groupData),
    });
  },

  // Delete group
  deleteGroup: async id => {
    return fetchWithAuth(`${BASE_URL}/groups/${id}`, {
      method: 'DELETE',
    });
  },
};
export const progressAPI = {
  // Get course progress chart data
  getCourseProgressChart: async () => {
    return fetchWithAuth(`${BASE_URL}/students/progress/chart`);
  },

  // Get lesson completion status
  getLessonCompletion: async courseId => {
    return fetchWithAuth(`${BASE_URL}/students/courses/${courseId}/progress`);
  },

  // Mark lesson as completed
  markLessonComplete: async lessonId => {
    return fetchWithAuth(`${BASE_URL}/students/lessons/${lessonId}/complete`, {
      method: 'POST',
    });
  },
};
export const schoolAPI = {
  // Get all schools
  getAllSchools: async () => {
    return fetchWithAuth(`${BASE_URL}/schools`);
  },

  // Get school by ID
  getSchoolById: async id => {
    return fetchWithAuth(`${BASE_URL}/schools/${id}`);
  },

  // Get school categories
  getSchoolCategories: async school_id => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/categories`);
  },

  // Get school courses
  getSchoolCourses: async school_id => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/courses`);
  },

  // Get school users
  getSchoolUsers: async school_id => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}/users`);
  },

  // Create school
  createSchool: async schoolData => {
    return fetchWithAuth(`${BASE_URL}/schools`, {
      method: 'POST',
      body: JSON.stringify(schoolData),
    });
  },

  // Update school
  updateSchool: async (school_id, schoolData) => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}`, {
      method: 'PUT',
      body: JSON.stringify(schoolData),
    });
  },

  // Delete school
  deleteSchool: async school_id => {
    return fetchWithAuth(`${BASE_URL}/schools/${school_id}`, {
      method: 'DELETE',
    });
  },
};
export const userAPI = {
  getUserSchools: async userId => {
    return fetchWithAuth(`${BASE_URL}/users/${userId}/schools`);
  },

  getUserExams: async userId => {
    return fetchWithAuth(`${BASE_URL}/users/${userId}/exams`);
  },

  // Get all users
  getAllUsers: async () => {
    return fetchWithAuth(`${BASE_URL}/users`);
  },

  // Create user
  createUser: async userData => {
    return fetchWithAuth(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Delete current user
  deleteMe: async () => {
    return fetchWithAuth(`${BASE_URL}/users/me`, {
      method: 'DELETE',
      body: JSON.stringify({ current_user: 'me' }),
    });
  },
};
export default {
  auth: authAPI,
  course: courseAPI,
  student: studentAPI,
  school: schoolAPI,

  group: groupAPI,
  user: userAPI,
  favorite: favoriteAPI,
  teacher: teacherAPI,

  progress: progressAPI,
};
