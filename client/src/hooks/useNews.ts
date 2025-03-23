import { useState, useEffect } from 'react';
import { newsApi } from '@/services/api/news';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { News } from '@/types/news';

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [featuredNews, setFeaturedNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const [newsData, featured] = await Promise.all([
          newsApi.getNews(),
          newsApi.getFeaturedNews()
        ]);
        setNews(newsData);
        setFeaturedNews(featured);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err as Error);
        toast.error(t('news.fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [t]);

  return { news, featuredNews, isLoading, error };
};