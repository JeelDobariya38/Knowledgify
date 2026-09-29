import React, { useState } from 'react';
import { Memory } from '../types';
import { storageService } from '../services/storage';
import { Search, Trash2 } from 'lucide-react';

interface MemoryPageProps {
  showToast: (msg: string) => void;
}

export const MemoryPage: React.FC<MemoryPageProps> = ({ showToast }) => {
  const [memories, setMemories] = useState<Memory[]>(() => storageService.getMemories());
  const [memoryNote, setMemoryNote] = useState('');
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryNote.trim()) {
      showToast('Please enter a memory note');
      return;
    }

    storageService.addMemory(memoryNote.trim(), category.trim() || 'General');
    setMemories(storageService.getMemories());
    setMemoryNote('');
    setCategory('');
    showToast('Memory added to unified context layer');
  };

  const handleDeleteMemory = (id: string) => {
    storageService.deleteMemory(id);
    setMemories(storageService.getMemories());
    showToast(`Memory #${id} removed`);
  };

  // Filter memories based on search query and category
  const filteredMemories = memories.filter((m) => {
    const matchesSearch =
      m.memory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.includes(searchQuery);
    const matchesCategory =
      selectedCategory === 'All' || m.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(memories.map((m) => m.category)))];

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
          Knowledge Base
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Save context that your models can retrieve later.
        </p>
      </div>

      {/* Top Add Memory Form Card (Matching Figma exact layout) */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xs">
        <form onSubmit={handleAddMemory}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Memory note
              </label>
              <input
                type="text"
                value={memoryNote}
                onChange={(e) => setMemoryNote(e.target.value)}
                placeholder="e.g. Always respond with TypeScript examples"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Preference, Project, Technical"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors shadow-2xs"
          >
            Add Memory
          </button>
        </form>
      </div>

      {/* Saved memories section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-base font-bold text-gray-950 dark:text-white">
            Saved memories
          </h2>

          {/* Quick search & category filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter memories..."
                className="pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 w-44"
              />
            </div>

            {categories.length > 2 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Table matching Figma */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-800 text-xs font-semibold text-gray-400 dark:text-gray-500">
                  <th className="py-4 px-6 font-semibold w-24">ID</th>
                  <th className="py-4 px-6 font-semibold">Memory</th>
                  <th className="py-4 px-6 font-semibold w-40">Category</th>
                  <th className="py-4 px-6 font-semibold w-32">Date</th>
                  <th className="py-4 px-6 font-semibold w-16 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredMemories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400 dark:text-gray-500 text-xs">
                      No memories found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredMemories.map((m) => (
                    <tr
                      key={m.id}
                      className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-4 px-6 font-mono text-xs text-gray-500 dark:text-gray-400">
                        {m.id}
                      </td>
                      <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">
                        {m.memory}
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-xs">
                        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-[11px] font-medium border border-gray-200 dark:border-slate-700">
                          {m.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400 text-xs whitespace-nowrap">
                        {m.date}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteMemory(m.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity p-1"
                          title="Delete memory"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
