const BASE_URL = 'https://todu.mn/bs/lms/v1';

const handleResponse = async response => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
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

// Course APIs
export const courseAPI = {
  // Get all courses
  getAllCourses: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/courses${queryString ? `?${queryString}` : ''}`;
    return fetchWithAuth(url);
  },

  // Get course by ID
  getCourseById: async id => {
    return fetchWithAuth(`${BASE_URL}/courses/${id}`);
  },

  // Search courses
  searchCourses: async searchTerm => {
    return fetchWithAuth(
      `${BASE_URL}/courses?search=${encodeURIComponent(searchTerm)}`
    );
  },

  // Get course details with lessons
  getCourseDetails: async id => {
    return fetchWithAuth(`${BASE_URL}/courses/${id}/details`);
  },

  // Get course students
  getCourseStudents: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/students`);
  },


  getCourseGroups: async courseId => {
    return fetchWithAuth(`${BASE_URL}/courses/${courseId}/groups`);
  },
};


export const studentAPI = {
  getDashboardStats: async () => {
    return fetchWithAuth(`${BASE_URL}/students/dashboard`);
  },

  getEnrolledCourses: async () => {
    return fetchWithAuth(`${BASE_URL}/students/courses`);
  },


  getCompletedCourses: async () => {
    return fetchWithAuth(`${BASE_URL}/students/courses/completed`);
  },


  getAverageScore: async () => {
    return fetchWithAuth(`${BASE_URL}/students/score/average`);
  },


  getSchedule: async date => {
    const params = date ? `?date=${date}` : '';
    return fetchWithAuth(`${BASE_URL}/students/schedule${params}`);
  },


  getGroups: async () => {
    return fetchWithAuth(`${BASE_URL}/students/groups`);
  },


  getProfile: async () => {
    return fetchWithAuth(`${BASE_URL}/students/profile`);
  },


  updateProfile: async profileData => {
    return fetchWithAuth(`${BASE_URL}/students/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};


export const favoriteAPI = {
  getFavoriteCourses: async () => {
    return fetchWithAuth(`${BASE_URL}/favorites/courses`);
  },

  // Get favorite teachers
  getFavoriteTeachers: async () => {
    return fetchWithAuth(`${BASE_URL}/favorites/teachers`);
  },

  // Get favorite groups
  getFavoriteGroups: async () => {
    return fetchWithAuth(`${BASE_URL}/favorites/groups`);
  },

  // Add to favorites
  addFavorite: async (type, id) => {
    return fetchWithAuth(`${BASE_URL}/favorites`, {
      method: 'POST',
      body: JSON.stringify({ type, id }),
    });
  },

  // Remove from favorites
  removeFavorite: async (type, id) => {
    return fetchWithAuth(`${BASE_URL}/favorites/${type}/${id}`, {
      method: 'DELETE',
    });
  },

  // Toggle favorite
  toggleFavorite: async (type, id) => {
    return fetchWithAuth(`${BASE_URL}/favorites/toggle`, {
      method: 'POST',
      body: JSON.stringify({ type, id }),
    });
  },
};

// Teacher APIs
export const teacherAPI = {
  // Get all teachers
  getAllTeachers: async () => {
    return fetchWithAuth(`${BASE_URL}/teachers`);
  },

  // Get teacher by ID
  getTeacherById: async id => {
    return fetchWithAuth(`${BASE_URL}/teachers/${id}`);
  },

  // Get teacher's courses
  getTeacherCourses: async teacherId => {
    return fetchWithAuth(`${BASE_URL}/teachers/${teacherId}/courses`);
  },
};

// Group APIs
export const groupAPI = {
  // Get all groups
  getAllGroups: async () => {
    return fetchWithAuth(`${BASE_URL}/groups`);
  },

  // Get group by ID
  getGroupById: async id => {
    return fetchWithAuth(`${BASE_URL}/groups/${id}`);
  },

  // Get group members
  getGroupMembers: async groupId => {
    return fetchWithAuth(`${BASE_URL}/groups/${groupId}/members`);
  },

  // Get student's groups
  getStudentGroups: async () => {
    return fetchWithAuth(`${BASE_URL}/students/groups`);
  },
};

// Notification APIs
export const notificationAPI = {
  // Get all notifications
  getNotifications: async () => {
    return fetchWithAuth(`${BASE_URL}/notifications`);
  },

  // Mark notification as read
  markAsRead: async notificationId => {
    return fetchWithAuth(`${BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    return fetchWithAuth(`${BASE_URL}/notifications/read-all`, {
      method: 'PUT',
    });
  },

  // Delete notification
  deleteNotification: async notificationId => {
    return fetchWithAuth(`${BASE_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  },
};

// Message APIs
export const messageAPI = {
  // Get all conversations
  getConversations: async () => {
    return fetchWithAuth(`${BASE_URL}/messages/conversations`);
  },

  // Get messages for a conversation
  getMessages: async conversationId => {
    return fetchWithAuth(
      `${BASE_URL}/messages/conversations/${conversationId}`
    );
  },

  // Send message
  sendMessage: async (conversationId, messageData) => {
    return fetchWithAuth(
      `${BASE_URL}/messages/conversations/${conversationId}`,
      {
        method: 'POST',
        body: JSON.stringify(messageData),
      }
    );
  },

  // Create new conversation
  createConversation: async recipientId => {
    return fetchWithAuth(`${BASE_URL}/messages/conversations`, {
      method: 'POST',
      body: JSON.stringify({ recipientId }),
    });
  },
};

// Progress/Analytics APIs
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

// Auth APIs
export const authAPI = {
  // Login
  login: async credentials => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem('authToken');
    return { success: true };
  },

  // Get current user
  getCurrentUser: async () => {
    return fetchWithAuth(`${BASE_URL}/auth/me`);
  },
};

export default {
  course: courseAPI,
  student: studentAPI,
  favorite: favoriteAPI,
  teacher: teacherAPI,
  group: groupAPI,
  notification: notificationAPI,
  message: messageAPI,
  progress: progressAPI,
  auth: authAPI,
};
