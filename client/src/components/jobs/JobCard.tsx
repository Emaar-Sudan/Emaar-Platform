import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { MapPin, Clock, DollarSign, Users, Building2, FileText } from 'lucide-react';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    organization: string;
    entity: string;
    Type: string;
    salary_range: string;
    required_number: number;
    description: string;
    requirements: string[];
    benefits: string[];
    workingHours: string;
    workDays: string;
    image_path: string;
    additionalNotes?: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/jobs/${job.id}/apply`);
  };

  const handleViewDetails = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={job.image_path}
            alt={job.company}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Building2 className="w-4 h-4" />
              <span>{job.organization}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{t(`jobs.contractTypes.${job.type}`)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary_range} SDG</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
               <Users className="w-4 h-4" />  
              <span>{job.required_number} </span> 
              </div>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

            {/* عرض ملاحظات إضافية */}
            {job.additionalNotes && (
              <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{job.additionalNotes}</span>
                </div>
              </div>
            )}

            {/* أزرار التفاعل */}
            <div className="flex gap-4">
              <button
                onClick={handleViewDetails}
                className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
              >
                {t('jobs.viewDetails')}
              </button>
              <button
                onClick={handleApply}
                className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
              >
                {t('jobs.applyNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
