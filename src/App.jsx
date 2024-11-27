import { useEffect, useState } from 'react';
import {Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './app.scss'
import Login from './components/Login'
import GetAllNotes from './components/GetAllNotes'
import Logout from './components/Logout'
import ManageNote from './components/ManageNote';
// import CreateNote from './components/CreateNote'
// import UpdateNote from './components/UpdateNote'

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  // console.log('Interceptor request called');
  // console.log(request);
  return request;
});

function App() {
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
          navigate('/login');
      }
      // console.log('Interceptor response called');
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
      <div id='bg-body'></div>
      {/* { isConnected ? <GetAllNotes /> : <Login setIsConnected={setIsConnected} /> }  */}
      {/* <Router> */}
        <Routes>
          <Route exact path='/' element={<GetAllNotes />} />
          <Route path='/login' element={<Login />} />
          <Route path='/notes' element={<ManageNote />} />
          <Route path='/notes/:id' element={<ManageNote />} />
        </Routes>
        {
          localStorage.getItem('token') ? <Logout /> : ''
        }
      {/* </Router> */}
    </>
  )
}

export default App
