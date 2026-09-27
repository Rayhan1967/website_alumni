import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200',
          hoverEffect && 'hover:shadow-lg hover:border-slate-200 hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'yellow' | 'green' | 'red' | 'purple' | 'slate';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'blue',
  size = 'sm',
  children,
  ...props
}) => {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    yellow: 'bg-amber-50 text-amber-800 border-amber-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 font-semibold',
    md: 'text-sm px-3 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
