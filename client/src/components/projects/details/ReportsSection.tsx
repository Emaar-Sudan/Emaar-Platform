// src/components/projects/details/ReportsSection.tsx
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Report {
  title: string;
  date: string;
  link: string;
}

interface ReportsSectionProps {
  reports: Report[];
}

const ReportsSection: React.FC<ReportsSectionProps> = ({ reports }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        {t('projects.reports')}
      </h2>
      <div className="space-y-4">
        {reports.map((report, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">{report.title}</h3>
              <p className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</p>
            </div>
            <a
              href={report.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2 px-4 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('projects.download')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsSection;
