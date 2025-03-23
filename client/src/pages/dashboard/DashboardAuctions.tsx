import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { AuctionsList } from '@/components/dashboard/auctions/AuctionsList';
import { auctionBidsApi } from '@/services/api/auctionBids';
import toast from 'react-hot-toast';

const DashboardAuctions = () => {
  const { t } = useLanguage();
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBids = async () => {
    try {
      setIsLoading(true);
      const data = await auctionBidsService.getUserBids();
      setBids(data);
    } catch (error) {
      console.error('Error fetching bids:', error);
      toast.error(t('dashboard.auctions.fetchError'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.auctions.title')}</h1>
        <AuctionsList 
          bids={bids} 
          isLoading={isLoading}
          onUpdate={fetchBids}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardAuctions;