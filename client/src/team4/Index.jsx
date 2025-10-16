import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Team4Layout from './Layout';
import Home from './pages/Home';
import Favorite from './pages/favorite';
import CoursesPage from './pages/Course';
import GroupsPage from './pages/group';
import GroupDetail from './components/groupDetail.jsx/GroupDetail.jsx';
import Message from './pages/message';
import Notification from './pages/notification';
import CourseDetail from './pages/Course/CourseDetail';
import CoursesTaken from './components/courses';
import NotFound from './components/notfound';
const Index = () => {
  return (
    <Routes>
      <Route path='' element={<Team4Layout />}>
        <Route index element={<Home />} />
        <Route path='favorite' element={<Favorite />} />
        <Route path='group' element={<GroupsPage />} />
        <Route path='group/:id' element={<GroupDetail />} />
        <Route path='course' element={<CoursesPage />}></Route>
        <Route path='course/:id' element={<CourseDetail />}></Route>
        {/* <Route
          path='course/CourseDetail'
          element={<LegacyCourseDetailRedirect />}
        /> */}
        <Route path='message' element={<Message />} />
        <Route path='notification' element={<Notification />} />
        <Route path='courses' element={<CoursesTaken />} />;
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Index;

// function LegacyCourseDetailRedirect() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const id = params.get('id') || '1';
//   return <Navigate to={`/team4/course/${id}`} replace />;
// }
