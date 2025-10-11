import { Routes, Route } from 'react-router-dom';
import Team4Layout from './Layout';
import Home from './pages/Home';
import Favorite from './pages/favorite';
import CoursesPage from './pages/Course';
import GroupsPage from './pages/group';
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
        <Route path='course' element={<CoursesPage />}></Route>
        <Route path='course/CourseDetail' element={<CourseDetail />}></Route>
        <Route path='message' element={<Message />} />
        <Route path='notification' element={<Notification />} />
        <Route path='courses' element={<CoursesTaken />} />;
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Index;
