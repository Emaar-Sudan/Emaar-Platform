import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Share2, Gavel } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { type Auction } from '../../types';
import { useShare } from '../../hooks/useShare';

interface AuctionActionsProps {
  auction: Auction;
  onViewDetails?: () => void;
  variant: 'list' | 'details';
}

const AuctionActions: React.FC<AuctionActionsProps> = ({
  auction,
  onViewDetails,
  variant
}) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { share, isSharing } = useShare();

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    await share({
      title: auction.title[language],
      text: auction.description[language],
      url: window.location.href
    });
  };

  const handleSubmitBid = () => {
    if (auction.status !== 'active') {
      return;
    }
    navigate(`/auctions/${auction.id}/submit`, {
      state: { auction }
    });
  };

  if (variant === 'list') {
    return (
      <div className="flex gap-3">
        <button 
          onClick={onViewDetails}
          className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          {t('auctions.viewDetails')}
        </button>
        <button 
          onClick={handleShare}
          disabled={isSharing}
          className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-secondary-light active:bg-secondary-dark disabled:opacity-50"
        >
          <Share2 className="w-4 h-4" />
          {t('auctions.share')}
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleSubmitBid}
      disabled={auction.status !== 'active'}
      className={`w-full bg-secondary text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
        auction.status !== 'active' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary-light active:bg-secondary-dark'
      }`}
    >
      <Gavel className="w-5 h-5" />
      {t('auctions.submitBid')}
    </button>
  );
};

export default AuctionActions;
