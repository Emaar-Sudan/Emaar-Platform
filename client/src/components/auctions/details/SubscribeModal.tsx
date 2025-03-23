import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { X, DollarSign, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

interface SubscribeModalProps {
  auction: any;
  onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ auction, onClose }) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(t('auctions.subscribeSuccess'));
      onClose();
    } catch (error) {
      toast.error(t('auctions.subscribeError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{t('auctions.subscribe')}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auctions.subscriptionDetails')}
              </label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span>{t('auctions.subscriptionPrice')}</span>
                  <span className="font-bold">{auction.subscriptionPrice} SDG</span>
                </div>
                <p className="text-sm text-gray-600">
                  {t('auctions.subscriptionNote')}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auctions.paymentMethod')}
              </label>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <CreditCard className="w-6 h-6 text-primary" />
                <span>{t('auctions.creditCard')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary py-3 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <DollarSign className="w-5 h-5" />
              {isSubmitting ? t('auctions.processing') : t('auctions.confirmSubscription')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;