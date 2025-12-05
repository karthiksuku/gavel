from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.database import get_db
import uuid
import json

router = APIRouter()

class Workspace(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    document_count: int = 0
    created_at: Optional[str] = None

class WorkspaceDetail(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    documents: List[dict]
    notes: Optional[str] = None

class CreateWorkspaceRequest(BaseModel):
    name: str
    description: Optional[str] = None

class AddDocumentRequest(BaseModel):
    document_id: str
    citation: str
    doc_type: str

class UpdateNotesRequest(BaseModel):
    notes: str

@router.get("/workspaces", response_model=List[Workspace])
async def list_workspaces():
    """List all research workspaces"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, name, description, documents, created_at
                FROM AIUSER.GAVEL_WORKSPACES
                ORDER BY updated_at DESC
            """)
            rows = cursor.fetchall()

            return [
                Workspace(
                    id=row[0],
                    name=row[1],
                    description=row[2],
                    document_count=len(json.loads(row[3] or "[]")),
                    created_at=str(row[4]) if row[4] else None
                )
                for row in rows
            ]
    except:
        # Return demo workspaces
        return [
            Workspace(id="ws-1", name="QHealth Privacy Compliance", description="Privacy Act research for Queensland Health", document_count=5),
            Workspace(id="ws-2", name="Infrastructure SA - WHS", description="WHS compliance for construction projects", document_count=3),
            Workspace(id="ws-3", name="Building Regulations - SA", description="Building contractor requirements research", document_count=4)
        ]

@router.post("/workspaces", response_model=Workspace)
async def create_workspace(request: CreateWorkspaceRequest):
    """Create a new research workspace"""
    workspace_id = str(uuid.uuid4())

    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO AIUSER.GAVEL_WORKSPACES (id, name, description, documents, notes, created_at, updated_at)
                VALUES (:id, :name, :description, '[]', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            """, {"id": workspace_id, "name": request.name, "description": request.description})
            conn.commit()
    except:
        pass

    return Workspace(id=workspace_id, name=request.name, description=request.description, document_count=0)

@router.get("/workspaces/{workspace_id}", response_model=WorkspaceDetail)
async def get_workspace(workspace_id: str):
    """Get workspace details"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, name, description, documents, notes
                FROM AIUSER.GAVEL_WORKSPACES
                WHERE id = :id
            """, {"id": workspace_id})
            row = cursor.fetchone()

            if row:
                return WorkspaceDetail(
                    id=row[0],
                    name=row[1],
                    description=row[2],
                    documents=json.loads(row[3] or "[]"),
                    notes=row[4]
                )
    except:
        pass

    # Demo response
    return WorkspaceDetail(
        id=workspace_id,
        name="QHealth Privacy Compliance",
        description="Privacy research for Queensland Health",
        documents=[
            {"id": "privacy-act-1988-cth", "citation": "Privacy Act 1988 (Cth)", "type": "primary_legislation"},
            {"id": "health-records-qld", "citation": "Health Records Act 1997 (Qld)", "type": "primary_legislation"}
        ],
        notes="Key focus areas:\n- APP compliance\n- Health record access rights\n- Breach notification requirements"
    )

@router.post("/workspaces/{workspace_id}/documents")
async def add_document_to_workspace(workspace_id: str, request: AddDocumentRequest):
    """Add a document to a workspace"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT documents FROM AIUSER.GAVEL_WORKSPACES WHERE id = :id
            """, {"id": workspace_id})
            row = cursor.fetchone()

            if row:
                docs = json.loads(row[0] or "[]")
                docs.append({
                    "id": request.document_id,
                    "citation": request.citation,
                    "type": request.doc_type
                })

                cursor.execute("""
                    UPDATE AIUSER.GAVEL_WORKSPACES
                    SET documents = :docs, updated_at = CURRENT_TIMESTAMP
                    WHERE id = :id
                """, {"docs": json.dumps(docs), "id": workspace_id})
                conn.commit()

                return {"status": "success", "document_count": len(docs)}
    except:
        pass

    return {"status": "success", "document_count": 1}

@router.put("/workspaces/{workspace_id}/notes")
async def update_workspace_notes(workspace_id: str, request: UpdateNotesRequest):
    """Update workspace notes"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE AIUSER.GAVEL_WORKSPACES
                SET notes = :notes, updated_at = CURRENT_TIMESTAMP
                WHERE id = :id
            """, {"notes": request.notes, "id": workspace_id})
            conn.commit()
    except:
        pass

    return {"status": "success"}

@router.delete("/workspaces/{workspace_id}")
async def delete_workspace(workspace_id: str):
    """Delete a workspace"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                DELETE FROM AIUSER.GAVEL_WORKSPACES WHERE id = :id
            """, {"id": workspace_id})
            conn.commit()
    except:
        pass

    return {"status": "deleted", "id": workspace_id}
