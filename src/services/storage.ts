import {
  Model,
  Memory,
  Conversation,
  Message,
  PromptItem,
  LogEvent,
  UsageData,
  UserProfile,
  TeamMember,
  ExportDataPayload,
} from '../types';

const STORAGE_KEYS = {
  USER: 'knowledgify_user',
  MODELS: 'knowledgify_models',
  MEMORIES: 'knowledgify_memories',
  CONVERSATIONS: 'knowledgify_conversations',
  PROMPTS: 'knowledgify_prompts',
  LOGS: 'knowledgify_logs',
  USAGE: 'knowledgify_usage',
  TEAM: 'knowledgify_team',
};

// Default seed data strictly matching the Figma wireframes
export const DEFAULT_USER: UserProfile = {
  name: 'Jeel Dobariya',
  email: 'jeeldobariya38@gmail.com',
  avatar: 'JD',
  preferredModel: 'GPT-4o',
  theme: 'light',
  isLoggedIn: true,
  role: 'admin',
};

export const DEFAULT_GUEST_USER: UserProfile = {
  name: 'Alex Rivers',
  email: 'alex.guest@knowledgify.app',
  avatar: 'AR',
  preferredModel: 'Claude 3.5',
  theme: 'light',
  isLoggedIn: true,
  role: 'user',
};

export const DEFAULT_MODELS: Model[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    context: '128K context',
    status: 'Connected',
    statusType: 'connected',
    accent: 'blue',
    apiKey: 'sk-proj-••••••••••••••••',
    description: 'High-intelligence flagship model for complex reasoning and multimodal coding.',
  },
  {
    id: 'claude-3-5',
    name: 'Claude 3.5',
    provider: 'Anthropic',
    context: '200K context',
    status: 'Connected',
    statusType: 'connected',
    accent: 'emerald',
    apiKey: 'sk-ant-••••••••••••••••',
    description: 'State-of-the-art nuanced prose, coding, and large-document synthesis.',
  },
  {
    id: 'gemini-1-5',
    name: 'Gemini 1.5',
    provider: 'Google',
    context: '1M context',
    status: 'Ready',
    statusType: 'ready',
    accent: 'purple',
    apiKey: 'AIzaSy••••••••••••••••',
    description: 'Ultra-long context window model capable of parsing hours of audio, video, or 1M tokens.',
  },
];

export const DEFAULT_MEMORIES: Memory[] = [
  {
    id: '001',
    memory: 'User prefers concise answers',
    category: 'Preference',
    date: 'Aug 13',
  },
  {
    id: '002',
    memory: 'Project uses Vanilla JS',
    category: 'Project',
    date: 'Aug 12',
  },
  {
    id: '003',
    memory: 'Uses multiple AI models',
    category: 'General',
    date: 'Aug 11',
  },
];

export const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-default',
    title: 'Explain vector databases',
    model: 'GPT-4o',
    updatedAt: 'Just now',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Explain vector databases.',
        time: 'TODAY',
      },
      {
        id: 'msg-2',
        sender: 'ai',
        text: 'A vector database stores embeddings so similar information can be found efficiently.',
        time: 'TODAY',
        model: 'GPT-4o',
      },
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Keep it beginner friendly.',
        time: 'TODAY',
      },
      {
        id: 'msg-4',
        sender: 'ai',
        text: 'Think of it like a smart search system for meaning, not just exact words.',
        time: 'TODAY',
        model: 'GPT-4o',
      },
    ],
  },
];

