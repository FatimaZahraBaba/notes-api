import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
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
