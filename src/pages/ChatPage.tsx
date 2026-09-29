import React, { useState, useEffect, useRef } from 'react';
import { Message, Model } from '../types';
import { storageService, generateMockAiResponse } from '../services/storage';
import { ChevronDown, Sparkles, Trash2, Brain } from 'lucide-react';

interface ChatPageProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  showToast: (msg: string) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  initialPrompt,
  onClearInitialPrompt,
  showToast,
}) => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('GPT-4o');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMemoryContext, setShowMemoryContext] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load models and current conversation
  useEffect(() => {
    const loadedModels = storageService.getModels();
    setModels(loadedModels);
    if (loadedModels.length > 0 && !selectedModel) {
      setSelectedModel(loadedModels[0].name);
    }

    const convos = storageService.getConversations();
    if (convos.length > 0 && convos[0].messages.length > 0) {
      setMessages(convos[0].messages);
    }
  }, []);

  // Handle incoming prompt from Prompt Library or Home page
  useEffect(() => {
    if (initialPrompt) {
      setInputValue(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt, onClearInitialPrompt]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');

    const convos = storageService.getConversations();
    const currentConvId = convos[0]?.id || 'conv-default';

    // 1. Add User Message
    const userMsg = storageService.addMessage(currentConvId, {
      sender: 'user',
      text: userText,
      time: 'TODAY',
      model: selectedModel,
    });

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Generate simulated AI response
    setTimeout(() => {
      const memories = storageService.getMemories();
      const aiReply = generateMockAiResponse(userText, selectedModel, memories);

      const aiMsg = storageService.addMessage(currentConvId, {
        sender: 'ai',
        text: aiReply,
        time: 'TODAY',
        model: selectedModel,
      });

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearChat = () => {
    const convos = storageService.getConversations();
    const currentConvId = convos[0]?.id || 'conv-default';
    storageService.clearMessages(currentConvId);
    setMessages([]);
    showToast('Conversation cleared');
  };

  const memories = storageService.getMemories();

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8 flex flex-col min-h-[calc(100vh-72px)]">
      {/* Top Header: Title & Model Selector */}
      <div className="flex items-center justify-between mb-6 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            Chat
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMemoryContext(!showMemoryContext)}
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200/60 dark:border-blue-800 px-2 py-0.5 rounded font-medium transition-colors"
              title="Knowledgify unified context middleware"
            >
              <Brain size={12} />
              <span>{memories.length} unified memories synced</span>
            </button>
          </div>
        </div>

        {/* Model Selector Dropdown matching Figma: GPT-4o ▼ */}
        <div className="relative">
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:border-gray-400 text-gray-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-2xs"
          >
            <span>{selectedModel}</span>
            <ChevronDown size={14} className="text-gray-500 dark:text-gray-400" />
          </button>

          {isModelDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Select Model
              </div>
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModel(m.name);
                    setIsModelDropdownOpen(false);
                    showToast(`Switched active model to ${m.name}`);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/60 transition-colors ${
                    selectedModel === m.name
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-950/50'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <span>{m.name}</span>
                  <span className="text-xs text-gray-400 font-normal">
                    {m.provider}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Memory Context Banner (Expandable) */}
      {showMemoryContext && (
        <div className="mb-6 p-4 bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-900 rounded-xl text-xs text-gray-600 dark:text-gray-300 space-y-2">
          <div className="flex items-center justify-between font-semibold text-gray-900 dark:text-white">
            <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
              <Sparkles size={14} /> Unified Context Middleware (Knowledgify)
            </span>
            <button
              onClick={() => setShowMemoryContext(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Knowledgify conceptually injects these memories into all model prompts, ensuring seamless continuity:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {memories.map((m) => (
              <span
                key={m.id}
                className="bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-[11px] border border-gray-200 dark:border-slate-700 font-mono"
              >
                [{m.category}] {m.memory}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Conversation Area (Matching Figma Wireframe) */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between mb-4 min-h-[460px]">
        <div className="space-y-6 overflow-y-auto max-h-[520px] pr-2">
          {/* TODAY timestamp */}
          <div className="text-center">
            <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              TODAY
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm">
              <p>No messages yet. Send a message to start chatting with {selectedModel}.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-4">
                {/* Avatar */}
                {msg.sender === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-[#1e40af] text-white flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    You
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#dbeafe] dark:bg-blue-950 text-[#1e40af] dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    AI
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {msg.sender === 'user' ? 'You' : 'AI'}
                    </span>
                    {msg.sender === 'ai' && msg.model && (
                      <span className="text-[11px] text-gray-400 font-normal">
                        ({msg.model})
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#dbeafe] dark:bg-blue-950 text-[#1e40af] dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                AI
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-gray-400 dark:text-gray-400">{selectedModel} thinking with unified context...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Clear chat utility */}
        {messages.length > 0 && (
          <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleClearChat}
              className="text-xs text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={12} /> Clear Conversation
            </button>
          </div>
        )}
      </div>

      {/* Message Composer (Matching Figma layout) */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          disabled={isTyping}
          className="flex-1 px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors shadow-2xs"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="bg-[#2563eb] hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-2xs shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
};
