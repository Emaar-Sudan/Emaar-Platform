import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Filter } from 'lucide-react';

interface JobsFiltersProps {
  filters: {
    status: string;
    dateRange: string;
  };
  onFilterChange: (filters: any) => void;
}

export const JobsFilters: React.FC<JobsFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <h2 className="font-semibold">{t('dashboard.jobs.filters')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('dashboard.jobs.filterStatus')}
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t('dashboard.jobs.filterAll')}</option>
            <option value="pending">{t('dashboard.jobs.filterPending')}</option>
            <option value="under_review">{t('dashboard.jobs.filterUnderReview')}</option>
            <option value="accepted">{t('dashboard.jobs.filterAccepted')}</option>
            <option value="rejected">{t('dashboard.jobs.filterRejected')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('dashboard.jobs.filterDate')}
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t('dashboard.jobs.filterAllTime')}</option>
            <option value="week">{t('dashboard.jobs.filterThisWeek')}</option>
            <option value="month">{t('dashboard.jobs.filterThisMonth')}</option>
            <option value="year">{t('dashboard.jobs.filterThisYear')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};