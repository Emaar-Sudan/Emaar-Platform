import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, FileText, Gavel } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { generatePDFReport } from '@/utils/pdfGenerator';
import toast from 'react-hot-toast';
import type { Payment } from '@/types/payment';

interface PaymentsListProps {
  payments: Payment[];
}

export const PaymentsList: React.FC<PaymentsListProps> = ({ payments }) => {
  const { t, dir } = useLanguage();

  const handleDownload = async (payment: Payment) => {
    try {
      await generatePDFReport({
        transactionId: payment.transaction_id,
        amount: payment.amount,
        date: new Date(payment.created_at).toLocaleDateString(),
        type: payment.type,
        reference: payment.reference_number,
        status: payment.status
      });
      toast.success(t('dashboard.payments.receiptDownloaded'));
    } catch (error) {
      console.error('Error generating receipt:', error);
      toast.error(t('dashboard.payments.receiptError'));
    }
  };

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-600">{t('dashboard.payments.noPayments')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                {t('dashboard.payments.type')}
              </th>
              <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                {t('dashboard.payments.reference')}
              </th>
              <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                {t('dashboard.payments.name')}
              </th>
              <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                {t('dashboard.payments.transactionId')}
              </th>
              <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                {t('dashboard.payments.amount')}
              </th>
              <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                {t('dashboard.payments.status')}
              </th>
              <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                {t('dashboard.payments.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {payment.type === 'tender' ? (
                      <FileText className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Gavel className="w-5 h-5 text-green-500" />
                    )}
                    <span>{t(`dashboard.payments.types.${payment.type}`)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{payment.reference_number}</td>
                <td className="px-6 py-4">{payment.item_name}</td>
                <td className="px-6 py-4">{payment.transaction_id}</td>
                <td className="px-6 py-4 font-medium">
                  {formatCurrency(payment.amount, dir)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    payment.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t(`dashboard.payments.status.${payment.status}`)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDownload(payment)}
                    className="text-primary hover:text-primary-dark"
                    title={t('dashboard.payments.downloadReceipt')}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};