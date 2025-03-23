import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const AboutHero = () => {
  const { t, dir } = useLanguage();

  return (
    <div className="relative bg-primary text-white h-[600px] md:h-[700px] flex items-center justify-center">
      {/* الصورة الخلفية */}
      <div className="absolute inset-0">
        <img
          src="/assets/about.jpeg"
          alt="Hero background"
          className="w-full h-full object-cover opacity-80" /* زيادة وضوح الصورة */
        />
        {/* طبقة الشفافية بلون أخضر خفيف */}
        <div className="absolute inset-0 bg-green-500 mix-blend-multiply opacity-10"></div>
      </div>
      
      {/* المحتوى النصي في المنتصف */}
      <div className="relative text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {t('about.hero.title')}
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-gray-200">
          {t('about.hero.description')}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
        
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
