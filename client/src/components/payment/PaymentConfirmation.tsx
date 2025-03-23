import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { CheckCircle, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface PaymentConfirmationProps {
  transactionId: string;
  amount: number;
  itemNumber: string;
  type: 'tender' | 'auction';
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  transactionId,
  amount,
  itemNumber,
  type
}) => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  
  // مرجع للعنصر الذي يحتوي على تفاصيل الإيصال
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadReceipt = async () => {
    const receiptElement = receiptRef.current;
    if (!receiptElement) return;

    // تحويل العنصر إلى صورة باستخدام html2canvas
    const canvas = await html2canvas(receiptElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png'); // الحصول على بيانات الصورة

    // إنشاء ملف PDF باستخدام jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4'); // الصفحة بنمط A4
    const imgWidth = 210; // عرض الصفحة A4
    const pageHeight = 297; // ارتفاع الصفحة A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // الحفاظ على نسبة الصورة

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('payment-receipt.pdf'); // حفظ الملف
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div ref={receiptRef} className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">
          {t('payment.confirmation.success')}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {t('payment.confirmation.description')}
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-300">
          <h2 className="text-lg font-bold mb-4 text-left">
            {t('payment.confirmation.receiptDetails')}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-500">{t('payment.confirmation.transactionId')}</p>
              <p className="font-medium">{transactionId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('payment.confirmation.amount')}</p>
              <p className="font-medium">{amount.toFixed(2)} SDG</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('payment.confirmation.referenceNumber')}</p>
              <p className="font-medium">{itemNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('payment.confirmation.date')}</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <button
          onClick={handleDownloadReceipt}
          className="btn-primary py-2 px-6 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          {t('payment.confirmation.downloadReceipt')}
        </button>

        <button
          onClick={() => navigate(`/${type}s`)}
          className="flex items-center justify-center gap-2 text-primary hover:text-primary-dark"
        >
          {t('payment.confirmation.backToList')}
          <Arrow className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
