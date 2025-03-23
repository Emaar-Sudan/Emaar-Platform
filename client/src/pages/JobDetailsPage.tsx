import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  ArrowLeft, ArrowRight, Building2, MapPin, DollarSign, Users, 
  Briefcase, GraduationCap, FileText, Heart 
} from 'lucide-react';
import { useJobDetails } from '../hooks/useJobs';
import { LoadingScreen } from '../components/ui/LoadingIndicator';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const { job, isLoading, error } = useJobDetails(id || '');

  if (isLoading) {
    return <LoadingScreen message={t('jobs.loading')} />;
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('jobs.notFound')}</h1>
          <button
            onClick={() => navigate('/jobs')}
            className="text-primary hover:underline"
          >
            {t('jobs.backToList')}
          </button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    navigate(`/jobs/${job.id}/apply`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
        >
          <BackArrow className="w-5 h-5" />
          <span>{t('jobs.backToList')}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={job.image_path}
                  alt={job.company}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-5 h-5" />
                    <span>{job.organization}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-5 h-5" />
                  <span>{t(`jobs.contractTypes.${job.type}`)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-5 h-5" />
                  <span>{job.salary_range} SDG</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{job.required_number}</span>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t('jobs.description')}
              </h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                {t('jobs.requirements')}
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-gray-600">{req}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                {t('jobs.benefits')}
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-600">{benefit}</li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <div className="flex justify-center mt-10">
              <button
                onClick={handleApply}
                className="btn-primary py-3 px-6 flex items-center justify-center gap-2 rounded-lg shadow-lg text-white bg-primary hover:bg-primary-dark"
              >
                <Briefcase className="w-5 h-5" />
                {t('jobs.applyNow')}
              </button>
            </div>

            {/* Additional Notes */}
            {job.notes && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="font-medium text-gray-700">{t('jobs.additionalNotes')}</h3>
                <p className="text-gray-600 leading-relaxed">{job.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
