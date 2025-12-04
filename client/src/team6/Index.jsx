import { Routes, Route } from "react-router-dom";
import Team6Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { RoleProvider } from "./utils/RoleContext";

import Home from "./pages/Home";
import RoleSelector from "./pages/RoleSelector";

// Exam Pages
import ExamList from "./pages/ExamList";
import ExamCreate from "./pages/ExamCreate";
import ExamDetail from "./pages/ExamDetail";
import ExamEdit from "./pages/ExamEdit";
import ExamReport from "./pages/ExamReport";

// Variant Pages
import ExamVariantList from "./pages/ExamVariantList";
import ExamVariantCreate from "./pages/ExamVariantCreate";
import ExamVariantDetail from "./pages/ExamVariantDetail";
import ExamVariantEdit from "./pages/ExamVariantEdit";

// Taking Pages
import ExamStart from "./pages/ExamStart";
import ExamTake from "./pages/ExamTake";
import ExamCheck from "./pages/ExamCheck";
import ExamResult from "./pages/ExamResult";

const Index = () => {
  return (
    <RoleProvider>
      <Routes>
        {/* Role select - exact match for /team6 */}
        <Route index element={<RoleSelector />} />

        {/* All other routes wrapped in layout */}
        <Route element={<Team6Layout />}>
          {/* HOME */}
          <Route
            path="exams"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* TEACHER */}
          <Route
            path="courses/:course_id/exams"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ExamList />
              </ProtectedRoute>
            }
          />

          <Route
            path="courses/:course_id/exams/create"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ExamCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id"
            element={
              <ProtectedRoute>
                <ExamDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id/edit"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ExamEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id/report"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ExamReport />
              </ProtectedRoute>
            }
          />

          {/* VARIANTS */}
          <Route
            path="exams/:exam_id/variants"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ExamVariantList />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id/variants/create"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ExamVariantCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id/variants/:id"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ExamVariantDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id/variants/:id/edit"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ExamVariantEdit />
              </ProtectedRoute>
            }
          />

          {/* STUDENT */}
          <Route
            path="exams/:exam_id/students/:student_id"
            element={
              <ProtectedRoute requiredRole="student">
                <ExamStart />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id/students/:student_id/edit"
            element={
              <ProtectedRoute requiredRole="student">
                <ExamTake />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id/students/:student_id/check"
            element={
              <ProtectedRoute requiredRole="student">
                <ExamCheck />
              </ProtectedRoute>
            }
          />

          <Route
            path="exams/:exam_id/students/:student_id/result"
            element={
              <ProtectedRoute requiredRole="student">
                <ExamResult />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </RoleProvider>
  );
};

export default Index;