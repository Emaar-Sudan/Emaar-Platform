import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectImagesProps {
  images: string[];
}

const ProjectImages: React.FC<ProjectImagesProps> = ({ images }) => {
  const { t } = useLanguage();
  const defaultImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">{t('projects.images')}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {(images.length > 0 ? images : [defaultImage]).map((image, index) => (
          <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={image}
              alt={`Project view ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectImages;