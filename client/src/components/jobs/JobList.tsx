import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import JobCard from './JobCard';
import { Job } from '../../types/job';

interface JobListProps {
  jobs: Job[];
  filters: {
    organization_id: string;
    employmentType: string;
  };
  searchQuery: string;
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const { t } = useLanguage();

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">{t('jobs.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;