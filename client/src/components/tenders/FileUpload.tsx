import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLanguage } from '../../contexts/LanguageContext';
import { Upload, X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept: string;
  icon: LucideIcon;
  onChange: (file: File | null) => void;
  value: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  icon: Icon,
  onChange,
  value
}) => {
  const { t } = useLanguage();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onChange(acceptedFiles[0]);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} *
      </label>
      
      {value ? (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-600">{value.name}</span>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? t('tenders.submission.dropHere')
              : t('tenders.submission.dragDrop')}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {t('tenders.submission.maxFileSize')}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;