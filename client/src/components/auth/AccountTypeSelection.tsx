import React from 'react';
import { Building2, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { AccountType } from '../../pages/SignupPage';

interface AccountTypeSelectionProps {
  onSelect: (type: AccountType) => void;
}

export const AccountTypeSelection: React.FC<AccountTypeSelectionProps> = ({ onSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t('signup.selectType')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('company')}
          className="group relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-primary"
        >
          <div className="flex flex-col items-center">
            <Building2 className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('signup.company')}</h3>
            <p className="text-gray-600 text-center">{t('signup.companyDesc')}</p>
          </div>
        </button>

        <button
          onClick={() => onSelect('individual')}
          className="group relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-primary"
        >
          <div className="flex flex-col items-center">
            <User className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('signup.individual')}</h3>
            <p className="text-gray-600 text-center">{t('signup.individualDesc')}</p>
          </div>
        </button>
      </div>
    </div>
  );
};