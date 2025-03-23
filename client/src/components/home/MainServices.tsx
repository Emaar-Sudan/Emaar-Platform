import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Gavel } from 'lucide-react'; // استبدل ShoppingBag بـ Briefcase

const MainServices = () => {
  const { t, language } = useLanguage();
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const services = [
    {
      icon: FileText,
      title: t('home.mainServices.tenders.title'),
      description: t('home.mainServices.tenders.description'),
      link: '/tenders'
    },
    {
      icon: Briefcase, // أيقونة جديدة للوظائف
      title: t('home.mainServices.jobs.title'), // ترجمة العنوان للوظائف
      description: t('home.mainServices.jobs.description'), // ترجمة الوصف للوظائف
      link: '/jobs' // رابط صفحة الوظائف
    },
    {
      icon: Gavel,
      title: t('home.mainServices.auctions.title'),
      description: t('home.mainServices.auctions.description'),
      link: '/auctions'
    }
  ];

  return (
    <section className="py-16 bg-gray-50" dir={direction}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('home.mainServices.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <Link 
                  to={service.link}
                  className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all"
                >
                  {t('common.discoverMore')}
                  {direction === 'rtl' ? '←' : '→'}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MainServices;
