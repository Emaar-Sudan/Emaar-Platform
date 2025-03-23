import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, DollarSign, AlertTriangle, X, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '@/utils/dateFormatters';
import { formatCurrency } from '@/utils/formatters';
import { auctionBidsApi} from '@/services/api/auctionBids';
import toast from 'react-hot-toast';
import type { AuctionBid } from '@/services/supabase/auctionBids.service';

interface AuctionBidCardProps {
  bid: AuctionBid;
  onUpdate: () => void;
}

export const AuctionBidCard: React.FC<AuctionBidCardProps> = ({ bid, onUpdate }) => {
  const { t, language } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newAmount, setNewAmount] = useState(bid.bid_amount);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [highestBidAmount, setHighestBidAmount] = useState<number | null>(null); // إضافة حالة لتخزين أعلى عرض مقدم

  useEffect(() => {
    // جلب أعلى عرض مقدم للمزاد
    const fetchHighestBidAmount = async () => {
      try {
        const highestBid = await auctionBidsService.getHighestBidAmount(bid.auction_id);
        setHighestBidAmount(highestBid);
      } catch (error) {
        console.error('Error fetching highest bid:', error);
        toast.error(t('auctions.bid.fetchHighestBidError'));
      }
    };

    if (bid.auction_id) {
      fetchHighestBidAmount();
    }
  }, [bid.auction_id, t]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'outbid':
        return 'bg-yellow-100 text-yellow-800';
      case 'won':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAmount <= highestBidAmount!) { // تعديل الشرط هنا ليشمل أعلى عرض مقدم
      toast.error(t('auctions.bid.amountTooLow'));
      return;
    }

    try {
      setIsUpdating(true);
      await auctionBidsService.updateBid(bid.id, newAmount);
      toast.success(t('auctions.bid.updateSuccess'));
      setShowUpdateForm(false);
      onUpdate();
    } catch (error) {
      console.error('Update bid error:', error);
      toast.error(t('auctions.bid.updateError'));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleWithdraw = async () => {
    if (!confirm(t('auctions.bid.withdrawConfirm'))) return;

    try {
      await auctionBidsService.withdrawBid(bid.id);
      toast.success(t('auctions.bid.withdrawSuccess'));
      onUpdate();
    } catch (error) {
      console.error('Withdraw bid error:', error);
      toast.error(t('auctions.bid.withdrawError'));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{bid.auction?.title}</h3>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(bid.bid_time, language)}</span>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(bid.status)}`}>
          {t(`auctions.bid.status.${bid.status}`)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">{t('auctions.bid.yourBid')}</p>
          <p className="font-medium">{formatCurrency(bid.bid_amount, language === 'ar' ? 'rtl' : 'ltr')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t('auctions.bid.highestBidAmount')}</p>
          <p className="font-medium">
            {highestBidAmount !== null 
              ? formatCurrency(highestBidAmount, language === 'ar' ? 'rtl' : 'ltr') 
              : t('common.loading')}
          </p>
        </div>
      </div>

      {bid.status === 'active' && (
        <div className="space-y-4">
          {showUpdateForm ? (
            <form onSubmit={handleUpdateBid} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('auctions.bid.newAmount')}
                </label>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  min={highestBidAmount! + 1} // تعديل الحد الأدنى للقيمة هنا
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn-primary py-2 px-4"
                >
                  {isUpdating ? t('common.updating') : t('common.update')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setShowUpdateForm(true)}
                className="btn-primary py-2 px-4"
              >
                {t('auctions.bid.update')}
              </button>
              <button
                onClick={handleWithdraw}
                className="px-4 py-2 text-red-600 hover:text-red-700"
              >
                {t('auctions.bid.withdraw')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
