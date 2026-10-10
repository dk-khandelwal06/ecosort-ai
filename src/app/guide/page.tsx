'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Filter,
  Layers,
  Camera,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { WASTE_CATEGORIES } from '@/lib/categories';
import { WasteStreamCategory } from '@/lib/types';
import { CategoryBadge } from '@/components/CategoryBadge';

export default function GuidePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: WasteStreamCategory[] = [
    'Wet Waste',
    'Dry Waste',
    'Sanitary Waste',
    'Domestic Hazardous Waste',
  ];

  // Specific guidance items for quick search
  const searchableItems = [
    { name: 'Banana Peel / Apple Core', category: 'Wet Waste', bin: 'Green', prep: 'Place directly in green bin without plastic polythene bag.' },
    { name: 'Cooked Food / Leftovers', category: 'Wet Waste', bin: 'Green', prep: 'Drain gravies and excess liquid to prevent leachate.' },
    { name: 'Tea Leaves / Coffee Grounds', category: 'Wet Waste', bin: 'Green', prep: 'Ensure staple pin on tea bag is removed if present.' },
    { name: 'Clean Amazon Cardboard Box', category: 'Dry Waste', bin: 'Blue', prep: 'Remove packing tape, flatten box flat to save space.' },
    { name: 'Plastic Milk Pouch (HDPE/LDPE)', category: 'Dry Waste', bin: 'Blue', prep: 'Rinse with small amount of water, dry, do not cut corner off completely.' },
    { name: 'Snack / Chips Wrapper (MLP)', category: 'Dry Waste', bin: 'Blue', prep: 'Wipe clean of oil; processed at MRF into Refuse Derived Fuel (RDF).' },
    { name: 'PET Water / Soda Bottle', category: 'Dry Waste', bin: 'Blue', prep: 'Empty, rinse, crush bottle and replace cap.' },
    { name: 'Aluminium Beverage Can', category: 'Dry Waste', bin: 'Blue', prep: 'Rinse and flatten; high value informal recyclables.' },
    { name: 'Used Sanitary Napkins & Diapers', category: 'Sanitary Waste', bin: 'Yellow / Red-Dot Pouch', prep: 'Wrap tightly in newspaper, mark with a red dot / X on outer cover.' },
    { name: 'Used Bandages & Cotton Swabs', category: 'Sanitary Waste', bin: 'Yellow / Marked', prep: 'Wrap in paper pouch. Sent for high-temperature incineration.' },
    { name: 'Alkaline AA / AAA / Button Battery', category: 'Domestic Hazardous Waste', bin: 'Red Bin / E-Waste Collector', prep: 'CRITICAL: Never throw in general bins. Risk of toxic compactor fire.' },
    { name: 'Lithium-Ion Phone Battery', category: 'Domestic Hazardous Waste', bin: 'Red Bin / Authorized E-Waste Center', prep: 'Store in dry non-conductive container. Deposit at authorized e-waste kiosk.' },
    { name: 'Broken Glass Tumbler / Mirror', category: 'Domestic Hazardous Waste', bin: 'Red Bin / Marked Wrapping', prep: 'Wrap shards in multiple layers of newspaper and tape securely to prevent cuts.' },
    { name: 'Expired Medicine Strips / Cough Syrup', category: 'Domestic Hazardous Waste', bin: 'Red Bin / Pharmacy Take-Back', prep: 'Do not flush into drain or toilet. Deliver to municipal hazardous collection.' },
    { name: 'CFL Light Bulb / Fluorescent Tube', category: 'Domestic Hazardous Waste', bin: 'Red Bin', prep: 'Contains toxic mercury vapor. Keep intact, wrap in cardboard sleeve.' },
  ];

  const filteredItems = searchableItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prep.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Title & Mission Context */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald/10 text-forest dark:text-lime text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-emerald" />
          <span>Swachh Bharat Mission-Urban 2.0 Official Protocols</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest dark:text-dark-text tracking-tight">
          Comprehensive Waste Segregation Guide
        </h1>
        <p className="text-sm sm:text-base text-muted dark:text-dark-muted leading-relaxed">
          The four-way segregation handbook for Indian households. Understand material composition, correct receptacle allocation, and mandatory preparation steps before disposal.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="p-4 sm:p-6 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted" />
            <input
              type="text"
              placeholder="Search waste item (e.g., battery, milk pouch, cardboard, medicine, diaper)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm rounded-lg border border-border-light dark:border-dark-border bg-ivory/50 dark:bg-dark-bg text-forest dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-emerald placeholder:text-muted/70"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-forest text-white border-forest dark:bg-emerald dark:border-emerald'
                  : 'bg-ivory dark:bg-dark-elevated text-muted dark:text-dark-muted border-border-light dark:border-dark-border hover:text-forest dark:hover:text-dark-text'
              }`}
            >
              All Streams
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-forest text-white border-forest dark:bg-emerald dark:border-emerald'
                    : 'bg-ivory dark:bg-dark-elevated text-muted dark:text-dark-muted border-border-light dark:border-dark-border hover:text-forest dark:hover:text-dark-text'
                }`}
              >
                {c.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Search Results Preview */}
        {searchTerm && (
          <div className="pt-2 border-t border-border-light dark:border-dark-border">
            <span className="text-xs font-semibold text-muted dark:text-dark-muted">
              Found {filteredItems.length} matching items:
            </span>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-border-light dark:border-dark-border bg-ivory/60 dark:bg-dark-elevated/40 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest dark:text-dark-text">
                      {item.name}
                    </span>
                    <CategoryBadge category={item.category as WasteStreamCategory} size="sm" showHindi={false} />
                  </div>
                  <p className="text-muted dark:text-dark-muted leading-relaxed">
                    {item.prep}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DETAILED STREAM CARDS */}
      <div className="space-y-8">
        {categories.map((catKey) => {
          const cat = WASTE_CATEGORIES[catKey];
          return (
            <section
              key={catKey}
              id={catKey.toLowerCase().replace(/\s+/g, '-')}
              className="p-6 sm:p-8 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface shadow-xs space-y-6"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-light dark:border-dark-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: cat.binColor }}
                    />
                    <span className="text-xs uppercase font-bold text-muted dark:text-dark-muted">
                      {cat.binColorName}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-forest dark:text-dark-text">
                    {cat.title}
                  </h2>
                  <span className="text-sm font-semibold text-emerald dark:text-lime">
                    {cat.hindiName}
                  </span>
                </div>

                <div>
                  <CategoryBadge category={catKey} size="lg" />
                </div>
              </div>

              <p className="text-sm text-forest dark:text-dark-text leading-relaxed">
                {cat.summary}
              </p>

              {/* Grid: Accepted, Unacceptable, Preparation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Accepted */}
                <div className="space-y-3 p-4 rounded-lg bg-ivory/50 dark:bg-dark-elevated/40 border border-border-light dark:border-dark-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald" />
                    Accepted Items
                  </h3>
                  <ul className="space-y-2 text-xs text-muted dark:text-dark-muted">
                    {cat.examples.map((ex, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald mt-0.5">&bull;</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Accepted */}
                <div className="space-y-3 p-4 rounded-lg bg-ivory/50 dark:bg-dark-elevated/40 border border-border-light dark:border-dark-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-critical flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-critical" />
                    Do Not Commingle
                  </h3>
                  <ul className="space-y-2 text-xs text-muted dark:text-dark-muted">
                    {cat.unacceptable.map((un, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-critical mt-0.5">&times;</span>
                        <span>{un}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation Tips */}
                <div className="space-y-3 p-4 rounded-lg bg-ivory/50 dark:bg-dark-elevated/40 border border-border-light dark:border-dark-border">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald" />
                    Household Preparation
                  </h3>
                  <ul className="space-y-2 text-xs text-muted dark:text-dark-muted">
                    {cat.preparationTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald mt-0.5">&rarr;</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SBM-U 2.0 Processing Note */}
              <div className="p-3.5 rounded-lg bg-ivory dark:bg-dark-bg border border-border-light dark:border-dark-border text-xs text-muted dark:text-dark-muted">
                <strong className="text-forest dark:text-dark-text font-semibold">
                  Swachh Bharat Processing Standard:
                </strong>{' '}
                {cat.swachhBharatGuideline}
              </div>
            </section>
          );
        })}
      </div>

      {/* Special Deep-Dive: E-Waste & Batteries Section */}
      <section className="p-6 sm:p-8 rounded-card border border-critical/30 dark:border-critical/40 bg-white dark:bg-dark-surface space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-critical-light dark:bg-critical-dark/40 text-critical flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-forest dark:text-dark-text">
              Special Focus: Battery Waste Management Rules 2026
            </h2>
            <p className="text-xs text-muted dark:text-dark-muted">
              Why household batteries must never enter municipal compactor vehicles.
            </p>
          </div>
        </div>

        <p className="text-sm text-forest dark:text-dark-text leading-relaxed">
          Under the Battery Waste Management Rules 2026 and CPCB directives, lithium-ion, lead-acid, and alkaline batteries represent critical fire and heavy-metal contamination hazards. When compacted inside hydraulic garbage trucks, punctured batteries undergo thermal runaway, releasing toxic fumes and sparking uncontrollable municipal fires.
        </p>

        <div className="p-4 rounded-lg bg-ivory dark:bg-dark-elevated border border-border-light dark:border-dark-border text-xs text-muted dark:text-dark-muted space-y-2">
          <h4 className="font-bold text-forest dark:text-dark-text">
            Mandatory Action for Indian Residents:
          </h4>
          <p>
            1. Keep spent batteries in a dry, room-temperature plastic container away from heat.
          </p>
          <p>
            2. Never mix with kitchen waste or dry recyclables.
          </p>
          <p>
            3. Hand over on designated hazardous collection days or deposit at authorized producer e-waste return kiosks under Extended Producer Responsibility (EPR).
          </p>
        </div>
      </section>

      {/* Bottom CTA to Scanner */}
      <div className="p-8 rounded-card border border-border-light dark:border-dark-border bg-ivory dark:bg-dark-surface text-center space-y-4">
        <h3 className="text-2xl font-bold text-forest dark:text-dark-text">
          Have an item in hand right now?
        </h3>
        <p className="text-sm text-muted dark:text-dark-muted max-w-md mx-auto">
          Skip the manual reading. Let EcoSort AI inspect the object visually and categorize it in seconds.
        </p>
        <Link
          href="/scan"
          className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-sm"
        >
          <Camera className="w-5 h-5" />
          <span>Launch AI Waste Scanner</span>
        </Link>
      </div>
    </div>
  );
}
