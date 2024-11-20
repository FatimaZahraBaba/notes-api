import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function UpdateNote() {
     
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const id = useParams().id;
    
    useEffect(() => {
        const getNote = async () => {
            const url = `https://notes.devlop.tech/api/notes/${id}`;
            const resp = await axios.get(url);
            setTitle(resp.data.title);
            setContent(resp.data.content);
            // console.log(resp.data);
            // console.log(id);   
        }
        getNote();
    }, []);

    const setNote = async (e) => {
        e.preventDefault();
        const url = `https://notes.devlop.tech/api/notes/${id}`;
        const resp = await axios.put(url, {title, content});
        // console.log(resp);
        navigate('/');
    }

    return (
        <>
            <h1 id="note">Update Note</h1>
            <form action="" id='create-note' >
                <input type="text" name='title' value={title} onChange={e => setTitle(e.target.value)}  placeholder="Title" required/> <br />
                <textarea name='content' value={content} onChange={e => setContent(e.target.value)}  placeholder=" Content ..." maxLength={200} required></textarea> <br />
                <button id="update-note" onClick={setNote}>Update</button>
            </form>
        </>
    )   
}

export default UpdateNote