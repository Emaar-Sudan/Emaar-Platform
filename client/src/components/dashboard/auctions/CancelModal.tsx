import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { AlertTriangle, X } from 'lucide-react';
import { useAuctions } from '../../../hooks/useAuctions';
import toast from 'react-hot-toast';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  auctionId: string;
}

export const CancelModal: React.FC<CancelModalProps> = ({
  isOpen,
  onClose,
  auctionId,
}) => {
  const { t } = useLanguage();
  const { cancelBid } = useAuctions();
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error(t('dashboard.auctions.cancelReasonRequired'));
      return;
    }

    try {
      setIsSubmitting(true);
      await cancelBid(auctionId, reason);
      toast.success(t('dashboard.auctions.cancelSuccess'));
      onClose();
    } catch (error) {
      toast.error(t('dashboard.auctions.cancelError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">{t('dashboard.auctions.cancelTitle')}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('dashboard.auctions.cancelReason')}
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? t('common.submitting') : t('common.confirm')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};