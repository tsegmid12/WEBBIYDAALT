import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Team4Layout from "./Layout";
import Home from "./pages/Home";
import Favorite from "./pages/favorite";
import CoursesPage from "./pages/Course";
import GroupsPage from "./pages/group";
import GroupDetail from "./components/groupDetail.jsx/GroupDetail.jsx";
import Message from "./pages/message";
import Notification from "./pages/notification";
import CourseDetail from "./pages/Course/CourseDetail";
import CoursesTaken from "./components/courses";
import NotFound from "./components/notfound";
import { Login } from "./auth/Login.jsx";
import { ForgotPassword } from "./auth/ForgotPassword.jsx";
import { ResetPassword } from "./auth/ResetPassword.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminPage from "./admin/AdminPage.jsx";
import { OTP } from "./auth/Otp.jsx";
import AdminSettings from "./admin/AdminSettings.jsx";
import { AdminReports } from "./admin/AdminReports.jsx";
import { AdminClasses } from "./admin/AdminClasses.jsx";
import { AdminUsers } from "./admin/AdminUsers.jsx";
import { AdminDashboard } from "./admin/AdminDashboard.jsx";
import { AdminClassForm } from "./admin/AdminClassForm.jsx";
import { AdminUserForm } from "./admin/AdminUserForm.jsx";
import TeacherHome from "./teacher/TeacherHome.jsx";
import TeacherCourses from "./teacher/TeacherCourses.jsx";
import TeacherCourseDetail from "./teacher/TeacherCourseDetail.jsx";
import TeacherGroups from "./teacher/Teacher.jsx";
import TeacherGroupDetail from "./teacher/TeacherGroupDetail.jsx";
import TeacherFavorites from "./teacher/TeacherFavorites.jsx";
import TeacherNotifications from "./teacher/TeacherNotifications.jsx";
import TeacherStudentDetail from "./teacher/TeacherStudentDetail.jsx";
import { DataProvider } from "./teacher/DataContext.jsx";
import TeacherLayout from "./teacher/TeacherLayout.jsx";
import TeacherTodayClasses from "./teacher/TeacherTodayClasses.jsx";
import { AdminSchools } from "./admin/AdminSchools.jsx";
import { AdminSchoolForm } from "./admin/AdminSchoolForm.jsx";

const RootRedirect = () => {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <Navigate to="/team4" replace />;
  }

  if (pathname === "/team4" || pathname === "/team4/") {
    return <Login />;
  }

  return null;
};

const Index = () => {
  return (
    <>
      {/* <RootRedirect /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="otp" element={<OTP />} />

        {/* Admin (restricted) */}
        <Route
          element={<ProtectedRoute allowedRoles={["admin", "schooladmin"]} />}
        >
          <Route path="admin/*" element={<AdminPage />} />
          <Route path="admin/settings" element={<AdminSettings />} />
          <Route path="admin/reports" element={<AdminReports />} />
          <Route path="admin/classes" element={<AdminClasses />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/classes/add" element={<AdminClassForm />} />
          <Route path="admin/users/add" element={<AdminUserForm />} />
          <Route path="admin/schools" element={<AdminSchools />} />
          <Route
            path="admin/schools/add"
            element={<AdminSchoolForm isNew={true} />}
          />
          <Route
            path="admin/schools/:id/edit"
            element={<AdminSchoolForm isNew={false} />}
          />
        </Route>

        {/* Student (restricted) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["student", "schoolstudent"]} />
          }
        >
          <Route element={<Team4Layout />}>
            {/* <Route index element={<Navigate to="student" replace />} /> */}
            <Route path="student" element={<Home />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="group" element={<GroupsPage />} />
            <Route path="group/:id" element={<GroupDetail />} />
            <Route path="course" element={<CoursesPage />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="message" element={<Message />} />
            <Route path="notification" element={<Notification />} />
            <Route path="courses" element={<CoursesTaken />} />
          </Route>
        </Route>

        {/* Teacher (restricted) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["teacher", "schoolteacher"]} />
          }
        >
          <Route
            element={
              <DataProvider>
                <TeacherLayout />
              </DataProvider>
            }
          >
            <Route path="teacher" element={<TeacherHome />} />
            <Route path="teacher/courses" element={<TeacherCourses />} />
            <Route
              path="teacher/course/:id"
              element={<TeacherCourseDetail />}
            />
            <Route path="teacher/groups" element={<TeacherGroups />} />
            <Route path="teacher/group/:id" element={<TeacherGroupDetail />} />
            <Route path="teacher/favorites" element={<TeacherFavorites />} />
            <Route
              path="teacher/notifications"
              element={<TeacherNotifications />}
            />
            <Route
              path="teacher/student/:id"
              element={<TeacherStudentDetail />}
            />
            <Route
              path="teacher/todayClasses"
              element={<TeacherTodayClasses />}
            />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Index;

// function LegacyCourseDetailRedirect() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const id = params.get('id') || '1';
//   return <Navigate to={`/team4/course/${id}`} replace />;
// }
