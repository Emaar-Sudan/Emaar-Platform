import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuctionBidCard } from './AuctionBidCard';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import type { AuctionBid } from '@/services/api/auctionBids';

interface AuctionsListProps {
  bids: AuctionBid[] | undefined | null;  // يمكن أن يكون null أيضًا
  isLoading: boolean;
  onUpdate: () => void;
}

export const AuctionsList: React.FC<AuctionsListProps> = ({ 
  bids, 
  isLoading,
  onUpdate
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return <LoadingScreen message={t('loading')} />;
  }

  // التحقق من أن bids هي مصفوفة غير فارغة
  if (!Array.isArray(bids) || bids.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-600">{t('dashboard.auctions.noBids')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bids.map((bid) => (
        <AuctionBidCard 
          key={bid.id} 
          bid={bid}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
