import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SupportPage = () => {
  const { t, dir } = useLanguage();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const openChatbot = () => {
    window.open('https://www.chatbase.co/chatbot-iframe/nVn8fxB4JrpxphqDhmM2p', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col justify-between" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('support.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('support.description')}
          </p>
        </div>

        {/* Support Content */}
        <div className="text-left max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold mb-4">كيف يمكننا مساعدتك؟</h2>

          {/* FAQ Section */}
          <div className="border rounded-lg shadow-sm">
            <button
              className="w-full text-left p-4 flex justify-between items-center text-xl font-semibold bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleSection('faq')}
            >
              1. الأسئلة الشائعة (FAQ):
              <span>{openSections['faq'] ? '-' : '+'}</span>
            </button>
            {openSections['faq'] && (
              <div className="p-4 space-y-3">
                <div>
                  <strong>ما هي منصة إعمار؟</strong><br />
                  منصة إعمار هي مركز رقمي لدعم عمليات إعادة الإعمار والتنمية في السودان، وتوفر بيئة مبتكرة للتعاون بين الجهات الحكومية، القطاع الخاص، والأفراد في مجالات المشاريع، المناقصات، المزادات، والوظائف.
                </div>
                <div>
                  <strong>من هم المستفيدون من المنصة؟</strong><br />
                  المنصة موجهة للجهات الحكومية، الشركات الخاصة، الأفراد، والمستثمرين المحليين والدوليين.
                </div>
                <div>
                  <strong>هل منصة إعمار متاحة للأفراد أم فقط للجهات الرسمية؟</strong><br />
                  المنصة متاحة للجميع، بما في ذلك الأفراد، حيث يمكنهم الاستفادة من المناقصات، المزادات، وفرص العمل.
                </div>
                <div>
                  <strong>هل ستتوفر خدمات إضافية في المستقبل؟</strong><br />
                  نعم، تعمل منصة إعمار على تطوير خدمات جديدة مثل تطبيق الهواتف الذكية وإدخال الذكاء الاصطناعي لتحليل البيانات.
                </div>
                <div>
                  <strong>أين أجد شروط استخدام المنصة؟</strong><br />
                  يمكنك الاطلاع على شروط الاستخدام وسياسة الخصوصية عبر الروابط الموجودة في أسفل الموقع.
                </div>
                <div>
                  <strong>هل بياناتي آمنة عند استخدام منصة إعمار؟</strong><br />
                  نعم، المنصة تستخدم تقنيات تشفير متقدمة (SSL/TLS) وتخزين آمن للبيانات مع نسخ احتياطي دوري.
                </div>
              </div>
            )}
          </div>

          {/* Guide Section */}
          <div className="border rounded-lg shadow-sm">
            <button
              className="w-full text-left p-4 flex justify-between items-center text-xl font-semibold bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleSection('guide')}
            >
              2. دليل الاستخدام:
              <span>{openSections['guide'] ? '-' : '+'}</span>
            </button>
            {openSections['guide'] && (
              <div className="p-4 space-y-3">
                <div>
                  <strong>المناقصات:</strong><br />
                  <strong>كيف يمكنني البحث عن مناقصة؟</strong><br />
                  يمكنك استخدام مربع البحث والفلاتر للبحث عن المناقصات حسب الحالة (نشطة/مغلقة)، الجهة (حكومية/خاصة)، أو الموقع الجغرافي.
                </div>
                <div>
                  <strong>ما هي الخطوات لتقديم عرض في مناقصة؟</strong><br />
                  اختر المناقصة، ارفع المستندات المطلوبة، وافق على التعهد الإلكتروني، ثم ادفع رسوم المناقصة عبر بوابة الدفع الإلكترونية.
                </div>
                <div>
                  <strong>المزادات:</strong><br />
                  <strong>كيف أشارك في مزاد؟</strong><br />
                  اختر المزاد الذي ترغب في المشاركة فيه، قدم عرضك المالي عبر النموذج المخصص، وارفع المستندات المطلوبة.
                </div>
                <div>
                  <strong>الوظائف:</strong><br />
                  <strong>كيف أقدم على وظيفة؟</strong><br />
                  اختر الوظيفة المناسبة، املأ نموذج التقديم، ثم أرسل الطلب وانتظر إشعاراً بالرد.
                </div>
                <div>
                  <strong>المشاريع:</strong><br />
                  <strong>كيف أتابع تفاصيل مشروع معين؟</strong><br />
                  اضغط على "تفاصيل المشروع" لمعرفة معلومات مثل المراحل، التمويل، ونسبة الإنجاز.
                </div>
              </div>
            )}
          </div>

          {/* Support Section */}
          <div className="border rounded-lg shadow-sm">
            <button
              className="w-full text-left p-4 flex justify-between items-center text-xl font-semibold bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleSection('support')}
            >
              3. الدعم الفني:
              <span>{openSections['support'] ? '-' : '+'}</span>
            </button>
            {openSections['support'] && (
              <div className="p-4 space-y-3">
                <div>
                  <strong>الدردشة المباشرة:</strong> تواصل مع فريق الدعم مباشرة للحصول على المساعدة الفورية.
                  <button
                    onClick={openChatbot}
                    className="ml-4 py-1 px-3 bg-[#1e805d] text-white text-sm font-semibold rounded">
                    افتح الشات بوت
                  </button>
                </div>
                <div>
                  <strong>البريد الإلكتروني:</strong> أرسل استفساراتك إلى support@eammar.sd.
                </div>
                <div>
                  <strong>الاتصال الهاتفي:</strong> يمكنك الاتصال بفريق الدعم على الرقم أو التواصل عبر الواتس: (+249) 121615595.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbase Integration */}
      <div className="flex justify-center mt-auto">
        <button
          onClick={openChatbot}
          className="py-2 px-6 bg-[#1e805d] text-white text-lg font-semibold rounded"
        >
          {t('support.openChatbot')}
        </button>
      </div>
    </div>
  );
};

export default SupportPage;
