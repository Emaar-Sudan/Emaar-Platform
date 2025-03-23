import React from 'react';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectNotesProps {
  notes: string[];
}

const ProjectNotes: React.FC<ProjectNotesProps> = ({ notes }) => {
  const { t } = useLanguage();

  if (!notes.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        {t('projects.notes')}
      </h2>
      
      <div className="space-y-4">
        {notes.map((note, index) => (
          <div 
            key={index}
            className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary"
          >
            <p className="text-gray-700">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectNotes;