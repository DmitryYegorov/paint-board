import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import BoardView from './views/BoardView'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BoardView />
  </StrictMode>,
)
