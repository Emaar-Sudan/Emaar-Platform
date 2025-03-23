import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Tag,
  Info,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { calculateTimeRemaining } from '../utils/timeCalculations';
import { useAuctionDetails } from '../hooks/useAuctionDetails';
import { LoadingScreen } from '../components/ui/LoadingIndicator';
import toast from 'react-hot-toast';

const AuctionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const { user } = useAuth();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const { auction, isLoading } = useAuctionDetails(id || '');

  if (isLoading) {
    return <LoadingScreen message={t('auctions.loading')} />;
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('auctions.notFound')}</h1>
          <button
            onClick={() => navigate('/auctions')}
            className="text-primary hover:underline"
          >
            {t('auctions.backToList')}
          </button>
        </div>
      </div>
    );
  }

  const { timeLeft, progress } = calculateTimeRemaining(auction.end_date);

  const handleBidSubmission = () => {
    if (!user) {
      toast.error(t('login.firstLogin'), { duration: 3000 });
      setTimeout(() => {
        navigate('/login', { state: { from: location.pathname } });
      }, 3000);
    } else {
      navigate(`/auctions/${auction.id}/submit`);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/auctions')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
        >
          <BackArrow className="w-5 h-5" />
          <span>{t('auctions.backToList')}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Status Badge */}
              <div className="mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(auction.status)}`}>
                  {t(`auctions.status.${auction.status}`)}
                </span>
              </div>

              {/* Auction Images */}
              <div className="relative mb-6">
                <h2 className="text-xl font-bold mb-4">{t('auctions.images')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.isArray(auction.images) && auction.images.map((image, index) => (
                    <div key={index} className="relative h-48">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Auction Title */}
              <h1 className="text-2xl font-bold mb-4">{auction.title}</h1>

              {/* Description */}
              <p className="text-gray-600 mb-6">{auction.description}</p>

              {/* Auction Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <span>{auction.auction_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{auction.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span>{t(`auctions.categories.${auction.category}`)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{new Date(auction.end_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span>{auction.starting_price} SDG</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span>{auction.current_price} SDG</span>
                </div>
              </div>

              {/* Item Condition */}
              <div className="mb-6">
                <h3 className="font-bold mb-2">{t('auctions.itemCondition')}</h3>
                <p className="text-gray-600">{auction.item_condition}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rules Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                {t('auctions.rules')}
              </h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {Array.isArray(auction.rules) && auction.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                {t('auctions.notes')}
              </h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                {Array.isArray(auction.notes) && auction.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Bid Button */}
            {auction.status === 'active' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <button
                onClick={handleBidSubmission}
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                {t('auctions.submitBid')}
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailsPage;
