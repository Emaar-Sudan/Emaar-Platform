import React from 'react';
import { Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamMember {
  name: string;
  role: string;
}

interface ProjectTeamProps {
  team: TeamMember[];
}

const ProjectTeam: React.FC<ProjectTeamProps> = ({ team }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Users className="w-5 h-5" />
        {t('projects.team')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTeam;