import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import Map from '../components/contact/Map';

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('contact.title')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <ContactForm />
        </div>
        
        <div className="space-y-8">
          <ContactInfo />
          <Map />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;