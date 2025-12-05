import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
      throw error;
    }
  }, []);

  return { ...state, execute };
}

export function useSearch() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (query: string, options?: { jurisdiction?: string; docType?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ q: query, limit: '10' });
      if (options?.jurisdiction) params.append('jurisdiction', options.jurisdiction);
      if (options?.docType) params.append('doc_type', options.docType);

      const response = await fetch(`/mvp/GAVEL/api/search?${params}`);
      const data = await response.json();
      setResults(data.results || []);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}

export function useChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string) => {
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    try {
      const response = await fetch('/mvp/GAVEL/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, session_id: sessionId }),
      });
      const data = await response.json();

      setSessionId(data.session_id);
      setMessages(prev => [...prev, data.message]);
      return data;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
  }, []);

  return { messages, loading, sessionId, sendMessage, clearChat };
}
