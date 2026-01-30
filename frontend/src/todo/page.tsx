import { useState } from 'react'
import type { Todo, TodoFormData } from './types'
import { useTodoState } from './functions/useTodoState'
import { useFilterTodos, type CompletionFilter, type SortOption } from './functions/useFilterTodos'
import { DarkModeToggle } from './components/DarkModeToggle'
import { TodoCard } from './components/TodoCard'
import { TodoModal } from './components/TodoModal'
import { SearchBar } from './components/SearchBar'
import { FilterControls } from './components/FilterControls'

export default function Home() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodoState()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [formData, setFormData] = useState<TodoFormData>({
    name: '',
    description: '',
    priority: 'medium'
  })

  const filteredTodos = useFilterTodos(todos, {
    searchQuery,
    completionFilter,
    sortBy
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
      <div
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <FilterControls
          completionFilter={completionFilter}
          sortBy={sortBy}
          onCompletionFilterChange={setCompletionFilter}
          onSortChange={setSortBy}
        />

        {/* todos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredTodos.map(todo => (
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

        {filteredTodos.length === 0 && todos.length > 0 && (
          <div
            className="text-center py-20 rounded-lg"
            style={{
              backgroundColor: 'var(--color-container)',
              color: 'var(--color-muted)'
            }}
          >
            <p className="text-xl">No tasks match your search.</p>
          </div>
        )}
      </div>

      <TodoModal
        isOpen={isModalOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={closeModal}
        isEditing={editingTodoId !== null}
      />

      {/* Add Task Button */}
      <button
        onClick={() => openModal()}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 px-6 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-110 shadow-2xl z-20"
        style={{
          backgroundColor: 'var(--color-correct)',
          color: 'white'
        }}
      >
        <span className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center text-xl">+</div>
          <span className="hidden sm:inline">Add Task</span>
        </span>
      </button>
    </div>
  )
}