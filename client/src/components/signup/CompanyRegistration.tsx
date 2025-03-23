import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Building2, Upload, Mail, Phone, FileText, Lock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface CompanyFormData {
  businessName: string;
  commercialRegNo: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const CompanyRegistration = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CompanyFormData>({
    businessName: '',
    commercialRegNo: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 3,
    onDrop: (acceptedFiles) => {
      setDocuments(prev => [...prev, ...acceptedFiles].slice(0, 3));
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // لم يعد هناك حاجة لدالة رفع المستندات إلى Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('signup.errors.passwordMismatch'));
      return;
    }

    setIsSubmitting(true);
    try {
      // تمرير البيانات بدون تحميل المستندات إلى Firebase
      await register({
        ...formData,
        type: 'company',
        documents: documents.map(doc => doc.name), // تخزين أسماء الملفات بدلاً من تحميلها
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      toast.success(t('signup.registrationSuccess'));
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      toast.error(t('signup.registrationFailed'));
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8">{t('signup.companyRegistration')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">{t('signup.businessName')}</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="businessName"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('signup.commercialRegNo')}</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="commercialRegNo"
                required
                value={formData.commercialRegNo}
                onChange={handleChange}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">{t('signup.email')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('signup.phone')}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">{t('signup.password')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('signup.confirmPassword')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('signup.documents')}</label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">{t('signup.dropDocuments')}</p>
            <p className="text-xs text-gray-500 mt-1">{t('signup.maxFiles')}</p>
          </div>
          {documents.length > 0 && (
            <div className="mt-2 space-y-2">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-600">{doc.name}</span>
                  <button
                    type="button"
                    onClick={() => setDocuments(prev => prev.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            required
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            {t('signup.termsAgreement')}
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full btn-primary py-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? t('signup.submitting') : t('signup.submit')}
        </button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
