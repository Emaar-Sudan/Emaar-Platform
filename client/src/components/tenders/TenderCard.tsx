import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, MapPin, Calendar, DollarSign, Download, Send, FileText } from 'lucide-react';
import { formatDate } from '../../utils/dateFormatters';
import moment from 'moment';
import toast from 'react-hot-toast';

interface TenderCardProps {
  tender: {
    id: string;
    tender_number: string;
    title: string;
    description: string;
    region: string;
    category: string;
    submission_fees: number;
    submission_deadline: string;
    document: string;
    image_path?: string;
  };
}

const TenderCard: React.FC<TenderCardProps> = ({ tender }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const deadlineDate = moment(tender.submission_deadline, 'YYYY-MM-DD HH:mm:ss');
  const currentDate = moment();
  const isDisabled = deadlineDate.isBefore(currentDate);

  // التقديم على المناقصة
  const handleApply = () => {
    if (!user) {
      toast.error(t('login.firstLogin'));
      setTimeout(() => {
        navigate('/login', {
          state: { from: '/tenders' },
        });
      }, 3000);
      return;
    }

    navigate(`/tenders/${tender.id}/submit`, {
      state: { submissionFee: tender.submission_fees },
    });
  };

// Update the document download function in TenderCard.tsx
const handleDownloadFile = async () => {
  try {
    const loadingToast = toast.loading(t('tenders.downloading'));

    if (!tender.document) {
      throw new Error(t('tenders.documentNotFound'));
    }

    // Get the document URL from Supabase storage
    const { data: { publicUrl }, error: urlError } = supabase.storage
      .from('tender_documents')
      .getPublicUrl(tender.document);

    if (urlError) throw urlError;

    // Download the file
    const response = await fetch(publicUrl);
    if (!response.ok) {
      throw new Error(`${t('tenders.downloadError')} (HTTP status: ${response.status})`);
    }

    // Create blob and download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tender_${tender.tender_number}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.dismiss(loadingToast);
    toast.success(t('tenders.downloadSuccess'));
  } catch (error) {
    console.error('Error downloading document:', error);
    toast.error(t('tenders.downloadError'));
  }
};

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* قسم الصورة */}
      <div className="relative h-48">
        <img
          src={tender.image_path || '/default-image.jpg'}
          alt={tender.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {tender.tender_number}
          </span>
        </div>
      </div>

      {/* قسم المحتوى */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{tender.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{tender.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{t(`tenders.categories.${tender.category}`)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{tender.region}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(tender.submission_deadline, language)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="w-4 h-4" />
            <span>{t('tenders.documentFee')}: {tender.submission_fees} SDG</span>
          </div>
        </div>

        <div className="flex gap-3">
          {/* زر تنزيل الملف */}
          <button
            onClick={handleDownloadFile}
            className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {t('tenders.downloadDocument')}
          </button>

          {/* زر التقديم */}
          <button
            onClick={handleApply}
            disabled={isDisabled}
            className={`flex-1 bg-secondary text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary-light'
            }`}
          >
            <Send className="w-4 h-4" />
            {t('tenders.apply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenderCard;