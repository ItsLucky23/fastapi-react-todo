import { useEffect, useState } from 'react'
import type { Todo, TodoFormData } from '../types'
import { v4 as uuidv4 } from 'uuid';
import { apiRequest } from './apiRequest';
import { toast } from 'sonner';

export function useTodoState() {
  const [todos, setTodos] = useState<Todo[]>([])

  // fetch existing apis on load
  useEffect(() => {
    (async () => {
      const response = await apiRequest({
        name: 'todo',
        data: {},
        method: 'GET'
      })

      console.log(response)
      if (response.status === "success") {
        setTodos(response.data)
      }

    })()
  }, [])

  const addTodo = async (formData: TodoFormData) => {
    const newTodo: Todo = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completed: false,
      ...formData
    }
    setTodos([...todos, newTodo])

    try {
      const response = await apiRequest({
        name: 'todo',
        data: newTodo,
        method: 'POST'
      })

      if (response.status !== "success") {
        setTodos(todos)
        toast.error("Failed to add todo")
      } else {
        toast.success("Todo added successfully")
      }
    } catch (error) {
      setTodos(todos)
      toast.error("Failed to add todo")
    }
  }

  const updateTodo = async (id: string, formData: TodoFormData) => {
    const previousTodos = todos
    const updatedTodo = todos.find(todo => todo.id === id)

    if (!updatedTodo) return

    const updatedData = {
      ...updatedTodo,
      ...formData,
      updatedAt: new Date().toISOString()
    }

    setTodos(todos.map(todo => todo.id === id ? updatedData : todo))

    try {
      const response = await apiRequest({
        name: `todo/${id}`,
        data: updatedData,
        method: 'PATCH'
      })

      if (response.status !== "success") {
        setTodos(previousTodos)
        toast.error("Failed to update todo")
      } else {
        toast.success("Todo updated successfully")
      }
    } catch (error) {
      setTodos(previousTodos)
      toast.error("Failed to update todo")
    }
  }

  const deleteTodo = async (id: string) => {
    const previousTodos = todos
    setTodos(todos.filter(todo => todo.id !== id))

    try {
      const response = await apiRequest({
        name: `todo/${id}`,
        data: {},
        method: 'DELETE'
      })

      if (response.status !== "success") {
        setTodos(previousTodos)
        toast.error("Failed to delete todo")
      } else {
        toast.success("Todo deleted successfully")
      }
    } catch (error) {
      setTodos(previousTodos)
      toast.error("Failed to delete todo")
    }
  }

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo
  }
}
