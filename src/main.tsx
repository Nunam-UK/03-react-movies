import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Додано
import './index.css'
import App from './components/App/App.tsx'
import 'modern-normalize/modern-normalize.css'

const queryClient = new QueryClient(); // Створюємо клієнт

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)