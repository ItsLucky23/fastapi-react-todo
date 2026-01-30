from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import Session
from datetime import datetime
from database import Base, engine, get_db
from todo.router import router as todo_router

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(todo_router)

@app.get("/")
def root():
  return {"message": "API is running. Go to /docs for documentation."}