import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Filter } from 'lucide-react';

interface NotificationsFiltersProps {
  filters: {
    type: string;
    status: string;
    priority: string;
  };
  onFilterChange: (filters: any) => void;
}

export const NotificationsFilters: React.FC<NotificationsFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <h2 className="font-semibold">{t('notifications.filters')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('notifications.filterType')}
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t('notifications.filterAll')}</option>
            <option value="tender">{t('notifications.filterTenders')}</option>
            <option value="auction">{t('notifications.filterAuctions')}</option>
            <option value="job">{t('notifications.filterJobs')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('notifications.filterStatus')}
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t('notifications.filterAll')}</option>
            <option value="unread">{t('notifications.filterUnread')}</option>
            <option value="read">{t('notifications.filterRead')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('notifications.filterPriority')}
          </label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t('notifications.filterAll')}</option>
            <option value="high">{t('notifications.filterHighPriority')}</option>
            <option value="normal">{t('notifications.filterNormalPriority')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};