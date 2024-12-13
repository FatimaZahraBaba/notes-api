import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import del from './../../../public/del.png' 
import './style.scss'
import axios from 'axios'
import Notes from '../Notes'

function EditPassword() {

    const [dataPass, setDataPass] = useState({});
    const currentPassword = localStorage.getItem('password');
    const navigate = useNavigate();    

    const handleChange = (e) => {   
        setDataPass({...dataPass, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/update-password';
        if ((currentPassword === dataPass.current_password) && (dataPass.new_password === dataPass.new_password_confirmation)) {
            const resp = await axios.put(url, dataPass);
            navigate('/login');
        } else {
            console.log('error');
        }
    }
    const cancel = () => {
        navigate('/');
    }
    

  return (
    <>
        <div className="container">
            <div className="blur-bg"><Notes /></div>
            <div className="form-edit">
                <form>
                    <button id="cancel" onClick={cancel}><img src={del} /></button>
                    <input type="password"  name='current_password' onChange={handleChange} placeholder='Current password' />
                    { dataPass.current_password && currentPassword !== dataPass.current_password && <p>Incorrect password</p> }
                    <input type="password" name='new_password' onChange={handleChange} placeholder='New password' />
                    <input type="password" name='new_password_confirmation' onChange={handleChange} placeholder='Confirm new password' />
                    { dataPass.new_password !== dataPass.new_password_confirmation && <p>Passwords do not match</p> }
                    <button onClick={handleSubmit}>Save</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default EditPassword