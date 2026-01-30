import type { CompletionFilter, SortOption } from '../functions/useFilterTodos'

interface FilterControlsProps {
  completionFilter: CompletionFilter
  sortBy: SortOption
  onCompletionFilterChange: (filter: CompletionFilter) => void
  onSortChange: (sort: SortOption) => void
}

export function FilterControls({
  completionFilter,
  sortBy,
  onCompletionFilterChange,
  onSortChange
}: FilterControlsProps) {
  return (
    <div className="w-full mb-6 flex flex-col sm:flex-row gap-4">
      <div className="">
        <label className="text-sm font-medium text-muted">
          Show
        </label>
        <select
          value={completionFilter}
          onChange={(e) => onCompletionFilterChange(e.target.value as CompletionFilter)}
          className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 bg-container text-title border-container-border border-1"
        >
          <option value="all">All Tasks</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="">
        <label className="text-sm font-medium text-muted">
          Sort by
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 bg-container text-title border-container-border border-1"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
          <option value="priority">Priority (High-Low)</option>
        </select>
      </div>
    </div>
  )
}
