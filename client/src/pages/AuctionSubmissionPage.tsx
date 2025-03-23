import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Upload, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import FileUpload from '../components/auctions/details/FileUpload';
import CommitmentModal from '../components/auctions/details/CommitmentModal';
import SubmissionFeeDisplay from '../components/auctions/SubmissionFeeDisplay';
import { useAuctionDetails } from '@/hooks/useAuctions';
import { useAuctionApplicationForm } from '@/hooks/useAuctionApplicationForm';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import { useAuth } from '@/contexts/AuthContext';

const AuctionSubmissionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir } = useLanguage();
  const { user } = useAuth();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const [showCommitment, setShowCommitment] = useState(false);

  const { auction, isLoading } = useAuctionDetails(id || '');
  const minBidAmount = auction ? auction.current_price : 0;

  const {
    formData,
    hasAgreed,
    setHasAgreed,
    handleChange,
    handleFileChange,
    validateForm,
  } = useAuctionApplicationForm(minBidAmount);

  useEffect(() => {
    if (!user) {
      toast.error(t('auth.required'));
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [navigate, location.pathname, t, user]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!auction?.subscription_price) {
      toast.error(t('auctions.application.invalidFee'));
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auction/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auction_id: id,
          user_id: user.id,
          bid_amount: formData.bid_amount,
          bid_amount_url: formData.bid_amount_url,
          bank_guarantee_number: formData.bank_guarantee_number,
          bank_guarantee_url: formData.bank_guarantee_url,
          bank_guarantee_date: formData.bank_guarantee_date,
          has_agreed: hasAgreed,
        }),
      });

      const result = await response.json();
      if (result.message) {
        toast.success(result.message);
        navigate(`/payment`, {
          state: {
            type: 'auction',
            id,
            amount: auction.subscription_price,
            itemNumber: auction?.auction_number,
            formData,
          },
        });
      }
    } catch (error) {
      toast.error(t('auctions.application.submitError'));
    }
  };

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
  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/auctions')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
        >
          <BackArrow className="w-5 h-5" />
          <span>{t('auctions.application.back')}</span>
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-8">
              {t('auctions.application.title')}
            </h1>

            <SubmissionFeeDisplay fee={auction.subscription_price} />

           
          <form onSubmit={handlePayment} className="space-y-8">
  <div>
    <label className="block text-sm font-medium text-gray-700">
      {t('auctions.application.bidAmount')} *
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        type="number"
        name="bid_amount"
        value={formData.bid_amount}
        onChange={handleChange}
        min={minBidAmount}
        step="0.01"
        className="block w-full p-4 border rounded-lg bg-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
        required
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="text-gray-500 sm:text-sm"> </span>
      </div>
    </div>
    <p className="mt-1 text-sm text-gray-500">
      {t('auctions.application.minBidAmount')}: {minBidAmount} SDG 
    </p>
  </div>

  <FileUpload
    label={t('auctions.application.bidAmountFile')}
    accept=".pdf"
    icon={FileText}
    onChange={(file) => handleFileChange('bid_amount_url', file)}
    value={formData.bid_amount_url}
    required
    maxSize={5}
  />

  <FileUpload
    label={t('auctions.application.bankGuarantee')}
    accept=".pdf"
    icon={FileText}
    onChange={(file) => handleFileChange('bank_guarantee_url', file)}
    value={formData.bank_guarantee_url}
    required
    maxSize={5}
  />

  <div>
    <label className="block text-sm font-medium text-gray-700">
      {t('auctions.application.bankGuaranteeNumber')} *
    </label>
    <input
      type="text"
      name="bank_guarantee_number"
      value={formData.bank_guarantee_number}
      onChange={handleChange}
      className="mt-1 w-full p-4 border rounded-lg bg-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      {t('auctions.application.bankGuaranteeDate')} *
    </label>
    <input
      type="date"
      name="bank_guarantee_date"
      value={formData.bank_guarantee_date}
      onChange={handleChange}
      className="mt-1 w-full p-4 border rounded-lg bg-gray-100 focus:border-primary focus:ring-primary sm:text-sm"
      required
    />
  </div>

  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
    <button
      type="button"
      onClick={() => setShowCommitment(true)}
      className="btn-secondary py-2 px-4"
    >
      {t('auctions.application.viewTerms')}
    </button>
    <div className="flex-1">
      <p className="text-sm text-gray-600">
        {t('auctions.application.termsDescription')}
      </p>
    </div>
  </div>

  <button
    type="submit"
    disabled={!hasAgreed}
    className={`w-full btn-primary py-3 flex items-center justify-center gap-2 ${
      !hasAgreed ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    <Upload className="w-5 h-5" />
    {t('auctions.application.proceedToPayment')}
  </button>
</form>
          </div>
        </div>

        <CommitmentModal
          isOpen={showCommitment}
          onClose={() => setShowCommitment(false)}
          onAgree={() => {
            setHasAgreed(true);
            setShowCommitment(false);
            toast.success(t('auctions.application.agreementConfirmed'));
          }}
        />
      </div>
    </div>
  );
};

export default AuctionSubmissionPage;