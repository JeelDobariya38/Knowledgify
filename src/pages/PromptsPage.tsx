import React, { useState } from 'react';
import { Route, PromptItem } from '../types';
import { storageService } from '../services/storage';
import { Plus, Trash2 } from 'lucide-react';

interface PromptsPageProps {
  onNavigate: (route: Route) => void;
  onSelectPrompt: (promptText: string) => void;
  showToast: (msg: string) => void;
}

export const PromptsPage: React.FC<PromptsPageProps> = ({
  onNavigate,
  onSelectPrompt,
  showToast,
}) => {
  const [prompts, setPrompts] = useState<PromptItem[]>(() => storageService.getPrompts());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPromptText, setNewPromptText] = useState('');

  const handleUsePrompt = (prompt: PromptItem) => {
    onSelectPrompt(prompt.promptText);
    showToast(`Loaded "${prompt.title}" into chat`);
    onNavigate('chat');
  };

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPromptText.trim()) {
      showToast('Please provide a title and prompt text');
      return;
    }

    const accents: ('blue' | 'emerald' | 'purple')[] = ['blue', 'emerald', 'purple'];
    const randomAccent = accents[prompts.length % accents.length];

    const created = storageService.addPrompt({
      title: newTitle.trim(),
      description: newDescription.trim() || 'Custom reusable prompt.',
      category: 'Reusable prompt',
      promptText: newPromptText.trim(),
      accent: randomAccent,
    });

    setPrompts(storageService.getPrompts());
    setIsModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewPromptText('');
    showToast(`Created prompt "${created.title}"`);
  };

  const handleDeletePrompt = (id: string, title: string) => {
    storageService.deletePrompt(id);
    setPrompts(storageService.getPrompts());
    showToast(`Prompt "${title}" removed`);
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
      {/* Title & Subtitle + Action */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            Prompt Library
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Reusable prompts for common tasks.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
        >
          <Plus size={14} /> Add Prompt
        </button>
      </div>

      {/* Grid of 2x2 Cards matching Figma wireframes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((p) => (
          <div
            key={p.id}
            className={`group bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 ${getBorderColor(
              p.accent
            )} rounded-xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-start justify-between">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {p.title}
                </h2>
                {prompts.length > 2 && (
                  <button
                    onClick={() => handleDeletePrompt(p.id, p.title)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-1"
                    title="Delete prompt"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {p.description}
              </p>
              <div className="text-xs text-gray-400 dark:text-gray-500 mb-6 font-medium">
                {p.category}
              </div>
            </div>

            <div>
              <button
                onClick={() => handleUsePrompt(p)}
                className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors shadow-2xs"
              >
                Use Prompt
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Prompt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Add New Reusable Prompt
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Create a custom template for your multi-model workspace.
            </p>

            <form onSubmit={handleCreatePrompt} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Translation & Localization"
                  required
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Short Description
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="e.g. Translate text with natural tone and idioms."
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Prompt Text
                </label>
                <textarea
                  rows={4}
                  value={newPromptText}
                  onChange={(e) => setNewPromptText(e.target.value)}
                  placeholder="Instructions sent directly to the model..."
                  required
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm px-5 py-2 rounded-lg"
                >
                  Save Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
