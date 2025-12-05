from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.api.routes import search, chat, compare, analyze, compliance, explain, timeline, workspace, alerts, stats

settings = get_settings()

app = FastAPI(
    title="Gavel API",
    description="""
# Gavel - Australian Legal Intelligence Platform

AI-powered legal research across Australian legislation and caselaw.

## Features
- **Semantic Search** - Search 147K+ legal documents
- **AI Legal Assistant** - Ask questions in plain English
- **Jurisdiction Comparison** - Compare laws across states
- **Document Analysis** - Upload documents for compliance review
- **Compliance Checklists** - Generate industry-specific requirements
- **Plain Language** - Convert legalese to simple English

## Coverage
Commonwealth, NSW, Queensland, South Australia, Western Australia, Tasmania

## Powered By
Oracle Autonomous Database + Grok-4 AI
    """,
    version=settings.app_version,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(search.router, prefix="/api", tags=["Search"])
app.include_router(chat.router, prefix="/api", tags=["AI Assistant"])
app.include_router(compare.router, prefix="/api", tags=["Jurisdiction Comparison"])
app.include_router(analyze.router, prefix="/api", tags=["Document Analysis"])
app.include_router(compliance.router, prefix="/api", tags=["Compliance"])
app.include_router(explain.router, prefix="/api", tags=["Plain Language"])
app.include_router(timeline.router, prefix="/api", tags=["Legislative Timeline"])
app.include_router(workspace.router, prefix="/api", tags=["Workspaces"])
app.include_router(alerts.router, prefix="/api", tags=["Alerts"])
app.include_router(stats.router, prefix="/api", tags=["Statistics"])

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "gavel",
        "version": settings.app_version,
        "model": settings.genai_model,
        "database": "oracle_adb"
    }

@app.get("/")
async def root():
    return {
        "name": "Gavel API",
        "tagline": "Australian Legal Intelligence",
        "version": settings.app_version,
        "features": [
            "Semantic Search",
            "AI Legal Assistant",
            "Jurisdiction Comparison",
            "Document Analysis",
            "Compliance Checklists",
            "Plain Language Explainer"
        ],
        "docs": "/api/docs",
        "model": settings.genai_model
    }
