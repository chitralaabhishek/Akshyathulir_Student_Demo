from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from routes import (
    startups,
    dashboard_routes,
    team,
    clients,
    milestones,
    roadmap,
    legal,
    fundraising,
    schemes,
    opportunities,
    courses,
)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(startups.router,         prefix="/api", tags=["Startups"])
app.include_router(dashboard_routes.router, prefix="/api", tags=["Dashboard"])
app.include_router(team.router,             prefix="/api", tags=["Team"])
app.include_router(clients.router,          prefix="/api", tags=["Clients"])
app.include_router(milestones.router,       prefix="/api", tags=["Milestones"])
app.include_router(roadmap.router,          prefix="/api", tags=["Roadmap"])
app.include_router(legal.router,            prefix="/api", tags=["Legal"])
app.include_router(fundraising.router,      prefix="/api", tags=["Fundraising"])
app.include_router(schemes.router,          prefix="/api", tags=["Schemes"])
app.include_router(opportunities.router,    prefix="/api", tags=["Opportunities"])
app.include_router(courses.router,          prefix="/api", tags=["Courses"])

os.makedirs("uploads/logos", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/")
def home():
    return {"message": "Server is running correctly!"}