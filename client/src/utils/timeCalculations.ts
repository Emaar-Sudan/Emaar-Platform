export const calculateTimeRemaining = (endDate: string) => {
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  const total = end - now;
  
  if (total <= 0) {
    return { progress: 100, timeLeft: '00:00:00' };
  }
  
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  
  const duration = new Date(endDate).getTime() - new Date().getTime();
  const progress = ((duration - total) / duration) * 100;

  return {
    progress,
    timeLeft: `${days}d ${hours}h ${minutes}m`
  };
};