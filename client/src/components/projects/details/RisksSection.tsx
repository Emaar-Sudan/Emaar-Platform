// src/components/projects/details/RisksSection.tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Risk {
  risk: string;
  mitigation: string;
}

interface RisksSectionProps {
  risks: Risk[];
}

const RisksSection: React.FC<RisksSectionProps> = ({ risks }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        {t('projects.risks')}
      </h2>
      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div key={index} className="bg-red-50 p-4 rounded-lg">
            <p className="font-medium text-red-700 mb-2">{risk.risk}</p>
            <p className="text-sm text-gray-600">{t('projects.mitigation')}: {risk.mitigation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RisksSection;
