import React from 'react';
import { cn } from '@/lib/utils';
import type { BadgeProps } from '@/types';

const badgeVariants = {
  primary: 'bg-pink-100 text-pink-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800'
};

const sizeVariants = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
  lg: 'px-3 py-2 text-base'
};

export default function Badge({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  const variantClasses = badgeVariants[variant];
  const sizeClasses = sizeVariants[size];

  return (
    <span
      className={cn(
        baseClasses,
        variantClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
} 