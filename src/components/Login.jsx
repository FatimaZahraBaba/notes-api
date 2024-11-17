import { useState } from 'react'
import axios from 'axios';

function Login(props) {

    
    const [cin, setCin] = useState('JK36184');
    const [pass, setPassword] = useState('123456');

    const onButtonClick = async (e) => {
        e.preventDefault(); //Pour eliminer le comportement par defaut d un form (submit) {3 methodes : preventDefault / type button/ <div> au lieu de <form>}
        try {
            const url = 'https://notes.devlop.tech/api/login';
            const resp = await axios.post(url, {cin, "password": pass});
            const token = resp.data.token;
            localStorage.setItem('token', token);
        } catch (e) {
            console.log("Error : " + e);
        }
        props.setIsConnected(true);
        // props.setToken(token);
    }

  return (
    <>
    {/* <h1>{JSON.stringify(props)}</h1> */}
      <form action="">
        <input type="text" value={cin} onChange={ e => setCin(e.target.value)} placeholder='CIN' /> <br />
        <input type="text" value={pass} onChange={ e => setPassword(e.target.value)} placeholder='Password' /> <br />
        <button  onClick={onButtonClick} id='login'>Login</button>
        {/* <button type='button' onClick={onButtonClick}>Login</button> */}
        {/* <input type="submit" value="Login"/> */}
      </form>
    </>
  )
}

export default Login
