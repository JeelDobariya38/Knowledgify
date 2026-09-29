import React, { useState } from 'react';
import { Route } from '../types';

interface HomePageProps {
  onNavigate: (route: Route) => void;
  onSetChatPrompt?: (prompt: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSetChatPrompt,
}) => {
  const [demoInput, setDemoInput] = useState('Explain vector databases simply');

  const handleDemoSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSetChatPrompt && demoInput.trim()) {
      onSetChatPrompt(demoInput.trim());
    }
    onNavigate('chat');
  };

  return (
    <div className="bg-[#fafbfc] dark:bg-slate-950 min-h-[calc(100vh-72px)] pb-20 transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-12 sm:pt-16">
        {/* Hero Section */}
        <section className="mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-950 dark:text-white tracking-tight mb-4">
            Build your AI workspace
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-6">
            Connect models, chat with them, save knowledge, and understand usage.
            <br className="hidden sm:inline" />
            Powerful enough to demonstrate. Simple enough to build.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('overview')}
              className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all shadow-sm active:scale-[0.98]"
            >
              Start Building
            </button>
            <button
              onClick={() => onNavigate('overview')}
              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              View Demo
            </button>
          </div>
        </section>

        {/* Product Preview Card */}
        <section className="mb-20">
          <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Dark Card */}
              <div className="lg:col-span-7 bg-[#181f2a] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
                    MULTI-LLM WORKSPACE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-3 mb-2">
                    One chat. Multiple minds.
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed mb-8">
                    Compare answers, switch models, and keep useful context close.
                  </p>
                </div>

                <form onSubmit={handleDemoSend} className="relative mt-auto">
                  <div className="flex items-center gap-2 bg-[#232b38] border border-gray-700/80 rounded-lg px-3 py-2">
                    <span className="text-gray-400 text-sm select-none">&gt;</span>
                    <input
                      type="text"
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      placeholder="Ask anything..."
                      className="bg-transparent border-none text-white text-sm w-full focus:outline-none placeholder:text-gray-500"
                    />
                    <button
                      type="submit"
                      className="bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors shrink-0"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>

              {/* Right 3 Stacked Cards */}
              <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
                {/* Card 1: Models */}
                <div
                  onClick={() => onNavigate('models')}
                  className="cursor-pointer bg-white dark:bg-slate-800/80 border border-gray-200/90 dark:border-slate-700 border-l-4 border-l-blue-600 rounded-xl p-5 hover:border-gray-300 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                    3 models connected
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    GPT · Claude · Gemini
                  </p>
                </div>

                {/* Card 2: Knowledge */}
                <div
                  onClick={() => onNavigate('memory')}
                  className="cursor-pointer bg-white dark:bg-slate-800/80 border border-gray-200/90 dark:border-slate-700 border-l-4 border-l-emerald-500 rounded-xl p-5 hover:border-gray-300 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                    Knowledge ready
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    24 saved memories
                  </p>
                </div>

                {/* Card 3: Usage */}
                <div
                  onClick={() => onNavigate('analytics')}
                  className="cursor-pointer bg-white dark:bg-slate-800/80 border border-gray-200/90 dark:border-slate-700 border-l-4 border-l-purple-600 rounded-xl p-5 hover:border-gray-300 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                    Usage this month
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    12,450 tokens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why this system? Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
              Why this system?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A clean set of tools for learning and demonstrating multi-model AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => onNavigate('models')}
              className="cursor-pointer bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-6 hover:shadow-xs transition-all"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Model Management
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Configure providers, API keys, model names, and connection status.
              </p>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onNavigate('chat')}
              className="cursor-pointer bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-xl p-6 hover:shadow-xs transition-all"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Chat & History
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Keep conversations organized with a simple two-column workspace.
              </p>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onNavigate('memory')}
              className="cursor-pointer bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-purple-600 rounded-xl p-6 hover:shadow-xs transition-all"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Knowledge Base
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Store notes that can later become searchable vector memories.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
              Pricing
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Simple plans for a simple project. No mysterious enterprise maze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Free</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-950 dark:text-white">$0</span>
                    <span className="block text-xs text-gray-400">forever</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">For students and prototypes.</p>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-8">
                  <div>2 models</div>
                  <div>100 chats / month</div>
                  <div>Basic analytics</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('signup')}
                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Pro</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-950 dark:text-white">$12</span>
                    <span className="block text-xs text-gray-400">/ month</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">For personal AI workflows.</p>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-8">
                  <div>10 models</div>
                  <div>Unlimited chats</div>
                  <div>Knowledge base</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('signup')}
                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
              >
                Choose Pro
              </button>
            </div>

            {/* Team Plan */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Team</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-950 dark:text-white">$29</span>
                    <span className="block text-xs text-gray-400">/ month</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">For shared university projects.</p>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-8">
                  <div>Unlimited models</div>
                  <div>Shared prompts</div>
                  <div>Advanced analytics</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('signup')}
                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
              >
                Choose Team
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="font-semibold text-gray-600 dark:text-gray-300">
            AI Multi-LLM
          </div>
          <div>
            Simple by design · Built for learning
          </div>
        </footer>
      </div>
    </div>
  );
};
