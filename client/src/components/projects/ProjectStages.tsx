import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CheckCircle, Clock } from 'lucide-react';

interface Stage {
  title: string;
  date: string;
  completed: boolean;
}

interface ProjectStagesProps {
  stages: Stage[];
}

const ProjectStages: React.FC<ProjectStagesProps> = ({ stages }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 rounded-lg ${
            stage.completed ? 'bg-green-50' : 'bg-gray-50'
          }`}
        >
          {stage.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Clock className="w-6 h-6 text-gray-400" />
          )}
          <div>
            <h4 className="font-semibold">{stage.title}</h4>
            <p className="text-sm text-gray-600">{stage.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStages;