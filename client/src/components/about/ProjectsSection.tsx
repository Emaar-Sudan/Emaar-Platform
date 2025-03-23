import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const ProjectsSection = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const projects = [
    {
      title: t('about.projects.project1.title'),
      description: t('about.projects.project1.description'),
      impact: t('about.projects.project1.impact'),
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    },
    {
      title: t('about.projects.project2.title'),
      description: t('about.projects.project2.description'),
      impact: t('about.projects.project2.impact'),
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000',
    },
    {
      title: t('about.projects.project3.title'),
      description: t('about.projects.project3.description'),
      impact: t('about.projects.project3.impact'),
      image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=2000',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('about.projects.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-primary font-semibold">{project.impact}</p>
                </div>
                <button className="mt-4 flex items-center gap-2 text-primary hover:underline">
                  {t('about.projects.readMore')}
                  <Arrow className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;