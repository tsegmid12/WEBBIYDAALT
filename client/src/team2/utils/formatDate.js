
export const formatDate = (dateString) => {
  if (!dateString) return 'Тодорхойгүй';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Relative time
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} минутын өмнө`;
    }
    return `${diffHours} цагийн өмнө`;
  }
  
  if (diffDays === 1) return 'Өчигдөр';
  if (diffDays === 2) return 'Уржигдар';
  if (diffDays < 7) return `${diffDays} хоногийн өмнө`;
  
  // Absolute date
  return date.toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'Тодорхойгүй';
  
  const date = new Date(dateString);
  return date.toLocaleString('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleTimeString('mn-MN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};