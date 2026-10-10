import React from 'react';
import { WasteStreamCategory } from '@/lib/types';
import { WASTE_CATEGORIES } from '@/lib/categories';

interface CategoryBadgeProps {
  category: WasteStreamCategory;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showHindi?: boolean;
}

export function CategoryBadge({
  category,
  size = 'md',
  className = '',
  showHindi = true,
}: CategoryBadgeProps) {
  const cat = WASTE_CATEGORIES[category] || WASTE_CATEGORIES['Dry Waste'];

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3.5 py-1',
    lg: 'text-base px-4 py-1.5 font-semibold',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border font-medium ${cat.bgBadge} ${cat.textBadge} ${cat.borderBadge} ${sizeClasses} ${className}`}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: cat.binColor }}
        aria-hidden="true"
      />
      <span>{category}</span>
      {showHindi && (
        <span className="opacity-80 text-[0.85em] font-normal">
          ({cat.hindiName.split(' ')[0]})
        </span>
      )}
    </span>
  );
}