export const DEFAULT_PROMPTS: PromptItem[] = [
  {
    id: 'p-1',
    title: 'Code Assistant',
    description: 'Write and explain code clearly.',
    category: 'Reusable prompt',
    promptText: 'Write clean, modern code for this task and explain the architecture clearly.',
    accent: 'blue',
  },
  {
    id: 'p-2',
    title: 'Summarize Text',
    description: 'Turn long text into concise notes.',
    category: 'Reusable prompt',
    promptText: 'Summarize the following passage into concise bullet points highlighting key takeaways.',
    accent: 'emerald',
  },
  {
    id: 'p-3',
    title: 'Explain Concept',
    description: 'Explain technical topics simply.',
    category: 'Reusable prompt',
    promptText: 'Explain this concept simply as if to a curious beginner with clear real-world analogies.',
    accent: 'blue',
  },
  {
    id: 'p-4',
    title: 'Research Assistant',
    description: 'Organize research into useful points.',
    category: 'Reusable prompt',
    promptText: 'Analyze this research topic, outline hypotheses, key arguments, and critical trade-offs.',
    accent: 'purple',
  },
];

export const DEFAULT_LOGS: LogEvent[] = [
  { id: '1', time: '10:42:01', message: 'Server started' },
  { id: '2', time: '10:42:04', message: 'Model GPT connected' },
  { id: '3', time: '10:43:12', message: 'User login successful' },
  { id: '4', time: '10:44:08', message: 'Memory inserted' },
  { id: '5', time: '10:45:22', message: 'Chat request completed' },
];

export const DEFAULT_USAGE: UsageData = {
  tokensThisMonth: 12450,
  totalConversations: 34,
  activeModels: 3,
  modelUsage: [
    { model: 'GPT-4o', percent: 75, tokens: 9338, color: 'bg-blue-600' },
    { model: 'Claude 3.5', percent: 52, tokens: 6474, color: 'bg-emerald-600' },
    { model: 'Gemini 1.5', percent: 35, tokens: 4358, color: 'bg-purple-600' },
  ],
};

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'usr-1',
    name: 'Jeel Dobariya',
    email: 'jeeldobariya38@gmail.com',
    role: 'admin',
    status: 'Active',
    tokensUsed: 12450,
    preferredModel: 'GPT-4o',
    joinedDate: 'Aug 01, 2026',
  },
  {
    id: 'usr-2',
    name: 'Sarah Chen',
    email: 'sarah.c@workspace.ai',
    role: 'user',
    status: 'Active',
    tokensUsed: 4210,
    preferredModel: 'Claude 3.5',
    joinedDate: 'Aug 14, 2026',
  },
  {
    id: 'usr-3',
    name: 'Marcus Brody',
    email: 'marcus.b@workspace.ai',
    role: 'user',
    status: 'Active',
    tokensUsed: 2890,
    preferredModel: 'Gemini 1.5',
    joinedDate: 'Aug 18, 2026',
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena.r@workspace.ai',
    role: 'admin',
    status: 'Active',
    tokensUsed: 9120,
    preferredModel: 'GPT-4o',
    joinedDate: 'Aug 05, 2026',
  },
  {
    id: 'usr-5',
    name: 'David Miller',
    email: 'd.miller@workspace.ai',
    role: 'user',
    status: 'Invited',
    tokensUsed: 0,
    preferredModel: 'Claude 3.5',
    joinedDate: 'Aug 28, 2026',
  },
];

