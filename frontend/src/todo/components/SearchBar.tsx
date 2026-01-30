import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full mb-6">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="search tasks..."
          className="w-full px-4 py-3 pl-10 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 bg-container text-title border-container-border border-1"
        />
        <div
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-muted"
        >
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </div>
  )
}
