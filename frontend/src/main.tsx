import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './fontawesome' // Initialize Font Awesome library
import Home from './page'
import TodoPage from './todo/page'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
    <Toaster position="bottom-right" richColors />
  </StrictMode>,
)
