import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import './app.scss'
import Login from './components/Login'
import GetAllNotes from './components/GetAllNotes'
import Logout from './components/Logout'

function App() {

  const [isConnected, setIsConnected] = useState(false);

  // useEffect(() => {
  //   if(localStorage.getItem('token')) {
  //     setIsConnected(true);
  //   }
  // }, [])
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.interceptors.request.use((request) => {
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    });
    if(token) {
      setIsConnected(true);
    }
  }, []);



  return (
    <>
      { isConnected ? <GetAllNotes /> : <Login setIsConnected={setIsConnected} /> } 
      {/* <Router>
        <Routes>
          {
            isConnected 
            ? 
              <Route exact path="/" element={<GetAllNotes />} /> 
            :
              <Route path="/login" element={<Login setIsConnected={setIsConnected} />} />
          }
          <Route exact path='/logout' element={<Logout />} />
        </Routes>
      </Router> */}
      <Logout />     
    </>
  )
}

export default App
