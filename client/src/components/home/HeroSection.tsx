import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const videos = [
  {
    id: 1,
    title: {
      ar: 'منصة إعمار مركز رقمي لدعم إعادة الإعمار والتنمية',
      en: 'Emmar Platform A Digital Hub for Reconstruction and Development'
    },
     description: {
      ar: 'استكشف كيفية تسريع عمليات التنمية في السودان عبر منصة "إعمار" الرقمية',
      en: 'Explore how "Emmar" digital platform accelerates development processes in Sudan'
    },
    videoUrl: '/public/assets/videos/1.mp4' // رابط الفيديو
  },
  
  {
  id: 2,
  title: {
    ar: 'تمكين التنمية المستدامة عبر الشفافية والتعاون',
    en: 'Empowering Sustainable Development through Transparency and Collaboration'
  },
  description: {
    ar: 'اكتشف كيفية تحقيق أهداف "إعمار" في تعزيز التعاون بين القطاعين العام والخاص لتحقيق التنمية المستدامة',
    en: 'Discover how "Emmar" achieves its goals in enhancing public-private collaboration for sustainable development'
  },
    videoUrl: '/public/assets/videos/2.mp4' // رابط الفيديو
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  // استخدام useRef لتخزين مراجع الفيديوهات
  const videoRefs = useRef([]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // دالة لتشغيل أو إيقاف الفيديو
  const toggleVideo = (index) => {
    const videoElement = videoRefs.current[index];
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Video Slider */}
      <div 
        className="relative h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${isRTL ? currentSlide * 100 : -currentSlide * 100}%)` }}
      >
        <div className="absolute inset-0 flex">
          {videos.map((video, index) => (
            <div key={video.id} className="relative w-full h-full flex-shrink-0">
              {/* فيديو مع زر تشغيل */}
              <div className="relative w-full h-full">
                <video
                  ref={(el) => videoRefs.current[index] = el}  // تعيين مرجع الفيديو
                  className="w-full h-full object-cover"
                  src={video.videoUrl}
                  muted
                  loop
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">{video.title[language]}</h2>
                    <p className="text-xl mb-8">{video.description[language]}</p>
                    {/* زر التشغيل في وسط الفيديو */}
                    <button 
                      className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 transition-transform hover:scale-110"
                      onClick={() => toggleVideo(index)}  // استدعاء الدالة عند الضغط
                    >
                      <Play className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
