import React from 'react';
import Link from 'next/link';
import { Compass, Camera, BookOpen, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-xl bg-ivory dark:bg-dark-elevated border border-border-light dark:border-dark-border flex items-center justify-center text-emerald dark:text-lime shadow-xs">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted dark:text-dark-muted">
          Error 404 &bull; Page Not Found
        </span>
        <h1 className="text-3xl font-extrabold text-forest dark:text-dark-text tracking-tight">
          Lost in the Segregation Stream?
        </h1>
        <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
          The page or route you requested does not exist or has been relocated. Let&apos;s get you back on track.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/scan"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-forest dark:text-dark-text border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface hover:bg-ivory dark:hover:bg-dark-elevated rounded-btn transition-colors"
        >
          <Camera className="w-4 h-4 text-emerald" />
          <span>Go to Scanner</span>
        </Link>
      </div>
    </div>
  );
}
