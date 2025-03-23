import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import AdSlider from '../components/news/AdSlider';
import FeaturedNews from '../components/news/FeaturedNews';
import NewsGrid from '../components/news/NewsGrid';
import Pagination from '../components/common/Pagination';
import { useNews } from '../hooks/useNews';
import { LoadingScreen } from '../components/ui/LoadingIndicator';

const NewsPage: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5;
  const { news, featuredNews, isLoading } = useNews();

  // التحقق من وجود البيانات
  if (isLoading) {
    return <LoadingScreen message={t('news.loading')} />;
  }

  // التحقق من وجود الأخبار
  if (!news || news.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-600">
            {t('news.noNews')}
          </h1>
        </div>
      </div>
    );
  }

  // Calculate pagination
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('news.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('news.description')}
          </p>
        </div>

        {/* Advertisements Slider */}
        <div className="mb-12">
          <AdSlider />
        </div>

        {/* News Content */}
        <div className="space-y-12">
          {/* Featured News */}
          {featuredNews && featuredNews.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t('news.featured')}</h2>
              <FeaturedNews news={featuredNews} />
            </section>
          )}

          {/* Other News */}
          <section>
            <h2 className="text-2xl font-bold mb-6">{t('news.latest')}</h2>
            <NewsGrid news={currentNews} />
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;