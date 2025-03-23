import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Search } from 'lucide-react';

interface ResultsSearchProps {
  onSearch: (query: string) => void;
}

const ResultsSearch: React.FC<ResultsSearchProps> = ({ onSearch }) => {
  const { t } = useLanguage();

  return (
    <div className="relative mb-6">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={t('results.searchPlaceholder')}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default ResultsSearch;