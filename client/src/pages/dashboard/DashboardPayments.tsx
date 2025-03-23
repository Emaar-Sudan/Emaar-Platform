import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { PaymentsList } from '@/components/dashboard/payments/PaymentsList';
import { PaymentStats } from '@/components/dashboard/payments/PaymentStats';
import { usePayments } from '@/hooks/usePayments';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';

const DashboardPayments = () => {
  const { t } = useLanguage();
  const { payments, totalAmount, isLoading } = usePayments();

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingScreen message={t('loading')} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.payments.title')}</h1>
        
        <PaymentStats totalAmount={totalAmount} />
        <PaymentsList payments={payments} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPayments;