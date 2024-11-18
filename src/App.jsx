import { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './app.scss'
import Login from './components/Login'
import GetAllNotes from './components/GetAllNotes'
import Logout from './components/Logout'

   
axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Interceptor called');
  console.log(request);
  return request;
  
});

const navigate = useNavigate();

function App() {
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

  // const [isConnected, setIsConnected] = useState(false);
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if(token) {
  //     setIsConnected(true);
  //   }
  // }, []);

  return (
    <>
      {/* { isConnected ? <GetAllNotes /> : <Login setIsConnected={setIsConnected} /> }  */}
      {/* <Router> */}
        <Routes>
          <Route path='/' element={<> <GetAllNotes /> <Logout /> </>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      {/* </Router> */}
    </>
  )
}

export default App
