import { Routes, Route } from "react-router-dom";
import Team6Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import RoleSelector from "./pages/RoleSelector";

// Exam Pages
import ExamList from "./pages/ExamList";
import ExamCreate from "./pages/ExamCreate";
import ExamDetail from "./pages/ExamDetail";
import ExamEdit from "./pages/ExamEdit";
import ExamReport from "./pages/ExamReport";

// Exam Variant Pages
import ExamVariantList from "./pages/ExamVariantList";
import ExamVariantCreate from "./pages/ExamVariantCreate";
import ExamVariantDetail from "./pages/ExamVariantDetail";
import ExamVariantEdit from "./pages/ExamVariantEdit";

// Exam Taking Pages
import ExamStart from "./pages/ExamStart";
import ExamTake from "./pages/ExamTake";
import ExamCheck from "./pages/ExamCheck";
import ExamResult from "./pages/ExamResult";

const Index = () => {
  return (
    <Routes>
      {/* Role selector - /team6 */}
      <Route path="/" element={<RoleSelector />} />

      {/* Main routes with Layout */}
      <Route element={<Team6Layout />}>
        {/* Home page - /team6/exams */}
        <Route
          path="/exams"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Teacher routes */}
        {/* /team6/courses/:course_id/exams */}
        <Route
          path="/courses/:course_id/exams"
          element={
            <ProtectedRoute requiredRole="teacher">
              <ExamList />
            </ProtectedRoute>
          }
        />
        {/* /team6/courses/:course_id/exams/create */}
        <Route
          path="/courses/:course_id/exams/create"
          element={
            <ProtectedRoute requiredRole="teacher">
              <ExamCreate />
            </ProtectedRoute>
          }
        />
        {/* /team6/exams/:exam_id/edit */}
        <Route
          path="/exams/:exam_id/edit"
          element={
            <ProtectedRoute requiredRole="teacher">
              <ExamEdit />
            </ProtectedRoute>
          }
        />
        {/* /team6/exams/:exam_id/report */}
        <Route
          path="/exams/:exam_id/report"
          element={
            <ProtectedRoute requiredRole="teacher">
              <ExamReport />
            </ProtectedRoute>
          }
        />

        {/* Teacher: variants */}
        {/* /team6/exams/:exam_id/variants */}
        <Route
          path="/exams/:exam_id/variants"
          element={
            <ProtectedRoute requiredRole="teacher">
              <ExamVariantList />
            </ProtectedRoute>
          }
        />
        {/* /team6/exams/:exam_id/variants/create */}
        <Route
          path="/exams/:exam_id/variants/create"
          element={
            <ProtectedRoute requiredRole="teacher">
              <ExamVariantCreate />
            </ProtectedRoute>
          }
        />
        {/* /team6/exams/:exam_id/variants/:variant_id/edit */}
        <Route
          path="/exams/:exam_id/variants/:variant_id/edit"
          element={
            <ProtectedRoute requiredRole="teacher">
              <ExamVariantEdit />
            </ProtectedRoute>
          }
        />
        {/* /team6/exams/:exam_id/variants/:variant_id */}
        <Route
          path="/exams/:exam_id/variants/:variant_id"
          element={
            <ProtectedRoute requiredRole="teacher">
              <ExamVariantDetail />
            </ProtectedRoute>
          }
        />

        {/* Student exam flow */}
        {/* /team6/exams/:exam_id/students/:student_id/edit */}
        <Route
          path="/exams/:exam_id/students/:student_id/edit"
          element={
            <ProtectedRoute requiredRole="student">
              <ExamTake />
            </ProtectedRoute>
          }
        />
        {/* /team6/exams/:exam_id/students/:student_id/check */}
        <Route
          path="/exams/:exam_id/students/:student_id/check"
          element={
            <ProtectedRoute requiredRole="student">
              <ExamCheck />
            </ProtectedRoute>
          }
        />
        {/* /team6/exams/:exam_id/students/:student_id/result */}
        <Route
          path="/exams/:exam_id/students/:student_id/result"
          element={
            <ProtectedRoute requiredRole="student">
              <ExamResult />
            </ProtectedRoute>
          }
        />
        {/* /team6/exams/:exam_id/students/:student_id */}
        <Route
          path="/exams/:exam_id/students/:student_id"
          element={
            <ProtectedRoute requiredRole="student">
              <ExamStart />
            </ProtectedRoute>
          }
        />

        {/* Generic exam detail - MUST be LAST */}
        {/* /team6/exams/:exam_id */}
        <Route
          path="/exams/:exam_id"
          element={
            <ProtectedRoute>
              <ExamDetail />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default Index;