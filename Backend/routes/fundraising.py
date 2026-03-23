from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from model import FundraisingCampaign, Investor, Communication
from database import campaigns_collection, investors_collection, communications_collection

router = APIRouter()


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize(d) for d in docs]


# ── CAMPAIGNS ─────────────────────────────────────────────────

@router.get("/fundraising/campaigns")
def get_campaigns(email: str = Query(...)):
    return serialize_list(campaigns_collection.find({"userEmail": email}))


@router.post("/fundraising/campaigns")
def add_campaign(campaign: FundraisingCampaign):
    result = campaigns_collection.insert_one(campaign.model_dump())
    return {"message": "Campaign added", "id": str(result.inserted_id)}


@router.put("/fundraising/campaigns/{campaign_id}")
def update_campaign(campaign_id: str, campaign: FundraisingCampaign):
    result = campaigns_collection.update_one(
        {"_id": ObjectId(campaign_id)},
        {"$set": campaign.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Campaign not found")
    return {"message": "Campaign updated"}


@router.delete("/fundraising/campaigns/{campaign_id}")
def delete_campaign(campaign_id: str):
    result = campaigns_collection.delete_one({"_id": ObjectId(campaign_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Campaign not found")
    return {"message": "Campaign deleted"}


# ── INVESTORS ─────────────────────────────────────────────────

@router.get("/fundraising/investors")
def get_investors(email: str = Query(...)):
    return serialize_list(investors_collection.find({"userEmail": email}))


@router.post("/fundraising/investors")
def add_investor(investor: Investor):
    result = investors_collection.insert_one(investor.model_dump())
    return {"message": "Investor added", "id": str(result.inserted_id)}


@router.put("/fundraising/investors/{investor_id}")
def update_investor(investor_id: str, investor: Investor):
    result = investors_collection.update_one(
        {"_id": ObjectId(investor_id)},
        {"$set": investor.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Investor not found")
    return {"message": "Investor updated"}


@router.delete("/fundraising/investors/{investor_id}")
def delete_investor(investor_id: str):
    result = investors_collection.delete_one({"_id": ObjectId(investor_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Investor not found")
    return {"message": "Investor deleted"}


# ── COMMUNICATIONS ────────────────────────────────────────────

@router.get("/fundraising/communications")
def get_communications(email: str = Query(...)):
    return serialize_list(communications_collection.find({"userEmail": email}))


@router.post("/fundraising/communications")
def add_communication(comm: Communication):
    result = communications_collection.insert_one(comm.model_dump())
    return {"message": "Communication added", "id": str(result.inserted_id)}


@router.put("/fundraising/communications/{comm_id}")
def update_communication(comm_id: str, comm: Communication):
    result = communications_collection.update_one(
        {"_id": ObjectId(comm_id)},
        {"$set": comm.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Communication not found")
    return {"message": "Communication updated"}


@router.delete("/fundraising/communications/{comm_id}")
def delete_communication(comm_id: str):
    result = communications_collection.delete_one({"_id": ObjectId(comm_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Communication not found")
    return {"message": "Communication deleted"}