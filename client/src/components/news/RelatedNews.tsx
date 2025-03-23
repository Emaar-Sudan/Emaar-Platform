import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { News } from '../../types/news';

interface RelatedNewsProps {
  news: News[];
}

const RelatedNews: React.FC<RelatedNewsProps> = ({ news }) => {
  const { dir } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const animate = () => {
      const scrollAmount = dir === 'rtl' ? -1 : 1;
      element.scrollLeft += scrollAmount;
      
      if (
        (dir === 'rtl' && element.scrollLeft <= 0) ||
        (dir === 'ltr' && element.scrollLeft >= element.scrollWidth - element.clientWidth)
      ) {
        element.scrollLeft = dir === 'rtl' ? element.scrollWidth - element.clientWidth : 0;
      }
    };

    const animation = setInterval(animate, 30);
    return () => clearInterval(animation);
  }, [dir]);

  return (
    <div 
      ref={scrollRef}
      className="flex gap-6 overflow-x-hidden scroll-smooth"
      style={{ direction: dir }}
    >
      {news.map((item) => (
        <Link
          key={item.id}
          to={`/news/${item.id}`}
          className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div className="h-40">
            <img
              src={item.image}
              alt={item.titleNews}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.titleNews}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedNews;