from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from model import Milestone
from database import milestones_collection

router = APIRouter()


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize(d) for d in docs]


@router.get("/milestones")
def get_milestones(email: str = Query(...)):
    return serialize_list(milestones_collection.find({"userEmail": email}))


@router.post("/milestones")
def add_milestone(milestone: Milestone):
    result = milestones_collection.insert_one(milestone.model_dump())
    return {"message": "Milestone added", "id": str(result.inserted_id)}


@router.put("/milestones/{milestone_id}")
def update_milestone(milestone_id: str, milestone: Milestone):
    result = milestones_collection.update_one(
        {"_id": ObjectId(milestone_id)},
        {"$set": milestone.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Milestone not found")
    return {"message": "Milestone updated"}


@router.delete("/milestones/{milestone_id}")
def delete_milestone(milestone_id: str):
    result = milestones_collection.delete_one({"_id": ObjectId(milestone_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Milestone not found")
    return {"message": "Milestone deleted"}