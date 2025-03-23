// src/components/home/types.ts
import { LucideIcon } from 'lucide-react';

export interface StatData {
  icon: LucideIcon;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface StatsCardProps extends StatData {}
