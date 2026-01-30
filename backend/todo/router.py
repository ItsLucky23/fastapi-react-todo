from .models import UpdateTodo, CreateTodo
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from .models import Todo

router = APIRouter(
  prefix="/todo",
  tags=["todo"]
)

@router.get("/")
def read_todos(db: Session = Depends(get_db)):
  return db.query(Todo).all()

@router.post("/")
def create_todo(data: CreateTodo, db: Session = Depends(get_db)):  
  new_todo = Todo(title=data.title)
  db.add(new_todo)
  db.commit()
  db.refresh(new_todo)

  # we dont send back the new todo but instead just a success
  # on the frontend we assume we added it and visually add the todo so the update feels instant
  # if the api returns something else than status: success than we remove the todo again and show an error message
  return { "status": "success" }

@router.patch("/{todo_id}")
def update_todo(data: UpdateTodo, db: Session = Depends(get_db)):
  todo = db.query(Todo).filter(Todo.id == data.id).first()
  if not todo:
      raise HTTPException(status_code=404, detail="no todo found")
  
  if data.title:
    todo.title = data.title
  if data.completed:
    todo.completed = data.completed
    
  db.commit()
  db.refresh(todo)

  # we dont send back the new todo but instead just a success
  # on the frontend we assume we edited it and visually update the todo so the update feels instant
  # if the api returns something else than status: success than we remove the todo again and show an error message
  return { "status": "success" }

@router.delete("/{todo_id}")
def delete_todo(todo_id: str, db: Session = Depends(get_db)) :
  todo = db.query(Todo).filter(Todo.id == todo_id).first()

  if not todo:
      raise HTTPException(status_code=404, detail="No todo found")
  
  db.delete(todo)
  db.commit()

  # we dont send back the complete todo list but instead just a success
  # on the frontend we unreder the todo before we get the status back but if it failed for some reason we add the todo back to the frontned
  return { "status": "success" }