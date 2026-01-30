import type { Priority } from '../types'

export function getPriorityColor(priority: Priority) {
  switch (priority) {
    case 'low':
      return {
        text: 'text-[var(--color-priority-low)]',
        bg: 'bg-[var(--color-priority-low)]'
      }
    case 'medium':
      return {
        text: 'text-[var(--color-priority-medium)]',
        bg: 'bg-[var(--color-priority-medium)]'
      }
    case 'high':
      return {
        text: 'text-[var(--color-priority-high)]',
        bg: 'bg-[var(--color-priority-high)]'
      }
  }
}
