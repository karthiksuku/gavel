from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional
from app.services.llm import generate_compliance_checklist
import uuid

router = APIRouter()

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

@router.post("/compliance/checklist", response_model=ChecklistResponse)
async def create_checklist(request: ChecklistRequest):
    """
    Generate a compliance checklist based on industry, jurisdiction, and activity.

    **Industries:**
    - healthcare
    - construction
    - finance
    - retail
    - government
    - education

    **Activities:**
    - data_management
    - patient_records
    - building_work
    - workplace_safety
    - procurement
    """
    result = generate_compliance_checklist(
        request.industry,
        request.jurisdiction,
        request.activity
    )

    return ChecklistResponse(
        id=str(uuid.uuid4()),
        industry=result["industry"],
        jurisdiction=result["jurisdiction"],
        activity=result["activity"],
        checklist=result["checklist"],
        model=result["model"]
    )

@router.get("/compliance/industries")
async def get_industries():
    """Get available industries for checklist generation"""
    return {
        "industries": [
            {"id": "healthcare", "name": "Healthcare", "icon": "hospital"},
            {"id": "construction", "name": "Construction", "icon": "building"},
            {"id": "finance", "name": "Finance", "icon": "bank"},
            {"id": "government", "name": "Government", "icon": "landmark"},
            {"id": "retail", "name": "Retail", "icon": "shopping-cart"},
            {"id": "education", "name": "Education", "icon": "graduation-cap"},
            {"id": "manufacturing", "name": "Manufacturing", "icon": "factory"},
            {"id": "technology", "name": "Technology", "icon": "computer"}
        ]
    }

@router.get("/compliance/activities")
async def get_activities(industry: Optional[str] = None):
    """Get available activities for an industry"""
    activities = {
        "healthcare": [
            {"id": "patient_records", "name": "Patient Records Management"},
            {"id": "clinical_trials", "name": "Clinical Trials"},
            {"id": "medical_devices", "name": "Medical Devices"},
            {"id": "health_data", "name": "Health Data Sharing"},
            {"id": "telehealth", "name": "Telehealth Services"}
        ],
        "construction": [
            {"id": "building_work", "name": "Building Work"},
            {"id": "workplace_safety", "name": "Workplace Safety"},
            {"id": "environmental", "name": "Environmental Compliance"},
            {"id": "licensing", "name": "Contractor Licensing"},
            {"id": "planning", "name": "Planning & Development"}
        ],
        "finance": [
            {"id": "data_management", "name": "Data Management"},
            {"id": "anti_money_laundering", "name": "Anti-Money Laundering"},
            {"id": "consumer_credit", "name": "Consumer Credit"},
            {"id": "financial_advice", "name": "Financial Advice"}
        ],
        "government": [
            {"id": "procurement", "name": "Procurement"},
            {"id": "data_management", "name": "Data Management"},
            {"id": "privacy", "name": "Privacy Compliance"},
            {"id": "foi", "name": "Freedom of Information"}
        ],
        "default": [
            {"id": "data_management", "name": "Data Management"},
            {"id": "workplace_safety", "name": "Workplace Safety"},
            {"id": "privacy", "name": "Privacy Compliance"},
            {"id": "procurement", "name": "Procurement"},
            {"id": "employment", "name": "Employment Practices"}
        ]
    }

    return {"activities": activities.get(industry, activities["default"])}

@router.get("/compliance/jurisdictions")
async def get_compliance_jurisdictions():
    """Get available jurisdictions for compliance checklists"""
    return {
        "jurisdictions": [
            {"id": "commonwealth", "name": "Commonwealth (Federal)"},
            {"id": "queensland", "name": "Queensland"},
            {"id": "south_australia", "name": "South Australia"},
            {"id": "new_south_wales", "name": "New South Wales"},
            {"id": "western_australia", "name": "Western Australia"},
            {"id": "tasmania", "name": "Tasmania"}
        ]
    }
