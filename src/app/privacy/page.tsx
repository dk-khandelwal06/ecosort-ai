import React from 'react';
import Link from 'next/link';
import { Shield, Eye, Lock, Server, Sparkles, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <Shield className="w-3.5 h-3.5 text-emerald" />
          <span>Data Governance &amp; Security</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest dark:text-dark-text tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted dark:text-dark-muted">
          Last updated &bull; October 2026. Effective immediately for all visitors and users of EcoSort AI.
        </p>
      </div>

      {/* Content Sections */}
      <div className="prose prose-forest dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-forest dark:text-dark-text">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            1. Overview &amp; Product Purpose
          </h2>
          <p className="text-muted dark:text-dark-muted">
            EcoSort AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the platform&rdquo;) is an open-access environmental technology application developed by Daksh Khandelwal and Khushi Kushwah for the &ldquo;Technology for a Cleaner Bharat&rdquo; Hackathon 2026. The platform exists to assist citizens and households in correctly segregating solid municipal waste according to Swachh Bharat Mission-Urban 2.0 (SBM-U 2.0) guidelines.
          </p>
          <p className="text-muted dark:text-dark-muted">
            We are committed to absolute transparency regarding data handling. We believe environmental civic tools must respect user privacy by default, minimizing all unnecessary collection.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            2. Information We Collect and Process
          </h2>
          <p className="text-muted dark:text-dark-muted">
            Our application is engineered so you can access the core AI scanner without creating an account or providing personal identifying credentials:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted dark:text-dark-muted">
            <li>
              <strong>Uploaded Waste Photographs:</strong> When you snap or select an image for waste analysis, that image is loaded into your browser&apos;s memory, compressed locally on your device via HTML5 canvas, and transmitted securely over encrypted HTTPS to our serverless backend function.
            </li>
            <li>
              <strong>Optional Account Information:</strong> If you choose to register for an optional account via Supabase Auth, we collect your email address, encrypted authentication token, and optional name. Account registration is completely optional and does not restrict your access to the waste scanner.
            </li>
            <li>
              <strong>Local Browser Storage:</strong> We use your browser&apos;s local storage (<code className="text-xs bg-ivory dark:bg-dark-elevated px-1.5 py-0.5 rounded">localStorage</code>) exclusively to store your preferred display theme (Light or Dark) and your temporary local scan history so you can review recent items. This data stays entirely on your device and is never synchronized to our servers.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            3. Image Transmission &amp; Third-Party AI Processing
          </h2>
          <p className="text-muted dark:text-dark-muted">
            To provide real-time zero-shot waste classification, uploaded image data is transmitted from our backend serverless route (<code className="text-xs bg-ivory dark:bg-dark-elevated px-1.5 py-0.5 rounded">/api/analyze</code>) to Google&apos;s Gemini Multimodal API via the official <code className="text-xs bg-ivory dark:bg-dark-elevated px-1.5 py-0.5 rounded">@google/genai</code> SDK:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted dark:text-dark-muted">
            <li>
              Images sent to Google Gemini are processed ephemerally for the sole purpose of generating the structured categorization response.
            </li>
            <li>
              EcoSort AI does not maintain an image database, AWS S3 bucket, or persistent media storage. Once the JSON analysis is returned to your browser, the image buffer on our serverless endpoint is terminated.
            </li>
            <li>
              API keys are stored exclusively as server-side environment secrets and are never exposed to browser bundles.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            4. Service Providers &amp; Infrastructure
          </h2>
          <p className="text-muted dark:text-dark-muted">
            We rely on trusted modern cloud infrastructure partners to deliver EcoSort AI:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose">
            <div className="p-4 rounded-lg border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface space-y-1">
              <span className="text-xs font-bold text-forest dark:text-dark-text block">
                Google Cloud / Gemini
              </span>
              <p className="text-xs text-muted dark:text-dark-muted">
                Multimodal vision inference under Google AI Studio enterprise privacy terms.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface space-y-1">
              <span className="text-xs font-bold text-forest dark:text-dark-text block">
                Vercel Serverless
              </span>
              <p className="text-xs text-muted dark:text-dark-muted">
                Edge application hosting, request routing, and HTTPS encryption.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border-light dark:border-dark-border bg-white dark:bg-dark-surface space-y-1">
              <span className="text-xs font-bold text-forest dark:text-dark-text block">
                Supabase
              </span>
              <p className="text-xs text-muted dark:text-dark-muted">
                Industry-standard PostgreSQL identity and authentication service (optional).
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            5. Cookies and Analytics
          </h2>
          <p className="text-muted dark:text-dark-muted">
            EcoSort AI does NOT deploy invasive third-party ad-tracking cookies, behavioural beacons, or advertising pixels. We do not sell, rent, or monetize user data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            6. User Rights &amp; Data Erasure
          </h2>
          <p className="text-muted dark:text-dark-muted">
            Because we do not store your uploaded waste images, there is no server-side image repository from which to request deletion. You can clear your client-side scan history at any time by tapping &ldquo;Clear History&rdquo; in the scanner interface or clearing your browser&apos;s site data.
          </p>
          <p className="text-muted dark:text-dark-muted">
            If you created an optional Supabase account and wish to delete your account record, you can request account termination by contacting the project team.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-forest dark:text-dark-text">
            7. Contact Information &amp; Policy Updates
          </h2>
          <p className="text-muted dark:text-dark-muted">
            This prototype application is maintained by the EcoSort AI engineering team for academic and civic demonstration. For questions or concerns regarding this policy, please reach out via GitHub:
          </p>
          <div className="p-4 rounded-lg bg-ivory dark:bg-dark-elevated border border-border-light dark:border-dark-border not-prose space-y-1 text-xs text-forest dark:text-dark-text">
            <p>
              <strong>Project Maintainers:</strong> Daksh Khandelwal &amp; Khushi Kushwah
            </p>
            <p>
              <strong>Source Repository:</strong>{' '}
              <a
                href="https://github.com/dk-khandelwal06/ecosort-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald dark:text-lime underline"
              >
                github.com/dk-khandelwal06/ecosort-ai
              </a>
            </p>
            <p className="text-muted dark:text-dark-muted pt-1">
              <em>Note: As an open hackathon submission, EcoSort AI does not represent a commercial corporate entity. Formal legal notices may be directed through the repository issues.</em>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
