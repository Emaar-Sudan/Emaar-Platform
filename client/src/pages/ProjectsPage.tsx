import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FileText } from 'lucide-react';
import { ProjectCard, ProjectFilters, ProjectSearch } from '../components/projects';
import { useProjects } from '../hooks/useProjects';
import { LoadingScreen } from '../components/ui/LoadingIndicator';

const ProjectsPage = () => {
  const { t, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const { projects, isLoading, filters, setFilters } = useProjects();

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.project_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  if (isLoading) {
    return <LoadingScreen message={t('projects.loading')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <ProjectSearch onSearch={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }} />
          <ProjectFilters 
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {t('projects.noResults')}
            </h3>
            <p className="text-gray-500">
              {t('projects.tryAdjustingFilters')}
            </p>
          </div>
        )}

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
    </div>
  );
};

export default ProjectsPage;