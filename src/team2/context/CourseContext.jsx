import React, { createContext, useContext, useState, useEffect } from 'react';
import { courseAPI } from '../api/courseAPI';
import { lessonAPI } from '../api/lessonAPI';

const CourseContext = createContext();

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseAPI.getAllCourses();
      setCourses(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific course
  const fetchCourse = async (courseId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseAPI.getCourse(courseId);
      setCurrentCourse(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch lessons for a course
  const fetchLessons = async (courseId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await lessonAPI.getLessonsByCourse(courseId);
      setLessons(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const value = {
    courses,
    currentCourse,
    lessons,
    loading,
    error,
    fetchCourses,
    fetchCourse,
    fetchLessons,
    setCurrentCourse
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};