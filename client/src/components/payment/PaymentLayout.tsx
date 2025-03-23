import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaymentLayoutProps {
  children: React.ReactNode;
}

export const PaymentLayout: React.FC<PaymentLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
        >
          <BackArrow className="w-5 h-5" />
          <span>{t('payment.back')}</span>
        </button>

        {children}
      </div>
    </div>
  );
};