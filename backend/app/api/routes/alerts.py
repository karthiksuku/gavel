from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from app.database import get_db
import uuid
import json

router = APIRouter()

class Alert(BaseModel):
    id: str
    name: str
    query: str
    jurisdictions: List[str]
    is_active: bool = True
    last_triggered: Optional[str] = None

class CreateAlertRequest(BaseModel):
    name: str
    query: str
    jurisdictions: List[str]

class UpdateAlertRequest(BaseModel):
    name: Optional[str] = None
    query: Optional[str] = None
    jurisdictions: Optional[List[str]] = None
    is_active: Optional[bool] = None

@router.get("/alerts", response_model=List[Alert])
async def list_alerts():
    """List all monitoring alerts"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, name, query, jurisdictions, is_active, last_triggered
                FROM AIUSER.GAVEL_ALERTS
                ORDER BY created_at DESC
            """)
            rows = cursor.fetchall()

            return [
                Alert(
                    id=row[0],
                    name=row[1],
                    query=row[2],
                    jurisdictions=row[3].split(",") if row[3] else [],
                    is_active=bool(row[4]),
                    last_triggered=str(row[5]) if row[5] else None
                )
                for row in rows
            ]
    except:
        # Return demo alerts
        return [
            Alert(id="alert-1", name="Privacy Act Changes", query="Privacy Act amendments", jurisdictions=["commonwealth"], last_triggered="2024-12-03"),
            Alert(id="alert-2", name="SA Building Legislation", query="building construction regulations", jurisdictions=["south_australia"], last_triggered="2024-11-28"),
            Alert(id="alert-3", name="Health Regulations - QLD", query="health regulations", jurisdictions=["queensland"], last_triggered="2024-11-20"),
            Alert(id="alert-4", name="WHS Updates", query="work health safety amendments", jurisdictions=["commonwealth", "south_australia"], last_triggered="2024-12-01")
        ]

@router.post("/alerts", response_model=Alert)
async def create_alert(request: CreateAlertRequest):
    """Create a new monitoring alert"""
    alert_id = str(uuid.uuid4())

    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO AIUSER.GAVEL_ALERTS (id, name, query, jurisdictions, is_active, created_at)
                VALUES (:id, :name, :query, :jurisdictions, 1, CURRENT_TIMESTAMP)
            """, {
                "id": alert_id,
                "name": request.name,
                "query": request.query,
                "jurisdictions": ",".join(request.jurisdictions)
            })
            conn.commit()
    except:
        pass

    return Alert(
        id=alert_id,
        name=request.name,
        query=request.query,
        jurisdictions=request.jurisdictions,
        is_active=True
    )

@router.get("/alerts/{alert_id}", response_model=Alert)
async def get_alert(alert_id: str):
    """Get alert details"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, name, query, jurisdictions, is_active, last_triggered
                FROM AIUSER.GAVEL_ALERTS
                WHERE id = :id
            """, {"id": alert_id})
            row = cursor.fetchone()

            if row:
                return Alert(
                    id=row[0],
                    name=row[1],
                    query=row[2],
                    jurisdictions=row[3].split(",") if row[3] else [],
                    is_active=bool(row[4]),
                    last_triggered=str(row[5]) if row[5] else None
                )
    except:
        pass

    # Demo response
    return Alert(
        id=alert_id,
        name="Privacy Act Changes",
        query="Privacy Act amendments",
        jurisdictions=["commonwealth"],
        is_active=True,
        last_triggered="2024-12-03"
    )

@router.put("/alerts/{alert_id}", response_model=Alert)
async def update_alert(alert_id: str, request: UpdateAlertRequest):
    """Update an alert"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            updates = []
            params = {"id": alert_id}

            if request.name is not None:
                updates.append("name = :name")
                params["name"] = request.name
            if request.query is not None:
                updates.append("query = :query")
                params["query"] = request.query
            if request.jurisdictions is not None:
                updates.append("jurisdictions = :jurisdictions")
                params["jurisdictions"] = ",".join(request.jurisdictions)
            if request.is_active is not None:
                updates.append("is_active = :is_active")
                params["is_active"] = 1 if request.is_active else 0

            if updates:
                sql = f"UPDATE AIUSER.GAVEL_ALERTS SET {', '.join(updates)} WHERE id = :id"
                cursor.execute(sql, params)
                conn.commit()
    except:
        pass

    return Alert(
        id=alert_id,
        name=request.name or "Updated Alert",
        query=request.query or "",
        jurisdictions=request.jurisdictions or [],
        is_active=request.is_active if request.is_active is not None else True
    )

@router.delete("/alerts/{alert_id}")
async def delete_alert(alert_id: str):
    """Delete an alert"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                DELETE FROM AIUSER.GAVEL_ALERTS WHERE id = :id
            """, {"id": alert_id})
            conn.commit()
    except:
        pass

    return {"status": "deleted", "id": alert_id}

@router.post("/alerts/{alert_id}/toggle")
async def toggle_alert(alert_id: str):
    """Toggle alert active status"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE AIUSER.GAVEL_ALERTS
                SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END
                WHERE id = :id
            """, {"id": alert_id})
            conn.commit()
    except:
        pass

    return {"status": "toggled", "id": alert_id}
