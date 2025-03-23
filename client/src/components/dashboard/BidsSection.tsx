import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Package, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BidsSection = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Sample data - In a real app, fetch from API
  const bids = [
    {
      id: '1',
      title: 'توريد معدات طبية',
      status: 'accepted',
      amount: 100000,
      date: '2024-03-15'
    },
    {
      id: '2',
      title: 'مشروع بناء مدرسة',
      status: 'rejected',
      amount: 500000,
      date: '2024-03-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t('dashboard.myBids')}</h2>
        <Link
          to="/dashboard/bids"
          className="text-primary hover:text-primary-dark flex items-center gap-2"
        >
          {t('common.viewAll')}
          <Arrow className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {bids.map((bid) => (
          <div
            key={bid.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{bid.title}</h3>
              <p className="text-sm text-gray-600">
                {t('bids.amount')}: {bid.amount} SDG
              </p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(bid.status)}`}>
                {t(`bids.status.${bid.status}`)}
              </span>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(bid.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidsSection;