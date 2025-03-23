import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAds } from '@/hooks/useAds';
import AdModal from './AdModal';
import type { Ad } from '@/services/api/ads';

const AdSlider = () => {
  const { dir } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const { ads, isLoading } = useAds('news');

  const totalAds = ads.length;
  const slideInterval = 5000; // 5 seconds per slide

  const nextSlide = useCallback(() => {
    if (!isPaused && totalAds > 0) {
      setCurrentIndex((prev) => (prev + 1) % totalAds);
    }
  }, [totalAds, isPaused]);

  useEffect(() => {
    if (totalAds > 1) {
      const timer = setInterval(nextSlide, slideInterval);
      return () => clearInterval(timer);
    }
  }, [nextSlide, totalAds]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const touchEvent = e as React.TouchEvent;
    const mouseEvent = e as React.MouseEvent;
    setStartX(touchEvent.touches ? touchEvent.touches[0].clientX : mouseEvent.clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const touchEvent = e as React.TouchEvent;
    const mouseEvent = e as React.MouseEvent;
    setEndX(touchEvent.touches ? touchEvent.touches[0].clientX : mouseEvent.clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const distance = startX - endX;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        setCurrentIndex((prev) => (prev + 1) % totalAds);
      } else {
        setCurrentIndex((prev) => (prev - 1 + totalAds) % totalAds);
      }
    }
  };

  // If there are no ads, don't render anything
  if (!isLoading && (!ads || ads.length === 0)) {
    return null;
  }

  return (
    <div className="mb-8">
      <div 
        className="relative bg-white rounded-lg shadow-lg p-6 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div 
          className="flex gap-4 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(${currentIndex * (dir === 'rtl' ? 100 : -100)}%)`,
          }}
        >
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="flex-shrink-0 w-64 cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => setSelectedAd(ad)}
            >
              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <img
                  src={ad.image_url}
                  alt={ad.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg mb-1 truncate">{ad.name}</h3>
                <p className="text-primary text-sm truncate">{ad.title}</p>
              </div>
            </div>
          ))}
        </div>

        {totalAds > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalAds }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-6 bg-primary opacity-100'
                    : 'w-2 bg-gray-300 opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {selectedAd && (
        <AdModal ad={selectedAd} onClose={() => setSelectedAd(null)} />
      )}
    </div>
  );
};

export default AdSlider;