import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { getSidebarMenuItems } from './utils/sidebarUtils';
import { cn } from '../../utils/cn';

interface SidebarNavProps {
  currentPath: string;
  onItemClick?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ currentPath, onItemClick }) => {
  const { t, dir } = useLanguage();
  const { user } = useAuth();
  const menuItems = getSidebarMenuItems(t, user?.type);

  return (
    <ul className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        return (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={onItemClick}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100",
                dir === 'rtl' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};