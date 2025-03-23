import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Gavel, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuctionsSection = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Sample data - In a real app, fetch from API
  const auctions = [
    {
      id: '1',
      title: 'مزاد معدات بناء',
      status: 'active',
      bidAmount: 50000,
      endDate: '2024-04-01'
    },
    {
      id: '2',
      title: 'مزاد سيارات',
      status: 'closed',
      bidAmount: 75000,
      endDate: '2024-03-15'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t('dashboard.myAuctions')}</h2>
        <Link
          to="/dashboard/auctions"
          className="text-primary hover:text-primary-dark flex items-center gap-2"
        >
          {t('common.viewAll')}
          <Arrow className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {auctions.map((auction) => (
          <div
            key={auction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{auction.title}</h3>
              <p className="text-sm text-gray-600">
                {t('auctions.bidAmount')}: {auction.bidAmount} SDG
              </p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-sm ${
                auction.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {t(`auctions.status.${auction.status}`)}
              </span>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(auction.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionsSection;