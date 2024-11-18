import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../app.scss';
import axios from "axios";

function Logout () {

    const navigate = useNavigate();
    const logout = async () => {
        console.log("Redirecting...");
        const url = 'https://notes.devlop.tech/api/logout';
        const resp = await axios.post(url);
        // console.log(resp.data);
        localStorage.removeItem('token');
        navigate('/login');
        // window.location.reload();      
    }

    return (
        <>
            <button onClick={logout} id="logout"> Logout </button>
        </>
    )
}

export default Logout