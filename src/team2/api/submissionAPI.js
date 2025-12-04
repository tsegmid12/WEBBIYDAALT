import { 
  mockSubmissions, 
  getSubmissionById, 
  getSubmissionsByLesson,
  getSubmissionsByCourse 
} from '../utils/mockData';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for mock data modifications
let submissionsData = [...mockSubmissions];
let nextId = Math.max(...mockSubmissions.map(s => s.id)) + 1;

export const submissionAPI = {
  // Get all submissions for a course
  getSubmissionsByCourse: async (courseId) => {
    await delay();
    const submissions = getSubmissionsByCourse(parseInt(courseId));
    return { data: submissions, success: true };
  },

  // Get all submissions for a lesson
  getSubmissionsByLesson: async (lessonId) => {
    await delay();
    const submissions = submissionsData.filter(
      s => s.lesson_id === parseInt(lessonId)
    );
    return { data: submissions, success: true };
  },

  // Get submission by ID
  getSubmission: async (submissionId) => {
    await delay();
    const submission = submissionsData.find(
      s => s.id === parseInt(submissionId)
    );
    if (!submission) throw new Error('Даалгавар олдсонгүй');
    return { data: submission, success: true };
  },

  // Create new submission
  createSubmission: async (submissionData) => {
    await delay();
    
    const newSubmission = {
      id: nextId++,
      lesson_id: submissionData.lesson_id,
      user_id: submissionData.user_id,
      content: submissionData.content,
      file_url: submissionData.file_url || null,
      grade_point: null,
      status: 'submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      graded_at: null,
      teacher_comment: null
    };

    submissionsData.push(newSubmission);
    return { data: newSubmission, success: true };
  },

  // Update submission
  updateSubmission: async (submissionId, updateData) => {
    await delay();
    
    const index = submissionsData.findIndex(
      s => s.id === parseInt(submissionId)
    );
    
    if (index === -1) throw new Error('Даалгавар олдсонгүй');

    submissionsData[index] = {
      ...submissionsData[index],
      ...updateData,
      updated_at: new Date().toISOString()
    };

    return { data: submissionsData[index], success: true };
  },

  // Delete submission
  deleteSubmission: async (submissionId) => {
    await delay();
    
    const index = submissionsData.findIndex(
      s => s.id === parseInt(submissionId)
    );
    
    if (index === -1) throw new Error('Даалгавар олдсонгүй');

    submissionsData.splice(index, 1);
    return { success: true };
  },

  // Grade submission (teacher only)
  gradeSubmission: async (submissionId, gradeData) => {
    await delay();
    
    const index = submissionsData.findIndex(
      s => s.id === parseInt(submissionId)
    );
    
    if (index === -1) throw new Error('Даалгавар олдсонгүй');

    submissionsData[index] = {
      ...submissionsData[index],
      grade_point: gradeData.grade_point,
      status: 'graded',
      teacher_comment: gradeData.teacher_comment || null,
      graded_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return { data: submissionsData[index], success: true };
  },

  // Get submissions by user
  getSubmissionsByUser: async (userId) => {
    await delay();
    const submissions = submissionsData.filter(
      s => s.user_id === parseInt(userId)
    );
    return { data: submissions, success: true };
  }
};