import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Sign from './signup.jsx' 
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Sign/>
  </StrictMode>,
)
