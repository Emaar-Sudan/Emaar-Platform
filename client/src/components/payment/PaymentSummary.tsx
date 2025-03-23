import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Receipt, FileText } from 'lucide-react';

interface PaymentSummaryProps {
  itemNumber: string;
  amount: number;
  fees: number;
  tax: number;
  total: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  itemNumber,
  amount,
  fees,
  tax,
  total
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Receipt className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">{t('payment.summary')}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{t('payment.referenceNumber')}</span>
          </div>
          <span className="font-medium">{itemNumber}</span>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>{t('payment.amount')}</span>
            <span>{amount.toFixed(2)} SDG</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{t('payment.serviceFee')}</span>
            <span>{fees.toFixed(2)} SDG</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{t('payment.vat')}</span>
            <span>{tax.toFixed(2)} SDG</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>{t('payment.total')}</span>
            <span>{total.toFixed(2)} SDG</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;