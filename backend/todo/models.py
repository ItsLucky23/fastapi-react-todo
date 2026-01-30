from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base
from pydantic import BaseModel
import uuid

class Todo(Base):
  __tablename__ = "todos"
  id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
  title = Column(String, nullable=False)
  completed = Column(Boolean, default=False)
  created_at = Column(DateTime, default=datetime.utcnow)

class CreateTodo(BaseModel):
  title: str

class UpdateTodo(BaseModel):
  id: str
  title: str | None = None
  completed: bool | None = None