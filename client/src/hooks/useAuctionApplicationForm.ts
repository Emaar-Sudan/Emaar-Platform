// hooks/useAuctionApplicationForm.ts
import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'react-hot-toast';
import type { AuctionApplicationFormData } from '@/types/auction';

export const useAuctionApplicationForm = (minBidAmount: number = 0) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<AuctionApplicationFormData>({
    bid_amount: 0,
    bid_amount_url: null,
    bank_guarantee_url: null,
    bank_guarantee_number: '',
    bank_guarantee_date: '',
  });
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'bid_amount' ? Number(value) : value
    }));
  }, []);

  const handleFileChange = useCallback((fieldName: string, file: File | null) => {
    if (!file) return;

    const validTypes = ['application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error(t('auctions.application.invalidFileType'));
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error(t('auctions.application.fileTooLarge'));
      return;
    }

    setFormData(prev => ({ ...prev, [fieldName]: file }));
  }, [t]);

  const validateFiles = useCallback(() => {
    const files = [formData.bid_amount_url, formData.bank_guarantee_url];
    return files.every(file => {
      if (!file) return false;
      if (file.size > 5 * 1024 * 1024) return false;
      if (file.type !== 'application/pdf') return false;
      return true;
    });
  }, [formData.bid_amount_url, formData.bank_guarantee_url]);

  const validateForm = useCallback(() => {
    if (!formData.bid_amount || formData.bid_amount < minBidAmount) {
      toast.error(t('auctions.application.invalidBidAmount'));
      return false;
    }

    if (!formData.bid_amount_url || !formData.bank_guarantee_url) {
      toast.error(t('auctions.application.documentsRequired'));
      return false;
    }

    if (!formData.bank_guarantee_number || !formData.bank_guarantee_date) {
      toast.error(t('auctions.application.guaranteeInfoRequired'));
      return false;
    }

    if (!validateFiles()) {
      toast.error(t('auctions.application.invalidFiles'));
      return false;
    }

    if (!hasAgreed) {
      toast.error(t('auctions.application.agreementRequired'));
      return false;
    }

    return true;
  }, [formData, minBidAmount, hasAgreed, validateFiles, t]);

  const resetForm = useCallback(() => {
    setFormData({
      bid_amount: 0,
      bid_amount_url: null,
      bank_guarantee_url: null,
      bank_guarantee_number: '',
      bank_guarantee_date: '',
    });
    setHasAgreed(false);
  }, []);

  return {
    formData,
    hasAgreed,
    setHasAgreed,
    handleChange,
    handleFileChange,
    validateForm,
    validateFiles,
    resetForm
  };
};