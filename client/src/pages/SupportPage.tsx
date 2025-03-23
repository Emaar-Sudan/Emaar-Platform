import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaWhatsapp, FaRobot } from 'react-icons/fa';

const SupportPage = () => {
  const { t, dir } = useLanguage(); // الحصول على النصوص واتجاه الصفحة
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

  const openWhatsApp = () => {
    window.open('https://wa.me/249121615595', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col justify-between" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('support.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('support.description')}</p>
        </div>

        {/* Support Content */}
        <div className={`max-w-4xl mx-auto space-y-6`} style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
          {/* FAQ Section */}
          <div className="border rounded-lg shadow-sm">
            <button
              className="w-full text-left p-4 flex justify-between items-center text-sm font-semibold bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleSection('faq')}
            >
              {t('support.faq')}
              <span>{openSections['faq'] ? '-' : '+'}</span>
            </button>
            {openSections['faq'] && (
              <div className="p-4 space-y-3">
                <div>
                  <strong>{t('faq.question1.title')}</strong>
                  <br />
                  {t('faq.question1.answer')}
                </div>
                <div>
                  <strong>{t('faq.question2.title')}</strong>
                  <br />
                  {t('faq.question2.answer')}
                </div>
                <div>
                  <strong>{t('faq.question3.title')}</strong>
                  <br />
                  {t('faq.question3.answer')}
                </div>
                <div>
                  <strong>{t('faq.question4.title')}</strong>
                  <br />
                  {t('faq.question4.answer')}
                </div>
                <div>
                  <strong>{t('faq.question5.title')}</strong>
                  <br />
                  {t('faq.question5.answer')}
                </div>
                <div>
                  <strong>{t('faq.question6.title')}</strong>
                  <br />
                  {t('faq.question6.answer')}
                </div>
              </div>
            )}
          </div>

          {/* Guide Section */}
          <div className="border rounded-lg shadow-sm">
            <button
              className="w-full text-left p-4 flex justify-between items-center text-sm font-semibold bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleSection('guide')}
            >
              {t('support.guide')}
              <span>{openSections['guide'] ? '-' : '+'}</span>
            </button>
            {openSections['guide'] && (
              <div className="p-4 space-y-3">
                <div>
                  <strong>{t('guide.tenders.title')}</strong>
                  <br />
                  <strong>{t('guide.tenders.search')}</strong>
                  <br />
                  {t('guide.tenders.searchAnswer')}
                </div>
                <div>
                  <strong>{t('guide.tenders.submit')}</strong>
                  <br />
                  {t('guide.tenders.submitAnswer')}
                </div>
                <div>
                  <strong>{t('guide.auctions.title')}</strong>
                  <br />
                  <strong>{t('guide.auctions.participate')}</strong>
                  <br />
                  {t('guide.auctions.participateAnswer')}
                </div>
                <div>
                  <strong>{t('guide.jobs.title')}</strong>
                  <br />
                  <strong>{t('guide.jobs.apply')}</strong>
                  <br />
                  {t('guide.jobs.applyAnswer')}
                </div>
                <div>
                  <strong>{t('guide.projects.title')}</strong>
                  <br />
                  <strong>{t('guide.projects.follow')}</strong>
                  <br />
                  {t('guide.projects.followAnswer')}
                </div>
              </div>
            )}
          </div>

          {/* Technical Support Section */}
          <div className="border rounded-lg shadow-sm">
            <div className="w-full text-left p-4 flex justify-between items-center text-sm font-semibold bg-gray-100">
              {t('support.contact')}
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center">
                <p className="text-base text-gray-800">{t('support.contact.whatsapp')}</p>
                <button
                  onClick={openWhatsApp}
                  className="flex justify-center items-center text-green-500 hover:text-green-600 text-3xl transition-colors duration-300 mx-auto"
                >
                  <FaWhatsapp />
                </button>
              </div>
              <div className="text-center">
                <p className="text-base text-gray-800">{t('support.contact.chatbot')}</p>
                <button
                  onClick={openChatbot}
                  className="flex justify-center items-center text-blue-500 hover:text-blue-600 text-3xl transition-colors duration-300 mx-auto"
                >
                  <FaRobot />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
