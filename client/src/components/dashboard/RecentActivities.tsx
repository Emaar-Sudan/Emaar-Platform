import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentActivities = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Sample data - In a real app, fetch from API
  const activities = [
    {
      id: '1',
      type: 'bid',
      title: 'تقديم عرض جديد',
      description: 'قمت بتقديم عرض في مناقصة توريد معدات طبية',
      date: '2024-03-15T10:30:00'
    },
    {
      id: '2',
      type: 'auction',
      title: 'المشاركة في مزاد',
      description: 'قمت بالمشاركة في مزاد معدات البناء',
      date: '2024-03-14T15:45:00'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t('dashboard.recentActivities')}</h2>
        <Link
          to="/dashboard/activities"
          className="text-primary hover:text-primary-dark flex items-center gap-2"
        >
          {t('common.viewAll')}
          <Arrow className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
          >
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="font-semibold">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <span className="text-xs text-gray-500">
                {new Date(activity.date).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;