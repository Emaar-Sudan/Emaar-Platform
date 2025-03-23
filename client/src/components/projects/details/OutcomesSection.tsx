// src/components/projects/details/OutcomesSection.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface OutcomesSectionProps {
  outcomes: string[];
}

const OutcomesSection: React.FC<OutcomesSectionProps> = ({ outcomes }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5" />
        {t('projects.expectedOutcomes')}
      </h2>
      <ul className="space-y-2">
        {outcomes.map((outcome, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutcomesSection;
