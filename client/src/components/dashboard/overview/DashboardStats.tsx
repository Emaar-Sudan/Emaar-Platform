import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { TrendingUp, DollarSign, FileText, Gavel, Briefcase } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // نستخدم axios لجلب البيانات من API

export const DashboardStats = () => {
  const { t } = useLanguage();

  // Fetch dashboard stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/dashboard-stats'); // استدعاء API
      return data;
    }
  });

  const cards = [
    {
      icon: TrendingUp,
      title: t('dashboard.stats.successRate'),
      value: stats?.successRate || 0,
      change: '+5%',
      suffix: '%',
      color: 'text-green-500',
      loading: isLoading
    },
    {
      icon: DollarSign,
      title: t('dashboard.stats.totalValue'),
      value: stats?.totalValue || 0,
      change: '+12%',
      prefix: 'SDG',
      color: 'text-blue-500',
      loading: isLoading
    },
    {
      icon: FileText,
      title: t('dashboard.stats.tenderBids'),
      value: stats?.tenderBids || 0,
      change: '+8%',
      color: 'text-purple-500',
      loading: isLoading
    },
    {
      icon: Gavel,
      title: t('dashboard.stats.auctionBids'),
      value: stats?.auctionBids || 0,
      change: '+15%',
      color: 'text-orange-500',
      loading: isLoading
    },
    {
      icon: Briefcase,
      title: t('dashboard.stats.jobApplications'),
      value: stats?.jobApplications || 0,
      change: '+10%',
      color: 'text-indigo-500',
      loading: isLoading
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  );
};
