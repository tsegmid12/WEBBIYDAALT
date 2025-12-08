export const calculateGradePercentage = (gradePoint, maxPoint) => {
  if (!gradePoint || !maxPoint || maxPoint === 0) return 0;
  return Math.round((gradePoint / maxPoint) * 100);
};

export const getGradeColor = (percentage) => {
  if (percentage >= 90) return 'text-green-600 bg-green-50';
  if (percentage >= 80) return 'text-blue-600 bg-blue-50';
  if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
  if (percentage >= 60) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
};

export const getGradeLabel = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

export const getStatusBadge = (status) => {
  const badges = {
    pending: { label: 'Хүлээгдэж буй', color: 'bg-gray-100 text-gray-700' },
    submitted: { label: 'Илгээсэн', color: 'bg-blue-100 text-blue-700' },
    graded: { label: 'Үнэлэгдсэн', color: 'bg-green-100 text-green-700' },
    late: { label: 'Хоцорсон', color: 'bg-red-100 text-red-700' }
  };
  
  return badges[status] || badges.pending;
};

export const calculateTotalPoints = (submissions) => {
  return submissions.reduce((total, sub) => {
    return total + (sub.grade_point || 0);
  }, 0);
};

export const calculateAverageGrade = (submissions) => {
  const gradedSubmissions = submissions.filter(s => s.grade_point !== null);
  if (gradedSubmissions.length === 0) return 0;
  
  const total = calculateTotalPoints(gradedSubmissions);
  return Math.round(total / gradedSubmissions.length);
};