'use client';

import React, { useState } from 'react';
import { Scanner } from '@/components/Scanner';
import { VideoPlayer } from '@/components/VideoPlayer';
import {
  Camera,
  BookOpen,
  Info,
  ShieldAlert,
  PlayCircle,
  HelpCircle,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-light dark:border-dark-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-forest dark:text-lime">
              Zero-Shot Vision AI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest dark:text-dark-text tracking-tight">
            Waste Stream Scanner
          </h1>
          <p className="text-sm text-muted dark:text-dark-muted">
            Photograph any household waste or packaging to receive instant Swachh Bharat Mission segregation instructions.
          </p>
        </div>

        {/* Video Guide Action */}
        <button
          type="button"
          onClick={() => setShowVideoModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-forest dark:text-dark-text bg-white dark:bg-dark-surface border border-border-light dark:border-dark-border rounded-lg hover:bg-ivory dark:hover:bg-dark-elevated transition-colors shadow-2xs self-start sm:self-auto"
        >
          <PlayCircle className="w-4 h-4 text-emerald" />
          <span>Watch Scanner Walkthrough</span>
        </button>
      </div>

      {/* Main Scanner Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Scanner Column */}
        <div className="lg:col-span-8">
          <Scanner />
        </div>

        {/* Right Information & Guide Column */}
        <div className="lg:col-span-4 space-y-5">
          {/* SBM-U 2.0 Color Guide Card */}
          <div className="p-5 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface space-y-3.5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald" />
              SBM-U 2.0 Four-Stream System
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#16845B] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-forest dark:text-dark-text block">
                    Green Bin: Wet Waste
                  </strong>
                  <span className="text-muted dark:text-dark-muted">
                    Organic scraps, food peels, tea leaves. No plastic bags!
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#1D4ED8] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-forest dark:text-dark-text block">
                    Blue Bin: Dry Waste
                  </strong>
                  <span className="text-muted dark:text-dark-muted">
                    Paper, clean plastic, cardboard, tins, MLPs. Rinse and flatten.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#D97706] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-forest dark:text-dark-text block">
                    Yellow/Marked: Sanitary
                  </strong>
                  <span className="text-muted dark:text-dark-muted">
                    Diapers, pads. Wrap in newspaper with a red dot.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#C74646] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-forest dark:text-dark-text block">
                    Red Bin: Domestic Hazardous
                  </strong>
                  <span className="text-muted dark:text-dark-muted">
                    Batteries, tube lights, medicines, glass shards. Never in general bins.
                  </span>
                </div>
              </li>
            </ul>

            <div className="pt-2 border-t border-border-light dark:border-dark-border">
              <Link
                href="/guide"
                className="text-xs font-semibold text-emerald dark:text-lime hover:underline inline-flex items-center gap-1"
              >
                <span>Read detailed preparation guide</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Quick Capture Tips */}
          <div className="p-5 rounded-card border border-border-light dark:border-dark-border bg-ivory/60 dark:bg-dark-surface/60 space-y-2.5 text-xs text-muted dark:text-dark-muted">
            <h4 className="font-bold text-forest dark:text-dark-text text-xs uppercase tracking-wider">
              Optimal Scanning Tips
            </h4>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Ensure reasonable lighting on the item.</li>
              <li>Show packaging labels or resin recycling numbers if visible.</li>
              <li>If item contains multiple parts (e.g. lid and jar), photograph them separated.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Video Modal Walkthrough */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-dark-surface rounded-card border border-border-light dark:border-dark-border max-w-2xl w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border-light dark:border-dark-border">
              <h3 className="text-base font-bold text-forest dark:text-dark-text">
                Waste Identification and Segregation Video Guide
              </h3>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="text-muted dark:text-dark-muted hover:text-forest dark:hover:text-dark-text text-sm font-semibold p-1"
              >
                Close
              </button>
            </div>

            <VideoPlayer
              src="/videos/waste-analysis.mp4"
              poster="/assets/how-it-works.png"
              title="Waste Identification and Segregation Walkthrough"
              autoPlay={false}
              className="aspect-video w-full rounded-lg"
            />

            <p className="text-xs text-muted dark:text-dark-muted leading-relaxed">
              This demonstration illustrates how visual object recognition distinguishes contaminated organics, multi-layered films, and hazardous battery materials.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
