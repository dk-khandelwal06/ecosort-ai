'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Camera, BookOpen, Shield, LogIn } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/scan', label: 'Scanner', icon: Camera },
    { href: '/guide', label: 'Waste Guide', icon: BookOpen },
    { href: '/privacy', label: 'Privacy', icon: Shield },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-light/80 dark:border-dark-border/80 bg-ivory/95 dark:bg-dark-bg/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo showTagline size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  active
                    ? 'text-forest dark:text-dark-text bg-white dark:bg-dark-surface shadow-xs border border-border-light dark:border-dark-border'
                    : 'text-muted dark:text-dark-muted hover:text-forest dark:hover:text-dark-text hover:bg-white/60 dark:hover:bg-dark-surface/60'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald dark:text-lime" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-forest dark:text-dark-text hover:text-emerald dark:hover:text-lime transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>

          <Link
            href="/scan"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald hover:bg-emerald-hover dark:bg-emerald dark:hover:bg-emerald-hover rounded-lg shadow-sm transition-all duration-150 active:scale-98"
          >
            <Camera className="w-4 h-4" />
            Scan Waste
          </Link>
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-forest dark:text-dark-text hover:bg-white dark:hover:bg-dark-surface border border-border-light dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-emerald"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-light dark:border-dark-border bg-white dark:bg-dark-surface px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-base font-medium rounded-lg ${
                    active
                      ? 'bg-ivory dark:bg-dark-elevated text-forest dark:text-dark-text font-semibold'
                      : 'text-muted dark:text-dark-muted hover:bg-ivory/60 dark:hover:bg-dark-elevated/60 text-forest dark:text-dark-text'
                  }`}
                >
                  <Icon className="w-5 h-5 text-emerald dark:text-lime" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border-light dark:border-dark-border flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-forest dark:text-dark-text border border-border-light dark:border-dark-border rounded-lg bg-ivory dark:bg-dark-bg"
            >
              <LogIn className="w-4 h-4" />
              Sign In to EcoSort
            </Link>

            <Link
              href="/scan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-lg shadow-sm"
            >
              <Camera className="w-4 h-4" />
              Identify My Waste
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
