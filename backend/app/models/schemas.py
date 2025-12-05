from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Search Models
class SearchResult(BaseModel):
    id: str
    citation: str
    jurisdiction: str
    doc_type: str
    snippet: str
    score: float
    url: str
    date: Optional[str] = None
    summary: Optional[str] = None

class SearchResponse(BaseModel):
    results: List[SearchResult]
    total: int
    query: str
    ai_summary: Optional[str] = None

# Chat Models
class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    citations: Optional[List[str]] = None
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    include_sources: bool = True

class ChatResponse(BaseModel):
    session_id: str
    message: ChatMessage
    suggested_questions: List[str]
    disclaimer: str

# Compare Models
class CompareRequest(BaseModel):
    topic: str
    jurisdictions: List[str]

class CompareResponse(BaseModel):
    topic: str
    jurisdictions: List[str]
    comparison: str
    model: str

# Analyze Models
class AnalysisResult(BaseModel):
    filename: str
    analysis_types: List[str]
    results: str
    model: str

# Compliance Models
class ChecklistRequest(BaseModel):
    industry: str
    jurisdiction: str
    activity: str

class ChecklistResponse(BaseModel):
    id: str
    industry: str
    jurisdiction: str
    activity: str
    checklist: str
    model: str

# Explain Models
class ExplainRequest(BaseModel):
    text: str

class ExplainResponse(BaseModel):
    original: str
    plain_english: str
    model: str

# Timeline Models
class TimelineEvent(BaseModel):
    date: str
    title: str
    description: str
    type: str  # "amendment", "commencement", "repeal"

class TimelineResponse(BaseModel):
    citation: str
    events: List[TimelineEvent]

# Workspace Models
class Workspace(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    document_count: int = 0
    created_at: Optional[str] = None

class WorkspaceDetail(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    documents: List[dict]
    notes: Optional[str] = None

class CreateWorkspaceRequest(BaseModel):
    name: str
    description: Optional[str] = None

# Alert Models
class Alert(BaseModel):
    id: str
    name: str
    query: str
    jurisdictions: List[str]
    is_active: bool = True
    last_triggered: Optional[str] = None

class CreateAlertRequest(BaseModel):
    name: str
    query: str
    jurisdictions: List[str]
