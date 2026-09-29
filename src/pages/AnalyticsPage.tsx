import React, { useState } from 'react';
import { storageService } from '../services/storage';

export const AnalyticsPage: React.FC = () => {
  const [usage] = useState(() => storageService.getUsage());
  const models = storageService.getModels();
  const convos = storageService.getConversations();

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
          Usage Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A quick view of activity across your configured models.
        </p>
      </div>

      {/* 3 Summary Cards matching Figma */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Tokens used */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-6 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {usage.tokensThisMonth.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tokens used this month
          </p>
        </div>

        {/* Total conversations */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-xl p-6 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {usage.totalConversations || convos.length}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total conversations
          </p>
        </div>

        {/* Active models */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-purple-600 rounded-xl p-6 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {models.length || usage.activeModels}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Active models
          </p>
        </div>
      </div>

      {/* Token usage by model */}
      <div>
        <h2 className="text-base font-bold text-gray-950 dark:text-white mb-6">
          Token usage by model
        </h2>

        <div className="space-y-7 max-w-4xl">
          {usage.modelUsage.map((item) => (
            <div key={item.model} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.model}
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {item.percent}%
                </span>
              </div>
              <div className="h-3 w-full bg-gray-100/90 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
