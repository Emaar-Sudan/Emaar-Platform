import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface PaymentStatsProps {
  totalAmount: number;
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({ totalAmount }) => {
  const { t, dir } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('dashboard.payments.totalAmount')}</p>
            <p className="text-2xl font-bold">{formatCurrency(totalAmount, dir)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};