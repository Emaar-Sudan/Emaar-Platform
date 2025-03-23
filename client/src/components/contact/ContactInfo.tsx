import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  const { t } = useLanguage();

  const contactDetails = [
    {
      icon: Phone,
      title: t('contact.phone'),
      content: '+249 121615595',
      link: 'https://wsend.co/249121615595'
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: 'mohamedabdelmamoud@gmail.com',
      link: '#'
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      content: t('contact.officeAddress'),
      link: 'https://maps.google.com/?q=Muscat,Oman'
    },
    {
      icon: Clock,
      title: t('contact.workingHours'),
      content: t('contact.workingHoursDetails'),
      link: null
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">{t('contact.getInTouch')}</h2>
      
      <div className="space-y-6">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{detail.title}</h3>
                {detail.link ? (
                  <a
                    href={detail.link}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {detail.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{detail.content}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;