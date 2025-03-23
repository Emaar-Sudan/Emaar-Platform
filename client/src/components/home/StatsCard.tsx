// src/components/home/StatsCard.tsx
import React from 'react';
import CountUp from 'react-countup';
import { StatsCardProps } from './types';

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  value,
  label,
  prefix = '',
  suffix = ''
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
      <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
      <div className="text-3xl font-bold mb-2">
        {prefix}
        <CountUp
          end={value}
          duration={2.5}
          separator=","
        />
        {suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

export default StatsCard;
