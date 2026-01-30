import { useState } from 'react'
import type { Todo, TodoFormData } from './types'
import { useTodoState } from './functions/useTodoState'
import { DarkModeToggle } from './components/DarkModeToggle'
import { TodoCard } from './components/TodoCard'
import { TodoModal } from './components/TodoModal'

export default function Home() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodoState()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [formData, setFormData] = useState<TodoFormData>({
    name: '',
    description: '',
    priority: 'medium'
  })

  const openModal = (todo?: Todo) => {
    if (todo) {
      setEditingTodoId(todo.id)
      setFormData({
        name: todo.name,
        description: todo.description,
        priority: todo.priority
      })
    } else {
      setEditingTodoId(null)
      setFormData({
        name: '',
        description: '',
        priority: 'medium'
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTodoId(null)
    setFormData({
      name: '',
      description: '',
      priority: 'medium'
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) return

    if (editingTodoId !== null) {
      updateTodo(editingTodoId, formData)
    } else {
      addTodo(formData)
    }

    closeModal()
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Header */}
      <header
        className="border-b transition-colors duration-300 sticky top-0 z-10"
        style={{
          backgroundColor: 'var(--color-container)',
          borderColor: 'var(--color-container-border)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1
            className="text-2xl sm:text-3xl font-bold transition-colors duration-300"
            style={{ color: 'var(--color-title)' }}
          >
            My Tasks
          </h1>

          <DarkModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Task Button */}
        <button
          onClick={() => openModal()}
          className="mb-8 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          style={{
            backgroundColor: 'var(--color-correct)',
            color: 'white'
          }}
        >
          <span className="flex items-center gap-2">
            {/* Icon placeholder */}
            <div className="w-5 h-5 flex items-center justify-center">+</div>
            <span>Add Task</span>
          </span>
        </button>

        {/* Todo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {todos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onClick={() => openModal(todo)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </div>

        {todos.length === 0 && (
          <div
            className="text-center py-20 rounded-lg"
            style={{
              backgroundColor: 'var(--color-container)',
              color: 'var(--color-muted)'
            }}
          >
            <p className="text-xl">No tasks yet. Click "Add Task" to create one!</p>
          </div>
        )}
      </main>

      {/* Modal */}
      <TodoModal
        isOpen={isModalOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={closeModal}
        isEditing={editingTodoId !== null}
      />
    </div>
  )
}