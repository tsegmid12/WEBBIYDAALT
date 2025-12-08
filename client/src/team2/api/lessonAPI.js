// team2/api/lessonAPI.js
// FIXED VERSION - Now handles lesson IDs 101-103 correctly

import { mockLessons } from '../utils/mockData';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const lessonAPI = {
  // Get lesson by ID - FIXED to handle any lesson ID
  getLesson: async (lessonId) => {
    await delay();
    
    // Convert to number if string
    const id = parseInt(lessonId);
    
    // Find lesson in mock data
    const lesson = mockLessons.find(l => l.id === id);
    
    if (!lesson) {
      console.error(`Lesson with ID ${id} not found. Available IDs:`, mockLessons.map(l => l.id));
      throw new Error(`Сэдэв олдсонгүй (ID: ${id})`);
    }
    
    console.log('✅ Found lesson:', lesson);
    return { data: lesson, success: true };
  },

  // Get lessons by course
  getLessonsByCourse: async (courseId) => {
    await delay();
    
    const id = parseInt(courseId);
    const lessons = mockLessons.filter(l => l.course_id === id);
    
    console.log(`✅ Found ${lessons.length} lessons for course ${id}`);
    return { data: lessons, success: true };
  },

  // Get all lessons (useful for debugging)
  getAllLessons: async () => {
    await delay();
    console.log('✅ All available lessons:', mockLessons);
    return { data: mockLessons, success: true };
  }
};