import React from 'react';
import { Route, UserProfile } from '../types';
import { Menu, Sun, Moon, Shield, User, Sparkles, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
  user: UserProfile;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleRole: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  user,
  theme,
  onToggleTheme,
  onToggleRole,
  onToggleSidebar,
}) => {
  const isAuthPage = currentRoute === 'login' || currentRoute === 'signup';
  const isHomePage = currentRoute === 'home';
  const isAuthenticated = !isAuthPage && !isHomePage;

  return (
    <header className="h-[72px] bg-white dark:bg-slate-900 border-b border-gray-200/80 dark:border-slate-800 sticky top-0 z-40 transition-colors">
      <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Branding & Mobile menu trigger */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg mr-1 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              <Menu size={20} />
            </button>
          )}

          <div
            onClick={() => onNavigate(isAuthenticated ? 'overview' : 'home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-gray-950 dark:text-white group-hover:text-blue-600 transition-colors">
                AI Multi-LLM
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 border border-blue-200/60 dark:border-blue-800 px-2 py-0.5 rounded">
                <Sparkles size={11} className="text-blue-600 dark:text-blue-400" />
                Knowledgify
              </span>
            </div>
          </div>
        </div>

        {/* Right Navigation & Controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Theme Quick Toggle (Light / Dark Mode) */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {isHomePage && (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-sm active:scale-[0.98]"
              >
                Get Started
              </button>
            </>
          )}

          {isAuthPage && (
            <>
              <button
                onClick={() => onNavigate('home')}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors"
              >
                Back to Home
              </button>
            </>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Role Indicator & 1-Click Role Switcher for Prototype Testing */}
              <button
                onClick={onToggleRole}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all hover:scale-102 active:scale-98"
                style={{
                  backgroundColor: user.role === 'admin' ? '#f3e8ff' : '#f1f5f9',
                  borderColor: user.role === 'admin' ? '#d8b4fe' : '#cbd5e1',
                  color: user.role === 'admin' ? '#6b21a8' : '#334155',
                }}
                title="Click to toggle between Admin and User role test views"
              >
                {user.role === 'admin' ? (
                  <Shield size={12} className="text-purple-600" />
                ) : (
                  <User size={12} className="text-slate-600" />
                )}
                <span>Role: {user.role.toUpperCase()}</span>
                <RefreshCw size={10} className="ml-0.5 opacity-60" />
              </button>

              <button
                onClick={() => onNavigate('login')}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Logout
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className={`text-sm font-medium transition-colors ${
                  currentRoute === 'profile'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Profile
              </button>

              <button
                onClick={() => onNavigate('overview')}
                className={`text-sm font-medium transition-colors ${
                  currentRoute === 'overview'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
