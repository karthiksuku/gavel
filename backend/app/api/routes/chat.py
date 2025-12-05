from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.llm import legal_assistant
from app.database import get_db
import uuid
from datetime import datetime

router = APIRouter()

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

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    AI Legal Research Assistant - Ask questions about Australian law in plain English.

    **Example Questions:**
    - "What are the privacy requirements for health records in Queensland?"
    - "What are the penalties under the WHS Act?"
    - "Compare privacy laws between Commonwealth and NSW"
    """
    session_id = request.session_id or str(uuid.uuid4())

    # Get relevant context from database
    context = None
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT citation, text_summary
                FROM AIUSER.GAVEL_DOCUMENTS
                WHERE CONTAINS(text, :query, 1) > 0
                ORDER BY SCORE(1) DESC
                FETCH FIRST 3 ROWS ONLY
            """, {"query": request.message})
            rows = cursor.fetchall()
            if rows:
                context = "\n".join([f"{row[0]}: {row[1]}" for row in rows if row[1]])
    except:
        pass

    # Get AI response
    result = legal_assistant(request.message, context)

    # Generate suggested follow-up questions
    suggested = [
        f"What are the penalties for non-compliance?",
        f"How does this apply in other states?",
        f"Are there any recent amendments?"
    ]

    response_message = ChatMessage(
        role="assistant",
        content=result["answer"],
        citations=None,
        timestamp=datetime.now().isoformat()
    )

    # Save to database
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO AIUSER.GAVEL_CONVERSATIONS (id, session_id, user_message, assistant_message, created_at)
                VALUES (:id, :session_id, :user_msg, :assist_msg, CURRENT_TIMESTAMP)
            """, {
                "id": str(uuid.uuid4()),
                "session_id": session_id,
                "user_msg": request.message,
                "assist_msg": result["answer"]
            })
            conn.commit()
    except:
        pass

    return ChatResponse(
        session_id=session_id,
        message=response_message,
        suggested_questions=suggested,
        disclaimer="This is AI-generated legal information, not legal advice. Always verify with official sources and consult a qualified legal professional."
    )

@router.get("/chat/suggested")
async def get_suggested_questions():
    """Get suggested questions for the chat interface"""
    return {
        "questions": [
            "What are the privacy requirements for health records in Queensland?",
            "Explain the Work Health and Safety Act duties for employers",
            "What are the building contractor licensing requirements in SA?",
            "Compare privacy legislation between Commonwealth and States",
            "What are the penalties under the Privacy Act 1988?",
            "Explain the Notifiable Data Breaches scheme"
        ]
    }

@router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT user_message, assistant_message, created_at
                FROM AIUSER.GAVEL_CONVERSATIONS
                WHERE session_id = :session_id
                ORDER BY created_at ASC
            """, {"session_id": session_id})
            rows = cursor.fetchall()

            messages = []
            for row in rows:
                messages.append(ChatMessage(role="user", content=row[0], timestamp=str(row[2])))
                messages.append(ChatMessage(role="assistant", content=row[1], timestamp=str(row[2])))

            return {"session_id": session_id, "messages": messages}
    except:
        return {"session_id": session_id, "messages": []}
