import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BackButtonProps {
  onBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  const { t, dir } = useLanguage();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 group"
    >
      <BackArrow className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      <span>{t('signup.back')}</span>
    </button>
  );
};