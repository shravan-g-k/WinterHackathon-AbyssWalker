import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Docscan from './docanalyzer.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Docscan />
  </StrictMode>,
)
