import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.jsx'


const Root = createRoot(document.getElementById('root'))
Root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
