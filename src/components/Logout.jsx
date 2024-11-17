import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../app.scss';

function Logout () {
    // const navigate = useNavigate();
    // const [navigate, setNavigate] = useState(useNavigate());
    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();      
        // setNavigate('/Login');
    }

    return (
        <>
            <button onClick={logout} id="logout"> Logout </button>
        </>
    )
}

export default Logout