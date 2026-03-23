from fastapi import APIRouter, Query
from database import (
    team_collection, milestones_collection, legal_collection,
    clients_collection, campaigns_collection, roadmap_collection,
)

router = APIRouter()


@router.get("/dashboard/summary")
def dashboard_summary(email: str = Query(..., description="Profile email of the user")):
    from datetime import datetime

    q = {"userEmail": email}

    total_members = team_collection.count_documents(q)

    dept_pipeline = [
        {"$match": q},
        {"$group": {"_id": "$dept", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    dept_counts  = list(team_collection.aggregate(dept_pipeline))
    team_by_dept = {d["_id"]: d["count"] for d in dept_counts if d["_id"]}

    total_milestones = milestones_collection.count_documents(q)
    completed_ms     = milestones_collection.count_documents({**q, "status": "Completed"})
    in_progress_ms   = milestones_collection.count_documents({**q, "status": "In Progress"})
    pending_ms       = total_milestones - completed_ms - in_progress_ms

    upcoming_milestones = list(
        milestones_collection.find({**q, "status": {"$ne": "Completed"}})
        .sort("dueDate", 1).limit(4)
    )
    upcoming_tasks = [
        {"task": m.get("title",""), "date": m.get("dueDate",""), "priority": m.get("priority","Medium"), "status": m.get("progress", 0)}
        for m in upcoming_milestones
    ]

    total_legal      = legal_collection.count_documents(q)
    completed_legal  = legal_collection.count_documents({**q, "status": "Completed"})
    compliance_score = round((completed_legal / total_legal * 100) if total_legal else 0)

    active_clients = clients_collection.count_documents({**q, "status": "Active"})

    campaigns    = list(campaigns_collection.find(q))
    total_raised = sum(c.get("raisedAmount", 0) for c in campaigns)
    total_target = sum(c.get("targetAmount", 0) for c in campaigns)

    now = datetime.now()
    monthly_labels, monthly_raised, monthly_target = [], [], []
    month_names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    for i in range(5, -1, -1):
        m = (now.month - i - 1) % 12
        monthly_labels.append(month_names[m])
        year  = now.year if (now.month - i) > 0 else now.year - 1
        month = ((now.month - i - 1) % 12 + 1)
        key   = f"{year}-{month:02d}"
        monthly_raised.append(round(sum(c.get("raisedAmount",0) for c in campaigns if c.get("createdDate","")[:7]==key) / 100_000, 2))
        monthly_target.append(round(sum(c.get("targetAmount",0) for c in campaigns if c.get("createdDate","")[:7]==key) / 100_000, 2))

    active_projects = roadmap_collection.count_documents({**q, "status": "In Development"})

    activities = []
    latest_camp = campaigns_collection.find_one(q, sort=[("_id",-1)])
    if latest_camp:
        activities.append({"type":"funding","title":f"Campaign: {latest_camp.get('productName','')}","desc":f"Target ₹{latest_camp.get('targetAmount',0):,} | Raised ₹{latest_camp.get('raisedAmount',0):,}","time":latest_camp.get("createdDate","Recently")})

    latest_team = team_collection.find_one(q, sort=[("_id",-1)])
    if latest_team:
        activities.append({"type":"team","title":f"{latest_team.get('firstName','')} {latest_team.get('lastName','')} joined","desc":f"{latest_team.get('dept','')} — {latest_team.get('role','')}","time":latest_team.get("date","Recently")})

    latest_ms = milestones_collection.find_one({**q,"status":"Completed"}, sort=[("_id",-1)])
    if latest_ms:
        activities.append({"type":"milestone","title":f"Milestone completed: {latest_ms.get('title','')}","desc":f"Category: {latest_ms.get('category','')} | Priority: {latest_ms.get('priority','')}","time":latest_ms.get("dueDate","Recently")})

    latest_client = clients_collection.find_one(q, sort=[("_id",-1)])
    if latest_client:
        activities.append({"type":"client","title":f"Client: {latest_client.get('company','')}","desc":f"{latest_client.get('project','')} — {latest_client.get('status','')}","time":latest_client.get("startDate","Recently")})

    return {
        "totalFunding":    total_raised,
        "targetFunding":   total_target,
        "activeProjects":  active_projects,
        "teamMembers":     total_members,
        "milestones":      {"total":total_milestones,"completed":completed_ms,"inProgress":in_progress_ms,"pending":pending_ms},
        "complianceScore": compliance_score,
        "activeClients":   active_clients,
        "teamByDept":      team_by_dept,
        "fundingChart":    {"labels":monthly_labels,"raised":monthly_raised,"target":monthly_target},
        "recentActivity":  activities,
        "upcomingTasks":   upcoming_tasks,
    }