import React, { createContext, useContext, useState } from 'react';
import { submissionAPI } from '../api/submissionAPI';

const SubmissionContext = createContext();

export const useSubmission = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmission must be used within SubmissionProvider');
  }
  return context;
};

export const SubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch submissions by course
  const fetchSubmissionsByCourse = async (courseId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionAPI.getSubmissionsByCourse(courseId);
      setSubmissions(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch submissions by lesson
  const fetchSubmissionsByLesson = async (lessonId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionAPI.getSubmissionsByLesson(lessonId);
      setSubmissions(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch single submission
  const fetchSubmission = async (submissionId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionAPI.getSubmission(submissionId);
      setCurrentSubmission(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create submission
  const createSubmission = async (submissionData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionAPI.createSubmission(submissionData);
      setSubmissions(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update submission
  const updateSubmission = async (submissionId, updateData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionAPI.updateSubmission(submissionId, updateData);
      setSubmissions(prev => 
        prev.map(sub => sub.id === submissionId ? response.data : sub)
      );
      setCurrentSubmission(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete submission
  const deleteSubmission = async (submissionId) => {
    try {
      setLoading(true);
      setError(null);
      await submissionAPI.deleteSubmission(submissionId);
      setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Grade submission (teacher only)
  const gradeSubmission = async (submissionId, gradeData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionAPI.gradeSubmission(submissionId, gradeData);
      setSubmissions(prev => 
        prev.map(sub => sub.id === submissionId ? response.data : sub)
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    submissions,
    currentSubmission,
    loading,
    error,
    fetchSubmissionsByCourse,
    fetchSubmissionsByLesson,
    fetchSubmission,
    createSubmission,
    updateSubmission,
    deleteSubmission,
    gradeSubmission,
    setCurrentSubmission
  };

  return (
    <SubmissionContext.Provider value={value}>
      {children}
    </SubmissionContext.Provider>
  );
};