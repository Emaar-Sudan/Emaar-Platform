import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const PartnersSection = () => {
  const { t } = useLanguage();

  const partners = [
    {
          name: 'الجودة ',
      logo: '/assets/100.png',
    },
    {
      name: 'السودان',
      logo: '/assets/200.png',
    },
    {
      name: 'الجودة ',
      logo: '/assets/100.png',
    },
    {
      name: 'السودان',
      logo: '/assets/200.png',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          {t('about.partners.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg flex items-center justify-center shadow-md hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-[120px] md:max-w-[150px] h-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
