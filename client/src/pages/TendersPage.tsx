import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FileText } from 'lucide-react';
import { TenderCard, TenderFilters, TenderSearch } from '../components/tenders';
import { useTenders } from '../hooks/useTenders';
import { LoadingScreen } from '../components/ui/LoadingIndicator';

const TendersPage = () => {
  const { t, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 4;

  const { tenders, isLoading, filters, setFilters } = useTenders();

  // Filter tenders based on search query
  const filteredTenders = tenders.filter(tender => 
    searchQuery === '' || 
    tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tender.tender_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = filteredTenders.slice(indexOfFirstTender, indexOfLastTender);
  const totalPages = Math.ceil(filteredTenders.length / tendersPerPage);

  if (isLoading) {
    return <LoadingScreen message={t('tenders.loading')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('tenders.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('tenders.description')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <TenderSearch onSearch={setSearchQuery} />
          <TenderFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Tenders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTenders.map(tender => (
            <TenderCard key={tender.id} tender={tender} />
          ))}
        </div>

        {/* No Results */}
        {filteredTenders.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {t('tenders.noResults')}
            </h3>
            <p className="text-gray-500">
              {t('tenders.tryAdjustingFilters')}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === i + 1
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TendersPage;