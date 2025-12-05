import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  Scale, Search, MessageSquare, GitCompare, FileCheck, Shield,
  FileText, Clock, Folder, Bell, ExternalLink, ChevronRight,
  Send, Loader2, CheckCircle, Plus, Trash2,
  Building, Landmark, GraduationCap, Factory, ShoppingCart,
  Download, Database, Heart
} from 'lucide-react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchBar } from './components/common/SearchBar';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// API Base URL
const API_BASE = '/mvp/GAVEL/api';

// Jurisdiction badge colors
const jurisdictionColors: Record<string, string> = {
  commonwealth: 'bg-blue-100 text-blue-700',
  new_south_wales: 'bg-sky-100 text-sky-700',
  queensland: 'bg-red-100 text-red-700',
  south_australia: 'bg-amber-100 text-amber-700',
  western_australia: 'bg-yellow-100 text-yellow-700',
  tasmania: 'bg-emerald-100 text-emerald-700',
};

const jurisdictionNames: Record<string, string> = {
  commonwealth: 'Cth',
  new_south_wales: 'NSW',
  queensland: 'QLD',
  south_australia: 'SA',
  western_australia: 'WA',
  tasmania: 'TAS',
};

// ============================================
// HOME PAGE
// ============================================
function HomePage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/stats`)
      .then(r => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const features = [
    { icon: Search, title: 'Semantic Search', description: 'Search 147K+ legal documents with AI-powered relevance', path: '/search' },
    { icon: MessageSquare, title: 'AI Legal Assistant', description: 'Ask questions about Australian law in plain English', path: '/chat' },
    { icon: GitCompare, title: 'Jurisdiction Comparison', description: 'Compare laws across Commonwealth and States', path: '/compare' },
    { icon: FileCheck, title: 'Document Analysis', description: 'Upload documents for compliance and risk review', path: '/analyze' },
    { icon: Shield, title: 'Compliance Checklists', description: 'Generate industry-specific requirements', path: '/compliance' },
    { icon: FileText, title: 'Plain Language', description: 'Convert legalese to simple English', path: '/explain' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gavel-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gavel-600 to-gavel-900 opacity-5"></div>
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gavel-100 text-gavel-700 rounded-full text-sm font-medium mb-6">
            <Database className="w-4 h-4 mr-2" />
            {stats?.total_documents?.toLocaleString() || '147,000'}+ Legal Documents
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Australian Legal
            <span className="text-gavel-600"> Intelligence</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            AI-powered legal research across Commonwealth and State legislation,
            regulations, and caselaw. Powered by Oracle ADB and Grok-4.
          </p>

          <div className="max-w-3xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Privacy Act', 'WHS duties', 'Building contractor licensing', 'Health records QLD'].map(term => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gavel-50 hover:text-gavel-600 border border-gray-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Powerful Legal Research Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(feature => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className="card-hover group"
              >
                <div className="w-12 h-12 bg-gavel-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gavel-600 transition-colors">
                  <Icon className="w-6 h-6 text-gavel-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 flex items-center text-gavel-600 font-medium">
                  Get started <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Coverage Section */}
      <div className="bg-gavel-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Australian Coverage
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { id: 'commonwealth', name: 'Commonwealth', count: 45000 },
              { id: 'new_south_wales', name: 'NSW', count: 32000 },
              { id: 'queensland', name: 'Queensland', count: 28000 },
              { id: 'south_australia', name: 'South Australia', count: 18000 },
              { id: 'western_australia', name: 'Western Australia', count: 15000 },
              { id: 'tasmania', name: 'Tasmania', count: 9000 },
            ].map(jur => (
              <div key={jur.id} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{(jur.count / 1000).toFixed(0)}K</div>
                <div className="text-gavel-300 text-sm">{jur.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SEARCH PAGE
// ============================================
function SearchPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [aiSummary, setAiSummary] = useState('');

  const handleSearch = async (searchQuery: string, filters?: { jurisdiction?: string; docType?: string }) => {
    setLoading(true);
    setQuery(searchQuery);
    try {
      const params = new URLSearchParams({ q: searchQuery, limit: '20', include_summary: 'true' });
      if (filters?.jurisdiction) params.append('jurisdiction', filters.jurisdiction);
      if (filters?.docType) params.append('doc_type', filters.docType);

      const response = await fetch(`${API_BASE}/search?${params}`);
      const data = await response.json();
      setResults(data.results || []);
      setAiSummary(data.ai_summary || '');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Legal Documents</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="mt-12">
          <LoadingSpinner message="Searching documents..." />
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-8">
          {aiSummary && (
            <div className="bg-gavel-50 border border-gavel-200 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <Scale className="w-5 h-5 text-gavel-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gavel-900 mb-1">AI Summary</div>
                  <p className="text-gray-700">{aiSummary}</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 mb-4">
            Found {results.length} results for "{query}"
          </div>

          <div className="space-y-4">
            {results.map(result => (
              <div key={result.id} className="card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge ${jurisdictionColors[result.jurisdiction] || 'bg-gray-100 text-gray-700'}`}>
                        {jurisdictionNames[result.jurisdiction] || result.jurisdiction}
                      </span>
                      <span className="badge bg-gray-100 text-gray-600">
                        {result.doc_type?.replace(/_/g, ' ')}
                      </span>
                      {result.date && (
                        <span className="text-sm text-gray-400">{result.date}</span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {result.citation}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2">
                      {result.snippet}
                    </p>

                    {result.summary && (
                      <p className="text-gray-500 text-sm mt-2 italic">
                        {result.summary}
                      </p>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col items-end">
                    <div className="text-sm font-medium text-gavel-600">
                      {Math.round(result.score * 100)}% match
                    </div>
                    {result.url && (
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-sm text-gray-500 hover:text-gavel-600 flex items-center"
                      >
                        View source <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && results.length === 0 && query && (
        <div className="mt-12 text-center text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No results found for "{query}"</p>
          <p className="text-sm mt-2">Try different keywords or filters</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// CHAT PAGE
// ============================================
function ChatPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggested, setSuggested] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/chat/suggested`)
      .then(r => r.json())
      .then(data => setSuggested(data.questions || []))
      .catch(console.error);
  }, []);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Legal Assistant</h1>
        <p className="text-gray-600">Ask questions about Australian law in plain English</p>
      </div>

      <div className="card min-h-[500px] flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <Scale className="w-16 h-16 text-gavel-200 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ask me anything about Australian law</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
              {suggested.slice(0, 4).map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gavel-50 text-sm text-gray-700 hover:text-gavel-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gavel-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-gavel-600" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="border-t pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Australian law..."
              className="input flex-1"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary flex items-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2 text-center">
            AI-generated legal information, not legal advice. Always verify with official sources.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// COMPARE PAGE
// ============================================
function ComparePage() {
  const [topic, setTopic] = useState('');
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(['commonwealth', 'queensland']);
  const [comparison, setComparison] = useState('');
  const [loading, setLoading] = useState(false);

  const jurisdictions = [
    { id: 'commonwealth', name: 'Commonwealth' },
    { id: 'new_south_wales', name: 'New South Wales' },
    { id: 'queensland', name: 'Queensland' },
    { id: 'south_australia', name: 'South Australia' },
    { id: 'western_australia', name: 'Western Australia' },
    { id: 'tasmania', name: 'Tasmania' },
  ];

  const suggestedTopics = [
    'Work Health and Safety',
    'Privacy and Data Protection',
    'Building Regulations',
    'Employment Law',
    'Environmental Protection',
  ];

  const handleCompare = async () => {
    if (!topic || selectedJurisdictions.length < 2) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, jurisdictions: selectedJurisdictions }),
      });
      const data = await response.json();
      setComparison(data.comparison);
    } catch (error) {
      console.error('Compare error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleJurisdiction = (id: string) => {
    setSelectedJurisdictions(prev =>
      prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Jurisdiction Comparison</h1>
      <p className="text-gray-600 mb-8">Compare how different Australian jurisdictions handle legal topics</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Select Topic</h3>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Work Health and Safety"
              className="input mb-4"
            />

            <div className="space-y-2 mb-6">
              {suggestedTopics.map(t => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    topic === t ? 'bg-gavel-100 text-gavel-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-gray-900 mb-4">Select Jurisdictions (2+)</h3>
            <div className="space-y-2 mb-6">
              {jurisdictions.map(j => (
                <label key={j.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedJurisdictions.includes(j.id)}
                    onChange={() => toggleJurisdiction(j.id)}
                    className="mr-3"
                  />
                  <span>{j.name}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleCompare}
              disabled={!topic || selectedJurisdictions.length < 2 || loading}
              className="btn-primary w-full"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Compare'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <LoadingSpinner message="Comparing jurisdictions..." />
          ) : comparison ? (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">
                Comparison: {topic}
              </h3>
              <div className="prose max-w-none">
                <ReactMarkdown>{comparison}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="card text-center text-gray-500 py-16">
              <GitCompare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a topic and jurisdictions to compare</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// ANALYZE PAGE
// ============================================
function AnalyzePage() {
  const [text, setText] = useState('');
  const [analysisTypes, setAnalysisTypes] = useState(['compliance', 'risks', 'recommendations']);
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const types = [
    { id: 'compliance', name: 'Compliance Check' },
    { id: 'risks', name: 'Risk Assessment' },
    { id: 'recommendations', name: 'Recommendations' },
    { id: 'missing_clauses', name: 'Missing Clauses' },
    { id: 'privacy', name: 'Privacy Assessment' },
  ];

  const handleAnalyze = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('analysis_types', analysisTypes.join(','));

      const response = await fetch(`${API_BASE}/analyze/text`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Analyze error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = (id: string) => {
    setAnalysisTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Analysis</h1>
      <p className="text-gray-600 mb-8">Analyze documents for compliance, risks, and recommendations</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Document Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your document text here..."
              className="input h-64 resize-none"
            />

            <h3 className="font-semibold text-gray-900 mt-6 mb-4">Analysis Types</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {types.map(t => (
                <button
                  key={t.id}
                  onClick={() => toggleType(t.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    analysisTypes.includes(t.id)
                      ? 'bg-gavel-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!text || analysisTypes.length === 0 || loading}
              className="btn-primary w-full"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyze Document'}
            </button>
          </div>
        </div>

        <div>
          {loading ? (
            <LoadingSpinner message="Analyzing document..." />
          ) : results ? (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Analysis Results</h3>
              <div className="prose max-w-none">
                <ReactMarkdown>{results}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="card text-center text-gray-500 py-16">
              <FileCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Paste document text and select analysis types</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// COMPLIANCE PAGE
// ============================================
function CompliancePage() {
  const [industry, setIndustry] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [activity, setActivity] = useState('');
  const [checklist, setChecklist] = useState('');
  const [loading, setLoading] = useState(false);

  const industries = [
    { id: 'healthcare', name: 'Healthcare', icon: Heart },
    { id: 'construction', name: 'Construction', icon: Building },
    { id: 'government', name: 'Government', icon: Landmark },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'manufacturing', name: 'Manufacturing', icon: Factory },
    { id: 'retail', name: 'Retail', icon: ShoppingCart },
  ];

  const jurisdictions = [
    { id: 'commonwealth', name: 'Commonwealth' },
    { id: 'queensland', name: 'Queensland' },
    { id: 'south_australia', name: 'South Australia' },
    { id: 'new_south_wales', name: 'New South Wales' },
  ];

  const activities: Record<string, string[]> = {
    healthcare: ['Patient Records', 'Clinical Trials', 'Health Data Sharing'],
    construction: ['Building Work', 'Workplace Safety', 'Contractor Licensing'],
    government: ['Procurement', 'Data Management', 'FOI Requests'],
    default: ['Data Management', 'Workplace Safety', 'Privacy Compliance'],
  };

  const handleGenerate = async () => {
    if (!industry || !jurisdiction || !activity) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/compliance/checklist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, jurisdiction, activity }),
      });
      const data = await response.json();
      setChecklist(data.checklist);
    } catch (error) {
      console.error('Compliance error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Checklists</h1>
      <p className="text-gray-600 mb-8">Generate industry-specific compliance requirements</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Select Industry</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {industries.map(ind => {
                const Icon = ind.icon;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setIndustry(ind.id)}
                    className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                      industry === ind.id
                        ? 'border-gavel-600 bg-gavel-50 text-gavel-700'
                        : 'border-gray-200 hover:border-gavel-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs">{ind.name}</span>
                  </button>
                );
              })}
            </div>

            <h3 className="font-semibold text-gray-900 mb-4">Jurisdiction</h3>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="input mb-6"
            >
              <option value="">Select jurisdiction...</option>
              {jurisdictions.map(j => (
                <option key={j.id} value={j.id}>{j.name}</option>
              ))}
            </select>

            <h3 className="font-semibold text-gray-900 mb-4">Activity</h3>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="input mb-6"
            >
              <option value="">Select activity...</option>
              {(activities[industry] || activities.default).map(a => (
                <option key={a} value={a.toLowerCase().replace(/ /g, '_')}>{a}</option>
              ))}
            </select>

            <button
              onClick={handleGenerate}
              disabled={!industry || !jurisdiction || !activity || loading}
              className="btn-primary w-full"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Checklist'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <LoadingSpinner message="Generating checklist..." />
          ) : checklist ? (
            <div className="card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900">Compliance Checklist</h3>
                <button className="text-gavel-600 hover:text-gavel-700 flex items-center text-sm">
                  <Download className="w-4 h-4 mr-1" /> Export
                </button>
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown>{checklist}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="card text-center text-gray-500 py-16">
              <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select industry, jurisdiction, and activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXPLAIN PAGE
// ============================================
function ExplainPage() {
  const [text, setText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const examples = [
    {
      title: 'APP 1 - Privacy Principles',
      text: 'An APP entity must take such steps as are reasonable in the circumstances to implement practices, procedures and systems relating to the entity\'s functions or activities that will ensure that the entity complies with the Australian Privacy Principles.',
    },
    {
      title: 'WHS Primary Duty',
      text: 'A person conducting a business or undertaking must ensure, so far as is reasonably practicable, the health and safety of workers engaged, or caused to be engaged by the person, while the workers are at work in the business or undertaking.',
    },
  ];

  const handleExplain = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setExplanation(data.plain_english);
    } catch (error) {
      console.error('Explain error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Plain Language Explainer</h1>
      <p className="text-gray-600 mb-8">Convert complex legal text into simple English</p>

      <div className="card mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Legal Text</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste legal text here..."
          className="input h-40 resize-none mb-4"
        />

        <div className="flex flex-wrap gap-2 mb-4">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setText(ex.text)}
              className="text-sm px-3 py-1 bg-gray-100 rounded-full hover:bg-gavel-100 text-gray-600 hover:text-gavel-700"
            >
              {ex.title}
            </button>
          ))}
        </div>

        <button
          onClick={handleExplain}
          disabled={!text || loading}
          className="btn-primary"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Explain in Plain English'}
        </button>
      </div>

      {explanation && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Plain English Explanation</h3>
              <div className="prose prose-sm max-w-none text-green-800">
                <ReactMarkdown>{explanation}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// TIMELINE PAGE
// ============================================
function TimelinePage() {
  const [docId, setDocId] = useState('privacy-act-1988-cth');
  const [timeline, setTimeline] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const documents = [
    { id: 'privacy-act-1988-cth', name: 'Privacy Act 1988 (Cth)' },
    { id: 'whs-act-2011-cth', name: 'Work Health and Safety Act 2011 (Cth)' },
  ];

  useEffect(() => {
    loadTimeline(docId);
  }, [docId]);

  const loadTimeline = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/timeline/${id}`);
      const data = await response.json();
      setTimeline(data);
    } catch (error) {
      console.error('Timeline error:', error);
    } finally {
      setLoading(false);
    }
  };

  const eventColors: Record<string, string> = {
    amendment: 'bg-blue-500',
    commencement: 'bg-green-500',
    repeal: 'bg-red-500',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Legislative Timeline</h1>
      <p className="text-gray-600 mb-8">View the evolution of legislation over time</p>

      <div className="card mb-6">
        <select
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
          className="input"
        >
          {documents.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading timeline..." />
      ) : timeline?.events?.length > 0 ? (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-6">{timeline.citation}</h3>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-6">
              {timeline.events.map((event: any, i: number) => (
                <div key={i} className="relative flex items-start pl-10">
                  <div className={`absolute left-2.5 w-3 h-3 rounded-full ${eventColors[event.type] || 'bg-gray-400'}`}></div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{event.date}</div>
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-gray-600 text-sm">{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-center text-gray-500 py-16">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No timeline data available</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// WORKSPACES PAGE
// ============================================
function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/workspaces`)
      .then(r => r.json())
      .then(setWorkspaces)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Workspaces</h1>
          <p className="text-gray-600">Organize and save your legal research</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" /> New Workspace
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading workspaces..." />
      ) : workspaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map(ws => (
            <div key={ws.id} className="card-hover">
              <div className="flex items-start justify-between mb-3">
                <Folder className="w-8 h-8 text-gavel-600" />
                <span className="badge-primary">{ws.document_count} docs</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{ws.name}</h3>
              <p className="text-gray-600 text-sm">{ws.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center text-gray-500 py-16">
          <Folder className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No workspaces yet</p>
          <p className="text-sm mt-2">Create a workspace to organize your research</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// ALERTS PAGE
// ============================================
function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/alerts`)
      .then(r => r.json())
      .then(setAlerts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legislation Alerts</h1>
          <p className="text-gray-600">Monitor changes to legislation that matters to you</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" /> New Alert
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading alerts..." />
      ) : alerts.length > 0 ? (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="card flex items-center justify-between">
              <div className="flex items-center">
                <Bell className={`w-5 h-5 mr-4 ${alert.is_active ? 'text-gavel-600' : 'text-gray-400'}`} />
                <div>
                  <h3 className="font-medium text-gray-900">{alert.name}</h3>
                  <p className="text-sm text-gray-500">
                    Query: {alert.query} | Jurisdictions: {alert.jurisdictions.join(', ')}
                  </p>
                  {alert.last_triggered && (
                    <p className="text-xs text-gray-400">Last triggered: {alert.last_triggered}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center text-gray-500 py-16">
          <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No alerts configured</p>
          <p className="text-sm mt-2">Create alerts to monitor legislation changes</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================
function App() {
  return (
    <BrowserRouter basename="/mvp/GAVEL">
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/explain" element={<ExplainPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/workspaces" element={<WorkspacesPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