// Generic storage read/write
function read<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Storage API
export const storageService = {
  // User Profile
  getUser(): UserProfile {
    return read<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
  },
  saveUser(user: UserProfile): void {
    write(STORAGE_KEYS.USER, user);
  },
  setUserRole(role: 'admin' | 'user'): UserProfile {
    const user = this.getUser();
    user.role = role;
    this.saveUser(user);
    this.addLog(`Switched active session role to: ${role.toUpperCase()}`);
    return user;
  },

  // Models
  getModels(): Model[] {
    return read<Model[]>(STORAGE_KEYS.MODELS, DEFAULT_MODELS);
  },
  saveModels(models: Model[]): void {
    write(STORAGE_KEYS.MODELS, models);
  },
  addModel(model: Omit<Model, 'id'>): Model {
    const models = this.getModels();
    const newModel: Model = {
      ...model,
      id: `model-${Date.now()}`,
    };
    models.push(newModel);
    this.saveModels(models);
    this.addLog(`Model ${newModel.name} configured (${newModel.provider})`);
    return newModel;
  },
  deleteModel(id: string): void {
    const models = this.getModels();
    const filtered = models.filter((m) => m.id !== id);
    this.saveModels(filtered);
    this.addLog(`Model removed from workspace`);
  },

  // Memories
  getMemories(): Memory[] {
    return read<Memory[]>(STORAGE_KEYS.MEMORIES, DEFAULT_MEMORIES);
  },
  saveMemories(memories: Memory[]): void {
    write(STORAGE_KEYS.MEMORIES, memories);
  },
  addMemory(note: string, category: string): Memory {
    const memories = this.getMemories();
    const nextNum = memories.length + 1;
    const padId = nextNum < 10 ? `00${nextNum}` : nextNum < 100 ? `0${nextNum}` : `${nextNum}`;
    
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}`;

    const newMemory: Memory = {
      id: padId,
      memory: note,
      category: category || 'General',
      date: dateStr,
    };
    memories.unshift(newMemory);
    this.saveMemories(memories);
    this.addLog('Memory inserted');
    return newMemory;
  },
  deleteMemory(id: string): void {
    const memories = this.getMemories();
    const filtered = memories.filter((m) => m.id !== id);
    this.saveMemories(filtered);
    this.addLog(`Memory #${id} removed`);
  },

  // Conversations
  getConversations(): Conversation[] {
    return read<Conversation[]>(STORAGE_KEYS.CONVERSATIONS, DEFAULT_CONVERSATIONS);
  },
  saveConversations(conversations: Conversation[]): void {
    write(STORAGE_KEYS.CONVERSATIONS, conversations);
  },
  addMessage(conversationId: string, message: Omit<Message, 'id'>): Message {
    const convos = this.getConversations();
    let current = convos.find((c) => c.id === conversationId);
    if (!current) {
      current = {
        id: conversationId,
        title: message.text.slice(0, 30) || 'New Conversation',
        model: message.model || 'GPT-4o',
        messages: [],
        updatedAt: 'Just now',
      };
      convos.unshift(current);
    }

    const newMsg: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };

    current.messages.push(newMsg);
    current.updatedAt = 'Just now';
    this.saveConversations(convos);

    // Update usage and logs
    if (message.sender === 'user') {
      this.incrementUsage(35);
    } else {
      this.incrementUsage(75);
      this.addLog('Chat request completed');
    }

    return newMsg;
  },
  clearMessages(conversationId: string): void {
    const convos = this.getConversations();
    const target = convos.find((c) => c.id === conversationId);
    if (target) {
      target.messages = [];
      this.saveConversations(convos);
    }
  },

  // Prompts
  getPrompts(): PromptItem[] {
    return read<PromptItem[]>(STORAGE_KEYS.PROMPTS, DEFAULT_PROMPTS);
  },
  savePrompts(prompts: PromptItem[]): void {
    write(STORAGE_KEYS.PROMPTS, prompts);
  },
  addPrompt(prompt: Omit<PromptItem, 'id'>): PromptItem {
    const prompts = this.getPrompts();
    const newPrompt: PromptItem = {
      ...prompt,
      id: `p-${Date.now()}`,
    };
    prompts.push(newPrompt);
    this.savePrompts(prompts);
    this.addLog(`Prompt template added: "${newPrompt.title}"`);
    return newPrompt;
  },
  deletePrompt(id: string): void {
    const prompts = this.getPrompts();
    this.savePrompts(prompts.filter((p) => p.id !== id));
    this.addLog('Prompt template removed');
  },

  // Logs
  getLogs(): LogEvent[] {
    return read<LogEvent[]>(STORAGE_KEYS.LOGS, DEFAULT_LOGS);
  },
  saveLogs(logs: LogEvent[]): void {
    write(STORAGE_KEYS.LOGS, logs);
  },
  addLog(message: string): void {
    const logs = this.getLogs();
    const now = new Date();
    const timeStr = [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0'),
    ].join(':');

    logs.push({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      time: timeStr,
      message,
    });
    // Keep last 30 logs
    if (logs.length > 30) logs.shift();
    this.saveLogs(logs);
  },
  clearLogs(): void {
    this.saveLogs([]);
  },

  // Usage Data
  getUsage(): UsageData {
    return read<UsageData>(STORAGE_KEYS.USAGE, DEFAULT_USAGE);
  },
  saveUsage(usage: UsageData): void {
    write(STORAGE_KEYS.USAGE, usage);
  },
  incrementUsage(tokenCount: number): void {
    const usage = this.getUsage();
    usage.tokensThisMonth += tokenCount;
    this.saveUsage(usage);
  },

  // Team Management (Admin feature)
  getTeam(): TeamMember[] {
    return read<TeamMember[]>(STORAGE_KEYS.TEAM, DEFAULT_TEAM);
  },
  saveTeam(team: TeamMember[]): void {
    write(STORAGE_KEYS.TEAM, team);
  },
  addTeamMember(member: Omit<TeamMember, 'id' | 'joinedDate' | 'tokensUsed'>): TeamMember {
    const team = this.getTeam();
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${months[now.getMonth()]} ${String(now.getDate()).padStart(2, '0')}, ${now.getFullYear()}`;

    const newMember: TeamMember = {
      ...member,
      id: `usr-${Date.now()}`,
      tokensUsed: 0,
      joinedDate: dateStr,
    };
    team.push(newMember);
    this.saveTeam(team);
    this.addLog(`New team member invited: ${newMember.email} (${newMember.role})`);
    return newMember;
  },
  deleteTeamMember(id: string): void {
    const team = this.getTeam();
    this.saveTeam(team.filter((m) => m.id !== id));
    this.addLog(`Team member removed`);
  },
  updateMemberRole(id: string, role: 'admin' | 'user'): void {
    const team = this.getTeam();
    const member = team.find((m) => m.id === id);
    if (member) {
      member.role = role;
      this.saveTeam(team);
      this.addLog(`Updated role for ${member.name} to ${role}`);
    }
  },

  // EXPORT DATA (Downloads full JSON of all localStorage state)
  exportAllData(): ExportDataPayload {
    return {
      version: '1.2.0',
      exportedAt: new Date().toISOString(),
      source: 'Knowledgify AI Workspace',
      user: this.getUser(),
      models: this.getModels(),
      memories: this.getMemories(),
      conversations: this.getConversations(),
      prompts: this.getPrompts(),
      logs: this.getLogs(),
      usage: this.getUsage(),
    };
  },

  downloadDataFile(): void {
    const payload = this.exportAllData();
    const jsonString = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `knowledgify-backup-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    this.addLog('Complete workspace state exported as JSON');
  },

  // IMPORT DATA (Restores state from JSON file with validation)
  importAllData(jsonString: string): {
    success: boolean;
    error?: string;
    stats?: { models: number; memories: number; prompts: number; convos: number };
  } {
    try {
      const parsed = JSON.parse(jsonString) as Partial<ExportDataPayload>;

      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON file format.' };
      }

      // Restore user if present
      if (parsed.user && typeof parsed.user === 'object') {
        this.saveUser({ ...DEFAULT_USER, ...parsed.user });
      }

      // Restore models
      if (Array.isArray(parsed.models)) {
        this.saveModels(parsed.models);
      }

      // Restore memories
      if (Array.isArray(parsed.memories)) {
        this.saveMemories(parsed.memories);
      }

      // Restore conversations
      if (Array.isArray(parsed.conversations)) {
        this.saveConversations(parsed.conversations);
      }

      // Restore prompts
      if (Array.isArray(parsed.prompts)) {
        this.savePrompts(parsed.prompts);
      }

      // Restore logs
      if (Array.isArray(parsed.logs)) {
        this.saveLogs(parsed.logs);
      }

      // Restore usage
      if (parsed.usage && typeof parsed.usage === 'object') {
        this.saveUsage(parsed.usage as UsageData);
      }

      this.addLog('Workspace state successfully restored from JSON backup');

      return {
        success: true,
        stats: {
          models: Array.isArray(parsed.models) ? parsed.models.length : 0,
          memories: Array.isArray(parsed.memories) ? parsed.memories.length : 0,
          prompts: Array.isArray(parsed.prompts) ? parsed.prompts.length : 0,
          convos: Array.isArray(parsed.conversations) ? parsed.conversations.length : 0,
        },
      };
    } catch (err) {
      console.error('Failed to parse import data:', err);
      return { success: false, error: 'Could not parse JSON. Please check file structure.' };
    }
  },

  // Reset to initial wireframe state
  resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.MODELS);
    localStorage.removeItem(STORAGE_KEYS.MEMORIES);
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEYS.PROMPTS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.USAGE);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    this.saveUser(DEFAULT_USER);
    this.saveModels(DEFAULT_MODELS);
    this.saveMemories(DEFAULT_MEMORIES);
    this.saveConversations(DEFAULT_CONVERSATIONS);
    this.savePrompts(DEFAULT_PROMPTS);
    this.saveLogs(DEFAULT_LOGS);
    this.saveUsage(DEFAULT_USAGE);
    this.saveTeam(DEFAULT_TEAM);
  },
};

