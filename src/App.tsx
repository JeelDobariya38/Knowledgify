/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Route, UserProfile } from './types';
import { storageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OverviewPage } from './pages/OverviewPage';
import { ChatPage } from './pages/ChatPage';
import { ModelsPage } from './pages/ModelsPage';
import { MemoryPage } from './pages/MemoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PromptsPage } from './pages/PromptsPage';
import { LogsPage } from './pages/LogsPage';
import { ProfilePage } from './pages/ProfilePage';
import { DataManagementPage } from './pages/DataManagementPage';
import { UsersPage } from './pages/UsersPage';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [user, setUser] = useState<UserProfile>(() => storageService.getUser());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = storageService.getUser().theme;
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Toast handler with auto-dismiss
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Hash-based routing helper
  const navigateTo = useCallback((route: Route) => {
    window.location.hash = `#/${route}`;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sync state with window location hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').toLowerCase();
      const validRoutes: Route[] = [
        'home',
        'login',
        'signup',
        'overview',
        'chat',
        'models',
        'memory',
        'analytics',
        'prompts',
        'logs',
        'profile',
        'data',
        'users',
      ];
      if (validRoutes.includes(hash as Route)) {
        setCurrentRoute(hash as Route);
      } else {
        setCurrentRoute('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize theme with HTML document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: 'light' | 'dark' = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    const updated: UserProfile = { ...user, theme: nextTheme };
    setUser(updated);
    storageService.saveUser(updated);
    showToast(`Switched to ${nextTheme} mode`);
  };

  const toggleRole = () => {
    const nextRole = user.role === 'admin' ? 'user' : 'admin';
    const updated = storageService.setUserRole(nextRole);
    setUser({ ...updated });
    showToast(`Switched to ${nextRole.toUpperCase()} test perspective`);
  };

  const handleDataRestored = () => {
    const refreshedUser = storageService.getUser();
    setUser(refreshedUser);
    setTheme(refreshedUser.theme || 'light');
    setRefreshKey((k) => k + 1);
  };

  const isAuthOrHome =
    currentRoute === 'home' || currentRoute === 'login' || currentRoute === 'signup';

  const isAdmin = user.role === 'admin';
  const isAdminOnlyRoute =
    currentRoute === 'models' ||
    currentRoute === 'logs' ||
    currentRoute === 'analytics' ||
    currentRoute === 'users';

  return (
    <div key={refreshKey} className="min-h-screen flex flex-col bg-[#fafbfc] dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        user={user}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleRole={toggleRole}
        onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
      />

      {/* Main Content Area */}
      {isAuthOrHome ? (
        <main className="flex-1">
          {currentRoute === 'home' && (
            <HomePage
              onNavigate={navigateTo}
              onSetChatPrompt={(prompt) => {
                setChatPrompt(prompt);
                navigateTo('chat');
              }}
            />
          )}
          {currentRoute === 'login' && (
            <LoginPage
              onNavigate={navigateTo}
              onLoginSuccess={(updatedUser) => {
                setUser(updatedUser);
                setTheme(updatedUser.theme || 'light');
              }}
              showToast={showToast}
            />
          )}
          {currentRoute === 'signup' && (
            <SignupPage
              onNavigate={navigateTo}
              onLoginSuccess={(updatedUser) => {
                setUser(updatedUser);
                setTheme(updatedUser.theme || 'light');
              }}
              showToast={showToast}
            />
          )}
        </main>
      ) : (
        <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
          {/* 250px Sidebar (Role filtered) */}
          <Sidebar
            currentRoute={currentRoute}
            onNavigate={navigateTo}
            user={user}
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          {/* Main Dashboard Pages */}
          <main className="flex-1 min-w-0 overflow-y-auto">
            {/* Admin Route Protection for Client / Member User */}
            {!isAdmin && isAdminOnlyRoute ? (
              <div className="max-w-[700px] mx-auto px-6 py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-200 dark:border-amber-800">
                  <ShieldAlert size={28} />
                </div>
                <h2 className="text-xl font-bold text-gray-950 dark:text-white mb-2">
                  Administrator Restricted Access
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  You are currently browsing as a <strong>Member (Client)</strong>.
                  This page ({currentRoute.toUpperCase()}) is restricted to workspace administrators.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={toggleRole}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <span>Switch to Administrator Role</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => navigateTo('chat')}
                    className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium text-xs px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Return to Chat
                  </button>
                </div>
              </div>
            ) : (
              <>
                {currentRoute === 'overview' && (
                  <OverviewPage onNavigate={navigateTo} />
                )}
                {currentRoute === 'chat' && (
                  <ChatPage
                    initialPrompt={chatPrompt}
                    onClearInitialPrompt={() => setChatPrompt('')}
                    showToast={showToast}
                  />
                )}
                {currentRoute === 'models' && (
                  <ModelsPage showToast={showToast} />
                )}
                {currentRoute === 'memory' && (
                  <MemoryPage showToast={showToast} />
                )}
                {currentRoute === 'analytics' && <AnalyticsPage />}
                {currentRoute === 'prompts' && (
                  <PromptsPage
                    onNavigate={navigateTo}
                    onSelectPrompt={(text) => {
                      setChatPrompt(text);
                      navigateTo('chat');
                    }}
                    showToast={showToast}
                  />
                )}
                {currentRoute === 'logs' && <LogsPage showToast={showToast} />}
                {currentRoute === 'users' && <UsersPage showToast={showToast} />}
                {currentRoute === 'data' && (
                  <DataManagementPage
                    showToast={showToast}
                    onDataRestored={handleDataRestored}
                  />
                )}
                {currentRoute === 'profile' && (
                  <ProfilePage
                    user={user}
                    onUpdateUser={(updated) => setUser(updated)}
                    onNavigate={navigateTo}
                    showToast={showToast}
                  />
                )}
              </>
            )}
          </main>
        </div>
      )}

      {/* Floating Action / Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
