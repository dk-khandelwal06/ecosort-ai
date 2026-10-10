'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Eye, EyeOff, AlertCircle, CheckCircle, Info, Lock, Mail, ArrowRight } from 'lucide-react';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [configured, setConfigured] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    setConfigured(isSupabaseConfigured());
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    if (!configured) {
      setErrorMessage(
        'Authentication provider is not yet configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment to enable real authentication.'
      );
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSuccessMessage('Successfully signed in! Redirecting to scanner...');
      setTimeout(() => {
        router.push('/scan');
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address to receive password reset instructions.');
      return;
    }

    if (!configured) {
      setErrorMessage('Password reset requires Supabase environment credentials to be configured.');
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login?reset=complete`,
      });
      if (error) throw error;
      setResetSent(true);
      setSuccessMessage(`Password reset link sent to ${email}. Check your inbox.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to send reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-forest dark:text-dark-text tracking-tight">
          Welcome to EcoSort AI
        </h1>
        <p className="text-sm text-muted dark:text-dark-muted">
          Sign in to access your personal waste tracking dashboard.
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
            The core AI Waste Scanner is 100% public and does not require an account. To enable live authentication in this deployment, configure <code className="bg-white/60 dark:bg-black/30 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-white/60 dark:bg-black/30 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in Vercel settings.
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

      {/* Form Container */}
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

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted" />
              <input
                id="login-email"
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="text-xs font-bold uppercase tracking-wider text-forest dark:text-dark-text"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-xs text-emerald dark:text-lime hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-emerald hover:bg-emerald-hover rounded-btn shadow-sm transition-all duration-150 active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-border-light dark:border-dark-border text-center text-xs text-muted dark:text-dark-muted">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/signup" className="font-bold text-forest dark:text-dark-text hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
