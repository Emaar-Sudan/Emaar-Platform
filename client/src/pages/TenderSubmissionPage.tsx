import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, FileText, FileSpreadsheet, Building2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios'; // استخدم axios للتفاعل مع الخادم

// Components
import FileUpload from '../components/tenders/FileUpload';
import CommitmentModal from '../components/tenders/CommitmentModal';
import SubmissionFeeDisplay from '../components/tenders/SubmissionFeeDisplay';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';

// Hooks
import { useTenderDetails } from '@/hooks/useTenderDetails';
import { useTenderApplicationForm } from '@/hooks/useTenderApplicationForm';
import { useAuth } from '@/contexts/AuthContext';

const TenderSubmissionPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir } = useLanguage();
  const { user } = useAuth();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const [showCommitment, setShowCommitment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { tender, isLoading: isTenderLoading } = useTenderDetails(id || '');
  
  const {
    formData,
    handleFileChange,
    handleChange,
    validateForm,
    hasAgreed,
    setHasAgreed
  } = useTenderApplicationForm();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/check-session', { headers: { Authorization: `Bearer ${user.token}` } });
        if (!response.data.session) {
          toast.error(t('auth.required'));
          navigate('/login', { state: { from: location.pathname } });
        }
      } catch (error) {
        toast.error(t('auth.required'));
        navigate('/login', { state: { from: location.pathname } });
      }
    };
    checkAuth();
  }, [navigate, location.pathname, t, user]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(t('form.errors'));
      return;
    }

    if (!hasAgreed) {
      toast.error(t('agreement.required'));
      return;
    }

    setIsLoading(true);

    try {
      // Upload files to server (instead of Supabase)
      const [technicalFile, financialFile, bankGuarantee] = await Promise.all([
        uploadFile(formData.technical_file_url as File, 'technical'),
        uploadFile(formData.financial_file_url as File, 'financial'),
        uploadFile(formData.bank_guarantee_url as File, 'guarantees')
      ]);

      // Prepare payment data
      if (!tender?.tender_number || !tender?.submission_fees) {
        throw new Error('Missing tender details');
      }

      // Navigate to payment page with form data
      navigate('/payment', {
        state: {
          type: 'tender',
          id: id,
          amount: tender.submission_fees,
          itemNumber: tender.tender_number,
          formData: {
            ...formData,
            technical_file_url: technicalFile.url,
            financial_file_url: financialFile.url,
            bank_guarantee_url: bankGuarantee.url,
            submission_date: new Date().toISOString(),
            status: 'pending'
          }
        }
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(t('submission.error'));
    } finally {
      setIsLoading(false);
    }
  };

  // File upload helper function (now communicates with your server)
  const uploadFile = async (file: File, path: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    try {
      const { data } = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progress) => {
          setUploadProgress(prev => ({
            ...prev,
            [path]: (progress.loaded / progress.total) * 100
          }));
        }
      });

      return data;  // The server will return file details including the URL
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error(t('upload.error'));
    }
  };

  if (isTenderLoading) {
    return <LoadingScreen message={t('loading')} />;
  }

  if (!tender) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('tender.notFound')}</h1>
          <button
            onClick={() => navigate('/tenders')}
            className="text-primary hover:underline"
          >
            {t('tender.backToList')}
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/tenders')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
        >
          <BackArrow className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>

        {/* Main Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-8">{t('submission.title')}</h1>

            <SubmissionFeeDisplay fee={tender.submission_fees} />

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Technical File */}
              <FileUpload
                label={t('submission.technicalFile')}
                accept=".pdf"
                icon={FileText}
                onChange={(file) => handleFileChange('technical_file_url', file)}
                value={formData.technical_file_url}
                error={formErrors.technical_file_url}
              />

              {/* Financial File */}
              <FileUpload
                label={t('submission.financialFile')}
                accept=".pdf"
                icon={FileSpreadsheet}
                onChange={(file) => handleFileChange('financial_file_url', file)}
                value={formData.financial_file_url}
                error={formErrors.financial_file_url}
              />

              {/* Bank Guarantee */}
              <FileUpload
                label={t('submission.bankGuarantee')}
                accept=".pdf"
                icon={Building2}
                onChange={(file) => handleFileChange('bank_guarantee_url', file)}
                value={formData.bank_guarantee_url}
                error={formErrors.bank_guarantee_url}
              />

              {/* Bank Guarantee Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('submission.bankGuaranteeNumber')}
                </label>
                <input
                  type="text"
                  name="bank_guarantee_number"
                  value={formData.bank_guarantee_number}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm ${
                    formErrors.bank_guarantee_number 
                      ? 'border-red-300' 
                      : 'border-gray-300'
                  }`}
                />
                {formErrors.bank_guarantee_number && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.bank_guarantee_number}
                  </p>
                )}
              </div>

              {/* Bank Guarantee Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('submission.bankGuaranteeDate')}
                </label>
                <input
                  type="date"
                  name="bank_guarantee_date"
                  value={formData.bank_guarantee_date}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm ${
                    formErrors.bank_guarantee_date 
                      ? 'border-red-300' 
                      : 'border-gray-300'
                  }`}
                />
                {formErrors.bank_guarantee_date && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.bank_guarantee_date}
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <button
                  type="button"
                  onClick={() => setShowCommitment(true)}
                  className="btn-secondary py-2 px-4"
                >
                  {t('submission.viewTerms')}
                </button>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {t('submission.termsDescription')}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !hasAgreed}
                className={`w-full btn-primary py-3 flex items-center justify-center gap-2 ${
                  isLoading || !hasAgreed ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner" />
                    {t('submission.processing')}
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    {t('submission.submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Commitment Modal */}
        <CommitmentModal
          isOpen={showCommitment}
          onClose={() => setShowCommitment(false)}
          onAgree={() => {
            setHasAgreed(true);
            setShowCommitment(false);
            toast.success(t('agreement.confirmed'));
          }}
        />
      </div>
    </div>
  );
};

export default TenderSubmissionPage;