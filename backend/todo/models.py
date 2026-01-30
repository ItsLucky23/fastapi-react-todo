from typing import Literal
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base
from pydantic import BaseModel
import uuid

class Todo(Base):
  __tablename__ = "todos"
  id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
  name = Column(String, nullable=False)
  description = Column(String, nullable=False)
  priority = Column(String, nullable=False)
  completed = Column(Boolean, default=False)
  createdAt = Column(DateTime, default=datetime.utcnow)
  updatedAt = Column(DateTime, default=datetime.utcnow)

class CreateTodo(BaseModel):
  id: str
  name: str
  description: str
  priority: Literal["low", "medium", "high"]
  completed: bool = False
  createdAt: str
  updatedAt: str

class UpdateTodo(BaseModel):
  id: str
  name: str | None = None
  description: str | None = None
  priority: Literal["low", "medium", "high"] | None = None
  completed: bool | None = None
  createdAt: str | None = None
  updatedAt: str | None = None