import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Gavel, Calendar, AlertTriangle, X, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { UserAuction } from '../../../types/auction';
import { CancelModal } from './CancelModal';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { formatCurrency } from '../../../utils/formatters';

interface AuctionCardProps {
  auction: UserAuction;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  const { t, language } = useLanguage();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'won':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return Clock;
      case 'under_review':
        return AlertTriangle;
      case 'won':
        return CheckCircle;
      case 'lost':
        return X;
      default:
        return Gavel;
    }
  };

  const StatusIcon = getStatusIcon(auction.status);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${getStatusColor(auction.status)}`}>
            <StatusIcon className="w-6 h-6" />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-1">{auction.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDistanceToNow(new Date(auction.bidDate), {
                  addSuffix: true,
                  locale: language === 'ar' ? ar : enUS
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(auction.status)}`}>
            {t(`dashboard.auctions.status.${auction.status}`)}
          </span>
          {auction.status === 'active' && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="block mt-2 text-sm text-red-600 hover:text-red-700"
            >
              {t('dashboard.auctions.cancel')}
            </button>
          )}
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">{t('dashboard.auctions.reference')}</p>
            <p className="font-medium">{auction.reference}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('dashboard.auctions.bidAmount')}</p>
            <p className="font-medium">{formatCurrency(auction.bidAmount, language === 'ar' ? 'rtl' : 'ltr')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('dashboard.auctions.currentHighest')}</p>
            <p className="font-medium">{formatCurrency(auction.currentHighestBid, language === 'ar' ? 'rtl' : 'ltr')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('dashboard.auctions.entity')}</p>
            <p className="font-medium">{auction.entity}</p>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        auctionId={auction.id}
      />
    </div>
  );
};