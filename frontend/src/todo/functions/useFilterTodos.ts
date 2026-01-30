import { useMemo } from 'react'
import type { Todo } from '../types'

export interface TodoFilters {
  searchQuery: string
}

export function useFilterTodos(todos: Todo[], filters: TodoFilters): Todo[] {
  return useMemo(() => {
    let filteredTodos = [...todos]

    // filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim()
      filteredTodos = filteredTodos.filter(todo =>
        todo.name.toLowerCase().includes(query)
      )
    }

    return filteredTodos
  }, [todos, filters])
}
