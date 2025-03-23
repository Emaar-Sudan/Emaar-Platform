import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { X, ExternalLink, Tag, Phone } from 'lucide-react';
import { Advertisement } from '../../types/news';

interface AdModalProps {
  ad: Advertisement;
  onClose: () => void;
}

const AdModal: React.FC<AdModalProps> = ({ ad, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg w-full max-w-md mx-auto overflow-hidden shadow-xl transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="relative h-48">
          <img
            src={ad.image}
            alt={ad.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold">{ad.name}</h3>
            <p className="text-primary text-sm">{ad.title}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm">{ad.description}</p>

          {/* Discount Badge */}
          {ad.discount && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 p-3 rounded-lg text-sm">
              <Tag className="w-4 h-4" />
              <span>{ad.discount}</span>
            </div>
          )}

          {/* Contact Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{ad.contactInfo}</span>
          </div>

          {/* Action Button */}
          <a
            href={ad.serviceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm"
          >
            {t('ads.viewServices')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdModal;