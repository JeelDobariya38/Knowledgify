import React from 'react';
import { Route, UserProfile } from '../types';
import { X, Shield, User } from 'lucide-react';

interface SidebarProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
  user: UserProfile;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: Route;
  label: string;
  adminOnly?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  user,
  mobileOpen,
  onCloseMobile,
}) => {
  const isAdmin = user.role === 'admin';

  // Role-based workspace items
  const allWorkspaceItems: NavItem[] = [
    { id: 'chat', label: 'Chat' },
    { id: 'models', label: 'Models', adminOnly: true },
    { id: 'memory', label: 'Memory' },
    { id: 'analytics', label: 'Analytics', adminOnly: true },
    { id: 'prompts', label: 'Prompts' },
    { id: 'logs', label: 'System Logs', adminOnly: true },
    { id: 'users', label: 'Team & Users', adminOnly: true },
    { id: 'data', label: 'Data & Backups' },
  ];

  const visibleWorkspaceItems = allWorkspaceItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  const accountItems: NavItem[] = [
    { id: 'profile', label: 'Profile' },
  ];

  const handleSelect = (route: Route) => {
    onNavigate(route);
    onCloseMobile();
  };

  const navContent = (
    <div className="w-[250px] min-w-[250px] flex flex-col h-full bg-white dark:bg-slate-900 select-none">
      <div className="py-6 px-4 flex flex-col gap-6 flex-1">
        {/* Role Workspace Header indicator */}
        <div className="px-3 pb-2 flex items-center justify-between border-b border-gray-100 dark:border-slate-800">
          <div className="text-[11px] font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            WORKSPACE
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              isAdmin
                ? 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
            }`}
          >
            {isAdmin ? 'ADMIN' : 'CLIENT'}
          </span>
        </div>

        {/* WORKSPACE Items */}
        <nav className="flex flex-col gap-1">
          {visibleWorkspaceItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#ebf2ff] dark:bg-blue-950/70 text-[#2563eb] dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ACCOUNT Section */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            ACCOUNT
          </div>
          <nav className="flex flex-col gap-1">
            {accountItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-[#ebf2ff] dark:bg-blue-950/70 text-[#2563eb] dark:text-blue-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Role Footer Card */}
      <div className="p-4 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2 mb-1">
          {isAdmin ? (
            <Shield size={14} className="text-purple-600 dark:text-purple-400" />
          ) : (
            <User size={14} className="text-blue-600 dark:text-blue-400" />
          )}
          <span className="font-semibold text-gray-900 dark:text-white">
            {isAdmin ? 'Full Admin Console' : 'Member Workspace'}
          </span>
        </div>
        <p className="text-[11px] text-gray-400">
          {isAdmin
            ? 'Access to models, logs, & team management.'
            : 'Access to chat, personal memory & prompts.'}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (250px) */}
      <aside className="hidden lg:block w-[250px] min-w-[250px] border-r border-gray-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[calc(100vh-72px)] shrink-0">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 z-50 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        >
          <div
            className="fixed inset-y-0 left-0 w-[250px] bg-white dark:bg-slate-900 shadow-xl z-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[72px] border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-6">
              <span className="font-bold text-gray-950 dark:text-white">AI Multi-LLM</span>
              <button
                onClick={onCloseMobile}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{navContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
