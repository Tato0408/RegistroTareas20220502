// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { TaskProvider } from './contexts/TaskContext.jsx' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider> 
        <App />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
)