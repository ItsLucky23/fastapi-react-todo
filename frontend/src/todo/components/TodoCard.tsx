import type { Todo } from '../types'
import { getPriorityColor } from '../functions/getPriorityColor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface TodoCardProps {
  todo: Todo
  onClick: () => void
  onDelete: () => void
}


export function TodoCard({ todo, onClick, onDelete }: TodoCardProps) {
  const prio = getPriorityColor(todo.priority);

  return (
    <div
      onClick={onClick}
      className="rounded-lg p-6 cursor-pointer border bg-container border-container-border"
    >
      {/* prio balk */}
      <div
        className={`w-full h-1.5 rounded-full mb-4 ${prio.bg}`}
      />

      {/* title */}
      <h3
        className="text-lg font-semibold line-clamp-2"
        style={{ color: 'var(--color-title)' }}
      >
        {todo.name}
      </h3>

      {/* description */}
      <p
        className="text-sm mb-4 line-clamp-3"
        style={{ color: 'var(--color-common)' }}
      >
        {todo.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded capitalize ${prio.text}`}
        >
          {todo.priority}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="w-8 h-8 rounded-full transition-colors hover:bg-wrong"
          aria-label="Delete task"
        >
          {/* Icon placeholder for delete */}
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </div>
  )
}
