import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Team1Layout from "./Team1Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Импортуудаа шинэчлэх
import SchoolsList from "./schools/SchoolsList";
import SchoolCreate from "./schools/SchoolCreate";
import SchoolView from "./schools/SchoolView";
import SchoolEdit from "./schools/SchoolEdit";

import CoursesList from "./courses/CoursesList";
import Categories from "./courses/Categories";
import CourseCreate from "./courses/CourseCreate";
import CourseView from "./courses/CourseView";
import CourseEdit from "./courses/CourseEdit";
import CourseReport from "./courses/CourseReport";

import LessonsList from "./lessons/LessonsList";
import LessonCreate from "./lessons/LessonCreate";
import LessonView from "./lessons/LessonView";
import LessonEdit from "./lessons/LessonEdit";
import SchoolReport from "./schools/SchoolReport";

const Index = () => {
  return (
    <Routes>
      <Route path="" element={<Team1Layout />}> 
        {/* Home */}
        <Route index element={<Navigate to="schools" replace />} />

        {/* Section 4: Schools */}
        <Route path="schools" element={<SchoolsList />} />
        <Route path="schools/create" element={<ProtectedRoute requireProfessor><SchoolCreate /></ProtectedRoute>} />
        <Route path="schools/:school_id" element={<SchoolView />} />
        <Route path="schools/:school_id/edit" element={<ProtectedRoute requireProfessor><SchoolEdit /></ProtectedRoute>} />
        {/* School report routes - Admin only */}
        <Route path="report" element={<ProtectedRoute requireAdmin><SchoolReport /></ProtectedRoute>} />
        <Route path="schools/report" element={<ProtectedRoute requireAdmin><SchoolReport /></ProtectedRoute>} />

        {/* Section 5: Courses */}
        <Route path="courses" element={<CoursesList />} />
        <Route path="categories" element={<ProtectedRoute requireAdmin><Categories /></ProtectedRoute>} />
        <Route path="courses/create" element={<ProtectedRoute requireProfessor><CourseCreate /></ProtectedRoute>} />
        <Route path="courses/:course_id" element={<CourseView />} />
        <Route path="courses/:course_id/edit" element={<ProtectedRoute requireProfessor><CourseEdit /></ProtectedRoute>} />
        <Route path="courses/:course_id/report" element={<ProtectedRoute requireAdmin><CourseReport /></ProtectedRoute>} />

        {/* Section 6: Lessons */}
        <Route path="courses/:course_id/lessons" element={<LessonsList />} />
        <Route path="courses/:course_id/lessons/create" element={<ProtectedRoute requireProfessor><LessonCreate /></ProtectedRoute>} />
        <Route path="courses/:course_id/lessons/:lesson_id" element={<LessonView />} />
        <Route path="courses/:course_id/lessons/:lesson_id/edit" element={<ProtectedRoute requireProfessor><LessonEdit /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default Index;