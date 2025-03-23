import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Gavel } from 'lucide-react';
import { AuctionCard, AuctionFilters, AuctionSearch } from '@/components/auctions';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import { useAuctionsData } from '@/hooks/useAuctionsData';

const AuctionsPage = () => {
  const { t, dir } = useLanguage();
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    region: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const auctionsPerPage = 4;

  const { auctions, isLoading } = useAuctionsData(filters);

  // Filter auctions based on search query
  const filteredAuctions = auctions.filter(auction => 
    searchQuery === '' || 
    auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    auction.auction_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastAuction = currentPage * auctionsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
  const currentAuctions = filteredAuctions.slice(indexOfFirstAuction, indexOfLastAuction);
  const totalPages = Math.ceil(filteredAuctions.length / auctionsPerPage);

  if (isLoading) {
    return <LoadingScreen message={t('auctions.loading')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('auctions.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('auctions.description')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <AuctionSearch onSearch={setSearchQuery} />
          <AuctionFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAuctions.map(auction => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>

        {/* No Results */}
        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {t('auctions.noResults')}
            </h3>
            <p className="text-gray-500">
              {t('auctions.tryAdjustingFilters')}
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

export default AuctionsPage;