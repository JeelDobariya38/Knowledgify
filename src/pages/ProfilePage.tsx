import React, { useState } from 'react';
import { Route, UserProfile } from '../types';
import { storageService } from '../services/storage';
import { Shield, User, Download, Upload, ArrowRight } from 'lucide-react';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onNavigate: (route: Route) => void;
  showToast: (msg: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  onNavigate,
  showToast,
}) => {
  const [name, setName] = useState(user.name);
  const [theme, setTheme] = useState<'light' | 'dark'>(user.theme || 'light');
  const [role, setRole] = useState<'admin' | 'user'>(user.role || 'admin');
  const [avatar, setAvatar] = useState(user.avatar || 'JD');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'JD';

    const updated: UserProfile = {
      ...user,
      name: name.trim() || user.name,
      avatar: initials || avatar,
      theme,
      role,
    };

    storageService.saveUser(updated);
    storageService.addLog(`Profile updated: ${updated.name} (Role: ${updated.role})`);
    onUpdateUser(updated);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    showToast('Profile and preferences saved');
  };

  const handleAvatarChange = () => {
    const avatars = ['JD', 'AR', 'AI', 'KO', 'ML', 'UX'];
    const nextIdx = (avatars.indexOf(avatar) + 1) % avatars.length;
    setAvatar(avatars[nextIdx]);
    showToast(`Switched avatar to ${avatars[nextIdx]}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
          Profile & Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account, role permissions, and display preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl">
        {/* Main Settings Card */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xs">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Profile Photo Section */}
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#ebf2ff] dark:bg-blue-950 text-[#2563eb] dark:text-blue-400 text-xl font-bold flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900 select-none">
                {avatar}
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                  Profile photo
                </div>
                <div className="text-xs text-gray-400 mb-3">
                  JPG or PNG · 2MB max
                </div>
                <button
                  type="button"
                  onClick={handleAvatarChange}
                  className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Role Assignment (Prototype Feature) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Workspace Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    role === 'admin'
                      ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200'
                      : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <Shield size={12} className="text-purple-600 dark:text-purple-400" />
                      Administrator
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Full access to models, logs, analytics & teams
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    role === 'user'
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200'
                      : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === 'user'}
                    onChange={() => setRole('user')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <User size={12} className="text-blue-600 dark:text-blue-400" />
                      Member (Client)
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Focused view with chat, memory & prompts
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Theme Radio Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800 dark:text-gray-200">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={theme === 'light'}
                    onChange={() => {
                      setTheme('light');
                      document.documentElement.classList.remove('dark');
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span>Light</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800 dark:text-gray-200">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={() => {
                      setTheme('dark');
                      document.documentElement.classList.add('dark');
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span>Dark</span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors shadow-2xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Data Portability Quick Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
              Data Portability
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Export all your models, memories, and chats to a portable JSON backup, or restore an existing backup.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  storageService.downloadDataFile();
                  showToast('Exported full data backup (JSON)');
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-semibold transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Download size={14} className="text-blue-600 dark:text-blue-400" />
                  Quick Export (JSON)
                </span>
                <span className="text-[10px] text-gray-400">Download</span>
              </button>

              <button
                onClick={() => onNavigate('data')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-semibold transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Upload size={14} className="text-emerald-600 dark:text-emerald-400" />
                  Import & Restore Panel
                </span>
                <ArrowRight size={13} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs text-xs text-gray-500 dark:text-gray-400 space-y-2">
            <h4 className="font-bold text-gray-900 dark:text-white">Active Permissions</h4>
            <div className="flex justify-between py-1 border-b border-gray-100 dark:border-slate-800">
              <span>Model Management:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{role === 'admin' ? 'Allowed' : 'Admin only'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100 dark:border-slate-800">
              <span>Admin Server Logs:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{role === 'admin' ? 'Allowed' : 'Admin only'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Context Middleware:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active (Shared)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
