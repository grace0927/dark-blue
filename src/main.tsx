import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'

// Demo app for development
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-4">Dark Blue Design System</h1>
      <p className="text-muted-foreground">
        Run <code className="bg-muted px-2 py-1 rounded">npm run storybook</code> to view components.
      </p>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
