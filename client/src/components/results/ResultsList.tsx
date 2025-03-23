import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ResultCard from './ResultCard';
import { Result } from '../../types/results';

interface ResultsListProps {
  results: Result[];
  isLoading?: boolean;
}

const ResultsList: React.FC<ResultsListProps> = ({ results, isLoading }) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('loading')}...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('results.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default ResultsList;