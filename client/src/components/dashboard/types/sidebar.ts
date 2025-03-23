import { type LucideIcon } from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export interface SidebarNavProps {
  currentPath: string;
}