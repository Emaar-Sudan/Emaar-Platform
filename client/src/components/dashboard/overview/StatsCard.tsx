import React from 'react';
import { LucideIcon } from 'lucide-react';
import CountUp from 'react-countup';
import { cn } from '../../../utils/cn';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  change: string;
  prefix?: string;
  suffix?: string;
  color?: string;
  loading?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  change,
  prefix,
  suffix,
  color = 'text-primary',
  loading = false
}) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-lg bg-opacity-10", color, `bg-${color}`)}>
          <Icon className={cn("w-6 h-6", color)} />
        </div>
        <span className={`text-sm font-medium ${
          change.startsWith('+') ? 'text-green-500' : 'text-red-500'
        }`}>
          {change}
        </span>
      </div>

      <div className="space-y-1">
        {loading ? (
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        ) : (
          <div className="text-2xl font-bold">
            {prefix && <span>{prefix} </span>}
            <CountUp end={value} duration={2} separator="," />
            {suffix && <span>{suffix}</span>}
          </div>
        )}
        <div className="text-gray-600 text-sm">{title}</div>
      </div>
    </div>
  );
};