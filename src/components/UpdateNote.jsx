import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateNote() {
     
    const navigate = useNavigate();

    const [noteData, setNoteData] = useState({});
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const {id} = useParams();
    
    useEffect(() => {
        const getNote = async () => {
            const url = `https://notes.devlop.tech/api/notes/${id}`;
            const resp = await axios.get(url);
            setNoteData(resp.data);
            // console.log(resp.data);
            // console.log(id);   
        }
        getNote();
    }, []);

    const setNote = async (e) => {
        e.preventDefault();
        const url = `https://notes.devlop.tech/api/notes/${id}`;
        const resp = await axios.put(url, noteData);
        // console.log(resp);
        navigate('/');
    }

    const handleChange = (e) => {   
        setNoteData({...noteData, [e.target.name]: e.target.value});
    }

    return (
        <>
            <h1 id="note">Update Note</h1>
            <form action="" id='create-note' >
                <input type="text" name='title' value={noteData.title} onChange={handleChange}  placeholder="Title" required/> <br />
                <textarea name='content' value={noteData.content} onChange={handleChange}  placeholder=" Content ..." maxLength={200} required></textarea> <br />
                <button id="update-note" onClick={setNote}>Update</button>
            </form>
        </>
    )   
}

export default UpdateNote