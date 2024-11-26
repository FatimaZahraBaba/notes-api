import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = 'https://notes.devlop.tech/api';
// const token = localStorage.getItem('token');
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
