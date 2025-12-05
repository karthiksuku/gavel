from fastapi import APIRouter, Query
from typing import List, Optional
from pydantic import BaseModel
from app.database import get_db

router = APIRouter()

class TimelineEvent(BaseModel):
    date: str
    title: str
    description: str
    type: str  # "amendment", "commencement", "repeal"

class TimelineResponse(BaseModel):
    citation: str
    events: List[TimelineEvent]

@router.get("/timeline/{doc_id}", response_model=TimelineResponse)
async def get_timeline(doc_id: str):
    """
    Get the legislative history/timeline for a document.

    Shows amendments, commencement dates, and significant changes over time.
    """
    # Demo timeline for Privacy Act
    if "privacy" in doc_id.lower():
        return TimelineResponse(
            citation="Privacy Act 1988 (Cth)",
            events=[
                TimelineEvent(date="2024-01-01", title="Privacy Legislation Amendment", description="New penalties up to $50M for serious breaches", type="amendment"),
                TimelineEvent(date="2022-12-01", title="Privacy Legislation Amendment Act 2022", description="Enhanced enforcement powers and penalties", type="amendment"),
                TimelineEvent(date="2018-02-22", title="Notifiable Data Breaches Scheme", description="Mandatory data breach notification commenced", type="commencement"),
                TimelineEvent(date="2014-03-12", title="Privacy Amendment Act 2012", description="Australian Privacy Principles (APPs) replaced NPPs/IPPs", type="amendment"),
                TimelineEvent(date="1988-12-14", title="Original Act Commenced", description="Privacy Act 1988 received Royal Assent", type="commencement")
            ]
        )

    # Demo timeline for WHS Act
    if "whs" in doc_id.lower():
        return TimelineResponse(
            citation="Work Health and Safety Act 2011 (Cth)",
            events=[
                TimelineEvent(date="2023-09-01", title="Psychosocial Hazards Amendment", description="New duties for managing psychosocial risks", type="amendment"),
                TimelineEvent(date="2022-07-01", title="Industrial Manslaughter", description="Industrial manslaughter offence introduced", type="amendment"),
                TimelineEvent(date="2017-11-01", title="Model WHS Regulations Update", description="Updated hazardous chemicals requirements", type="amendment"),
                TimelineEvent(date="2012-01-01", title="National Harmonisation", description="WHS Act commenced nationally", type="commencement"),
                TimelineEvent(date="2011-11-29", title="Royal Assent", description="Work Health and Safety Act 2011 passed", type="commencement")
            ]
        )

    return TimelineResponse(citation=doc_id, events=[])

@router.get("/timeline/search")
async def search_timeline(
    q: str = Query(..., description="Search query"),
    jurisdiction: Optional[str] = None
):
    """Search for legislative timeline by keyword"""
    # Return demo results
    return {
        "query": q,
        "results": [
            {
                "doc_id": "privacy-act-1988-cth",
                "citation": "Privacy Act 1988 (Cth)",
                "jurisdiction": "commonwealth",
                "event_count": 5
            },
            {
                "doc_id": "whs-act-2011-cth",
                "citation": "Work Health and Safety Act 2011 (Cth)",
                "jurisdiction": "commonwealth",
                "event_count": 5
            }
        ]
    }
