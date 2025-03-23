import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'react-hot-toast';

export interface TenderApplicationFormData {
  technical_file_url: File | null;
  financial_file_url: File | null;
  bank_guarantee_url: File | null;
  bank_guarantee_number: string;
  bank_guarantee_date: string;
}

export const useTenderApplicationForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<TenderApplicationFormData>({
    technical_file_url: null,
    financial_file_url: null,
    bank_guarantee_url: null,
    bank_guarantee_number: '',
    bank_guarantee_date: '',
  });
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleFileChange = (name: keyof TenderApplicationFormData, file: File | null) => {
    if (file) {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!validTypes.includes(file.type)) {
        toast.error(t('Tenders.application.invalidFileType'));
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(t('Tenders.application.fileTooLarge'));
        return;
      }

      setFormData(prev => ({ ...prev, [name]: file }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { technical_file_url, financial_file_url, bank_guarantee_url, bank_guarantee_number, bank_guarantee_date } = formData;

    if (!technical_file_url || !financial_file_url || !bank_guarantee_url) {
      toast.error(t('Tenders.application.allFilesRequired'));
      return false;
    }

    if (!bank_guarantee_number || !bank_guarantee_date) {
      toast.error(t('Tenders.application.bankDetailsRequired'));
      return false;
    }

    if (!hasAgreed) {
      toast.error(t('Tenders.application.agreementRequired'));
      return false;
    }

    return true;
  };

  return {
    formData,
    hasAgreed,
    setHasAgreed,
    handleChange,
    handleFileChange,
    validateForm
  };
};
