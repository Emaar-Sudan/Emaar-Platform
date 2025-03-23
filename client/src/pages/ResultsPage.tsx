import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ResultsSearch from '@/components/results/ResultsSearch';
import ResultsFilters from '@/components/results/ResultsFilters';
import ResultsList from '@/components/results/ResultsList';
import { useResults } from '@/hooks/useResults';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import type { ResultType } from '@/types/results';

const ResultsPage = () => {
  const { t, dir } = useLanguage();
  const [selectedType, setSelectedType] = useState<ResultType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { results, isLoading, setFilters } = useResults({
    type: selectedType === 'all' ? undefined : selectedType
  });

  // Filter results based on search query
  const filteredResults = results.filter(result =>
    searchQuery === '' ||
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <LoadingScreen message={t('results.loading')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('results.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('results.description')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <ResultsSearch onSearch={setSearchQuery} />
          <ResultsFilters 
            selectedType={selectedType} 
            onTypeChange={(type) => {
              setSelectedType(type);
              setFilters({ type: type === 'all' ? undefined : type });
            }} 
          />
        </div>

        {/* Results List */}
        <ResultsList results={filteredResults} />
      </div>
    </div>
  );
};

export default ResultsPage;