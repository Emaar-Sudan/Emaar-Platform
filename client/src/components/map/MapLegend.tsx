import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building2, Gavel, Briefcase, Home } from 'lucide-react'; // Add a new icon like Home for projects

const MapLegend = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="font-bold mb-4">{t('map.legend')}</h2>
      
      <div className="space-y-4">
        {/* Tenders section */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span>{t('map.legendTenders')}</span>
        </div>

        {/* Auctions section */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
            <Gavel className="w-5 h-5 text-white" />
          </div>
          <span>{t('map.legendAuctions')}</span>
        </div>

        {/* Jobs section */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span>{t('map.legendJobs')}</span>
        </div>

        {/* Projects section */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
            <Home className="w-5 h-5 text-white" /> {/* You can choose a different icon if preferred */}
          </div>
          <span>{t('map.legendProjects')}</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
