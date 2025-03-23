import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import JobSearch from '../components/jobs/JobSearch';
import JobFilters from '../components/jobs/JobFilters';
import JobList from '../components/jobs/JobList';
import { useJobs } from '../hooks/useJobs';
import { LoadingScreen } from '../components/ui/LoadingIndicator';

const JobsPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  const { jobs, isLoading, filters, setFilters } = useJobs();

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    searchQuery === '' || 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  if (isLoading) {
    return <LoadingScreen message={t('jobs.loading')} />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('jobs.title')}</h1>

      {/* Search */}
      <JobSearch onSearch={(query) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }} />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <JobFilters 
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Job List */}
      <JobList 
        jobs={currentJobs}
        filters={filters}
        searchQuery={searchQuery}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === i + 1
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;