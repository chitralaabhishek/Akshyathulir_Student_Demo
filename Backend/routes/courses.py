from fastapi import APIRouter, HTTPException
from bson import ObjectId
from model import Course
from database import courses_collection

router = APIRouter()


@router.get("/courses")
def get_courses():
    courses = []
    for c in courses_collection.find():
        c["_id"] = str(c["_id"])
        courses.append(c)
    return courses


@router.post("/courses")
def create_course(course: Course):
    result = courses_collection.insert_one(course.model_dump())
    return {"message": "Course added successfully", "id": str(result.inserted_id)}


@router.put("/courses/{course_id}")
def update_course(course_id: str, course: Course):
    result = courses_collection.update_one(
        {"_id": ObjectId(course_id)},
        {"$set": course.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Course not found")
    return {"message": "Course updated successfully"}


@router.delete("/courses/{course_id}")
def delete_course(course_id: str):
    result = courses_collection.delete_one({"_id": ObjectId(course_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Course not found")
    return {"message": "Course deleted successfully"}