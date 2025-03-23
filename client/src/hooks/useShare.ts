import { useState } from 'react';
import { shareContent } from '../utils/sharing';
import { useLanguage } from '../contexts/LanguageContext';

interface ShareConfig {
  title: string;
  text: string;
  url: string;
}

export const useShare = () => {
  const { t } = useLanguage();
  const [isSharing, setIsSharing] = useState(false);

  const share = async (config: ShareConfig) => {
    if (isSharing) return;
    
    try {
      setIsSharing(true);
      await shareContent(config, t);
    } finally {
      setIsSharing(false);
    }
  };

  return {
    share,
    isSharing
  };
};
