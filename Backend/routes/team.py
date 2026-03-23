from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from model import TeamMember
from database import team_collection

router = APIRouter()


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize(d) for d in docs]


@router.get("/team")
def get_team(email: str = Query(...)):
    return serialize_list(team_collection.find({"userEmail": email}))


@router.post("/team")
def add_team_member(member: TeamMember):
    result = team_collection.insert_one(member.model_dump())
    return {"message": "Team member added", "id": str(result.inserted_id)}


@router.put("/team/{member_id}")
def update_team_member(member_id: str, member: TeamMember):
    result = team_collection.update_one(
        {"_id": ObjectId(member_id)},
        {"$set": member.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Team member not found")
    return {"message": "Team member updated"}


@router.delete("/team/{member_id}")
def delete_team_member(member_id: str):
    result = team_collection.delete_one({"_id": ObjectId(member_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Team member not found")
    return {"message": "Team member deleted"}