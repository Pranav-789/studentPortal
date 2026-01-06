import asyncio
from database import (
    users_collection, 
    student_profiles_collection, 
    faculty_profiles_collection, 
    company_profiles_collection
)
from login import get_password_hash

def init_db():
    print("Initializing databases on MongoDB Atlas...")

    # 1. Create Admin User (Admin DB)
    admin_user = users_collection.find_one({"username": "admin"})
    if not admin_user:
        print("Creating default admin user...")
        users_collection.insert_one({
            "username": "admin",
            "email": "admin@example.com",
            "full_name": "System Admin",
            "hashed_password": get_password_hash("admin123"),
            "role": "admin",
            "is_active": True,
            "created_at": "2024-01-01T00:00:00"
        })
    else:
        print("Admin user already exists.")

    # 2. Create Sample Student (Student DB)
    student_exists = student_profiles_collection.find_one({"student_id": "std_123"})
    if not student_exists:
        print("Creating sample student profile...")
        student_profiles_collection.insert_one({
            "student_id": "std_123",
            "major": "Computer Science",
            "year": 2,
            "gpa": 3.8,
            "skills": ["Python", "React"]
        })
    
    # 3. Create Sample Faculty (Faculty DB)
    faculty_exists = faculty_profiles_collection.find_one({"employee_id": "fac_456"})
    if not faculty_exists:
        print("Creating sample faculty profile...")
        faculty_profiles_collection.insert_one({
            "employee_id": "fac_456",
            "department": "Engineering",
            "office_hours": "Mon-Wed 10am-12pm"
        })

    # 4. Create Sample Recruiter (Recruiter DB)
    recruiter_exists = company_profiles_collection.find_one({"recruiter_id": "rec_789"})
    if not recruiter_exists:
        print("Creating sample recruiter profile...")
        company_profiles_collection.insert_one({
            "recruiter_id": "rec_789",
            "company_name": "Tech Corp",
            "position": "Senior HR"
        })

    print("Database initialization complete! 4 Databases created with sample data.")

if __name__ == "__main__":
    init_db()
