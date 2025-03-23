import { useState, useEffect } from 'react';
import { paymentsApi } from '@/services/api/payments';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Payment } from '@/types/payment';

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const data = await paymentsApi.getUserPayments();
        setPayments(data);

        // Calculate total amount for completed payments
        const total = data.reduce((sum, payment) => 
          payment.status === 'completed' ? sum + payment.amount : sum, 0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching payments:', error);
        toast.error(t('dashboard.payments.fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [t]);

  return {
    payments,
    totalAmount,
    isLoading
  };
};