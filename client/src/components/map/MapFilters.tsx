import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building2, Gavel, Briefcase, Home } from 'lucide-react'; // Add Home icon for projects

interface MapFiltersProps {
  filters: {
    tenders: boolean;
    auctions: boolean;
    jobs: boolean;
    projects: boolean; // Add projects filter
  };
  onFilterChange: (filters: any) => void;
}

const MapFilters: React.FC<MapFiltersProps> = ({ filters, onFilterChange }) => {
  const { t } = useLanguage();

  const handleToggle = (key: keyof typeof filters) => {
    onFilterChange({ ...filters, [key]: !filters[key] });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="font-bold mb-4">{t('map.filters')}</h2>
      
      <div className="space-y-4">
        {/* Tenders Filter */}
        <button
          onClick={() => handleToggle('tenders')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
            filters.tenders
              ? 'bg-primary/10 text-primary'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span>{t('map.filterTenders')}</span>
        </button>

        {/* Auctions Filter */}
        <button
          onClick={() => handleToggle('auctions')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
            filters.auctions
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Gavel className="w-5 h-5" />
          <span>{t('map.filterAuctions')}</span>
        </button>

        {/* Jobs Filter */}
        <button
          onClick={() => handleToggle('jobs')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
            filters.jobs
              ? 'bg-indigo-100 text-indigo-600'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>{t('map.filterJobs')}</span>
        </button>

        {/* Projects Filter */}
        <button
          onClick={() => handleToggle('projects')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
            filters.projects
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Home className="w-5 h-5" /> {/* Projects icon */}
          <span>{t('map.filterProjects')}</span>
        </button>
      </div>
    </div>
  );
};

export default MapFilters;
