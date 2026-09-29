import React, { useState, useRef } from 'react';
import { storageService } from '../services/storage';
import { Download, Upload, RefreshCw, Database, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DataManagementPageProps {
  showToast: (msg: string) => void;
  onDataRestored: () => void;
}

export const DataManagementPage: React.FC<DataManagementPageProps> = ({
  showToast,
  onDataRestored,
}) => {
  const [isImporting, setIsImporting] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const models = storageService.getModels();
  const memories = storageService.getMemories();
  const convos = storageService.getConversations();
  const prompts = storageService.getPrompts();
  const logs = storageService.getLogs();

  // Calculate approximate storage footprint in KB
  const totalCharacters = JSON.stringify(storageService.exportAllData()).length;
  const storageKb = (totalCharacters / 1024).toFixed(1);

  const handleExport = () => {
    storageService.downloadDataFile();
    showToast('Export file downloaded (JSON)');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        processJsonImport(content);
      }
    };
    reader.readAsText(file);
    // Reset file input value
    e.target.value = '';
  };

  const processJsonImport = (rawJson: string) => {
    setImportError(null);
    setImportStatus(null);
    setIsImporting(true);

    setTimeout(() => {
      const result = storageService.importAllData(rawJson);
      setIsImporting(false);

      if (result.success && result.stats) {
        setImportStatus(
          `Restored successfully: ${result.stats.models} models, ${result.stats.memories} memories, ${result.stats.prompts} prompts, ${result.stats.convos} conversations.`
        );
        showToast('Workspace data imported and restored!');
        onDataRestored();
      } else {
        setImportError(result.error || 'Invalid JSON file. Please check structure.');
        showToast('Import failed. Invalid format.');
      }
    }, 400);
  };

  const handleManualImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonText.trim()) {
      showToast('Please paste valid JSON content');
      return;
    }
    processJsonImport(jsonText);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data back to initial default wireframe state?')) {
      storageService.resetAll();
      showToast('Workspace reset to factory defaults');
      onDataRestored();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
          Data Portability & Backups
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Export all local models, memories, chats, and prompts to JSON, or restore from a backup.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-6 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {storageKb} KB
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total localStorage footprint
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-xl p-6 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {memories.length + prompts.length + models.length}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Stored entities (Context & Models)
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-purple-600 rounded-xl p-6 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            JSON v1.2
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Portable Schema Standard
          </p>
        </div>
      </div>

      {/* Main Grid: Export and Import */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Export Card */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Download size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-950 dark:text-white">
                  Export Workspace Data
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Full snapshot of all entities
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Download your complete Knowledgify workspace as a clean, standardized JSON backup file.
              Includes all configured models, vector knowledge base notes, saved prompt templates,
              chat history, and preferences.
            </p>

            <div className="bg-gray-50 dark:bg-slate-800/60 border border-gray-200/70 dark:border-slate-700/60 rounded-xl p-4 mb-6 space-y-2 text-xs text-gray-600 dark:text-gray-300 font-mono">
              <div className="flex justify-between">
                <span>Models Configured:</span>
                <span className="font-bold text-gray-900 dark:text-white">{models.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Saved Memories:</span>
                <span className="font-bold text-gray-900 dark:text-white">{memories.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Prompt Templates:</span>
                <span className="font-bold text-gray-900 dark:text-white">{prompts.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Conversations:</span>
                <span className="font-bold text-gray-900 dark:text-white">{convos.length}</span>
              </div>
              <div className="flex justify-between">
                <span>System Logs:</span>
                <span className="font-bold text-gray-900 dark:text-white">{logs.length}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm py-3 rounded-xl transition-all shadow-sm active:scale-[0.99]"
          >
            <Download size={16} /> Download JSON Backup
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Upload size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-950 dark:text-white">
                  Import & Restore Data
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Restore state from backup file
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Upload a previously exported Knowledgify JSON file to restore your entire state.
              This replaces or updates your models, context memories, and prompt library immediately.
            </p>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
            />

            {/* Drag & drop / click area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer transition-colors mb-4 group bg-gray-50/50 dark:bg-slate-800/40"
            >
              <Upload
                size={28}
                className="mx-auto text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors mb-2"
              />
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Click to browse or drop JSON file
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Accepts .json backup files
              </p>
            </div>

            {/* Feedback alert */}
            {importStatus && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2 mb-4">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>{importStatus}</span>
              </div>
            )}

            {importError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2 mb-4">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{importError}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-sm py-3 rounded-xl transition-all shadow-sm active:scale-[0.99]"
            >
              <Upload size={16} /> Select Backup File to Restore
            </button>
          </div>
        </div>
      </div>

      {/* Manual JSON Paste Collapsible */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xs">
        <h3 className="text-base font-bold text-gray-950 dark:text-white mb-2">
          Advanced: Direct JSON Input
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Paste exported JSON string directly into the box below to restore state without file uploading.
        </p>

        <form onSubmit={handleManualImport} className="space-y-4">
          <textarea
            rows={4}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"version": "1.2.0", "models": [...], "memories": [...]}'
            className="w-full px-3.5 py-2.5 font-mono text-xs bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!jsonText.trim() || isImporting}
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium text-xs px-4 py-2 rounded-lg transition-colors"
          >
            Apply Pasted JSON
          </button>
        </form>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="border border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-red-900 dark:text-red-400 mb-1">
            Factory Reset Workspace
          </h4>
          <p className="text-xs text-red-700/80 dark:text-red-400/80">
            Resets all models, memories, conversations, and usage back to the initial wireframe seed data.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors shrink-0"
        >
          <RefreshCw size={13} /> Reset All Data
        </button>
      </div>
    </div>
  );
};
