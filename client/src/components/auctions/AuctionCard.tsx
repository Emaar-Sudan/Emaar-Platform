import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Clock, DollarSign, Building2, Tag, Share2, Eye } from 'lucide-react';
import { formatDate } from '@/utils/dateFormatters';
import toast from 'react-hot-toast';
import type { Auction } from '@/services/supabase/auctions.service';

interface AuctionCardProps {
  auction: Auction;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.share({
        title: auction?.title || t('auctions.defaultTitle'),
        text: auction?.description || '',
        url: window.location.href,
      });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error(t('auctions.shareError'));
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={
            auction?.images?.length > 0
              ? auction.images[0]
              : '/path/to/default-image.jpg' // استخدم صورة افتراضية هنا
          }
          alt={auction?.title || t('auctions.defaultAlt')}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              getStatusColor(auction?.status || 'unknown')
            }`}
          >
            {t(`auctions.status.${auction?.status || 'unknown'}`)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-600">{auction?.auction_number || 'N/A'}</span>
        </div>

        <h3 className="text-xl font-bold mb-4">
          {auction?.title || t('auctions.defaultTitle')}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>
              {t(`auctions.categories.${auction?.category || 'unknown'}`)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{auction?.region || t('auctions.defaultRegion')}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {auction?.end_date
                ? formatDate(auction.end_date, language)
                : t('auctions.defaultEndDate')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>
              {auction?.starting_price
                ? auction.starting_price.toLocaleString()
                : t('auctions.defaultPrice')}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/auctions/${auction?.id || ''}`)}
            className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {t('auctions.viewDetails')}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-secondary-light active:bg-secondary-dark"
          >
            <Share2 className="w-4 h-4" />
            {t('auctions.share')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
