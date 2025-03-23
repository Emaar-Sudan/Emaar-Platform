// src/components/projects/details/FinancialSection.tsx
import React from 'react';
import { DollarSign } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface FinancialDetails {
  allocatedBudget: number;
  spentBudget: number;
  fundingSource: string;
}

interface FinancialSectionProps {
  financialDetails: FinancialDetails;
}

const FinancialSection: React.FC<FinancialSectionProps> = ({ financialDetails }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5" />
        {t('projects.financialDetails')}
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t('projects.allocatedBudget')}</span>
          <span className="font-bold">{financialDetails.allocatedBudget.toLocaleString()} SDG</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t('projects.spentBudget')}</span>
          <span className="font-bold">{financialDetails.spentBudget.toLocaleString()} SDG</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t('projects.fundingSource')}</span>
          <span className="font-bold">{financialDetails.fundingSource}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSection;
