'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  AlertCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  History,
  Trash2,
  X,
  CheckCircle,
} from 'lucide-react';
import { WasteAnalysisResult, ScanHistoryItem } from '@/lib/types';
import { SUSTAINABILITY_FACTS } from '@/lib/categories';
import { ResultCard } from './ResultCard';
import Link from 'next/link';

interface ScannerProps {
  className?: string;
  initialImage?: string | null;
  onScanComplete?: (result: WasteAnalysisResult) => void;
}

export function Scanner({ className = '', initialImage = null, onScanComplete }: ScannerProps) {
  const [viewState, setViewState] = useState<'idle' | 'preview' | 'loading' | 'result' | 'error'>(
    initialImage ? 'preview' : 'idle'
  );
  const [previewImage, setPreviewImage] = useState<string | null>(initialImage);
  const [compressedPayload, setCompressedPayload] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<WasteAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeFactIndex, setActiveFactIndex] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ecosort_scan_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  // Cycle sustainability facts during loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (viewState === 'loading') {
      interval = setInterval(() => {
        setActiveFactIndex((prev) => (prev + 1) % SUSTAINABILITY_FACTS.length);
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [viewState]);

  // Client-side compression logic: Canvas resize max dimension to 800px, JPEG 0.7
  const processAndCompressImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please provide a valid image file (JPEG, PNG, WebP).');
      setViewState('error');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setErrorMessage('Failed to initialize canvas compression engine.');
          setViewState('error');
          return;
        }

        // Fill background white in case of transparent PNG
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setPreviewImage(compressedBase64);
        setCompressedPayload(compressedBase64);
        setViewState('preview');
      };

      img.onerror = () => {
        setErrorMessage('Failed to decode the selected image. Please try another image.');
        setViewState('error');
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setErrorMessage('Error reading file from your device.');
      setViewState('error');
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndCompressImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndCompressImage(file);
    }
  };

  const handleAnalyze = async () => {
    if (!compressedPayload) return;

    setViewState('loading');
    setErrorMessage(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s safety limit

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: compressedPayload }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze waste item.');
      }

      setAnalysisResult(data.data);
      setViewState('result');

      // Save to localStorage history
      const newHistoryItem: ScanHistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        item_name: data.data.item_name,
        category: data.data.category,
        confidence: data.data.confidence,
        thumbnailUrl: compressedPayload,
        safety_warnings: data.data.safety_warnings,
        result: data.data,
      };

      setHistory((prev) => {
        const updated = [newHistoryItem, ...prev.slice(0, 9)];
        try {
          localStorage.setItem('ecosort_scan_history', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });

      if (onScanComplete) {
        onScanComplete(data.data);
      }
    } catch (err: any) {
      console.error('Scan analysis error:', err);
      const isAbort = err.name === 'AbortError';
      setErrorMessage(
        isAbort
          ? 'Analysis timed out. Network latency may be high; please retry or consult the static Waste Guide.'
          : err.message || 'An unexpected error occurred during classification.'
      );
      setViewState('error');
    }
  };

  const handleReset = () => {
    setViewState('idle');
    setPreviewImage(null);
    setCompressedPayload(null);
    setAnalysisResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('ecosort_scan_history');
    } catch (e) {}
  };

  const loadHistoryItem = (item: ScanHistoryItem) => {
    setPreviewImage(item.thumbnailUrl);
    setCompressedPayload(item.thumbnailUrl);
    setAnalysisResult(item.result);
    setViewState('result');
    setShowHistory(false);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="desktop-file-upload"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        id="mobile-camera-capture"
      />

      {/* VIEW STATE: IDLE */}
      {viewState === 'idle' && (
        <div className="space-y-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-card p-8 sm:p-12 text-center transition-all duration-200 bg-white dark:bg-dark-surface ${
              isDragOver
                ? 'border-emerald bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-border-light dark:border-dark-border hover:border-emerald/60 dark:hover:border-emerald/60'
            }`}
          >
            <div className="max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 mx-auto rounded-xl bg-ivory dark:bg-dark-elevated border border-border-light dark:border-dark-border flex items-center justify-center text-emerald dark:text-lime shadow-xs">
                <Camera className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-forest dark:text-dark-text tracking-tight">
                  Snap or Upload Waste Item
                </h2>
                <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
                  Point your mobile camera at any household item, packaging, or scrap. Instant SBM-U 2.0 segregation classification.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {/* Mobile Camera Button with capture='environment' */}
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-sm transition-all duration-150 active:scale-98"
                >
                  <Camera className="w-5 h-5" />
                  <span>Use Camera</span>
                </button>

                {/* File Upload Button for desktop / library */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-forest dark:text-dark-text bg-ivory dark:bg-dark-elevated hover:bg-ivory-dark dark:hover:bg-dark-border border border-border-light dark:border-dark-border rounded-btn transition-colors"
                >
                  <Upload className="w-5 h-5 text-emerald dark:text-lime" />
                  <span>Upload File / Drag &amp; Drop</span>
                </button>
              </div>

              <div className="pt-2 text-xs text-muted dark:text-dark-muted flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald" />
                <span>Client-side auto-compression &bull; Ephemeral zero-retention privacy</span>
              </div>
            </div>
          </div>

          {/* Quick Test Samples */}
          <div className="bg-white dark:bg-dark-surface rounded-card border border-border-light dark:border-dark-border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted dark:text-dark-muted">
                Demo Test Samples (Quick Reference)
              </span>
              <span className="text-xs text-muted dark:text-dark-muted">Try sample materials</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { name: 'PET Bottle', file: '/assets/hero-artwork.png', category: 'Dry Waste' },
                { name: 'Veg Scraps', file: '/assets/waste-categories.png', category: 'Wet Waste' },
                { name: 'Packaging Box', file: '/assets/how-it-works.png', category: 'Dry Waste' },
                { name: 'Mixed Textures', file: '/assets/material-textures.png', category: 'Multi-stream' },
              ].map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await fetch(sample.file);
                      const blob = await res.blob();
                      const file = new File([blob], `${sample.name}.png`, { type: 'image/png' });
                      processAndCompressImage(file);
                    } catch (e) {
                      fileInputRef.current?.click();
                    }
                  }}
                  className="p-3 text-left rounded-lg border border-border-light dark:border-dark-border bg-ivory/60 dark:bg-dark-elevated/40 hover:border-emerald dark:hover:border-emerald transition-colors"
                >
                  <span className="text-xs font-bold text-forest dark:text-dark-text block">
                    {sample.name}
                  </span>
                  <span className="text-[11px] text-muted dark:text-dark-muted">
                    {sample.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scan History Drawer toggle */}
          {history.length > 0 && (
            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted dark:text-dark-muted hover:text-forest dark:hover:text-dark-text"
              >
                <History className="w-4 h-4 text-emerald" />
                <span>Recent Scans ({history.length})</span>
              </button>
              <button
                type="button"
                onClick={clearHistory}
                className="text-xs text-muted dark:text-dark-muted hover:text-critical"
              >
                Clear History
              </button>
            </div>
          )}

          {showHistory && history.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => loadHistoryItem(item)}
                  className="p-3 rounded-card border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface text-left space-y-2 hover:border-emerald dark:hover:border-emerald transition-colors"
                >
                  <div className="aspect-video rounded-md overflow-hidden bg-ivory dark:bg-dark-bg">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.item_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-forest dark:text-dark-text truncate">
                      {item.item_name}
                    </h4>
                    <span className="text-[11px] text-muted dark:text-dark-muted">
                      {item.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW STATE: PREVIEW */}
      {viewState === 'preview' && previewImage && (
        <div className="bg-white dark:bg-dark-surface rounded-card border border-border-light dark:border-dark-border p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-light dark:border-dark-border">
            <div>
              <h3 className="text-lg font-bold text-forest dark:text-dark-text">
                Confirm Image for AI Classification
              </h3>
              <p className="text-xs text-muted dark:text-dark-muted mt-0.5">
                Image optimized and ready for multimodal analysis.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-lg text-muted hover:text-critical hover:bg-ivory dark:hover:bg-dark-elevated transition-colors"
              aria-label="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative max-w-sm mx-auto rounded-lg overflow-hidden border border-border-light dark:border-dark-border shadow-xs aspect-square bg-ivory dark:bg-dark-bg flex items-center justify-center">
            <img
              src={previewImage}
              alt="Waste preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 text-sm font-semibold text-muted dark:text-dark-muted hover:text-forest dark:hover:text-dark-text border border-border-light dark:border-dark-border rounded-btn transition-colors"
            >
              Change Photo
            </button>

            <button
              type="button"
              onClick={handleAnalyze}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-md transition-all duration-150 active:scale-98"
            >
              <Sparkles className="w-5 h-5 text-lime" />
              <span>Analyze with Gemini AI</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW STATE: LOADING */}
      {viewState === 'loading' && (
        <div className="bg-white dark:bg-dark-surface rounded-card border border-border-light dark:border-dark-border p-8 sm:p-12 text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 rounded-full border-4 border-emerald-light dark:border-emerald/20 border-t-emerald animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-emerald dark:text-lime">
              <Camera className="w-7 h-7" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-forest dark:text-dark-text tracking-tight">
              Analyzing Material &amp; Stream
            </h3>
            <p className="text-sm text-muted dark:text-dark-muted">
              Matching visual composition against SBM-U 2.0 municipal classification rules...
            </p>
          </div>

          {/* Dynamic rotating sustainability fact to reduce perceived latency */}
          <div className="max-w-md mx-auto p-4 rounded-lg bg-ivory dark:bg-dark-elevated border border-border-light dark:border-dark-border transition-all duration-300">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald dark:text-lime block mb-1">
              Did you know?
            </span>
            <p className="text-xs text-forest dark:text-dark-text leading-relaxed font-medium">
              {SUSTAINABILITY_FACTS[activeFactIndex]}
            </p>
          </div>
        </div>
      )}

      {/* VIEW STATE: RESULT */}
      {viewState === 'result' && analysisResult && (
        <ResultCard
          result={analysisResult}
          imageUrl={previewImage}
          onScanAnother={handleReset}
        />
      )}

      {/* VIEW STATE: ERROR */}
      {viewState === 'error' && (
        <div className="bg-white dark:bg-dark-surface rounded-card border border-critical/30 dark:border-critical/40 p-6 sm:p-8 space-y-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-xl bg-critical-light dark:bg-critical-dark/40 flex items-center justify-center text-critical">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-forest dark:text-dark-text">
              Analysis Could Not Be Completed
            </h3>
            <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
              {errorMessage || 'Unable to connect to the Gemini AI classification engine.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-btn transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/guide"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-forest dark:text-dark-text border border-border-light dark:border-dark-border rounded-btn bg-ivory dark:bg-dark-elevated transition-colors"
            >
              <BookOpen className="w-4 h-4 text-emerald" />
              <span>Browse Static Waste Guide</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
