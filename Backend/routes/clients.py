from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from model import Client
from database import clients_collection

router = APIRouter()


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize(d) for d in docs]


@router.get("/clients")
def get_clients(email: str = Query(...)):
    return serialize_list(clients_collection.find({"userEmail": email}))


@router.post("/clients")
def add_client(client: Client):
    result = clients_collection.insert_one(client.model_dump())
    return {"message": "Client added", "id": str(result.inserted_id)}


@router.put("/clients/{client_id}")
def update_client(client_id: str, client: Client):
    result = clients_collection.update_one(
        {"_id": ObjectId(client_id)},
        {"$set": client.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Client not found")
    return {"message": "Client updated"}


@router.delete("/clients/{client_id}")
def delete_client(client_id: str):
    result = clients_collection.delete_one({"_id": ObjectId(client_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Client not found")
    return {"message": "Client deleted"}