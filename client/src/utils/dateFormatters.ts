import { format, formatDistanceToNow, isValid } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

export const formatDate = (date: string | Date, language: string = 'en'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(dateObj)) {
      return '-';
    }
    return format(dateObj, 'PPP', {
      locale: language === 'ar' ? ar : enUS
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return '-';
  }
};

export const formatRelativeTime = (date: string | Date, language: string = 'en'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(dateObj)) {
      return '-';
    }
    return formatDistanceToNow(dateObj, {
      addSuffix: true,
      locale: language === 'ar' ? ar : enUS
    });
  } catch (error) {
    console.error('Relative time formatting error:', error);
    return '-';
  }
};

export const isValidDate = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isValid(dateObj);
  } catch {
    return false;
  }
};