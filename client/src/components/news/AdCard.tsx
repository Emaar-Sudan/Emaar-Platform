import React from 'react';
import { Building2, Phone, Mail, Tag, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Advertisement } from '../../types/news';

interface AdCardProps {
  ad: Advertisement;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={ad.image}
            alt={ad.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-bold text-lg">{ad.name}</h3>
            <p className="text-primary">{ad.title}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{ad.content}</p>

        {ad.discount && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5" />
            <span>{ad.discount}</span>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>{ad.description}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{ad.contactInfo}</span>
          </div>
        </div>

        <a
          href={ad.serviceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          {t('ads.viewServices')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default AdCard;