import React from 'react';
import Link from 'next/link';
import { FileText, AlertTriangle, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted dark:text-dark-muted hover:text-forest dark:hover:text-dark-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-border-light dark:border-dark-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald/10 text-forest dark:text-lime text-xs font-semibold">
          <FileText className="w-3.5 h-3.5 text-emerald" />
          <span>User Agreement &amp; Operational Disclaimer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest dark:text-dark-text tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-muted dark:text-dark-muted">
          Last revised &bull; October 2026. Please review these operational terms carefully before using EcoSort AI.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-forest dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-forest dark:text-dark-text">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted dark:text-dark-muted">
            By accessing or utilizing the EcoSort AI web application, you acknowledge and agree to be bound by these Terms &amp; Conditions. If you do not agree to these terms, please discontinue use of the platform immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            2. Scope &amp; Advisory Nature of AI-Generated Guidance
          </h2>
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-xs not-prose space-y-1.5">
            <span className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4" />
              CRITICAL NOTICE: ADVISORY CIVIC TOOL
            </span>
            <p className="leading-relaxed">
              EcoSort AI utilizes multimodal machine learning to provide automated classification estimates based on Swachh Bharat Mission-Urban 2.0 (SBM-U 2.0) principles. This guidance is informational and educational only. It does NOT constitute a legally binding municipal directive, environmental compliance certification, or hazardous waste disposal permit.
            </p>
          </div>
          <p className="text-muted dark:text-dark-muted">
            Neither the creators, maintainers, nor hackathon organizers warrant that AI-generated classifications are error-free. Visual artifacts, poor lighting, overlapping objects, or novel composite packaging may lead to incorrect or ambiguous classifications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            3. Safety-Sensitive &amp; Hazardous Materials
          </h2>
          <div className="p-4 rounded-lg bg-critical-light dark:bg-critical-dark/40 border border-critical/30 not-prose space-y-1.5 text-xs text-critical">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              SPECIAL SAFETY PROTOCOL
            </span>
            <p className="leading-relaxed text-forest dark:text-dark-text">
              Users must exercise extreme caution with hazardous materials, including but not limited to: Lithium-ion batteries, chemical containers, corrosive substances, ammunition, biohazardous syringes, and sharp broken glass. NEVER dispose of combustible batteries or hazardous chemicals in regular residential trash based on an AI recommendation. Always surrender hazardous substances to authorized municipal collection points or certified e-waste recyclers under Indian Battery Waste Management Rules 2026.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            4. Local Authority &amp; Facility Variances
          </h2>
          <p className="text-muted dark:text-dark-muted">
            Recycling capabilities, municipal bin color-coding conventions, and informal scrap market (&ldquo;kabadiwala&rdquo;) acceptance vary significantly across different states, Union Territories, and Urban Local Bodies (ULBs) within India. EcoSort AI cannot guarantee that an item classified as recyclable will be accepted by your local neighborhood collector or Material Recovery Facility (MRF).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            5. User Content &amp; Acceptable Use
          </h2>
          <p className="text-muted dark:text-dark-muted">
            When uploading photographs to EcoSort AI, you agree that:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-muted dark:text-dark-muted">
            <li>You will only photograph physical waste items intended for segregation and disposal analysis.</li>
            <li>You will not upload illicit, defamatory, obscene, or privacy-violating images containing recognizable faces or sensitive documents.</li>
            <li>You will not attempt to probe, exploit, or bypass serverless rate limits or API endpoints.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            6. Service Availability &amp; Modifications
          </h2>
          <p className="text-muted dark:text-dark-muted">
            As a hackathon product build, EcoSort AI is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind. We reserve the right to modify, suspend, or decommission the platform, endpoints, or features without prior notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            7. Limitation of Liability
          </h2>
          <p className="text-muted dark:text-dark-muted">
            In no event shall the platform developers or affiliated institutions be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from the handling, improper disposal, contamination, fire, injury, or municipal fines incurred in connection with the use of EcoSort AI.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            8. Governing Law &amp; Prototype Context
          </h2>
          <p className="text-muted dark:text-dark-muted">
            These terms are governed by the laws of India applicable to digital civic software demonstrations. Any questions regarding these terms can be submitted via the official project repository:
          </p>
          <p className="text-xs text-muted dark:text-dark-muted">
            Repository:{' '}
            <a
              href="https://github.com/dk-khandelwal06/ecosort-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald dark:text-lime underline"
            >
              https://github.com/dk-khandelwal06/ecosort-ai
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
