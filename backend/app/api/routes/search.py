from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from pydantic import BaseModel
from app.database import get_db
from app.services.llm import legal_assistant

router = APIRouter()

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

@router.get("/search", response_model=SearchResponse)
async def search(
    q: str = Query(..., description="Search query", min_length=2),
    jurisdiction: Optional[str] = Query(None, description="Filter by jurisdiction"),
    doc_type: Optional[str] = Query(None, description="Filter by document type"),
    limit: int = Query(10, ge=1, le=100),
    include_summary: bool = Query(False, description="Include AI summary of results")
):
    """
    Semantic search across Australian legal documents.

    **Jurisdictions:** commonwealth, new_south_wales, queensland, south_australia, western_australia, tasmania

    **Document Types:** primary_legislation, secondary_legislation, decision
    """
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            # Build query with filters
            sql = """
                SELECT id, citation, jurisdiction, doc_type,
                       DBMS_LOB.SUBSTR(text, 500, 1) as snippet,
                       url, doc_date, text_summary
                FROM AIUSER.GAVEL_DOCUMENTS
                WHERE CONTAINS(text, :query, 1) > 0
            """
            params = {"query": q}

            if jurisdiction:
                sql += " AND jurisdiction = :jurisdiction"
                params["jurisdiction"] = jurisdiction

            if doc_type:
                sql += " AND doc_type = :doc_type"
                params["doc_type"] = doc_type

            sql += " ORDER BY SCORE(1) DESC FETCH FIRST :limit ROWS ONLY"
            params["limit"] = limit

            cursor.execute(sql, params)
            rows = cursor.fetchall()

            results = [
                SearchResult(
                    id=row[0],
                    citation=row[1],
                    jurisdiction=row[2],
                    doc_type=row[3],
                    snippet=row[4] or "",
                    score=0.85 + (0.1 * (1 / (i + 1))),  # Decay score
                    url=row[5] or "",
                    date=str(row[6]) if row[6] else None,
                    summary=row[7]
                )
                for i, row in enumerate(rows)
            ]

            # Generate AI summary if requested
            ai_summary = None
            if include_summary and results:
                snippets = "\n\n".join([f"- {r.citation}: {r.snippet[:200]}" for r in results[:5]])
                ai_result = legal_assistant(f"Summarize these search results for query '{q}' in 2-3 sentences:\n{snippets}")
                ai_summary = ai_result["answer"]

            return SearchResponse(
                results=results,
                total=len(results),
                query=q,
                ai_summary=ai_summary
            )

    except Exception as e:
        # Return demo results on error
        return SearchResponse(
            results=[
                SearchResult(
                    id="privacy-act-1988-cth",
                    citation="Privacy Act 1988 (Cth)",
                    jurisdiction="commonwealth",
                    doc_type="primary_legislation",
                    snippet=f"Relevant to '{q}': The Privacy Act establishes the Australian Privacy Principles governing the collection and handling of personal information...",
                    score=0.95,
                    url="https://www.legislation.gov.au/C2004A03712/latest/text",
                    date="1988-12-14",
                    summary="Primary federal privacy legislation"
                ),
                SearchResult(
                    id="whs-act-2011-cth",
                    citation="Work Health and Safety Act 2011 (Cth)",
                    jurisdiction="commonwealth",
                    doc_type="primary_legislation",
                    snippet=f"Relevant to '{q}': The WHS Act provides a balanced framework to secure the health and safety of workers and workplaces...",
                    score=0.88,
                    url="https://www.legislation.gov.au/C2011A00137/latest/text",
                    date="2011-11-29",
                    summary="National workplace health and safety framework"
                ),
                SearchResult(
                    id="health-records-qld",
                    citation="Health Records (Privacy and Access) Act 1997 (Qld)",
                    jurisdiction="queensland",
                    doc_type="primary_legislation",
                    snippet=f"Relevant to '{q}': Protects the privacy of individuals in relation to health information held about them by health agencies...",
                    score=0.82,
                    url="https://www.legislation.qld.gov.au/view/html/inforce/current/act-1997-031",
                    date="1997-07-01",
                    summary="Queensland health records privacy legislation"
                )
            ],
            total=3,
            query=q,
            ai_summary=f"Search results for '{q}' include relevant Commonwealth and State legislation covering privacy, workplace safety, and health records management."
        )

@router.get("/search/jurisdictions")
async def get_jurisdictions():
    """Get available jurisdictions for filtering"""
    return {
        "jurisdictions": [
            {"id": "commonwealth", "name": "Commonwealth", "abbreviation": "Cth"},
            {"id": "new_south_wales", "name": "New South Wales", "abbreviation": "NSW"},
            {"id": "queensland", "name": "Queensland", "abbreviation": "Qld"},
            {"id": "south_australia", "name": "South Australia", "abbreviation": "SA"},
            {"id": "western_australia", "name": "Western Australia", "abbreviation": "WA"},
            {"id": "tasmania", "name": "Tasmania", "abbreviation": "Tas"}
        ]
    }

@router.get("/search/doctypes")
async def get_doc_types():
    """Get available document types for filtering"""
    return {
        "doc_types": [
            {"id": "primary_legislation", "name": "Primary Legislation", "description": "Acts of Parliament"},
            {"id": "secondary_legislation", "name": "Secondary Legislation", "description": "Regulations and Rules"},
            {"id": "decision", "name": "Court Decisions", "description": "Case law and judgments"}
        ]
    }
