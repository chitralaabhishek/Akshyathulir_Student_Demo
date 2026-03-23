from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from model import RoadmapFeature
from database import roadmap_collection

router = APIRouter()


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize(d) for d in docs]


@router.get("/roadmap")
def get_roadmap(email: str = Query(...)):
    return serialize_list(roadmap_collection.find({"userEmail": email}))


@router.post("/roadmap")
def add_feature(feature: RoadmapFeature):
    result = roadmap_collection.insert_one(feature.model_dump())
    return {"message": "Feature added", "id": str(result.inserted_id)}


@router.put("/roadmap/{feature_id}")
def update_feature(feature_id: str, feature: RoadmapFeature):
    result = roadmap_collection.update_one(
        {"_id": ObjectId(feature_id)},
        {"$set": feature.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Feature not found")
    return {"message": "Feature updated"}


@router.delete("/roadmap/{feature_id}")
def delete_feature(feature_id: str):
    result = roadmap_collection.delete_one({"_id": ObjectId(feature_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Feature not found")
    return {"message": "Feature deleted"}