import React from 'react';
import { Route } from '../types';
import { storageService } from '../services/storage';

interface OverviewPageProps {
  onNavigate: (route: Route) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const models = storageService.getModels();
  const memories = storageService.getMemories();
  const usage = storageService.getUsage();
  const user = storageService.getUser();
  const isAdmin = user.role === 'admin';

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8">
      {/* Page Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
          Workspace Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A quick snapshot of your AI system ({isAdmin ? 'Administrator Mode' : 'Client Mode'}).
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Models */}
        <div
          onClick={() => onNavigate(isAdmin ? 'models' : 'chat')}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-6 hover:shadow-xs transition-all"
        >
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Models
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {models.length} connected
          </p>
        </div>

        {/* Conversations */}
        <div
          onClick={() => onNavigate('chat')}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-xl p-6 hover:shadow-xs transition-all"
        >
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Conversations
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {usage.totalConversations} this month
          </p>
        </div>

        {/* Knowledge */}
        <div
          onClick={() => onNavigate('memory')}
          className="cursor-pointer bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-purple-600 rounded-xl p-6 hover:shadow-xs transition-all"
        >
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Knowledge
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {memories.length > 0 ? `${memories.length} memories` : '24 memories'}
          </p>
        </div>
      </div>

      {/* Recent activity Section */}
      <div className="mb-10">
        <h2 className="text-base font-bold text-gray-950 dark:text-white mb-4">
          Recent activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => onNavigate('chat')}
            className="cursor-pointer bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-6 hover:shadow-xs transition-all"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Chat completed
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              GPT-4o · 2 minutes ago
            </p>
          </div>

          <div
            onClick={() => onNavigate('memory')}
            className="cursor-pointer bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-xl p-6 hover:shadow-xs transition-all"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Memory added
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Project notes · 12 minutes ago
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions Section */}
      <div>
        <h2 className="text-base font-bold text-gray-950 dark:text-white mb-4">
          Quick actions
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate('chat')}
            className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors shadow-xs"
          >
            Open Chat
          </button>
          {isAdmin ? (
            <button
              onClick={() => onNavigate('models')}
              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-6 py-2.5 rounded-lg transition-colors"
            >
              Add Model
            </button>
          ) : (
            <button
              onClick={() => onNavigate('prompts')}
              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-6 py-2.5 rounded-lg transition-colors"
            >
              Browse Prompts
            </button>
          )}
          <button
            onClick={() => onNavigate('memory')}
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-6 py-2.5 rounded-lg transition-colors"
          >
            Add Memory
          </button>
          <button
            onClick={() => onNavigate('data')}
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-6 py-2.5 rounded-lg transition-colors"
          >
            Export / Backup
          </button>
        </div>
      </div>
    </div>
  );
};
