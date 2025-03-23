import api from './index';
import type { Payment } from '@/types/payment';

export const paymentsApi = {
  async createPayment(payment: Partial<Payment>) {
    const { data } = await api.post('/payments', payment);
    return data;
  },

  async getUserPayments() {
    const { data } = await api.get('/payments/my-payments');
    return data;
  },

  async updatePaymentStatus(paymentId: string, status: string) {
    const { data } = await api.patch(`/payments/${paymentId}/status`, { status });
    return data;
  }
};