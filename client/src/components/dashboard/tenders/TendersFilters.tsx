import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Filter } from 'lucide-react';

interface TendersFiltersProps {
  filters: {
    status: string;
    dateRange: string;
  };
  onFilterChange: (filters: any) => void;
}

export const TendersFilters: React.FC<TendersFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <h2 className="font-semibold">{t('dashboard.tenders.filters')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('dashboard.tenders.filterStatus')}
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t('dashboard.tenders.filterAll')}</option>
            <option value="active">{t('dashboard.tenders.filterActive')}</option>
            <option value="under_review">{t('dashboard.tenders.filterUnderReview')}</option>
            <option value="accepted">{t('dashboard.tenders.filterAccepted')}</option>
            <option value="rejected">{t('dashboard.tenders.filterRejected')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('dashboard.tenders.filterDate')}
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t('dashboard.tenders.filterAllTime')}</option>
            <option value="week">{t('dashboard.tenders.filterThisWeek')}</option>
            <option value="month">{t('dashboard.tenders.filterThisMonth')}</option>
            <option value="year">{t('dashboard.tenders.filterThisYear')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};