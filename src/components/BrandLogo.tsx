import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ className = '', showTagline = false, size = 'md' }: BrandLogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const textDimensions = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-emerald rounded-lg p-0.5 ${className}`}
      aria-label="EcoSort AI Homepage"
    >
      <div className={`relative flex-shrink-0 ${iconDimensions}`}>
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <circle cx="32" cy="32" r="30" className="fill-forest dark:fill-dark-surface" />
          <path d="M32 6C44 6 56 16 56 30C50 20 40 14 28 16C30 12 31 9 32 6Z" fill="#16845B" />
          <path d="M58 34C58 48 48 58 34 58C42 50 46 38 42 26C47 28 52 30 58 34Z" fill="#65B96E" />
          <path d="M30 58C16 58 6 46 6 32C14 40 26 44 38 40C35 46 33 52 30 58Z" fill="#16845B" />
          <path d="M6 28C6 14 18 6 30 6C22 14 18 26 22 38C17 36 11 32 6 28Z" fill="#12372A" />
          <path d="M32 38C32 26 42 18 42 18C42 18 44 30 36 36C34.5 37.3 33.2 37.8 32 38Z" fill="#C8F169" />
          <path d="M32 38C26 34 26 26 28 22C34 25 36 32 32 38Z" fill="#65B96E" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-bold tracking-tight text-forest dark:text-dark-text ${textDimensions}`}>
            EcoSort
          </span>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-light text-forest dark:bg-emerald/20 dark:text-lime">
            AI
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-muted dark:text-dark-muted tracking-tight mt-0.5">
            Waste Smarter. Live Cleaner.
          </span>
        )}
      </div>
    </Link>
  );
}
