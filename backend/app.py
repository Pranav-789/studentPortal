from fastapi import FastAPI
from login import router as auth_router

app = FastAPI()

app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Student Portal API"}


