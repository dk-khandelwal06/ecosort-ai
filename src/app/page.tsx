'use client';

import React from 'react';
import Link from 'next/link';
import {
  Camera,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Zap,
  Leaf,
  Recycle,
  Eye,
  FileCheck,
} from 'lucide-react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { CategoryBadge } from '@/components/CategoryBadge';
import { WASTE_CATEGORIES } from '@/lib/categories';
import { WasteStreamCategory } from '@/lib/types';

export default function HomePage() {
  const categoriesList: WasteStreamCategory[] = [
    'Wet Waste',
    'Dry Waste',
    'Sanitary Waste',
    'Domestic Hazardous Waste',
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald/30 bg-emerald-light dark:bg-emerald-950/40 text-forest dark:text-lime text-xs font-semibold">
                <Leaf className="w-3.5 h-3.5 text-emerald" />
                <span>Swachh Bharat Mission-Urban 2.0 Compliant</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest dark:text-dark-text tracking-tight leading-[1.1]">
                  Know your waste.{' '}
                  <span className="text-emerald dark:text-lime block">
                    Make the next step count.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-muted dark:text-dark-muted max-w-xl leading-relaxed">
                  Photograph any confusing food container, packaging, or scrap. EcoSort AI instantly analyzes the material and gives you exact, safety-conscious bin instructions.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/scan"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-md transition-all duration-150 active:scale-98"
                >
                  <Camera className="w-5 h-5 text-lime" />
                  <span>Identify My Waste</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/guide"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-semibold text-forest dark:text-dark-text bg-white dark:bg-dark-surface hover:bg-ivory dark:hover:bg-dark-elevated border border-border-light dark:border-dark-border rounded-btn transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-emerald" />
                  <span>Explore Waste Guide</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-light dark:border-dark-border text-xs text-muted dark:text-dark-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0" />
                  <span>Zero Downloads Needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0" />
                  <span>4-Way Stream Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0" />
                  <span>Privacy-First &bull; Ephemeral</span>
                </div>
              </div>
            </div>

            {/* Right Media Composition Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-card overflow-hidden border border-border-light dark:border-dark-border shadow-lg bg-white dark:bg-dark-surface p-2">
                {/* Hero Loop Video with Poster Fallback */}
                <VideoPlayer
                  src="/videos/hero-loop.mp4"
                  poster="/assets/hero-artwork.png"
                  title="EcoSort AI Zero Waste Ambient Showcase"
                  className="aspect-[4/3] w-full"
                />

                {/* Illustrative Live Result Badge Overlay */}
                <div className="p-4 bg-white/95 dark:bg-dark-surface/95 rounded-lg mt-2 border border-border-light dark:border-dark-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted dark:text-dark-muted">
                      Sample Scanner Preview
                    </span>
                    <span className="text-[10px] bg-emerald-light dark:bg-emerald-950/60 text-forest dark:text-lime font-bold px-2 py-0.5 rounded">
                      High Confidence
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-forest dark:text-dark-text">
                        Clear PET Beverage Bottle
                      </h4>
                      <p className="text-xs text-muted dark:text-dark-muted">
                        Rinse lightly, crush to save space &bull; Blue Dry Waste Bin
                      </p>
                    </div>
                    <CategoryBadge category="Dry Waste" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (Capture, Understand, Act) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald/10 text-forest dark:text-lime text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-emerald" />
            <span>Frictionless 3-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest dark:text-dark-text tracking-tight">
            How EcoSort AI Intervenes at the Bin
          </h2>
          <p className="text-sm sm:text-base text-muted dark:text-dark-muted">
            Designed specifically for smartphone browsers with zero login barriers so you get clarity within seconds.
          </p>
        </div>

        {/* Workflow Visual Banner */}
        <div className="mb-10 rounded-card overflow-hidden border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface shadow-xs">
          <img
            src="/assets/how-it-works.png"
            alt="EcoSort AI workflow process: Capture item, AI multimodal analysis, and accurate bin segregation"
            className="w-full h-auto object-cover max-h-[380px]"
            loading="lazy"
          />
        </div>

        {/* 3 Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-emerald-light dark:bg-emerald-950/50 flex items-center justify-center text-emerald dark:text-lime font-bold text-lg">
              1
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-forest dark:text-dark-text">
                Capture the Object
              </h3>
              <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
                Open EcoSort AI and tap Scan. Your phone’s rear camera captures the item. Automatic client-side canvas compression downscales the payload under 1MB to avoid serverless upload limits.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-emerald-light dark:bg-emerald-950/50 flex items-center justify-center text-emerald dark:text-lime font-bold text-lg">
              2
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-forest dark:text-dark-text">
                Understand Composition
              </h3>
              <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
                Google Gemini multimodal AI identifies multi-layered plastics, organic residues, or dangerous battery cells against official SBM-U 2.0 definitions.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-emerald-light dark:bg-emerald-950/50 flex items-center justify-center text-emerald dark:text-lime font-bold text-lg">
              3
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-forest dark:text-dark-text">
                Act with Certainty
              </h3>
              <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
                Follow actionable preparation steps (e.g. rinse food residue, flatten cardboard, or safety-wrap broken glass) and toss into the correct green, blue, or red bin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SBM-U 2.0 WASTE CATEGORIES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald/10 text-forest dark:text-lime text-xs font-semibold">
              <Recycle className="w-3.5 h-3.5 text-emerald" />
              <span>National Waste Standard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest dark:text-dark-text tracking-tight">
              Four Streams. No Confusion.
            </h2>
            <p className="text-sm sm:text-base text-muted dark:text-dark-muted leading-relaxed">
              India generates over 170,000 tonnes of municipal solid waste every single day. The Swachh Bharat Mission-Urban 2.0 framework enforces 4-way source segregation to prevent commingling at the doorstep.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-card overflow-hidden border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface">
              <img
                src="/assets/waste-categories.png"
                alt="Overview of Indian municipal waste categories: Wet, Dry, Sanitary, and Domestic Hazardous"
                className="w-full h-auto object-cover max-h-[260px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* 4 Interactive Stream Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoriesList.map((catKey) => {
            const cat = WASTE_CATEGORIES[catKey];
            return (
              <div
                key={catKey}
                className="p-5 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface space-y-3 flex flex-col justify-between shadow-xs hover:border-emerald/60 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: cat.binColor }}
                      aria-hidden="true"
                    />
                    <span className="text-[11px] font-bold text-muted dark:text-dark-muted uppercase">
                      {cat.binColorName.split(' ')[0]} Bin
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-forest dark:text-dark-text">
                    {cat.title.split('(')[0].trim()}
                  </h3>
                  <span className="text-xs font-medium text-emerald dark:text-lime block">
                    {cat.hindiName}
                  </span>

                  <p className="text-xs text-muted dark:text-dark-muted leading-relaxed">
                    {cat.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-light dark:border-dark-border">
                  <span className="text-[11px] font-semibold text-forest dark:text-dark-text block mb-1">
                    Key Items:
                  </span>
                  <p className="text-[11px] text-muted dark:text-dark-muted line-clamp-2">
                    {cat.examples.slice(0, 3).join(', ')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald dark:text-lime hover:underline"
          >
            <span>Read full SBM-U 2.0 segregation guidelines &amp; preparation tips</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* COMPLEX PACKAGING & MATERIAL TEXTURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald/10 text-forest dark:text-lime text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-emerald" />
                <span>The Cognitive Friction Problem</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest dark:text-dark-text tracking-tight">
                Why Modern Packaging Confuses Everyone
              </h2>
              <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
                Consumer goods have evolved beyond simple glass and paper into Multi-Layered Plastics (MLP), metallized foils, composite drink cartons, and wax linings. Citizens want to do the right thing, but packaging ambiguity defaults them to mixed rubbish.
              </p>
              <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
                EcoSort AI solves this micro-confusion in real-time, removing cognitive friction right when an item is about to be tossed.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-lg overflow-hidden border border-border-light dark:border-dark-border">
                <img
                  src="/assets/material-textures.png"
                  alt="Multi-layered packaging materials, paperboard, plastic films, and composite textures"
                  className="w-full h-auto object-cover max-h-[320px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLEANER BHARAT VIDEO & SUSTAINABILITY IMPACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald/10 text-forest dark:text-lime text-xs font-semibold">
              <Leaf className="w-3.5 h-3.5 text-emerald" />
              <span>National Mission Alignment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest dark:text-dark-text tracking-tight">
              Technology for a Cleaner Bharat
            </h2>
            <p className="text-sm sm:text-base text-muted dark:text-dark-muted leading-relaxed">
              When biodegradable organic waste (51.3% of India&apos;s MSW) is mixed with recyclables and batteries, whole batches decompose into toxic leachate and unsegregated landfill bulk.
            </p>
            <p className="text-sm sm:text-base text-muted dark:text-dark-muted leading-relaxed">
              By empowering millions of households to segregate accurately at the source, we protect waste sanitation workers from hazardous injuries, prevent catastrophic landfill fires, and supply clean feedstocks to composting and Waste-to-Energy plants.
            </p>
            <div className="pt-2">
              <Link
                href="/scan"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-sm transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Try the Scanner Now</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <VideoPlayer
              src="/videos/cleaner-bharat.mp4"
              poster="/assets/hero-artwork.png"
              title="A Cleaner Bharat Sustainability Showcase"
              className="aspect-video w-full shadow-md"
            />
          </div>
        </div>
      </section>

      {/* SAFETY FIRST: DOMESTIC HAZARDOUS WASTE PROTOCOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-card border border-critical/30 dark:border-critical/40 bg-white dark:bg-dark-surface space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-critical-light dark:bg-critical-dark/40 text-critical flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-forest dark:text-dark-text">
                Strict Safety Guardrails: Protecting Sanitation Workers
              </h3>
              <p className="text-xs text-muted dark:text-dark-muted">
                How EcoSort AI treats batteries, e-waste, and broken glass.
              </p>
            </div>
          </div>

          <p className="text-sm text-forest dark:text-dark-text leading-relaxed">
            Domestic hazardous items—specifically lithium-ion batteries, button cells, CFL lamps, chemical tins, and shattered glass—are strictly barred from general bins. If an item presents a fire, toxicity, or cut risk, our AI overrides normal instructions with a high-contrast Red Safety Alert directing you to dedicated drop-off channels.
          </p>
        </div>
      </section>

      {/* EPHEMERAL DATA & PRIVACY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-card border border-border-light dark:border-dark-border bg-ivory/60 dark:bg-dark-surface/60 space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald flex-shrink-0" />
            <h3 className="text-base font-bold text-forest dark:text-dark-text">
              Zero-Retention Privacy Architecture
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted dark:text-dark-muted leading-relaxed">
            Images captured via EcoSort AI are loaded into device memory, compressed locally using HTML5 canvas, securely transmitted to our serverless endpoint over HTTPS for real-time analysis, and discarded immediately post-response. We do not store or catalog your photos in databases or file storage.
          </p>
          <div className="pt-1">
            <Link
              href="/privacy"
              className="text-xs font-semibold text-emerald dark:text-lime hover:underline"
            >
              Read full privacy disclosure &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-forest dark:text-dark-text tracking-tight">
            Ready to segregate your waste with complete confidence?
          </h2>
          <p className="text-sm text-muted dark:text-dark-muted">
            No registration required. Open the camera, capture your item, and get immediate guidance.
          </p>
        </div>
        <div>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-md transition-all active:scale-98"
          >
            <Camera className="w-5 h-5 text-lime" />
            <span>Launch EcoSort Scanner</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
