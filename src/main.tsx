import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Rotas from './rotas.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Rotas />
  </StrictMode>,
)
