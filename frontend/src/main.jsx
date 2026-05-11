// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { HomeworkProvider } from './contexts/HomeworkContext.jsx' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HomeworkProvider> 
        <App />
      </HomeworkProvider>
    </AuthProvider>
  </React.StrictMode>,
)