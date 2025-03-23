import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { LogoutButton } from './LogoutButton';

interface DashboardSidebarProps {
  onItemClick?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onItemClick }) => {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <div className="h-full flex flex-col">
      <nav className="flex-1 overflow-y-auto p-4">
        <SidebarNav currentPath={location.pathname} onItemClick={onItemClick} />
      </nav>
      <div className="p-4 border-t">
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardSidebar;