// src/components/tenders/TenderFilters.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Filter } from 'lucide-react';

interface TenderFiltersProps {
  filters: {
    status: string;
    category: string;
    region: string;
  };
  onFilterChange: (filters: any) => void;
}

const TenderFilters: React.FC<TenderFiltersProps> = ({ filters, onFilterChange }) => {
  const { t } = useLanguage();

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('tenders.filters.status')}
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('tenders.filters.allStatus')}</option>
          <option value="published">{t('tenders.filters.published')}</option>
          <option value="under_review">{t('tenders.filters.underReview')}</option>
          <option value="closed">{t('tenders.filters.closed')}</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('tenders.filters.category')}
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('tenders.filters.allCategories')}</option>
          <option value="government">{t('tenders.filters.government')}</option>
          <option value="private">{t('tenders.filters.private')}</option>
        </select>
      </div>

      {/* Region Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('tenders.filters.region')}
        </label>
        <select
          value={filters.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('tenders.filters.allRegions')}</option>
          <option value="الخرطوم">الخرطوم</option>
          <option value="أم درمان">أم درمان</option>
          <option value="بحري">بحري</option>
          <option value="دارفور">دارفور</option>
          <option value="كردفان">كردفان</option>
        </select>
      </div>
    </div>
  );
};

export default TenderFilters;
