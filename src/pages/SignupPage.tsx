import React, { useState } from 'react';
import { Route, UserProfile } from '../types';
import { storageService } from '../services/storage';

interface SignupPageProps {
  onNavigate: (route: Route) => void;
  onLoginSuccess: (user: UserProfile) => void;
  showToast: (msg: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onNavigate,
  onLoginSuccess,
  showToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredModel, setPreferredModel] = useState('GPT-4o');
  const [role, setRole] = useState<'admin' | 'user'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'JD';

    const newUser: UserProfile = {
      name: name || 'Demo User',
      email: email || 'user@example.com',
      avatar: initials || 'JD',
      preferredModel: preferredModel || 'GPT-4o',
      theme: 'light',
      isLoggedIn: true,
      role,
    };

    storageService.saveUser(newUser);
    storageService.addLog(`User ${newUser.name} created account with ${preferredModel} (${newUser.role})`);
    onLoginSuccess(newUser);
    showToast(`Account created as ${newUser.role.toUpperCase()}`);
    onNavigate('overview');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12 bg-[#fafbfc] dark:bg-slate-950">
      <div className="w-full max-w-[460px] bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xs">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Set up your workspace in a minute.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              placeholder="Your full name"
            />
          </div>

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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="user">User (Member)</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Preferred Model
              </label>
              <div className="relative">
                <select
                  value={preferredModel}
                  onChange={(e) => setPreferredModel(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors pr-8 cursor-pointer"
                >
                  <option value="GPT-4o">GPT-4o</option>
                  <option value="Claude 3.5">Claude 3.5</option>
                  <option value="Gemini 1.5">Gemini 1.5</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors mt-2"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Already have an Account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-gray-900 dark:text-white font-semibold hover:underline"
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
};
