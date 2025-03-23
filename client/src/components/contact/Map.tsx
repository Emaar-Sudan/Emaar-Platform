import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const Map = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">{t('contact.location')}</h2>
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1598!2d58.5425!3d23.6100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzM2LjAiTiA1OMKwMzInMzMuMCJF!5e0!3m2!1sen!2som!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Map;