import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Megaphone, FileSearch, TrendingUp } from 'lucide-react';
import { Briefcase, Gavel, Building, Users } from 'lucide-react';

const ServicesSection = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const services = [
  {
    id: 1,
    icon: Building,
    title: {
      ar: 'خدمات إعمار المشاريع',
      en: 'Construction Project Services'
    },
    description: {
      ar: 'نوفر خدمات شاملة لدعم مشاريع الإعمار والبنية التحتية في السودان.',
      en: 'We provide comprehensive support for construction and infrastructure projects in Sudan.'
    },
    image: '/assets/construction.jpg' // صورة لمشروعات الإعمار
  },
  {
    id: 2,
    icon: Gavel,
    title: {
      ar: 'تقديم المناقصات والمزادات',
      en: 'Tenders and Auctions Facilitation'
    },
    description: {
      ar: 'نساعدك في الوصول إلى المناقصات والمزادات المناسبة لمشروعك.',
      en: 'We help you access suitable tenders and auctions for your project.'
    },
    image: '/assets/tenders.jpg' // صورة تعكس مفهوم المناقصات
  },
  {
    id: 3,
    icon: Users,
    title: {
      ar: 'الاستشارات الهندسية والمالية',
      en: 'Engineering and Financial Consultations'
    },
    description: {
      ar: 'خبراء متخصصون لتقديم استشارات هندسية ومالية لدعم نجاح مشاريعك.',
      en: 'Specialized experts providing engineering and financial consultations to support your project success.'
    },
    image: '/assets/consultations.jpg' // صورة لاستشارات هندسية أو مالية
  }
];

  return (
    <div className="container mx-auto px-4 py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <img
                  src={service.image}
                  alt={service.title[language]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6" />
                    <h3 className="text-xl font-bold">{service.title[language]}</h3>
                  </div>
                  <p className="text-sm text-gray-200">{service.description[language]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesSection;
