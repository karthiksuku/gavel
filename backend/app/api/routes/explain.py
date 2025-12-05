from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm import explain_plain_language

router = APIRouter()

class ExplainRequest(BaseModel):
    text: str

class ExplainResponse(BaseModel):
    original: str
    plain_english: str
    model: str

@router.post("/explain", response_model=ExplainResponse)
async def explain(request: ExplainRequest):
    """
    Convert complex legal text into plain, easy-to-understand English.

    **Usage:**
    Paste any legal text (from legislation, contracts, regulations) and
    get a simple explanation anyone can understand.
    """
    result = explain_plain_language(request.text)

    return ExplainResponse(
        original=result["original"],
        plain_english=result["plain_english"],
        model=result["model"]
    )

@router.get("/explain/examples")
async def get_examples():
    """Get example legal texts for plain language explanation"""
    return {
        "examples": [
            {
                "id": "privacy_app1",
                "title": "APP 1 - Open and transparent management",
                "text": "An APP entity must take such steps as are reasonable in the circumstances to implement practices, procedures and systems relating to the entity's functions or activities that will ensure that the entity complies with the Australian Privacy Principles."
            },
            {
                "id": "whs_duty",
                "title": "WHS Primary Duty of Care",
                "text": "A person conducting a business or undertaking must ensure, so far as is reasonably practicable, the health and safety of workers engaged, or caused to be engaged by the person, and workers whose activities in carrying out work are influenced or directed by the person, while the workers are at work in the business or undertaking."
            },
            {
                "id": "contract_indemnity",
                "title": "Standard Indemnity Clause",
                "text": "The Contractor shall indemnify and keep indemnified the Principal from and against all claims, demands, losses, costs, damages and expenses arising out of or in connection with the execution of the Works or arising from any breach of the Contractor's obligations under this Contract."
            }
        ]
    }
