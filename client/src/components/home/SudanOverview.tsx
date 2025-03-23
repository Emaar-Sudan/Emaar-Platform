import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Landmark, TreePine, Mountain, Building2 } from 'lucide-react';

const SudanOverview = () => {
  const { t, language } = useLanguage();
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // استبدال الصور بمسارات محلية
  const features = [
    {
      icon: Landmark,
      title: t('home.sudan.infrastructure.title'),
      description: t('home.sudan.infrastructure.description'),
      image: '/assets/2.jpeg',
    },
    {
      icon: TreePine,
      title: t('home.sudan.resources.title'),
      description: t('home.sudan.resources.description'),
      image: '/assets/4.jpeg',
    },
    {
      icon: Mountain,
      title: t('home.sudan.tourism.title'),
      description: t('home.sudan.tourism.description'),
      image: '/assets/5.jpeg',
    },
    {
      icon: Building2,
      title: t('home.sudan.development.title'),
      description: t('home.sudan.development.description'),
      image: '/assets/6.jpeg',
    }
  ];

  return (
    <section className="py-16 bg-gray-100" dir={direction}>
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          {t('home.sudan.title')}
        </h2>

        {/* الشبكة المكونة من البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-2xl bg-white transition-all duration-500 hover:shadow-3xl hover:-translate-y-2"
              >
                {/* الصورة الخلفية */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* الطبقة العلوية بتدرج لوني */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* المحتوى النصي */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SudanOverview;
