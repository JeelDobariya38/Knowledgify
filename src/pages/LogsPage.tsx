import React, { useState } from 'react';
import { LogEvent } from '../types';
import { storageService } from '../services/storage';

interface LogsPageProps {
  showToast: (msg: string) => void;
}

export const LogsPage: React.FC<LogsPageProps> = ({ showToast }) => {
  const [logs, setLogs] = useState<LogEvent[]>(() => storageService.getLogs());

  const handleClearLogs = () => {
    storageService.clearLogs();
    setLogs([]);
    showToast('Logs cleared');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
          System Logs
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Recent server and application activity.
        </p>
      </div>

      {/* Dark Terminal / Log Container (Matching Figma Page 08) */}
      <div className="bg-[#181f2a] dark:bg-[#0c121e] border border-gray-800 text-gray-200 rounded-2xl p-6 sm:p-8 font-mono text-sm leading-relaxed shadow-sm min-h-[360px] flex flex-col justify-between">
        <div>
          {/* Header indicator: LIVE · X EVENTS */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE · {logs.length} EVENTS</span>
          </div>

          {/* Event entries */}
          {logs.length === 0 ? (
            <div className="text-gray-500 text-xs py-8">
              No recent events logged. Activities like model connection, chat queries, and memories will appear here live.
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="text-gray-300 text-xs sm:text-sm flex items-baseline gap-2">
                  <span className="text-gray-400 shrink-0">[{log.time}]</span>
                  <span className="text-gray-200">{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Clear Logs Button (Matching Figma) */}
      <div className="mt-6">
        <button
          onClick={handleClearLogs}
          disabled={logs.length === 0}
          className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 text-gray-700 dark:text-gray-200 font-medium text-sm px-6 py-2.5 rounded-lg transition-colors"
        >
          Clear Logs
        </button>
      </div>
    </div>
  );
};
