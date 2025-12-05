const API_BASE = '/mvp/GAVEL/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Search API
export const searchApi = {
  search: (query: string, jurisdiction?: string, docType?: string, limit = 10) => {
    const params = new URLSearchParams({ q: query, limit: String(limit) });
    if (jurisdiction) params.append('jurisdiction', jurisdiction);
    if (docType) params.append('doc_type', docType);
    return fetchApi<any>(`/search?${params}`);
  },
  getJurisdictions: () => fetchApi<any>('/search/jurisdictions'),
  getDocTypes: () => fetchApi<any>('/search/doctypes'),
};

// Chat API
export const chatApi = {
  send: (message: string, sessionId?: string) =>
    fetchApi<any>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, session_id: sessionId }),
    }),
  getSuggested: () => fetchApi<any>('/chat/suggested'),
  getHistory: (sessionId: string) => fetchApi<any>(`/chat/history/${sessionId}`),
};

// Compare API
export const compareApi = {
  compare: (topic: string, jurisdictions: string[]) =>
    fetchApi<any>('/compare', {
      method: 'POST',
      body: JSON.stringify({ topic, jurisdictions }),
    }),
  getTopics: () => fetchApi<any>('/compare/topics'),
  getJurisdictions: () => fetchApi<any>('/compare/jurisdictions'),
};

// Analyze API
export const analyzeApi = {
  analyzeText: (text: string, analysisTypes: string[]) => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('analysis_types', analysisTypes.join(','));
    return fetch(`${API_BASE}/analyze/text`, {
      method: 'POST',
      body: formData,
    }).then(r => r.json());
  },
  getTypes: () => fetchApi<any>('/analyze/types'),
};

// Compliance API
export const complianceApi = {
  generateChecklist: (industry: string, jurisdiction: string, activity: string) =>
    fetchApi<any>('/compliance/checklist', {
      method: 'POST',
      body: JSON.stringify({ industry, jurisdiction, activity }),
    }),
  getIndustries: () => fetchApi<any>('/compliance/industries'),
  getActivities: (industry?: string) => {
    const params = industry ? `?industry=${industry}` : '';
    return fetchApi<any>(`/compliance/activities${params}`);
  },
  getJurisdictions: () => fetchApi<any>('/compliance/jurisdictions'),
};

// Explain API
export const explainApi = {
  explain: (text: string) =>
    fetchApi<any>('/explain', {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),
  getExamples: () => fetchApi<any>('/explain/examples'),
};

// Timeline API
export const timelineApi = {
  getTimeline: (docId: string) => fetchApi<any>(`/timeline/${docId}`),
  search: (query: string) => fetchApi<any>(`/timeline/search?q=${encodeURIComponent(query)}`),
};

// Workspace API
export const workspaceApi = {
  list: () => fetchApi<any>('/workspaces'),
  get: (id: string) => fetchApi<any>(`/workspaces/${id}`),
  create: (name: string, description?: string) =>
    fetchApi<any>('/workspaces', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    }),
  addDocument: (workspaceId: string, documentId: string, citation: string, docType: string) =>
    fetchApi<any>(`/workspaces/${workspaceId}/documents`, {
      method: 'POST',
      body: JSON.stringify({ document_id: documentId, citation, doc_type: docType }),
    }),
  updateNotes: (workspaceId: string, notes: string) =>
    fetchApi<any>(`/workspaces/${workspaceId}/notes`, {
      method: 'PUT',
      body: JSON.stringify({ notes }),
    }),
  delete: (id: string) =>
    fetchApi<any>(`/workspaces/${id}`, { method: 'DELETE' }),
};

// Alerts API
export const alertsApi = {
  list: () => fetchApi<any>('/alerts'),
  get: (id: string) => fetchApi<any>(`/alerts/${id}`),
  create: (name: string, query: string, jurisdictions: string[]) =>
    fetchApi<any>('/alerts', {
      method: 'POST',
      body: JSON.stringify({ name, query, jurisdictions }),
    }),
  update: (id: string, data: any) =>
    fetchApi<any>(`/alerts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi<any>(`/alerts/${id}`, { method: 'DELETE' }),
  toggle: (id: string) =>
    fetchApi<any>(`/alerts/${id}/toggle`, { method: 'POST' }),
};

// Stats API
export const statsApi = {
  get: () => fetchApi<any>('/stats'),
  getCoverage: () => fetchApi<any>('/stats/coverage'),
  getRecent: () => fetchApi<any>('/stats/recent'),
};

// Health check
export const healthApi = {
  check: () => fetchApi<any>('/health'),
};
