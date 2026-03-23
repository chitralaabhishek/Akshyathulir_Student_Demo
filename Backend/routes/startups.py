from fastapi import APIRouter, HTTPException, UploadFile, File
from model import StartupApplication
from database import profile_collection

router = APIRouter()


@router.post("/startup")
def submit_startup(startup: StartupApplication):
    if profile_collection.find_one({"email": startup.email}):
        raise HTTPException(400, "Application with this email already exists.")
    result = profile_collection.insert_one(startup.model_dump())
    return {"message": "Startup application submitted successfully", "id": str(result.inserted_id)}


@router.get("/startup/by-email/{email}")
def get_startup_by_email(email: str):
    doc = profile_collection.find_one({"email": email})
    if not doc:
        raise HTTPException(404, "Startup not found")
    doc["_id"] = str(doc["_id"])
    return doc


@router.put("/startup")
def update_startup(data: StartupApplication):
    update_data = data.model_dump(exclude_unset=True)
    result = profile_collection.update_one({"email": data.email}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(404, "Startup not found")
    return {"message": "Startup updated successfully"}


@router.delete("/startup/{email}")
def delete_startup(email: str):
    result = profile_collection.delete_one({"email": email})
    if result.deleted_count == 0:
        raise HTTPException(404, "Startup not found")
    return {"message": "Startup deleted successfully"}


@router.post("/startup/upload-logo/{email}")
async def upload_logo(email: str, file: UploadFile = File(...)):
    import os, shutil
    upload_dir = "uploads/logos"
    os.makedirs(upload_dir, exist_ok=True)
    ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "png"
    filename = f"{email.replace('@','_').replace('.','_')}_logo.{ext}"
    file_path = os.path.join(upload_dir, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    logo_url = f"{upload_dir}/{filename}"
    profile_collection.update_one(
        {"email": email},
        {"$set": {"logo": logo_url}},
        upsert=True
    )
    return {"logo": logo_url}