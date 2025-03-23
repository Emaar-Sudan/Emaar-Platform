import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FileText, Users, DollarSign, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';

const DashboardStats: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: FileText,
      value: 25,
      label: t('dashboard.stats.activeTenders'),
      change: '+12%'
    },
    {
      icon: Users,
      value: 150,
      label: t('dashboard.stats.totalBids'),
      change: '+8%'
    },
    {
      icon: DollarSign,
      value: 75000,
      label: t('dashboard.stats.totalValue'),
      change: '+15%'
    },
    {
      icon: TrendingUp,
      value: 92,
      label: t('dashboard.stats.successRate'),
      suffix: '%',
      change: '+5%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">
              <CountUp end={stat.value} duration={2} />
              {stat.suffix}
            </div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;