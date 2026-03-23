from fastapi import APIRouter, HTTPException
from bson import ObjectId
from model import Scheme
from database import schemes_collection

router = APIRouter()


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize(d) for d in docs]


@router.get("/schemes")
def get_schemes(category: str = None):
    query = {}
    if category:
        query["category"] = category
    return serialize_list(schemes_collection.find(query))


@router.get("/schemes/categories")
def get_scheme_categories():
    pipeline = [{"$group": {"_id": "$category", "count": {"$sum": 1}}}, {"$sort": {"_id": 1}}]
    result = list(schemes_collection.aggregate(pipeline))
    return [{"category": r["_id"], "count": r["count"]} for r in result]


@router.post("/schemes")
def add_scheme(scheme: Scheme):
    result = schemes_collection.insert_one(scheme.model_dump())
    return {"message": "Scheme added", "id": str(result.inserted_id)}


@router.put("/schemes/{scheme_id}")
def update_scheme(scheme_id: str, scheme: Scheme):
    result = schemes_collection.update_one(
        {"_id": ObjectId(scheme_id)},
        {"$set": scheme.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Scheme not found")
    return {"message": "Scheme updated"}


@router.delete("/schemes/{scheme_id}")
def delete_scheme(scheme_id: str):
    result = schemes_collection.delete_one({"_id": ObjectId(scheme_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Scheme not found")
    return {"message": "Scheme deleted"}