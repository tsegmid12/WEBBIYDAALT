import { Routes, Route } from 'react-router-dom';
import Team6Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import RoleSelector from './pages/RoleSelector';

// Exam Pages
import ExamList from './pages/ExamList';
import ExamCreate from './pages/ExamCreate';
import ExamDetail from './pages/ExamDetail';
import ExamEdit from './pages/ExamEdit';
import ExamReport from './pages/ExamReport';

// Exam Variant Pages
import ExamVariantList from './pages/ExamVariantList';
import ExamVariantCreate from './pages/ExamVariantCreate';
import ExamVariantDetail from './pages/ExamVariantDetail';
import ExamVariantEdit from './pages/ExamVariantEdit';

// Exam Taking Pages
import ExamStart from './pages/ExamStart';
import ExamTake from './pages/ExamTake';
import ExamCheck from './pages/ExamCheck';
import ExamResult from './pages/ExamResult';


const Index = () => {
  return (
    <Routes>
      <Route path='select-role' element={<RoleSelector />} />
      <Route path='' element={<Team6Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Exam Pages */}
        <Route
          path='courses/:course_id/exams'
          element={
            <ProtectedRoute requiredRole='teacher'>
              <ExamList />
            </ProtectedRoute>
          }
        />
        <Route
          path='courses/:course_id/exams/create'
          element={
            <ProtectedRoute requiredRole='teacher'>
              <ExamCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id'
          element={
            <ProtectedRoute>
              <ExamDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id/edit'
          element={
            <ProtectedRoute requiredRole='teacher'>
              <ExamEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id/report'
          element={
            <ProtectedRoute requiredRole='teacher'>
              <ExamReport />
            </ProtectedRoute>
          }
        />

        {/* Exam Variant Pages */}
        <Route
          path='exams/:exam_id/variants'
          element={
            <ProtectedRoute requiredRole='teacher'>
              <ExamVariantList />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id/variants/create'
          element={
            <ProtectedRoute requiredRole='teacher'>
              <ExamVariantCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id/variants/:id'
          element={
            <ProtectedRoute requiredRole='teacher'>
              <ExamVariantDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id/variants/:id/edit'
          element={
            <ProtectedRoute requiredRole='teacher'>
              <ExamVariantEdit />
            </ProtectedRoute>
          }
        />

        {/* Exam Taking Pages */}
        <Route
          path='exams/:exam_id/students/:student_id'
          element={
            <ProtectedRoute requiredRole='student'>
              <ExamStart />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id/students/:student_id/edit'
          element={
            <ProtectedRoute requiredRole='student'>
              <ExamTake />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id/students/:student_id/check'
          element={
            <ProtectedRoute requiredRole='student'>
              <ExamCheck />
            </ProtectedRoute>
          }
        />
        <Route
          path='exams/:exam_id/students/:student_id/result'
          element={
            <ProtectedRoute requiredRole='student'>
              <ExamResult />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default Index;
