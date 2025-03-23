import { toast } from 'react-hot-toast';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const shareContent = async (data: ShareData, t: (key: string) => string): Promise<boolean> => {
  try {
    // First try Web Share API
    if (navigator.share && window.isSecureContext) {
      await navigator.share(data);
      return true;
    }
    
    // Fallback to clipboard
    await navigator.clipboard.writeText(data.url);
    toast.success(t('common.linkCopied'));
    return true;
  } catch (error) {
    // Don't show error for user cancellation
    if (error instanceof Error && error.name === 'AbortError') {
      return false;
    }
    
    // Handle clipboard fallback errors silently
    if (error instanceof Error && error.name === 'NotAllowedError') {
      console.warn('Share not allowed:', error);
      return false;
    }
    
    // Handle other errors
    console.error('Share error:', error);
    toast.error(t('common.shareError'));
    return false;
  }
};
