import { useState, useEffect } from 'react'

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, default to false if not set
    const savedMode = localStorage.getItem('darkMode')
    return savedMode === 'true'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDarkMode])

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded-lg transition-all duration-300 hover:scale-110 bg-container2 text-common"
    >
      <div className="p-2 h-6 flex items-center justify-center cursor-pointer">
        Toggle {isDarkMode ? 'light mode' : 'dark mode'}
      </div>
    </button>
  )
}
