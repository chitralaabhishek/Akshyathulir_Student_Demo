from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from model import LegalItem
from database import legal_collection

router = APIRouter()


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize(d) for d in docs]


@router.get("/legal")
def get_legal(email: str = Query(...)):
    return serialize_list(legal_collection.find({"userEmail": email}))


@router.post("/legal")
def add_legal(item: LegalItem):
    result = legal_collection.insert_one(item.model_dump())
    return {"message": "Legal item added", "id": str(result.inserted_id)}


@router.put("/legal/{item_id}")
def update_legal(item_id: str, item: LegalItem):
    result = legal_collection.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": item.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Legal item not found")
    return {"message": "Legal item updated"}


@router.delete("/legal/{item_id}")
def delete_legal(item_id: str):
    result = legal_collection.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Legal item not found")
    return {"message": "Legal item deleted"}