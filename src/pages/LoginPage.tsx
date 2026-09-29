import React, { useState } from 'react';
import { Route, UserProfile } from '../types';
import { storageService, DEFAULT_USER, DEFAULT_GUEST_USER } from '../services/storage';
import { Shield, User, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (route: Route) => void;
  onLoginSuccess: (user: UserProfile) => void;
  showToast: (msg: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  onLoginSuccess,
  showToast,
}) => {
  const [email, setEmail] = useState('jeeldobariya38@gmail.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = storageService.getUser();
    const updated: UserProfile = {
      ...existing,
      email: email || existing.email,
      isLoggedIn: true,
    };
    storageService.saveUser(updated);
    storageService.addLog(`User login successful (${updated.role})`);
    onLoginSuccess(updated);
    showToast(`Signed in as ${updated.role.toUpperCase()}`);
    onNavigate('overview');
  };

  const handleQuickAdminLogin = () => {
    const adminUser: UserProfile = {
      ...DEFAULT_USER,
      role: 'admin',
      isLoggedIn: true,
    };
    storageService.saveUser(adminUser);
    storageService.addLog('Quick prototype login: Administrator role');
    onLoginSuccess(adminUser);
    showToast('Signed in as Admin: Full access granted');
    onNavigate('overview');
  };

  const handleQuickGuestLogin = () => {
    const guestUser: UserProfile = {
      ...DEFAULT_GUEST_USER,
      role: 'user',
      isLoggedIn: true,
    };
    storageService.saveUser(guestUser);
    storageService.addLog('Quick prototype login: Guest / Client Member role');
    onLoginSuccess(guestUser);
    showToast('Signed in as Client: Simple chat & personal settings view');
    onNavigate('chat');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12 bg-[#fafbfc] dark:bg-slate-950">
      <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xs">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to your AI workspace
          </p>
        </div>

        {/* Quick Prototype Role Access Buttons (as requested) */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/80 rounded-xl space-y-2.5">
          <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Prototype Quick Access
          </div>

          <button
            type="button"
            onClick={handleQuickAdminLogin}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 rounded-lg text-xs font-semibold transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-purple-600 dark:text-purple-400" />
              <span>Continue as Admin (Full Control)</span>
            </div>
            <ArrowRight size={13} className="text-purple-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleQuickGuestLogin}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 rounded-lg text-xs font-semibold transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <User size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Continue as Guest / Client (Simple View)</span>
            </div>
            <ArrowRight size={13} className="text-blue-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-gray-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-3 text-xs text-gray-400 uppercase">Or sign in with email</span>
          <div className="flex-grow border-t border-gray-200 dark:border-slate-800"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <button
            type="button"
            onClick={() => showToast('Password reset link sent to your email')}
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Forgot password?
          </button>
          <button
            type="button"
            onClick={() => onNavigate('signup')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white font-medium transition-colors"
          >
            New here? Create an account
          </button>
        </div>
      </div>
    </div>
  );
};
