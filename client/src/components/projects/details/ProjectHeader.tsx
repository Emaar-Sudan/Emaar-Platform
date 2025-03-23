import React from 'react';
import { Building2, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/utils/dateFormatters';
import type { Project } from '@/services/api/projects';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">{project.title}</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('projects.projectNumber')}</p>
            <p className="font-medium">{project.project_number}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('projects.location')}</p>
            <p className="font-medium">{project.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('projects.duration')}</p>
            <p className="font-medium">
              {formatDate(project.start_date, language)} - {formatDate(project.end_date, language)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('projects.budget')}</p>
            <p className="font-medium">{project.budget.toLocaleString()} SDG</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;