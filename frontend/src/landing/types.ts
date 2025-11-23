import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  delay?: number;
  color?: 'primary' | 'accent' | 'secondary';
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  colSpan?: string;
  rowSpan?: string;
  gradient?: string;
}

export interface StepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}