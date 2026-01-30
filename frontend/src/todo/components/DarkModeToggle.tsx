import { useState, useEffect } from 'react'

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
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
