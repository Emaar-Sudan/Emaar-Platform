/**
 * Generates a unique ID using timestamp and random number
 * This is a simple alternative to UUID for our chat messages
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};