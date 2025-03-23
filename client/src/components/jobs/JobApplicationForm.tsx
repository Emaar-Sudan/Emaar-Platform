import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface JobApplicationFormProps {
  onClose: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [cv, setCV] = useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setCV(acceptedFiles[0]);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) {
      toast.error(t('jobs.application.cvRequired'));
      return;
    }
    
    // Handle form submission
    console.log('Form submitted:', { ...formData, cv });
    toast.success(t('jobs.application.success'));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t('jobs.application.title')}</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('jobs.application.name')} *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('jobs.application.email')} *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('jobs.application.phone')} *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('jobs.application.coverLetter')}
          </label>
          <textarea
            name="coverLetter"
            rows={4}
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('jobs.application.cv')} *
          </label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              {cv ? cv.name : t('jobs.application.dropCV')}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t('jobs.application.acceptedFormats')}
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full btn-primary py-3 flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        {t('jobs.application.submit')}
      </button>
    </form>
  );
};

export default JobApplicationForm;