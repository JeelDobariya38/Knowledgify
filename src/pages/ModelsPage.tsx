import React, { useState } from 'react';
import { Model } from '../types';
import { storageService } from '../services/storage';
import { Trash2 } from 'lucide-react';

interface ModelsPageProps {
  showToast: (msg: string) => void;
}

export const ModelsPage: React.FC<ModelsPageProps> = ({ showToast }) => {
  const [models, setModels] = useState<Model[]>(() => storageService.getModels());
  const [provider, setProvider] = useState('');
  const [modelName, setModelName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [contextWindow, setContextWindow] = useState('');

  const handleAddModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider.trim() || !modelName.trim()) {
      showToast('Please enter provider and model name');
      return;
    }

    const accents: ('blue' | 'emerald' | 'purple')[] = ['blue', 'emerald', 'purple'];
    const randomAccent = accents[models.length % accents.length];

    const newModel = storageService.addModel({
      name: modelName.trim(),
      provider: provider.trim(),
      context: contextWindow.trim() || '128K context',
      status: 'Connected',
      statusType: 'connected',
      accent: randomAccent,
      apiKey: apiKey.trim() ? `${apiKey.trim().slice(0, 4)}••••••••` : undefined,
    });

    setModels(storageService.getModels());
    setProvider('');
    setModelName('');
    setApiKey('');
    setContextWindow('');
    showToast(`Model ${newModel.name} configured successfully`);
  };

  const handleDeleteModel = (id: string, name: string) => {
    storageService.deleteModel(id);
    setModels(storageService.getModels());
    showToast(`Model ${name} removed`);
  };

  const getBorderColor = (accent: 'blue' | 'emerald' | 'purple') => {
    switch (accent) {
      case 'blue':
        return 'border-l-blue-600';
      case 'emerald':
        return 'border-l-emerald-500';
      case 'purple':
        return 'border-l-purple-600';
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
          Model Configuration
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Connect and manage the models available to your workspace.
        </p>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {models.map((m) => (
          <div
            key={m.id}
            className={`group relative bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 ${getBorderColor(
              m.accent
            )} rounded-xl p-6 hover:shadow-xs transition-all flex flex-col justify-between min-h-[140px]`}
          >
            <div>
              <div className="flex items-start justify-between">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {m.name}
                </h2>
                {models.length > 1 && (
                  <button
                    onClick={() => handleDeleteModel(m.id, m.name)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-1"
                    title="Delete Model"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {m.provider} · {m.context}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-800 dark:text-gray-200 font-medium mt-4">
              <span
                className={`w-2 h-2 rounded-full ${
                  m.statusType === 'connected'
                    ? 'bg-emerald-500'
                    : m.statusType === 'ready'
                    ? 'bg-blue-500'
                    : 'bg-gray-400'
                }`}
              />
              <span>{m.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add a model section */}
      <div>
        <h2 className="text-base font-bold text-gray-950 dark:text-white mb-4">
          Add a model
        </h2>

        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleAddModel}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Provider
                </label>
                <input
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  placeholder="e.g. OpenAI, Anthropic, Google, Mistral"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Model
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="e.g. Llama 3.3, Mistral Large, DeepSeek"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter API key for simulation"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors shadow-2xs"
            >
              Add Model
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
