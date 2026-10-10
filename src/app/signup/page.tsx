'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle, Info, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    setConfigured(isSupabaseConfigured());
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

    if (!configured) {
      setErrorMessage(
        'Authentication provider is not yet configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live registrations.'
      );
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/login?verified=true`,
        },
      });

      if (error) throw error;

      if (data.user && data.session) {
        setSuccessMessage('Account created successfully! Redirecting...');
        setTimeout(() => router.push('/scan'), 1500);
      } else {
        setSuccessMessage(
          'Registration initiated! Please check your email inbox to confirm your account.'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-forest dark:text-dark-text tracking-tight">
          Create an EcoSort Account
        </h1>
        <p className="text-sm text-muted dark:text-dark-muted">
          Track your waste segregation impact and save scan histories.
        </p>
      </div>

      {/* Honest Provider Status Notice */}
      {!configured && (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>Supabase Auth Not Yet Configured</span>
          </div>
          <p className="leading-relaxed">
            The EcoSort AI Waste Scanner is open-access and works without any account. If you are deploying this app, add your Supabase credentials to activate live accounts.
          </p>
          <div className="pt-1">
            <Link
              href="/scan"
              className="font-bold underline text-emerald-800 dark:text-emerald-300"
            >
              Continue to Public Scanner without Login &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white dark:bg-dark-surface rounded-card border border-border-light dark:border-dark-border p-6 sm:p-8 space-y-6 shadow-xs">
        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-critical-light dark:bg-critical-dark/40 border border-critical/30 text-critical text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="signup-name"
              className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text"
            >
              Full Name (Optional)
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted" />
              <input
                id="signup-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Priya Sharma"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border-light dark:border-dark-border bg-ivory/50 dark:bg-dark-bg text-forest dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-emerald"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="signup-email"
              className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text"
            >
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted" />
              <input
                id="signup-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border-light dark:border-dark-border bg-ivory/50 dark:bg-dark-bg text-forest dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-emerald"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="signup-password"
              className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text"
            >
              Password (Min 8 Characters) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted" />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-border-light dark:border-dark-border bg-ivory/50 dark:bg-dark-bg text-forest dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-emerald"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted hover:text-forest dark:hover:text-dark-text"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="signup-confirm-password"
              className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text"
            >
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted" />
              <input
                id="signup-confirm-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border-light dark:border-dark-border bg-ivory/50 dark:bg-dark-bg text-forest dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-emerald"
              />
            </div>
          </div>

          {/* Legal Acceptance Notice */}
          <div className="text-[11px] text-muted dark:text-dark-muted leading-relaxed pt-1">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-emerald dark:text-lime underline">
              Terms &amp; Conditions
            </Link>{' '}
            and acknowledge our{' '}
            <Link href="/privacy" className="text-emerald dark:text-lime underline">
              Privacy Policy
            </Link>
            .
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-sm transition-all duration-150 active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Register Account</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-border-light dark:border-dark-border text-center text-xs text-muted dark:text-dark-muted">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-forest dark:text-dark-text hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
