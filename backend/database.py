from pymongo import MongoClient
import os
import certifi

# You should move this to a .env file for security
MONGO_DETAILS = "mongodb+srv://chaurasiakanishk666_db_user:LJa6SC9xjAJARmLi@internportal.wkf9jx4.mongodb.net/" 

client = MongoClient(MONGO_DETAILS, tlsCAFile=certifi.where())

# --- Defining 4 Separate Databases ---
# 1. Admin DB: Authentication, User Accounts, System Config
admin_db = client.admin_panel_db
users_collection = admin_db.get_collection("users") # Centralized User Auth
logs_collection = admin_db.get_collection("logs")

# 2. Student DB: Student Profiles, Skills, Academics
student_db = client.student_panel_db
student_profiles_collection = student_db.get_collection("profiles")
student_skills_collection = student_db.get_collection("skills")

# 3. Faculty DB: Faculty Profiles, Courses, Research
faculty_db = client.faculty_panel_db
faculty_profiles_collection = faculty_db.get_collection("profiles")
courses_collection = faculty_db.get_collection("courses") # Courses managed by faculty
enrollments_collection = faculty_db.get_collection("enrollments") # Enrollments link students to courses

# 4. Recruiter DB: Company Profiles, Jobs, Applications
recruiter_db = client.recruiter_panel_db
company_profiles_collection = recruiter_db.get_collection("profiles")
jobs_collection = recruiter_db.get_collection("jobs")
applications_collection = recruiter_db.get_collection("applications")
assignments_collection = faculty_db.get_collection("assignments") # Assignments belong to courses (faculty domain)
submissions_collection = faculty_db.get_collection("submissions") # Submissions belong to assignments
