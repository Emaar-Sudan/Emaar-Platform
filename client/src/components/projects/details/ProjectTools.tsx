import React from 'react';
import { Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectToolsProps {
  tools: string[];
}

const ProjectTools: React.FC<ProjectToolsProps> = ({ tools }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Wrench className="w-5 h-5" />
        {t('projects.tools')}
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {tools.map((tool, index) => (
          <span 
            key={index}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectTools;