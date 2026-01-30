import { useMemo } from 'react'
import type { Todo } from '../types'

export type CompletionFilter = 'all' | 'completed' | 'incomplete'
export type SortOption = 'name' | 'priority' | 'newest' | 'oldest'

export interface TodoFilters {
  searchQuery: string
  completionFilter: CompletionFilter
  sortBy: SortOption
}

const priorityOrder = { high: 3, medium: 2, low: 1 }

export function useFilterTodos(todos: Todo[], filters: TodoFilters): Todo[] {
  return useMemo(() => {
    let filteredTodos = [...todos]

    // filter by search query
    const query = filters.searchQuery.toLowerCase().trim()
    if (query && query.length > 0) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.name.toLowerCase().includes(query)
      )
    }

    // filter by completion status
    if (filters.completionFilter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed)
    } else if (filters.completionFilter === 'incomplete') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed)
    }

    // sort
    filteredTodos.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'priority':
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        default:
          return 0
      }
    })

    return filteredTodos
  }, [todos, filters])
}
