import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './app.scss'
import Login from './components/login'
import GetAllNotes from './components/GetAllNotes'

function App() {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsConnected(true);
    }
  }, [])
  
  return (
    <>
      {/* { isConnected ? <Login setIsConnected={setIsConnected} /> : <GetAllNotes />} */}
      { isConnected ? <GetAllNotes /> : <Login setIsConnected={setIsConnected} /> }      
    </>
  )
}

export default App
