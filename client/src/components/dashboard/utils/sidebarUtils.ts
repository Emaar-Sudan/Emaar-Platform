import { 
  LayoutDashboard, 
  FileText, 
  Gavel, 
  Bell, 
  Settings,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  allowedTypes?: ('individual' | 'company')[];
}

export const getSidebarMenuItems = (t: (key: string) => string, userType?: string): MenuItem[] => {
  const items: MenuItem[] = [
    { 
      icon: LayoutDashboard, 
      label: t('dashboard.overview'), 
      path: '/dashboard' 
    },
    { 
      icon: FileText, 
      label: t('dashboard.tenders'), 
      path: '/dashboard/tenders',
      allowedTypes: ['company']
    },
    { 
      icon: Gavel, 
      label: t('dashboard.auctions'), 
      path: '/dashboard/auctions' 
    },
    { 
      icon: Briefcase, 
      label: t('dashboard.jobs'), 
      path: '/dashboard/jobs',
      allowedTypes: ['individual']
    },
    { 
      icon: DollarSign, 
      label: t('dashboard.payments'), 
      path: '/dashboard/payments' 
    },
    { 
      icon: Bell, 
      label: t('dashboard.notifications'), 
      path: '/dashboard/notifications' 
    },
    { 
      icon: Settings, 
      label: t('dashboard.settings'), 
      path: '/dashboard/settings' 
    }
  ];

  return items;
};