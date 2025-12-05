from fastapi import APIRouter, Query
from typing import List
from pydantic import BaseModel
from app.services.llm import compare_jurisdictions

router = APIRouter()

class CompareRequest(BaseModel):
    topic: str
    jurisdictions: List[str]

class CompareResponse(BaseModel):
    topic: str
    jurisdictions: List[str]
    comparison: str
    model: str

@router.post("/compare", response_model=CompareResponse)
async def compare(request: CompareRequest):
    """
    Compare how different Australian jurisdictions handle a legal topic.

    **Available Jurisdictions:**
    - commonwealth
    - new_south_wales
    - queensland
    - south_australia
    - western_australia
    - tasmania

    **Example Topics:**
    - "Work Health and Safety"
    - "Privacy and Data Protection"
    - "Building Regulations"
    """
    result = compare_jurisdictions(request.topic, request.jurisdictions)

    return CompareResponse(
        topic=result["topic"],
        jurisdictions=result["jurisdictions"],
        comparison=result["comparison"],
        model=result["model"]
    )

@router.get("/compare/topics")
async def get_compare_topics():
    """Get suggested comparison topics"""
    return {
        "topics": [
            {"id": "whs", "name": "Work Health & Safety", "description": "Workplace safety laws and requirements"},
            {"id": "privacy", "name": "Privacy & Data Protection", "description": "Personal information handling"},
            {"id": "building", "name": "Building & Construction", "description": "Licensing and regulations"},
            {"id": "employment", "name": "Employment Law", "description": "Worker rights and entitlements"},
            {"id": "environmental", "name": "Environmental Protection", "description": "Environmental regulations"},
            {"id": "consumer", "name": "Consumer Protection", "description": "Consumer rights laws"}
        ]
    }

@router.get("/compare/jurisdictions")
async def get_compare_jurisdictions():
    """Get available jurisdictions for comparison"""
    return {
        "jurisdictions": [
            {"id": "commonwealth", "name": "Commonwealth", "flag": "au"},
            {"id": "new_south_wales", "name": "New South Wales", "abbreviation": "NSW"},
            {"id": "queensland", "name": "Queensland", "abbreviation": "QLD"},
            {"id": "south_australia", "name": "South Australia", "abbreviation": "SA"},
            {"id": "western_australia", "name": "Western Australia", "abbreviation": "WA"},
            {"id": "tasmania", "name": "Tasmania", "abbreviation": "TAS"}
        ]
    }
