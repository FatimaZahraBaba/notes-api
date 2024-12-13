import { useEffect, useState } from 'react';
import {Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Header from './pages/Header'
import ManageNote from './pages/ManageNote'
import Sppiner from './pages/Sppiner'
import EditPassword from './pages/EditPassword'
import ConfirmationDelete from './pages/ConfirmationDelete'


axios.interceptors.request.use((request) => { 
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

function App() {
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
          navigate('/login');
      }
      return error;
    });
  }, []);

  return (
    <>
      <Sppiner />
        {
          // localStorage.getItem('token') && <Header />
          location.pathname !== '/login' && <Header />
        }
        <Routes>
          <Route exact path='/' element={<Notes />} />
          <Route path='/login' element={<Login />} />
          <Route path='/notes' element={<ManageNote />} />
          <Route path='/notes/:id' element={<ManageNote />} />
          <Route path='/edit-password' element={<EditPassword />} />
          <Route path='/confirmation-delete/:id' element={<ConfirmationDelete />} />
        </Routes>
    </>
  )
}

export default App
