// src/components/home/ActivityStats.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FileText, Building2, Users, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import { StatData } from './types';

const ActivityStats: React.FC = () => {
  const { t } = useLanguage();

  const stats: StatData[] = [
    {
      icon: FileText,
      value: 1234,
      label: t('home.stats.activeTenders'),
    },
    {
      icon: Building2,
      value: 567,
      label: t('home.stats.ongoingProjects'),
    },
    {
      icon: Users,
      value: 890,
      label: t('home.stats.registeredCompanies'),
    },
    {
      icon: TrendingUp,
      value: 95,
      label: t('home.stats.successRate'),
      suffix: '%'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t('home.stats.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.stats.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityStats;
