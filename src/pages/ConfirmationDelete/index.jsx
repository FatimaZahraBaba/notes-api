import React, { useRef } from 'react'
import './style.scss'
import axios from 'axios'
import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function ConfirmationDelete() {

    const [notesList, setNotesList] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    

    const getNotes = async () => {
        const url = '/notes';
        const resp = await axios.get(url);
        setNotesList(resp.data);
    }
    useEffect(() => {
        getNotes();
    }, [])
    const deleteNote = async () => {
        const url = `/notes/${id}`;
        const resp = await axios.delete(url);
        getNotes();
        console.log(id);
        
        navigate('/');
    }

    const cancelDelete = () => {
        navigate('/');
    }

  return (
    
    <>
    <div className="confirmation-container">
        <div className="confirmation-delete">
            <div className="confirmation-msg">
                <span>Are you sure you want to delete this note?</span>
            </div>
            <div className="confirmation-btns">
                <button onClick={deleteNote} className="confirmation-delete-yes">Yes</button>
                <button onClick={cancelDelete} className="confirmation-delete-no">No</button>
            </div>
        </div>
    </div>
    </>

  )
}

export default ConfirmationDelete