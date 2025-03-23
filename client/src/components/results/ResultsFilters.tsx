import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Filter } from 'lucide-react';
import { ResultType } from '../../types/results';

interface ResultsFiltersProps {
  selectedType: ResultType;
  onTypeChange: (type: ResultType) => void;
}

const ResultsFilters: React.FC<ResultsFiltersProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const { t } = useLanguage();

  const types: { value: ResultType; label: string; color: string }[] = [
    { value: 'all', label: t('results.filters.all'), color: 'bg-gray-100 text-gray-800' },
    { value: 'auction', label: t('results.filters.auctions'), color: 'bg-green-100 text-green-800' },
    { value: 'tender', label: t('results.filters.tenders'), color: 'bg-blue-100 text-blue-800' },
    { value: 'job', label: t('results.filters.jobs'), color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {types.map((type) => (
        <button
          key={type.value}
          onClick={() => onTypeChange(type.value)}
          className={`px-4 py-2 rounded-lg transition-colors ${type.color} ${
            selectedType === type.value ? 'ring-2 ring-offset-2 ring-primary' : ''
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default ResultsFilters;