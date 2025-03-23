import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Upload, FileText, AlertTriangle, Loader2 } from 'lucide-react';
import { tenderSubmissionsApi } from '@/services/api/tenderSubmissions';
import type { TenderSubmission } from '@/types/tender';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: TenderSubmission;
  onUpdate: () => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  submission,
  onUpdate,
}) => {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [technicalFile, setTechnicalFile] = useState<File | null>(null);
  const [financialFile, setFinancialFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({
    technical: 0,
    financial: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    try {
      const updates: {
        technical_file_url?: string;
        financial_file_url?: string;
      } = {};

      if (technicalFile) {
        setProgress((prev) => ({ ...prev, technical: 30 }));
        const { data: technicalData, error: technicalError } = await supabase.storage
          .from('tender_documents')
          .upload(`technical/${submission.id}/${technicalFile.name}`, technicalFile);
        
        if (technicalError) throw technicalError;
        
        const { data: { publicUrl: technicalUrl } } = supabase.storage
          .from('tender_documents')
          .getPublicUrl(technicalData.path);
          
        updates.technical_file_url = technicalUrl;
        setProgress((prev) => ({ ...prev, technical: 100 }));
      }

      if (financialFile) {
        setProgress((prev) => ({ ...prev, financial: 30 }));
        const { data: financialData, error: financialError } = await supabase.storage
          .from('tender_documents')
          .upload(`financial/${submission.id}/${financialFile.name}`, financialFile);
        
        if (financialError) throw financialError;
        
        const { data: { publicUrl: financialUrl } } = supabase.storage
          .from('tender_documents')
          .getPublicUrl(financialData.path);
          
        updates.financial_file_url = financialUrl;
        setProgress((prev) => ({ ...prev, financial: 100 }));
      }

      await tenderSubmissionsService.updateSubmissionFiles(submission.id, updates);
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : t('dashboard.tenders.uploadError'));
    } finally {
      setIsUploading(false);
      setProgress({ technical: 0, financial: 0 });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{t('dashboard.tenders.updateFiles')}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Technical File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('dashboard.tenders.technicalFile')}
              </label>
              <div className="relative border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setTechnicalFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    {technicalFile ? technicalFile.name : t('dashboard.tenders.dropFile')}
                  </p>
                </div>
              </div>
              {progress.technical > 0 && progress.technical < 100 && (
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress.technical}%` }}
                  />
                </div>
              )}
            </div>

            {/* Financial File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('dashboard.tenders.financialFile')}
              </label>
              <div className="relative border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFinancialFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    {financialFile ? financialFile.name : t('dashboard.tenders.dropFile')}
                  </p>
                </div>
              </div>
              {progress.financial > 0 && progress.financial < 100 && (
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress.financial}%` }}
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isUploading}
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={isUploading || (!technicalFile && !financialFile)}
                className="btn-primary px-4 py-2 flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('common.uploading')}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    {t('common.upload')}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};