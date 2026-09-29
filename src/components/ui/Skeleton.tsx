import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  shimmer = true,
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-slate-200/80 rounded-lg animate-pulse',
        shimmer && 'animate-shimmer',
        className
      )}
      {...props}
    />
  );
};
