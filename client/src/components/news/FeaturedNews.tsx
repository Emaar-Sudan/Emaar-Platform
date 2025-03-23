import React from 'react';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import type { News } from '@/services/api/news';

interface FeaturedNewsProps {
  news: News;
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ news }) => {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-[400px]">
        <img
          src={news.image_url}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date(news.published_at).toLocaleDateString(
              dir === 'rtl' ? 'ar-SA' : 'en-US'
            )}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">{news.title}</h2>
          <p className="text-gray-200 mb-6 line-clamp-2">{news.content}</p>
          <Link
            to={`/news/${news.id}`}
            className="inline-flex items-center gap-2 text-white hover:text-primary-light transition-colors"
          >
            {t('news.readMore')}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNews;