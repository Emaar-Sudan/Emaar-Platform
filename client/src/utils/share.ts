/**
 * Utility function for sharing content with fallback to clipboard
 */
export const shareContent = async (data: {
  title: string;
  text: string;
  url: string;
}) => {
  try {
    if (navigator.share) {
      await navigator.share(data);
      return true;
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(data.url);
      return 'clipboard';
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'NotAllowedError') {
      // User cancelled share operation - no need to show error
      return false;
    }
    throw error;
  }
};