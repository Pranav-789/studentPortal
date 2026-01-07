from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Literal
from datetime import datetime
from database import (
    users_collection, 
    student_profiles_collection, 
    faculty_profiles_collection, 
    company_profiles_collection,
    jobs_collection,
    applications_collection,
    courses_collection, 
    enrollments_collection, 
    assignments_collection, 
    submissions_collection
)
from bson import ObjectId

# --- Helper ---
def fix_mongo_id(data):
    """Convert ObjectId to string for Pydantic models."""
    if data and "_id" in data:
        data["id"] = str(data["_id"])
        # We perform a trick here: pydantic models with alias='_id' need '_id' key
        # if populate_by_name is False (default).
        # We keep _id as string to satisfy the alias.
        # But we also keep 'id' for clarity or if alias is removed.
        # We probably need to ensure it's not ObjectId if Pydantic expects str.
        # However, User model defines id: str = Field(alias='_id').
        # So passing _id=str is correct.
        data["_id"] = str(data["_id"]) 
    return data

# --- Pydantic Models ---

class StudentProfile(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    student_id: str # Links to User ID
    major: str
    year: int
    gpa: Optional[float] = 0.0
    skills: List[str] = []

class FacultyProfile(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    employee_id: str # Links to User ID
    department: str
    office_hours: Optional[str] = None

class RecruiterProfile(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    recruiter_id: str # Links to User ID
    company_name: str
    position: str

class User(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    username: str
    email: EmailStr
    full_name: str
    hashed_password: str
    role: Literal["student", "faculty", "admin", "recruiter"]
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class JobPosting(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    recruiter_id: str
    title: str
    description: str
    requirements: List[str]
    posted_at: datetime = Field(default_factory=datetime.utcnow)

class Course(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    code: str
    name: str
    description: Optional[str] = None
    instructor_id: str
    semester: str
    credits: int
    schedule: Optional[str] = None

class Enrollment(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    student_id: str
    course_id: str
    enrolled_at: datetime = Field(default_factory=datetime.utcnow)
    grade: Optional[str] = None
    attendance_record: List[dict] = []

class Assignment(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    course_id: str
    title: str
    description: Optional[str] = None
    due_date: datetime
    total_points: int

class Submission(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    assignment_id: str
    student_id: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    file_url: Optional[str] = None
    score: Optional[float] = None
    feedback: Optional[str] = None

# --- CRUD Operations ---

# Generic
def create_item(collection, item_data: BaseModel):
    item_dict = item_data.dict(exclude={"id"}, by_alias=True)
    new_item = collection.insert_one(item_dict)
    created_item = collection.find_one({"_id": new_item.inserted_id})
    return fix_mongo_id(created_item)

def retrieve_item(collection, item_id: str, model):
    item = collection.find_one({"_id": ObjectId(item_id)})
    if item:
        return model(**fix_mongo_id(item))
    return None

def retrieve_all_items(collection, model):
    items = []
    for item in collection.find():
        items.append(model(**fix_mongo_id(item)))
    return items

# 1. Admin / Auth
def add_user(user_data: User):
    return create_item(users_collection, user_data)

def retrieve_user(username: str):
    # Retrieve by username for login
    user = users_collection.find_one({"username": username})
    if user:
        return User(**fix_mongo_id(user))
    return None

# 2. Student Panel
def create_student_profile(profile: StudentProfile):
    return create_item(student_profiles_collection, profile)

def get_student_profile(student_id: str):
    profile = student_profiles_collection.find_one({"student_id": student_id})
    if profile:
        return StudentProfile(**fix_mongo_id(profile))
    return None

# 3. Faculty Panel
def create_faculty_profile(profile: FacultyProfile):
    return create_item(faculty_profiles_collection, profile)

def add_course(course_data: Course):
    return create_item(courses_collection, course_data)

def retrieve_courses():
    return retrieve_all_items(courses_collection, Course)

# 4. Recruiter Panel
def create_recruiter_profile(profile: RecruiterProfile):
    return create_item(company_profiles_collection, profile)

def post_job(job_data: JobPosting):
    return create_item(jobs_collection, job_data)

def get_all_jobs():
    return retrieve_all_items(jobs_collection, JobPosting)

# Enrollment
def enroll_student(enrollment_data: Enrollment):
    return create_item(enrollments_collection, enrollment_data)
