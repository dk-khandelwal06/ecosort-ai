import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { Shield, BookOpen, Camera, Github, ExternalLink, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border-light dark:border-dark-border bg-white dark:bg-dark-surface transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand and Mission */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo showTagline size="md" />
            <p className="text-sm text-muted dark:text-dark-muted max-w-md leading-relaxed">
              EcoSort AI bridges the cognitive gap between complex municipal packaging and everyday household disposal. Built to empower Indian citizens in adhering to Swachh Bharat Mission-Urban 2.0 four-way source segregation.
            </p>
            <div className="flex items-center gap-2 text-xs text-forest dark:text-lime font-medium pt-1">
              <Leaf className="w-4 h-4 text-emerald" />
              <span>Technology for a Cleaner Bharat &bull; AI-First Hackathon 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/scan"
                  className="inline-flex items-center gap-1.5 text-muted dark:text-dark-muted hover:text-emerald dark:hover:text-lime transition-colors"
                >
                  <Camera className="w-4 h-4 text-emerald" />
                  Waste Scanner
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-1.5 text-muted dark:text-dark-muted hover:text-emerald dark:hover:text-lime transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-emerald" />
                  SBM-U 2.0 Waste Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted dark:text-dark-muted hover:text-emerald dark:hover:text-lime transition-colors"
                >
                  Account Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-muted dark:text-dark-muted hover:text-emerald dark:hover:text-lime transition-colors"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Open Source */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text">
              Legal & Reference
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1.5 text-muted dark:text-dark-muted hover:text-emerald dark:hover:text-lime transition-colors"
                >
                  <Shield className="w-4 h-4 text-emerald" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted dark:text-dark-muted hover:text-emerald dark:hover:text-lime transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/dk-khandelwal06/ecosort-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted dark:text-dark-muted hover:text-forest dark:hover:text-dark-text transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Responsible AI Disclaimer Banner */}
        <div className="mt-10 pt-6 border-t border-border-light dark:border-dark-border text-xs text-muted dark:text-dark-muted leading-relaxed">
          <p className="bg-ivory dark:bg-dark-bg p-3.5 rounded-lg border border-border-light dark:border-dark-border">
            <strong className="text-forest dark:text-dark-text font-semibold">Advisory Disclaimer:</strong> EcoSort AI provides visual multimodal guidance to assist household segregation under Indian Solid Waste Management Rules 2026. This service is advisory and does not replace official municipal orders. Never dispose of intact lithium batteries, medical syringes, or corrosive laboratory chemicals in household garbage.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted dark:text-dark-muted">
          <p>
            &copy; {new Date().getFullYear()} EcoSort AI. Built by Daksh Khandelwal &amp; Khushi Kushwah.
          </p>
          <p className="flex items-center gap-2">
            <span>Powered by Google Gemini 3.8 Multimodal AI</span>
            <span>&bull;</span>
            <span>Hosted on Vercel Edge</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
