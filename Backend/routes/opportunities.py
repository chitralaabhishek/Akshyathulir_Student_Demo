from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from model import Opportunity, OpportunityApplication
from database import opportunities_collection, opp_applications_collection

router = APIRouter()


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs):
    return [serialize(d) for d in docs]


# ── OPPORTUNITIES ─────────────────────────────────────────────

@router.get("/opportunities")
def get_all_opportunities(type: str = None, location: str = None):
    query = {}
    if type:     query["type"]     = type
    if location: query["location"] = location
    return serialize_list(opportunities_collection.find(query))


@router.get("/opportunities/applications/my")
def get_my_applications(email: str = Query(...)):
    return serialize_list(opp_applications_collection.find({"applicantEmail": email}))


@router.get("/opportunities/applications/stats")
def get_application_stats(email: str = Query(...)):
    pipeline = [
        {"$match": {"userEmail": email}},
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ]
    result = list(opp_applications_collection.aggregate(pipeline))
    stats = {r["_id"]: r["count"] for r in result}
    total = opp_applications_collection.count_documents({"userEmail": email})
    return {
        "total":       total,
        "applied":     stats.get("Applied", 0),
        "shortlisted": stats.get("Shortlisted", 0),
        "offered":     stats.get("Offered", 0),
        "rejected":    stats.get("Rejected", 0),
    }


@router.get("/opportunities/{opp_id}")
def get_opportunity(opp_id: str):
    doc = opportunities_collection.find_one({"_id": ObjectId(opp_id)})
    if not doc:
        raise HTTPException(404, "Opportunity not found")
    return serialize(doc)


@router.post("/opportunities")
def add_opportunity(opp: Opportunity):
    result = opportunities_collection.insert_one(opp.model_dump())
    return {"message": "Opportunity added", "id": str(result.inserted_id)}


@router.put("/opportunities/{opp_id}")
def update_opportunity(opp_id: str, opp: Opportunity):
    result = opportunities_collection.update_one(
        {"_id": ObjectId(opp_id)}, {"$set": opp.model_dump()})
    if result.matched_count == 0:
        raise HTTPException(404, "Opportunity not found")
    return {"message": "Opportunity updated"}


@router.delete("/opportunities/{opp_id}")
def delete_opportunity(opp_id: str):
    result = opportunities_collection.delete_one({"_id": ObjectId(opp_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Opportunity not found")
    return {"message": "Opportunity deleted"}


# ── APPLICATIONS ──────────────────────────────────────────────

@router.post("/opportunities/applications")
def apply_to_opportunity(data: dict):
    existing = opp_applications_collection.find_one({
        "opportunityId":  data.get("opportunityId"),
        "applicantEmail": data.get("applicantEmail"),
    })
    if existing:
        raise HTTPException(400, "You have already applied to this opportunity")
    data["appliedOn"] = data.get("appliedOn", "")
    data["status"]    = data.get("status", "Applied")
    result = opp_applications_collection.insert_one(data)
    return {"message": "Application submitted successfully", "id": str(result.inserted_id)}


@router.put("/opportunities/applications/{app_id}")
def update_application(app_id: str, app: OpportunityApplication):
    result = opp_applications_collection.update_one(
        {"_id": ObjectId(app_id), "userEmail": app.userEmail},
        {"$set": app.model_dump(exclude_unset=True)}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Application not found")
    return {"message": "Application updated"}


@router.delete("/opportunities/applications/{app_id}")
def delete_application(app_id: str, email: str = Query(...)):
    result = opp_applications_collection.delete_one({
        "_id": ObjectId(app_id),
        "userEmail": email
    })
    if result.deleted_count == 0:
        raise HTTPException(404, "Application not found")
    return {"message": "Application withdrawn"}