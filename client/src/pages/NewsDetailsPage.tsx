import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { useNewsDetails } from '../hooks/useNewsDetails';
import { LoadingScreen } from '../components/ui/LoadingIndicator';
import NewsReactions from '../components/news/NewsReactions';
import ShareButtons from '../components/news/ShareButtons';
import RelatedNews from '../components/news/RelatedNews';

const NewsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const { news, relatedNews, isLoading } = useNewsDetails(id || '');

  if (isLoading) {
    return <LoadingScreen message={t('news.loading')} />;
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('news.notFound')}</h1>
          <button
            onClick={() => navigate('/news')}
            className="text-primary hover:underline"
          >
            {t('news.backToList')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/news')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 group"
        >
          <BackArrow className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>{t('news.backToNews')}</span>
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* News Type Badge */}
            <div className="p-6 border-b">
              <span className={`px-3 py-1 rounded-full text-sm ${
                news.type === 'auctions' ? 'bg-green-100 text-green-800' :
                news.type === 'projects' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {t(`news.types.${news.type}`)}
              </span>
            </div>

            {/* News Image */}
            <div className="relative h-[400px]">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* News Content */}
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
              
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(news.published_at).toLocaleDateString(
                    dir === 'rtl' ? 'ar-SA' : 'en-US'
                  )}</span>
                </div>
                {news.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{news.author.name}</span>
                  </div>
                )}
              </div>

              <div className="prose max-w-none mb-8">
                {news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>

              {/* Interactions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                <NewsReactions />
                <ShareButtons url={window.location.href} title={news.title} />
              </div>
            </div>
          </article>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">{t('news.relatedNews')}</h2>
              <RelatedNews news={relatedNews} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;