import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Search } from 'lucide-react';

interface JobSearchProps {
  onSearch: (query: string) => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t('jobs.searchPlaceholder')}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default JobSearch;