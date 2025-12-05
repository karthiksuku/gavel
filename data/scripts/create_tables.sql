-- ============================================================
-- GAVEL DATABASE SCHEMA
-- Oracle Autonomous Database
-- ============================================================

-- Main Documents Table
CREATE TABLE AIUSER.GAVEL_DOCUMENTS (
    id VARCHAR2(500) PRIMARY KEY,
    version_id VARCHAR2(500),
    citation VARCHAR2(1000),
    jurisdiction VARCHAR2(100),
    doc_type VARCHAR2(100),
    source VARCHAR2(200),
    doc_date DATE,
    url VARCHAR2(500),
    text CLOB,
    text_summary VARCHAR2(4000),
    embedding VECTOR(1024),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Conversations
CREATE TABLE AIUSER.GAVEL_CONVERSATIONS (
    id VARCHAR2(100) PRIMARY KEY,
    session_id VARCHAR2(100),
    user_message CLOB,
    assistant_message CLOB,
    citations CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Research Workspaces
CREATE TABLE AIUSER.GAVEL_WORKSPACES (
    id VARCHAR2(100) PRIMARY KEY,
    name VARCHAR2(200),
    description VARCHAR2(1000),
    documents CLOB,
    notes CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Alerts
CREATE TABLE AIUSER.GAVEL_ALERTS (
    id VARCHAR2(100) PRIMARY KEY,
    name VARCHAR2(200),
    query VARCHAR2(500),
    jurisdictions VARCHAR2(200),
    doc_types VARCHAR2(200),
    is_active NUMBER(1) DEFAULT 1,
    last_triggered TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Compliance Checklists
CREATE TABLE AIUSER.GAVEL_CHECKLISTS (
    id VARCHAR2(100) PRIMARY KEY,
    title VARCHAR2(200),
    industry VARCHAR2(100),
    jurisdiction VARCHAR2(100),
    items CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_gavel_jurisdiction ON AIUSER.GAVEL_DOCUMENTS(jurisdiction);
CREATE INDEX idx_gavel_type ON AIUSER.GAVEL_DOCUMENTS(doc_type);
CREATE INDEX idx_gavel_date ON AIUSER.GAVEL_DOCUMENTS(doc_date);
CREATE INDEX idx_gavel_citation ON AIUSER.GAVEL_DOCUMENTS(citation);

-- Full-text search index
CREATE INDEX idx_gavel_text ON AIUSER.GAVEL_DOCUMENTS(text)
INDEXTYPE IS CTXSYS.CONTEXT;
