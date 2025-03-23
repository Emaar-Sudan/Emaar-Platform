import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { X, Check, FileText } from 'lucide-react';

interface CommitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const CommitmentModal: React.FC<CommitmentModalProps> = ({ isOpen, onClose, onAgree }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">{t('auctions.bid.termsTitle')}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="prose max-w-none mb-6">
            <h3>{t('auctions.bid.termsSection1')}</h3>
            <p>{t('auctions.bid.termsContent1')}</p>

            <h3>{t('auctions.bid.termsSection2')}</h3>
            <p>{t('auctions.bid.termsContent2')}</p>

            <h3>{t('auctions.bid.termsSection3')}</h3>
            <p>{t('auctions.bid.termsContent3')}</p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={onAgree}
              className="btn-primary py-2 px-4 flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              {t('auctions.bid.agree')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitmentModal;