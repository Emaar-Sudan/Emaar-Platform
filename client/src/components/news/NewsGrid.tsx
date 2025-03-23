import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { News } from '@/services/supabase/news.service';

interface NewsGridProps {
  news: News[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative h-48">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm bg-primary text-white">
              {t(`news.types.${item.type}`)}
            </span>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{new Date(item.published_at).toLocaleDateString(
                dir === 'rtl' ? 'ar-SA' : 'en-US'
              )}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{item.content}</p>
            <Link
              to={`/news/${item.id}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              {t('news.readMore')}
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;