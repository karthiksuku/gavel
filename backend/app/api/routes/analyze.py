from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List
from pydantic import BaseModel
from app.services.llm import analyze_document
import aiofiles

router = APIRouter()

class AnalysisResult(BaseModel):
    filename: str
    analysis_types: List[str]
    results: str
    model: str

@router.post("/analyze", response_model=AnalysisResult)
async def analyze(
    file: UploadFile = File(...),
    analysis_types: str = Form("compliance,risks,recommendations")
):
    """
    Analyze uploaded document for compliance, risks, and recommendations.

    **Supported Formats:** PDF, DOCX, TXT

    **Analysis Types:**
    - compliance: Check against relevant legislation
    - risks: Identify legal risks
    - recommendations: Suggest improvements
    - missing_clauses: Identify missing required clauses
    """
    # Read file content
    content = await file.read()

    # Extract text (simplified - in production use proper PDF/DOCX parsing)
    try:
        text = content.decode('utf-8')
    except:
        text = content.decode('latin-1', errors='ignore')

    # Parse analysis types
    types = [t.strip() for t in analysis_types.split(",")]

    # Analyze
    result = analyze_document(text, types)

    return AnalysisResult(
        filename=file.filename,
        analysis_types=types,
        results=result["results"],
        model=result["model"]
    )

@router.post("/analyze/text")
async def analyze_text(
    text: str = Form(...),
    analysis_types: str = Form("compliance,risks,recommendations")
):
    """Analyze pasted text content"""
    types = [t.strip() for t in analysis_types.split(",")]
    result = analyze_document(text, types)

    return {
        "analysis_types": types,
        "results": result["results"],
        "model": result["model"]
    }

@router.get("/analyze/types")
async def get_analysis_types():
    """Get available analysis types"""
    return {
        "types": [
            {"id": "compliance", "name": "Compliance Check", "description": "Check against relevant legislation"},
            {"id": "risks", "name": "Risk Assessment", "description": "Identify legal risks and issues"},
            {"id": "recommendations", "name": "Recommendations", "description": "Suggest improvements"},
            {"id": "missing_clauses", "name": "Missing Clauses", "description": "Identify missing required clauses"},
            {"id": "privacy", "name": "Privacy Assessment", "description": "Check privacy compliance"},
            {"id": "whs", "name": "WHS Assessment", "description": "Workplace health and safety review"}
        ]
    }
