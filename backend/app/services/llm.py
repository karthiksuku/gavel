from openai import OpenAI
from app.config import get_settings
from typing import List, Dict, Optional
import json

settings = get_settings()

# Initialize Grok-4 client
client = OpenAI(
    base_url=settings.genai_base_url,
    api_key=settings.genai_api_key
)

def chat_completion(messages: list, temperature: float = 0.7, max_tokens: int = 2000) -> str:
    """Generate chat completion using Grok-4"""
    response = client.chat.completions.create(
        model=settings.genai_model,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens
    )
    return response.choices[0].message.content

def legal_assistant(query: str, context: Optional[str] = None) -> Dict:
    """AI Legal Research Assistant"""
    system_prompt = """You are Gavel, an expert Australian legal research assistant powered by Grok-4.

Your expertise covers:
- Commonwealth legislation and regulations
- State legislation (NSW, QLD, SA, WA, TAS)
- Federal and State court decisions
- Australian Privacy Principles (APPs)
- Work Health & Safety laws
- Building and construction regulations

Guidelines:
1. Always cite specific Acts, Sections, or Cases
2. Use proper legal citation format (e.g., "Privacy Act 1988 (Cth) s 13B")
3. Be accurate - if unsure, say so
4. Provide practical, actionable information
5. Note jurisdiction differences when relevant
6. Include relevant case law where applicable

Format your response with:
- Clear headings for complex answers
- Bullet points for lists
- Citation references in [brackets]
- A "Sources" section at the end"""

    messages = [{"role": "system", "content": system_prompt}]

    if context:
        messages.append({"role": "system", "content": f"Relevant legal context:\n{context}"})

    messages.append({"role": "user", "content": query})

    response = chat_completion(messages, temperature=0.3)

    return {
        "answer": response,
        "model": settings.genai_model,
        "query": query
    }

def explain_plain_language(legal_text: str) -> Dict:
    """Convert legalese to plain English"""
    messages = [
        {
            "role": "system",
            "content": """You are a legal plain language expert. Convert complex legal text into simple,
easy-to-understand English that anyone can understand.

Guidelines:
1. Use simple everyday words
2. Break down complex concepts
3. Give practical examples
4. Maintain accuracy while simplifying
5. Highlight key obligations or rights
6. Use bullet points for clarity"""
        },
        {
            "role": "user",
            "content": f"Please explain this legal text in plain English:\n\n{legal_text}"
        }
    ]

    response = chat_completion(messages, temperature=0.5)

    return {
        "original": legal_text,
        "plain_english": response,
        "model": settings.genai_model
    }

def compare_jurisdictions(topic: str, jurisdictions: List[str]) -> Dict:
    """Compare how different jurisdictions handle a legal topic"""
    jur_list = ", ".join(jurisdictions)

    messages = [
        {
            "role": "system",
            "content": """You are an expert in Australian comparative law. Compare how different
Australian jurisdictions handle legal topics.

For each jurisdiction, provide:
1. Relevant legislation name and citation
2. Key provisions
3. Notable differences from other jurisdictions
4. Recent amendments

Format as a structured comparison table in markdown."""
        },
        {
            "role": "user",
            "content": f"Compare how these jurisdictions handle '{topic}': {jur_list}"
        }
    ]

    response = chat_completion(messages, temperature=0.3, max_tokens=3000)

    return {
        "topic": topic,
        "jurisdictions": jurisdictions,
        "comparison": response,
        "model": settings.genai_model
    }

def analyze_document(text: str, analysis_type: List[str]) -> Dict:
    """Analyze uploaded document for compliance, risks, etc."""
    analysis_request = ", ".join(analysis_type)

    messages = [
        {
            "role": "system",
            "content": """You are an Australian legal document analyst. Analyze documents for:
- Compliance with relevant legislation
- Legal risks and issues
- Missing clauses or requirements
- Recommendations for improvement

Be specific about which Acts and Sections are relevant.
Use clear categories: COMPLIANCE ALERTS, RELEVANT LEGISLATION, RECOMMENDATIONS."""
        },
        {
            "role": "user",
            "content": f"Analyze this document for: {analysis_request}\n\nDocument:\n{text[:8000]}"
        }
    ]

    response = chat_completion(messages, temperature=0.3, max_tokens=3000)

    return {
        "analysis_types": analysis_type,
        "results": response,
        "model": settings.genai_model
    }

def generate_compliance_checklist(industry: str, jurisdiction: str, activity: str) -> Dict:
    """Generate compliance checklist for specific industry/activity"""
    messages = [
        {
            "role": "system",
            "content": """You are an Australian compliance expert. Generate detailed compliance
checklists based on industry, jurisdiction, and activity type.

For each requirement:
1. Cite the specific Act and Section
2. Describe the obligation clearly
3. Mark priority (High/Medium/Low)
4. Note any deadlines or timeframes

Format as a structured checklist with categories."""
        },
        {
            "role": "user",
            "content": f"""Generate a compliance checklist for:
Industry: {industry}
Jurisdiction: {jurisdiction}
Activity: {activity}

Include all relevant Commonwealth and State requirements."""
        }
    ]

    response = chat_completion(messages, temperature=0.3, max_tokens=3000)

    return {
        "industry": industry,
        "jurisdiction": jurisdiction,
        "activity": activity,
        "checklist": response,
        "model": settings.genai_model
    }

def summarize_legislation(text: str) -> str:
    """Generate a summary of legislation"""
    messages = [
        {
            "role": "system",
            "content": "Summarize this Australian legislation concisely, highlighting key provisions and obligations."
        },
        {"role": "user", "content": text[:6000]}
    ]
    return chat_completion(messages, temperature=0.3, max_tokens=500)
