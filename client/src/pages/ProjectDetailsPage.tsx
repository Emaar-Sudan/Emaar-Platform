import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useProjectDetails } from '../hooks/useProjectDetails';
import { LoadingScreen } from '../components/ui/LoadingIndicator';

// Import all project detail components
import ProjectHeader from '../components/projects/details/ProjectHeader';
import ProjectImages from '../components/projects/details/ProjectImages';
import { RisksSection, FinancialSection, OutcomesSection, ReportsSection } from '../components/projects/details';
import ProjectTeam from '../components/projects/details/ProjectTeam';
import ProjectTools from '../components/projects/details/ProjectTools';
import ProjectNotes from '../components/projects/details/ProjectNotes';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const { project, isLoading, error } = useProjectDetails(id || '');

  if (isLoading) {
    return <LoadingScreen message={t('projects.loading')} />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('projects.notFound')}</h1>
          <button
            onClick={() => navigate('/projects')}
            className="text-primary hover:underline"
          >
            {t('projects.backToList')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 group"
        >
          <BackArrow className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>{t('projects.backToList')}</span>
        </button>

        <div className="space-y-8">
          {/* Project Header */}
          <ProjectHeader project={project} />

          {/* Project Images */}
          <ProjectImages images={project.image_paths} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">{t('projects.description')}</h2>
                <p className="text-gray-600">{project.description}</p>
              </div>

              {/* Team */}
              <ProjectTeam team={project.team} />

              {/* Risks */}
              <RisksSection risks={project.risks} />

              {/* Expected Outcomes */}
              <OutcomesSection outcomes={project.expected_outcomes} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Financial Details */}
              <FinancialSection financialDetails={project.financial_details} />

              {/* Tools */}
              <ProjectTools tools={project.tools} />

              {/* Reports */}
              <ReportsSection reports={project.reports} />

              {/* Notes */}
              <ProjectNotes notes={project.notes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;