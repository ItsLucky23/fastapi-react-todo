from .models import UpdateTodo, CreateTodo
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from .models import Todo
from datetime import datetime

router = APIRouter(
  prefix="/todo",
  tags=["todo"]
)

@router.get("/")
def read_todos(db: Session = Depends(get_db)):
  return { "status": "success", "data": db.query(Todo).all() }

@router.post("/")
def create_todo(data: CreateTodo, db: Session = Depends(get_db)):

  # check if id dont exist already
  existing_todo = db.query(Todo).filter(Todo.id == data.id).first()
  if existing_todo:
    raise HTTPException(status_code=400, status="error", detail=f"Todo with ID {data.id} already exists")
  
  # check if id is valid uuid
  try:
    import uuid
    uuid.UUID(data.id)
  except ValueError:
    raise HTTPException(status_code=400, status="error", detail="Invalid ID format: must be a valid UUID")
  
  # check if name and description are not empty
  if not data.name or not data.name.strip():
    raise HTTPException(status_code=400, status="error", detail="Name cannot be empty")
  
  if not data.description or not data.description.strip():
    raise HTTPException(status_code=400, status="error", detail="Description cannot be empty")
  
  # check if timestamps are valid iso format
  try:
    created_at = datetime.fromisoformat(data.createdAt.replace('Z', '+00:00'))
    updated_at = datetime.fromisoformat(data.updatedAt.replace('Z', '+00:00'))
  except (ValueError, AttributeError) as e:
    raise HTTPException(status_code=400, status="error", detail=f"Invalid timestamp format: {str(e)}")
  
  new_todo = Todo(
    id=data.id,
    name=data.name.strip(), 
    description=data.description.strip(), 
    priority=data.priority, 
    completed=data.completed, 
    createdAt=created_at, 
    updatedAt=updated_at
  )
  
  try:
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
  except Exception as e:
    db.rollback()
    raise HTTPException(status_code=500, status="error", detail=f"Database error: {str(e)}")

  # we dont send back the new todo but instead just a success
  # on the frontend we assume we added it and visually add the todo so the update feels instant
  # if the api returns something else than status: success than we remove the todo again and show an error message
  return { "status": "success" }

@router.patch("/{todo_id}")
def update_todo(data: UpdateTodo, db: Session = Depends(get_db)):

  # check if id is valid uuid
  try:
    import uuid
    uuid.UUID(data.id)
  except ValueError:
    raise HTTPException(status_code=400, status="error", detail="Invalid ID format: must be a valid UUID")
  
  todo = db.query(Todo).filter(Todo.id == data.id).first()
  if not todo:
    raise HTTPException(status_code=404, status="error", detail="no todo found")
  
  # check if name is not empty if provided
  if data.name is not None:
    if not data.name.strip():
      raise HTTPException(status_code=400, status="error", detail="Name cannot be empty")
    todo.name = data.name.strip()
  
  # check if description is not empty if provided
  if data.description is not None:
    if not data.description.strip():
      raise HTTPException(status_code=400, status="error", detail="Description cannot be empty")
    todo.description = data.description.strip()
  
  if data.priority:
    if data.priority not in ["low", "medium", "high"]:
      raise HTTPException(status_code=400, status="error", detail="Invalid priority")
    todo.priority = data.priority
  
  if data.completed is not None:
    todo.completed = data.completed
  
  # check if timestamps are valid iso format if provided
  # we dont allow the user to update the createdAt field, maybe we can add a feature for that in the future
  # if data.createdAt:
  #   try:
  #     todo.createdAt = datetime.fromisoformat(data.createdAt.replace('Z', '+00:00'))
  #   except (ValueError, AttributeError) as e:
  #     raise HTTPException(status_code=400, status="error", detail=f"Invalid createdAt timestamp format: {str(e)}")
  
  if data.updatedAt:
    try:
      todo.updatedAt = datetime.fromisoformat(data.updatedAt.replace('Z', '+00:00'))
    except (ValueError, AttributeError) as e:
      raise HTTPException(status_code=400, status="error", detail=f"Invalid updatedAt timestamp format: {str(e)}")
  
  try:
    db.commit()
    db.refresh(todo)
  except Exception as e:
    db.rollback()
    raise HTTPException(status_code=500, status="error", detail=f"Database error: {str(e)}")

  # we dont send back the new todo but instead just a success
  # on the frontend we assume we edited it and visually update the todo so the update feels instant
  # if the api returns something else than status: success than we remove the todo again and show an error message
  return { "status": "success" }

@router.delete("/{todo_id}")
def delete_todo(todo_id: str, db: Session = Depends(get_db)) :

  # check if id is valid uuid
  try:
    import uuid
    uuid.UUID(todo_id)
  except ValueError:
    raise HTTPException(status_code=400, status="error", detail="Invalid ID format: must be a valid UUID")
  
  todo = db.query(Todo).filter(Todo.id == todo_id).first()

  if not todo:
    raise HTTPException(status_code=404, status="error", detail="No todo found")

  try:
    db.delete(todo)
    db.commit()
  except Exception as e:
    db.rollback()
    raise HTTPException(status_code=500, status="error", detail=f"Database error: {str(e)}")

  # we dont send back the complete todo list but instead just a success
  # on the frontend we unreder the todo before we get the status back but if it failed for some reason we add the todo back to the frontned
  return { "status": "success" }