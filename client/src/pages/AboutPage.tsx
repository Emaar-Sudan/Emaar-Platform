import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Target, Users, Award, Building2, BarChart, Briefcase, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';
import AboutHero from '../components/about/AboutHero';
import PartnersSection from '../components/about/PartnersSection';

const AboutPage = () => {
  const { t } = useLanguage();

  const contributions = [
    {
      icon: TrendingUp,
      title: 'انتظام الصرف للمشاريع الحكومية',
      description: 'تحسين كفاءة وفعالية الإنفاق الحكومي من خلال نظام صرف منظم ومراقب',
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: Building2,
      title: 'زيادة مشاركة المنشآت الصغيرة والمتوسطة',
      description: 'توفير فرص متكافئة للمنشآت الصغيرة والمتوسطة للمشاركة في المشاريع الحكومية',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: CheckCircle,
      title: 'زيادة الشفافية في المنافسات الحكومية',
      description: 'تعزيز مبدأ الشفافية والنزاهة في جميع مراحل المنافسات الحكومية',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      icon: DollarSign,
      title: 'رفع كفاءة الإنفاق للجهات الحكومية',
      description: 'تحسين آليات الإنفاق وضمان الاستخدام الأمثل للموارد المالية',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Strategic Goals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.strategicGoals.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Goal Cards */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">تعزيز الشفافية</h3>
              <p className="text-gray-600">تقليل الفساد وزيادة الثقة بين الأطراف المشاركة.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">تحفيز التعاون</h3>
              <p className="text-gray-600">بين القطاعين العام والخاص لتحقيق التنمية المستدامة.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">تحسين الأداء الإداري</h3>
              <p className="text-gray-600">ضمان تنفيذ المشاريع في الوقت المحدد وبالميزانية المناسبة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contribution to Development Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.contributionToDevelopment.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributions.map((contribution, index) => {
              const Icon = contribution.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${contribution.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{contribution.title}</h3>
                      <p className="text-gray-600">{contribution.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
};

export default AboutPage;