// Search Types
export interface SearchResult {
  id: string;
  citation: string;
  jurisdiction: string;
  doc_type: string;
  snippet: string;
  score: number;
  url: string;
  date?: string;
  summary?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  ai_summary?: string;
}

// Chat Types
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  timestamp?: string;
}

export interface ChatResponse {
  session_id: string;
  message: ChatMessage;
  suggested_questions: string[];
  disclaimer: string;
}

// Compare Types
export interface CompareResponse {
  topic: string;
  jurisdictions: string[];
  comparison: string;
  model: string;
}

// Compliance Types
export interface ChecklistResponse {
  id: string;
  industry: string;
  jurisdiction: string;
  activity: string;
  checklist: string;
  model: string;
}

// Explain Types
export interface ExplainResponse {
  original: string;
  plain_english: string;
  model: string;
}

// Timeline Types
export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'amendment' | 'commencement' | 'repeal';
}

export interface TimelineResponse {
  citation: string;
  events: TimelineEvent[];
}

// Workspace Types
export interface Workspace {
  id: string;
  name: string;
  description?: string;
  document_count: number;
  created_at?: string;
}

export interface WorkspaceDetail {
  id: string;
  name: string;
  description?: string;
  documents: Array<{
    id: string;
    citation: string;
    type: string;
  }>;
  notes?: string;
}

// Alert Types
export interface Alert {
  id: string;
  name: string;
  query: string;
  jurisdictions: string[];
  is_active: boolean;
  last_triggered?: string;
}

// Stats Types
export interface Stats {
  total_documents: number;
  by_jurisdiction: Record<string, number>;
  by_type: Record<string, number>;
  model: string;
  database: string;
  status: string;
}

// Industry & Activity Types
export interface Industry {
  id: string;
  name: string;
  icon: string;
}

export interface Activity {
  id: string;
  name: string;
}

export interface Jurisdiction {
  id: string;
  name: string;
  abbreviation?: string;
}
