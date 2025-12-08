// team2/hooks/useSubmission.js
import { useState, useEffect } from 'react';
import { submissionAPI } from '../api/submissionAPI';
import { getUserById, getLessonById } from '../utils/mockData';

export const useSubmissionWithDetails = (submissionId) => {
  const [submission, setSubmission] = useState(null);
  const [user, setUser] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!submissionId) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch submission
        const submissionResponse = await submissionAPI.getSubmission(submissionId);
        const submissionData = submissionResponse.data;
        setSubmission(submissionData);

        // Fetch related user
        const userData = getUserById(submissionData.user_id);
        setUser(userData);

        // Fetch related lesson
        const lessonData = getLessonById(submissionData.lesson_id);
        setLesson(lessonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId]);

  return { submission, user, lesson, loading, error };
};

export const useSubmissionForm = (initialData = {}) => {
  const [formData, setFormData] = useState({
    content: initialData.content || '',
    file_url: initialData.file_url || null,
    ...initialData
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (fileUrl) => {
    setFormData(prev => ({
      ...prev,
      file_url: fileUrl
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.content || formData.content.trim().length < 10) {
      newErrors.content = 'Агуулга дор хаяж 10 тэмдэгт байх ёстой';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (submitCallback) => {
    if (!validate()) return false;

    try {
      setIsSubmitting(true);
      await submitCallback(formData);
      return true;
    } catch (err) {
      setErrors({ submit: err.message });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setFormData({
      content: '',
      file_url: null
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleFileChange,
    handleSubmit,
    validate,
    reset,
    setFormData
  };
};