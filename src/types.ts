export type Route = 
  | 'home'
  | 'login'
  | 'signup'
  | 'overview'
  | 'chat'
  | 'models'
  | 'memory'
  | 'analytics'
  | 'prompts'
  | 'logs'
  | 'profile'
  | 'data'
  | 'users';

export interface Model {
  id: string;
  name: string;
  provider: string;
  context: string;
  status: string;
  statusType: 'connected' | 'ready' | 'offline';
  accent: 'blue' | 'emerald' | 'purple';
  apiKey?: string;
  description?: string;
}

export interface Memory {
  id: string;
  memory: string;
  category: string;
  date: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  model?: string;
}

export interface Conversation {
  id: string;
  title: string;
  model: string;
  messages: Message[];
  updatedAt: string;
}

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  category: string;
  promptText: string;
  accent: 'blue' | 'emerald' | 'purple';
}

export interface LogEvent {
  id: string;
  time: string;
  message: string;
}

export interface ModelUsage {
  model: string;
  percent: number;
  tokens: number;
  color: string;
}

export interface UsageData {
  tokensThisMonth: number;
  totalConversations: number;
  activeModels: number;
  modelUsage: ModelUsage[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  preferredModel: string;
  theme: 'light' | 'dark';
  isLoggedIn: boolean;
  role: 'admin' | 'user';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'Active' | 'Invited';
  tokensUsed: number;
  preferredModel: string;
  joinedDate: string;
}

export interface ExportDataPayload {
  version: string;
  exportedAt: string;
  source: 'Knowledgify AI Workspace';
  user: UserProfile;
  models: Model[];
  memories: Memory[];
  conversations: Conversation[];
  prompts: PromptItem[];
  logs: LogEvent[];
  usage: UsageData;
}
