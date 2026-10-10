import React, { useState } from 'react';
import { WasteAnalysisResult } from '@/lib/types';
import { WASTE_CATEGORIES } from '@/lib/categories';
import { CategoryBadge } from './CategoryBadge';
import {
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  Info,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';

interface ResultCardProps {
  result: WasteAnalysisResult;
  imageUrl?: string | null;
  onScanAnother: () => void;
}

export function ResultCard({ result, imageUrl, onScanAnother }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const cat = WASTE_CATEGORIES[result.category] || WASTE_CATEGORIES['Dry Waste'];
  const hasHazard = Boolean(
    result.safety_warnings &&
    result.safety_warnings.trim().toLowerCase() !== 'none' &&
    result.safety_warnings.trim().toLowerCase() !== 'n/a'
  );

  const handleCopy = () => {
    const text = `EcoSort AI Analysis:
Item: ${result.item_name}
Category: ${result.category} (${cat.binColorName})
Material: ${result.material}
Preparation: ${result.preparation_steps.join('; ')}
Disposal: ${result.disposal_instructions}
${hasHazard ? `Hazard Warning: ${result.safety_warnings}` : ''}`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidenceBadge = {
    High: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    Low: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
  }[result.confidence] || 'bg-gray-100 text-gray-800 border-gray-300';

  return (
    <div className="bg-white dark:bg-dark-surface rounded-card border border-border-light dark:border-dark-border shadow-sm overflow-hidden transition-colors">
      {/* Top Banner if Critical Hazard */}
      {hasHazard && (
        <div className="bg-critical text-white px-5 py-3.5 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-lime" />
          <div className="text-sm">
            <span className="font-bold tracking-wide uppercase text-xs block text-lime">
              Safety Hazard Protocol Required
            </span>
            <p className="mt-0.5 text-white/95 leading-snug">
              {result.safety_warnings}
            </p>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8 space-y-6">
        {/* Header row with item name & confidence */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border-light dark:border-dark-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted dark:text-dark-muted">
                Identified Object
              </span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${confidenceBadge}`}>
                {result.confidence} Confidence
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-forest dark:text-dark-text tracking-tight">
              {result.item_name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <CategoryBadge category={result.category} size="lg" />
          </div>
        </div>

        {/* Thumbnail and Primary Material Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {imageUrl && (
            <div className="md:col-span-1 rounded-lg overflow-hidden border border-border-light dark:border-dark-border bg-ivory dark:bg-dark-bg aspect-square relative flex items-center justify-center">
              <img
                src={imageUrl}
                alt={result.item_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className={`${imageUrl ? 'md:col-span-2' : 'md:col-span-3'} space-y-4 flex flex-col justify-between`}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted dark:text-dark-muted">
                <Layers className="w-4 h-4 text-emerald" />
                <span>Composition:</span>
                <span className="text-forest dark:text-dark-text font-bold normal-case text-sm">
                  {result.material}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-ivory dark:bg-dark-elevated border border-border-light dark:border-dark-border text-sm text-forest dark:text-dark-text leading-relaxed">
                <p className="font-medium">{result.explanation}</p>
              </div>
            </div>

            {/* Target Receptacle / Bin destination */}
            <div className="p-4 rounded-lg border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface shadow-xs flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                style={{ backgroundColor: cat.binColor }}
              >
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <span className="text-xs uppercase font-semibold text-muted dark:text-dark-muted block">
                  Designated Destination
                </span>
                <span className="font-bold text-forest dark:text-dark-text text-base">
                  {cat.binColorName}
                </span>
                <p className="text-xs text-muted dark:text-dark-muted mt-0.5">
                  {result.disposal_instructions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Preparation Steps */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest dark:text-dark-text flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald" />
            Preparation Steps (Before Disposal)
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {result.preparation_steps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-lg border border-border-light dark:border-dark-border bg-ivory/50 dark:bg-dark-elevated/40 text-sm text-forest dark:text-dark-text"
              >
                <span className="w-5 h-5 rounded-md bg-emerald/10 text-emerald dark:bg-emerald/30 dark:text-lime font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Local Rules Caveat if applicable */}
        {result.local_rules_caveat && (
          <div className="p-3.5 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <p className="leading-relaxed">
              <strong>Municipal Variation Note:</strong> Segregation rules or recycler acceptance for this material may vary by Urban Local Body (ULB). Check your society or ward guidelines for specialized pick-up schedules.
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-border-light dark:border-dark-border flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-forest dark:text-dark-text border border-border-light dark:border-dark-border rounded-lg hover:bg-ivory dark:hover:bg-dark-elevated transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Guidance
                </>
              )}
            </button>

            <Link
              href="/guide"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-muted dark:text-dark-muted hover:text-forest dark:hover:text-dark-text transition-colors"
            >
              <span>Explore Stream Guide</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <button
            type="button"
            onClick={onScanAnother}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-lg shadow-sm transition-all duration-150 active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            Scan Another Item
          </button>
        </div>
      </div>
    </div>
  );
}
