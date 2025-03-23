// src/components/payment/PaymentContainer.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import PaymentForm from './PaymentForm';
import PaymentSummary from './PaymentSummary';
import SecurityBadges from './SecurityBadges';

interface PaymentContainerProps {
  itemNumber: string;
  amount: number;
  fees: number;
  tax: number;
  total: number;
  isProcessing: boolean;
  onSubmit: (formData: any) => void;
}

export const PaymentContainer: React.FC<PaymentContainerProps> = ({
  itemNumber,
  amount,
  fees,
  tax,
  total,
  isProcessing,
  onSubmit,
}) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center mb-12">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="h-24 object-contain mb-6"
        />

        {/* Text for Payment Methods */}
        <h3 className="text-lg font-semibold mb-4">
          {t('payment.availableMethods')}
        </h3>

        {/* Payment Icons */}
        <div className="flex items-center gap-4 mb-4">
          {[1, 2, 3].map((num) => (
            <img
              key={num}
              src={`/assets/payment-icon/${num}.png`}
              alt={`Payment Method ${num}`}
              className="h-8 w-auto object-contain"
            />
          ))}
        </div>

        {/* Additional Description */}
        <div className="text-center">
          <h3 className="font-semibold">{t('payment.security.encryption')}</h3>
          <p className="text-sm text-gray-600">
            {t('payment.security.encryptionDesc')}
          </p>
            <h3 className="font-semibold">{t('payment.security.secure')}</h3>
            <p className="text-sm text-gray-600">{t('payment.security.secureDesc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-8">{t('payment.title')}</h1>
            <PaymentForm onSubmit={onSubmit} isProcessing={isProcessing} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PaymentSummary
            itemNumber={itemNumber}
            amount={amount}
            fees={fees}
            tax={tax}
            total={total}
          />

          {/* Payment Button */}
          <button
            onClick={() => onSubmit({})}
            disabled={isProcessing}
            className={`w-full btn-primary py-3 flex items-center justify-center gap-2 ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? t('payment.processing') : t('payment.pay')}
          </button>
        </div>
      </div>
    </div>
  );
};
