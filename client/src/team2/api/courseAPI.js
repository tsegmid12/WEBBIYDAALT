import { mockCourses } from '../utils/mockData';

// Simulated API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const courseAPI = {
  // Get course by ID
  getCourse: async (courseId) => {
    await delay();
    const course = mockCourses.find(c => c.id === parseInt(courseId));
    if (!course) throw new Error('Хичээл олдсонгүй');
    return { data: course, success: true };
  },

  // Get all courses
  getAllCourses: async () => {
    await delay();
    return { data: mockCourses, success: true };
  }
};