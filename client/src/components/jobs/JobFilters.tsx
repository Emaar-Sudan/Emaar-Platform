// src/components/jobs/JobFilters.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building2, Briefcase } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    entity: string;
    type: string;
    location: string;
  };
  onFilterChange: (filters: any) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFilterChange }) => {
  const { t } = useLanguage();

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Entity Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Building2 className="inline-block w-4 h-4 mr-2" />
          {t('jobs.filters.entity')}
        </label>
        <select
          value={filters.entity}
          onChange={(e) => handleFilterChange('entity', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('jobs.filters.allEntities')}</option>
          <option value="government">{t('jobs.filters.government')}</option>
          <option value="companies">{t('jobs.filters.companies')}</option>
        </select>
      </div>

      {/* Job Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Briefcase className="inline-block w-4 h-4 mr-2" />
          {t('jobs.filters.type')}
        </label>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('jobs.filters.allTypes')}</option>
          <option value="full_time">{t('jobs.types.fullTime')}</option>
          <option value="part_time">{t('jobs.types.partTime')}</option>
          <option value="contract">{t('jobs.types.contract')}</option>
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('jobs.filters.location')}
        </label>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('jobs.filters.allLocations')}</option>
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

export default JobFilters;
