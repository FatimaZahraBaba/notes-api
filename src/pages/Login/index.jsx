import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import icon from './../../../public/hello-icon.png';
import user from './../../../public/user.png';
import password from './../../../public/password1.png';
import './style.scss';
import Input from '../../components/Inputs';

function Login() {

    const [userName, setUserName] = useState('');
    const [cin, setCin] = useState('JK36184');
    const [pass, setPassword] = useState('123456');
    const navigate = useNavigate();

    const onButtonClick = async (e) => {
        e.preventDefault(); 
        const url = '/login';
        const resp = await axios.post(url, {cin, "password": pass});
        const token = resp.data.token;
        const user = resp.data.user;
        const {first_name, last_name} = user;
        console.log({first_name, last_name, token});
        
        localStorage.setItem('first_name', first_name);
        localStorage.setItem('last_name', last_name);
        localStorage.setItem('password', pass);
        localStorage.setItem('token', token);
        navigate('/');

    }

  return (
    <>
        <div className="login-container">
            <div className='login'>
                <img src={icon} />
                <div className='login-details'>
                    <h1>Login</h1>
                    <form>
                        <Input img={user} value={cin} handleChange={ e => setCin(e.target.value)} placeholder='CIN' />
                        <Input type='password' img={password} value={pass} handleChange={ e => setPassword(e.target.value)} placeholder='Password' />
                        <button  onClick={onButtonClick} id='login'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
