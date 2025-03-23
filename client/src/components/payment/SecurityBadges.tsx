import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Shield, Lock, CheckCircle } from 'lucide-react';

const SecurityBadges = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="font-semibold">{t('payment.security.ssl')}</h3>
            <p className="text-sm text-gray-600">{t('payment.security.sslDesc')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Lock className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="font-semibold">{t('payment.security.encryption')}</h3>
            <p className="text-sm text-gray-600">{t('payment.security.encryptionDesc')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold">{t('payment.security.secure')}</h3>
            <p className="text-sm text-gray-600">{t('payment.security.secureDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;