import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building2, FileText, Gavel, Briefcase } from 'lucide-react';
import { getMarkerColor } from '../../utils/mapUtils';

interface MapMarkerProps {
  type: string;
  item: any;
  position: [number, number];
}

const MapMarker: React.FC<MapMarkerProps> = ({ type, item, position }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const color = getMarkerColor(type);

  // Create marker icon using Leaflet's L.divIcon
  const markerIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 48 16 48C16 48 32 28 32 16C32 7.16 24.84 0 16 0Z" fill="${color}"/>
        <circle cx="16" cy="16" r="8" fill="white"/>
      </svg>
    `,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  });

  const getIcon = () => {
    switch (type) {
      case 'project':
        return Building2;
      case 'tender':
        return FileText;
      case 'auction':
        return Gavel;
      case 'job':
        return Briefcase;
      default:
        return Building2;
    }
  };

  const Icon = getIcon();

  const getTitle = () => {
    if (type === 'project' || type === 'tender') {
      return item.title[language] || item.title;
    }
    return item.title;
  };

  const getDescription = () => {
    if (type === 'project' || type === 'tender') {
      return item.description[language] || item.description;
    }
    return item.description;
  };

  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>
        <div className="p-4 min-w-[250px]">
          <div className="flex items-center gap-2 mb-3">
            <Icon className="w-5 h-5" style={{ color }} />
            <h3 className="font-bold text-lg">{getTitle()}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {getDescription()}
          </p>
          <button
            onClick={() => navigate(`/${type}s/${item.id}`)}
            className="w-full btn-primary py-2 text-sm"
          >
            {t('map.viewDetails')}
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;