
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'https://todu.mn/bs/lms/v1',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme',
};

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',

  COURSES: '/courses',
  COURSE_DETAIL: id => `/courses/${id}`,
  COURSE_DETAILS: id => `/courses/${id}/details`,
  COURSE_STUDENTS: id => `/courses/${id}/students`,
  COURSE_GROUPS: id => `/courses/${id}/groups`,
  SEARCH_COURSES: '/courses/search',

  STUDENT_DASHBOARD: '/students/dashboard',
  STUDENT_COURSES: '/students/courses',
  STUDENT_COMPLETED: '/students/courses/completed',
  STUDENT_SCORE: '/students/score/average',
  STUDENT_SCHEDULE: '/students/schedule',
  STUDENT_GROUPS: '/students/groups',
  STUDENT_PROFILE: '/students/profile',
  STUDENT_PROGRESS: '/students/progress/chart',
  LESSON_COMPLETION: courseId => `/students/courses/${courseId}/progress`,
  MARK_LESSON_COMPLETE: lessonId => `/students/lessons/${lessonId}/complete`,

  FAVORITES: '/favorites',
  FAVORITE_COURSES: '/favorites/courses',
  FAVORITE_TEACHERS: '/favorites/teachers',
  FAVORITE_GROUPS: '/favorites/groups',
  TOGGLE_FAVORITE: '/favorites/toggle',
  REMOVE_FAVORITE: (type, id) => `/favorites/${type}/${id}`,

  TEACHERS: '/teachers',
  TEACHER_DETAIL: id => `/teachers/${id}`,
  TEACHER_COURSES: id => `/teachers/${id}/courses`,

  GROUPS: '/groups',
  GROUP_DETAIL: id => `/groups/${id}`,
  GROUP_MEMBERS: id => `/groups/${id}/members`,

  NOTIFICATIONS: '/notifications',
  NOTIFICATION_READ: id => `/notifications/${id}/read`,
  NOTIFICATIONS_READ_ALL: '/notifications/read-all',
  DELETE_NOTIFICATION: id => `/notifications/${id}`,

  CONVERSATIONS: '/messages/conversations',
  CONVERSATION_MESSAGES: id => `/messages/conversations/${id}`,
  SEND_MESSAGE: id => `/messages/conversations/${id}`,
  CREATE_CONVERSATION: '/messages/conversations',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Сүлжээний алдаа гарлаа. Дахин оролдоно уу.',
  UNAUTHORIZED: 'Нэвтрэх эрх байхгүй байна. Дахин нэвтэрнэ үү.',
  NOT_FOUND: 'Өгөгдөл олдсонгүй.',
  SERVER_ERROR: 'Серверийн алдаа гарлаа. Дахин оролдоно уу.',
  TIMEOUT: 'Хүсэлт хэт удаж байна. Дахин оролдоно уу.',
  DEFAULT: 'Алдаа гарлаа. Дахин оролдоно уу.',
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Амжилттай нэвтэрлээ!',
  LOGOUT: 'Амжилттай гарлаа!',
  SAVED: 'Амжилттай хадгаллаа!',
  UPDATED: 'Амжилттай шинэчиллээ!',
  DELETED: 'Амжилттай устгалаа!',
  ADDED_FAVORITE: 'Таалагдсанд нэмэгдлээ!',
  REMOVED_FAVORITE: 'Таалагдсанаас хасагдлаа!',
};

export const ROUTES = {
  HOME: '/team4',
  COURSES: '/team4/course',
  COURSE_DETAIL: '/team4/course/courseDetail',
  FAVORITE: '/team4/favorite',
  GROUP: '/team4/group',
  MESSAGE: '/team4/message',
  NOTIFICATION: '/team4/notification',
  PROFILE: '/team4/profile',
  SETTINGS: '/team4/settings',
  LOGIN: '/',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

export const DATE_FORMATS = {
  DISPLAY: 'YYYY-MM-DD',
  API: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
};

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, 
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};

export default {
  API_CONFIG,
  STORAGE_KEYS,
  ENDPOINTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROUTES,
  PAGINATION,
  DATE_FORMATS,
  FILE_UPLOAD,
};
