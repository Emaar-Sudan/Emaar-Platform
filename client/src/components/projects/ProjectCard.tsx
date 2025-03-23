import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building2, MapPin, Calendar, DollarSign, Eye, Share2 } from 'lucide-react';
import { formatDate } from '../../utils/dateFormatters';
import toast from 'react-hot-toast';
import type { Project } from '@/services/api/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = () => {
    navigate(`/projects/${project.id}`);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator.share) {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(t('projects.linkCopied'));
      }
    } catch (error) {
      console.error('Share error:', error);
      toast.error(t('projects.shareError'));
    }
  };

  // Default image if no images are available
  const defaultImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000';
  const displayImage = project.image_paths?.[0] || defaultImage;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={displayImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {t(`projects.status.${project.status}`)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{project.title}</h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{t('projects.projectNumber')}: {project.project_number}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{t('projects.endDate')}: {formatDate(project.end_date, language)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>{project.budget.toLocaleString()} SDG</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleViewDetails}
            className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {t('projects.viewDetails')}
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-secondary-light active:bg-secondary-dark"
          >
            <Share2 className="w-4 h-4" />
            {t('projects.share')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;