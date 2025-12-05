import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters?: { jurisdiction?: string; docType?: string }) => void;
  placeholder?: string;
  showFilters?: boolean;
}

const jurisdictions = [
  { id: '', name: 'All Jurisdictions' },
  { id: 'commonwealth', name: 'Commonwealth' },
  { id: 'new_south_wales', name: 'New South Wales' },
  { id: 'queensland', name: 'Queensland' },
  { id: 'south_australia', name: 'South Australia' },
  { id: 'western_australia', name: 'Western Australia' },
  { id: 'tasmania', name: 'Tasmania' },
];

const docTypes = [
  { id: '', name: 'All Types' },
  { id: 'primary_legislation', name: 'Primary Legislation' },
  { id: 'secondary_legislation', name: 'Secondary Legislation' },
  { id: 'decision', name: 'Court Decisions' },
];

export function SearchBar({ onSearch, placeholder = 'Search Australian legislation and caselaw...', showFilters = true }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [jurisdiction, setJurisdiction] = useState('');
  const [docType, setDocType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, { jurisdiction: jurisdiction || undefined, docType: docType || undefined });
    }
  };

  const clearFilters = () => {
    setJurisdiction('');
    setDocType('');
  };

  const hasFilters = jurisdiction || docType;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex-1 flex items-center">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-4 text-lg outline-none"
            />
          </div>

          {showFilters && (
            <button
              type="button"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`p-4 border-l transition-colors ${
                hasFilters ? 'bg-gavel-50 text-gavel-600' : 'hover:bg-gray-50 text-gray-500'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          )}

          <button
            type="submit"
            className="bg-gavel-600 text-white px-8 py-4 font-medium hover:bg-gavel-700 transition-colors"
          >
            Search
          </button>
        </div>

        {showFilters && showFilterPanel && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-900">Filters</span>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-gavel-600 hover:text-gavel-700 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear all
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction</label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="input"
                >
                  {jurisdictions.map(j => (
                    <option key={j.id} value={j.id}>{j.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="input"
                >
                  {docTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
