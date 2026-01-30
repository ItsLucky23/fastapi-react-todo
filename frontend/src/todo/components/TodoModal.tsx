import { createPortal } from 'react-dom'
import type { Priority, TodoFormData } from '../types'
import { getPriorityColor } from '../functions/getPriorityColor'

interface TodoModalProps {
  isOpen: boolean
  formData: TodoFormData
  setFormData: React.Dispatch<React.SetStateAction<TodoFormData>>
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  isEditing: boolean
}

export function TodoModal({
  isOpen,
  formData,
  setFormData,
  onSubmit,
  onClose,
  isEditing
}: TodoModalProps) {
  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4 animate-fadeIn bg-black/70"
      onClick={onClose}
    >
      <div
        className="rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scaleIn border bg-container border-container-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl font-bold text-title"
          >
            {isEditing ? 'Edit Task' : 'Create Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-muted"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* title */}
          <div>
            <label
              className="block text-sm font-medium mb-2 text-common"
            >
              Task Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 bg-container2 border-container2-border text-title"
              placeholder="Enter task name"
              required
            />
          </div>

          {/* description */}
          <div>
            <label
              className="block text-sm font-medium mb-2 text-common"
            >
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 resize-none"
              style={{
                backgroundColor: 'var(--color-container2)',
                borderColor: 'var(--color-container2-border)',
                color: 'var(--color-title)'
              }}
              placeholder="Enter task description"
              rows={4}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--color-common)' }}
            >
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as Priority[]).map(priority => {
                const bgColor = formData.priority === priority
                  ? getPriorityColor(priority).bg
                  : 'bg-container3'
                const textColor = formData.priority === priority
                  ? 'text-white'
                  : 'text-common'

                return (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority })}
                    className={`
                    px-4 py-2 rounded-lg font-medium capitalize transition-all duration-300 
                    ${formData.priority === priority ? '' : 'opacity-40'}
                    ${bgColor} ${textColor}
                  `}
                  >
                    {priority}
                  </button>
                )
              })}
            </div>
          </div>

          {/* submit / close */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
              style={{
                backgroundColor: 'var(--color-container3)',
                color: 'var(--color-common)'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--color-correct)',
                color: 'white'
              }}
            >
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  )
}
