import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const mainLinks = [
    { key: 'header.about', href: '/about' },
    { key: 'header.news', href: '/news' },
    { key: 'header.tenders', href: '/tenders' },
    { key: 'header.auctions', href: '/auctions' },
    { key: 'header.jobs', href: '/jobs' },
  ];

  const supportLinks = [
    { key: 'header.map', href: '/map' },
    { key: 'header.results', href: '/results' },
    { key: 'header.projects', href: '/projects' },
    { key: 'header.support', href: '/support' },
     { key: 'header.contact', href: '/contact' },
  ];

  const legalLinks = [
    { key: 'footer.terms', href: '/terms' },
    { key: 'footer.privacy', href: '/privacy' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+249 121615595', href: 'https://wsend.co/249121615595' },
    { icon: Mail, text: 'mohamedabdelmamoud@gmail.com', href: 'mailto:mohamedabdelmamoud@gmail.com' },
    { icon: MapPin, text: t('contact.officeAddress'), href: 'https://maps.google.com/?q=Muscat,Oman' },
  ];

  return (
    <footer className="bg-white text-black" dir={direction}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img 
                src="/assets/logo.png" 
                alt="Logo" 
                className="h-16 object-contain"
              />
            </Link>
            <p className="text-base opacity-75" style={{ direction: 'rtl' }}>
              {t('footer.emaar')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-600 transition-colors ${social.color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Main Links */}
          <div>
            <h4 className="text-black font-bold mb-6">{t('footer.mainLinks')}</h4>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors text-base"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-black font-bold mb-6">{t('footer.support')}</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors text-base"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-black font-bold mb-6">{t('footer.contactUs')}</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index}>
                    <a
                      href={info.href}
                      className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors text-base"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{info.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Payment Methods */}
            <div className="flex gap-4">
              {[1, 2, 3].map((num) => (
                <img
                  key={num}
                  src={`/assets/payment-icon/${num}.png`}
                  alt={`Payment Method ${num}`}
                  className="h-8 w-auto object-contain"
                />
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-gray-600 hover:text-black text-base transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-base text-gray-600">
              © {new Date().getFullYear()}{' '}
              <a 
                href="https://www.facebook.com/mohamed.aebdo?mibextid=ZbWKwL" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                {t('footer.platform')}
              </a>
              . {t('footer.rights')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