// Simulated Intelligent Responses based on input & unified memories
export function generateMockAiResponse(prompt: string, modelName: string, memories: Memory[]): string {
  const p = prompt.toLowerCase();

  // If asking about vector databases
  if (p.includes('vector') && p.includes('database')) {
    if (p.includes('beginner') || p.includes('simple') || p.includes('explain')) {
      return 'Think of it like a smart search system for meaning, not just exact words. Instead of checking if text matches letter-for-letter, it converts sentences into mathematical coordinates (vectors) where semantically related concepts sit close together.';
    }
    return 'A vector database stores high-dimensional embeddings generated by AI models. When querying, it calculates cosine similarity or nearest neighbors to retrieve contextually relevant knowledge instantly.';
  }

  // If asking about models or differences
  if (p.includes('claude') || p.includes('gpt') || p.includes('gemini') || p.includes('difference')) {
    return `As ${modelName}, I operate inside Knowledgify's shared context layer. GPT-4o excels at structured analytical logic, Claude 3.5 specializes in nuanced prose and long context, and Gemini 1.5 offers massive 1M-token multimodal context. Knowledgify keeps all three in sync with your user memories.`;
  }

  // If asking about memory / context
  if (p.includes('memory') || p.includes('context') || p.includes('knowledgify')) {
    const memoryNotes = memories.map((m) => `• [${m.category}] ${m.memory}`).join('\n');
    return `Knowledgify actively injected your unified working context into this conversation:\n${memoryNotes}\n\nAll connected models share these preferences automatically.`;
  }

  // If asking about code or vanilla js
  if (p.includes('code') || p.includes('javascript') || p.includes('vanilla')) {
    return 'Here is a clean implementation aligned with your saved preferences (concise answers & lightweight standard architecture):\n\n```javascript\n// Client-side context synchronizer\nfunction syncModelContext(prompt, memoryBank) {\n  const context = memoryBank.map(m => m.memory).join("; ");\n  return `[Context: ${context}]\\n\\nUser: ${prompt}`;\n}\n```';
  }

  // Default smart contextual response
  const genericAnswers = [
    `I've processed that using ${modelName}. Following your preference for concise answers, here is the key takeaway: modern multi-model workflows are significantly faster when centralized memory eliminates redundant prompting.`,
    `Understood. With ${modelName} active and Knowledgify's context cache loaded, your queries retain full continuity across model switches without re-explaining background details.`,
    `Great question. The unified architecture of Knowledgify routes this prompt while preserving your saved workspace memories and tokens.`,
  ];

  return genericAnswers[Math.floor(Math.random() * genericAnswers.length)];
}
