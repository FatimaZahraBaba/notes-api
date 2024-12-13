import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.scss'
import sett from './../../../public/sett.png'



function Header() {
    
    const first_name = localStorage.getItem('first_name');
    const last_name = localStorage.getItem('last_name');

    const navigate = useNavigate();
    const logout = async () => {
        const url = '/logout';
        const resp = await axios.post(url);
        localStorage.removeItem('token');
        navigate('/login');
    }
    const edit_password = async () => {
        navigate('/edit-password');
    }
 
    return (
    <>
        <div className="header-container">
            <div className="hello">
                <h1>Hello {first_name}</h1>
                <img src="./../../../public/hello-icon.png" />
            </div>
            <div className="profil-logout">   
                <div className="settings">
                    <button onClick={edit_password}>Edit password</button>
                    <button onClick={logout} id="logout"> Logout </button>  
                </div>           
                <div className="user-name"></div>
                {/* <button onClick={logout} id="logout"> Logout </button>   */}
            </div>
        </div>
    </>
  )
}

export default Header