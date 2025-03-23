// src/components/projects/ProjectFilters.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building2, Clock } from 'lucide-react';

interface ProjectFiltersProps {
  filters: {
    status: string;
    type: string;
    region: string;
  };
  onFilterChange: (filters: any) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ filters, onFilterChange }) => {
  const { t } = useLanguage();

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Clock className="inline-block w-4 h-4 mr-2" />
          {t('projects.filters.status')}
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('projects.filters.allStatus')}</option>
          <option value="active">{t('projects.filters.active')}</option>
          <option value="planning">{t('projects.filters.planning')}</option>
          <option value="completed">{t('projects.filters.completed')}</option>
        </select>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Building2 className="inline-block w-4 h-4 mr-2" />
          {t('projects.filters.type')}
        </label>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('projects.filters.allTypes')}</option>
          <option value="infrastructure">{t('projects.filters.infrastructure')}</option>
          <option value="energy">{t('projects.filters.energy')}</option>
          <option value="transportation">{t('projects.filters.transportation')}</option>
          <option value="water">{t('projects.filters.water')}</option>
          <option value="education">{t('projects.filters.education')}</option>
        </select>
      </div>

      {/* Region Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('projects.filters.region')}
        </label>
        <select
          value={filters.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{t('projects.filters.allRegions')}</option>
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

export default ProjectFilters;
