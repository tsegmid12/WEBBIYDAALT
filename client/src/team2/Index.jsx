// client/src/team2/index.js
// Team2 module entry point

import { Routes, Route } from "react-router-dom";
import SubmissionsPage from './pages/SubmissionsPage';
import LessonSubmissionsPage from './pages/LessonSubmissionsPage';
import CreateSubmissionPage from './pages/CreateSubmissionPage';
import EditSubmissionPage from './pages/EditSubmissionPage';
import { CourseProvider } from './context/CourseContext';
import { SubmissionProvider } from './context/SubmissionContext';
import CoursesListPage from "./pages/CoursesListPage";

// Main Team2 Routes component
const Team2Routes = () => {
  return (
    <CourseProvider>
      <SubmissionProvider>
        <Routes>
          <Route index element={<CoursesListPage />} />  {/* <--- default page for /team2 */}
          {/* <Route path="/courses/list" element={<CoursesList />} /> */}
          <Route path="/courses/:course_id/submissions" element={<SubmissionsPage />} />
          <Route path="/courses/:course_id/lessons/:lesson_id/submissions" element={<LessonSubmissionsPage />} />
          <Route path="/courses/:course_id/lessons/:lesson_id/submissions/create" element={<CreateSubmissionPage />} />
          <Route path="/courses/:course_id/lessons/:lesson_id/submissions/:submission_id/edit" element={<EditSubmissionPage />} />
        </Routes>
      </SubmissionProvider>
    </CourseProvider>
  );
};

// Export pages individually for other usage
export {
  SubmissionsPage,
  LessonSubmissionsPage,
  CreateSubmissionPage,
  EditSubmissionPage
};

// Export contexts for use elsewhere if needed
export {
  CourseProvider,
  SubmissionProvider
};

// Export main Team2 routes
export default Team2Routes;


/* ============================================
   SWAGGER INTEGRATION GUIDE (STAGE 2)
   ============================================

   When ready to connect to backend API, follow these steps:

   1. UPDATE API BASE URL
   ============================================
   Create a config file: team2/config/api.config.js

   export const API_CONFIG = {
     BASE_URL: 'http://your-backend-ip:port/api',
     ENDPOINTS: {
       SUBMISSIONS: '/submissions',
       COURSES: '/courses',
       LESSONS: '/lessons'
     }
   };


   2. UPDATE API FILES
   ============================================
   Modify team2/api/submissionAPI.js:

   import { API_CONFIG } from '../config/api.config';

   export const submissionAPI = {
     getSubmissionsByCourse: async (courseId) => {
       const response = await fetch(
         `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUBMISSIONS}?course_id=${courseId}`,
         {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${getToken()}` // Add auth token
           }
         }
       );
       
       if (!response.ok) throw new Error('API request failed');
       return await response.json();
     },

     createSubmission: async (submissionData) => {
       const response = await fetch(
         `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUBMISSIONS}`,
         {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${getToken()}`
           },
           body: JSON.stringify(submissionData)
         }
       );
       
       if (!response.ok) throw new Error('Failed to create submission');
       return await response.json();
     },

     // Similarly update other methods...
   };


   3. SWAGGER API MAPPING
   ============================================
   Match your Swagger endpoints to the functions:

   Swagger Endpoint                          → API Function
   ----------------------------------------  → --------------------------
   GET    /submissions?course_id={id}       → getSubmissionsByCourse
   GET    /submissions?lesson_id={id}       → getSubmissionsByLesson
   GET    /submissions/{id}                 → getSubmission
   POST   /submissions                      → createSubmission
   PUT    /submissions/{id}                 → updateSubmission
   DELETE /submissions/{id}                 → deleteSubmission
   PATCH  /submissions/{id}/grade           → gradeSubmission


   4. ADD AUTHENTICATION
   ============================================
   Create team2/utils/auth.js:

   export const getToken = () => {
     return localStorage.getItem('authToken');
   };

   export const getUserFromToken = () => {
     const token = getToken();
     if (!token) return null;
     
     // Decode JWT token
     const payload = JSON.parse(atob(token.split('.')[1]));
     return payload;
   };

   Then update your pages to use real user data:
   
   // Instead of mock:
   const [currentUser] = useState({ id: 2, role_id: 2 });
   
   // Use real user:
   const [currentUser] = useState(getUserFromToken());


   5. ERROR HANDLING
   ============================================
   Add proper error handling in API calls:

   try {
     const data = await submissionAPI.getSubmission(id);
     setSubmission(data);
   } catch (error) {
     if (error.response?.status === 401) {
       // Handle unauthorized
       navigate('/login');
     } else if (error.response?.status === 404) {
       // Handle not found
       setError('Даалгавар олдсонгүй');
     } else {
       // Handle other errors
       setError('Алдаа гарлаа. Дахин оролдоно уу.');
     }
   }


   6. FILE UPLOAD IMPLEMENTATION
   ============================================
   For actual file uploads, modify CreateSubmissionPage.jsx:

   const handleFileUpload = async (e) => {
     const file = e.target.files[0];
     if (!file) return;

     const formData = new FormData();
     formData.append('file', file);

     try {
       const response = await fetch(
         `${API_CONFIG.BASE_URL}/upload`,
         {
           method: 'POST',
           headers: {
             'Authorization': `Bearer ${getToken()}`
           },
           body: formData
         }
       );

       const data = await response.json();
       handleFileChange(data.file_url); // Set returned URL
     } catch (error) {
       console.error('File upload failed:', error);
     }
   };


   7. TESTING CHECKLIST
   ============================================
   Before going live:
   
   □ Test all API endpoints with Swagger UI
   □ Verify authentication flow
   □ Test error scenarios (404, 401, 500)
   □ Check file upload limits and formats
   □ Test with teacher and student roles
   □ Verify data validation
   □ Test pagination if needed
   □ Check loading states
   □ Test network failure scenarios


   8. ENVIRONMENT VARIABLES
   ============================================
   Create .env file in root:

   REACT_APP_API_URL=http://your-backend-ip:port/api
   REACT_APP_UPLOAD_MAX_SIZE=10485760
   REACT_APP_ENV=development

   Then use in config:
   
   export const API_CONFIG = {
     BASE_URL: process.env.REACT_APP_API_URL,
     MAX_UPLOAD_SIZE: process.env.REACT_APP_UPLOAD_MAX_SIZE
   };

*/