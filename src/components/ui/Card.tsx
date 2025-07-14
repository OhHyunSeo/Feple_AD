import React from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

export default function Card({
  title,
  subtitle,
  action,
  hoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300',
        hoverable && 'hover:shadow-md hover:scale-[1.02]',
        className
      )}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {action && (
              <div className="flex-shrink-0">
                {action}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
    </div>
  );
} 