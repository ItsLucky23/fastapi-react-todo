export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: string
  name: string
  description: string
  priority: Priority
  createdAt: string
  updatedAt: string
  completed: boolean
}

export interface TodoFormData {
  name: string
  description: string
  priority: Priority
}
