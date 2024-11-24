import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


function CreateNote({note}) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(`title: ${title} - content: ${content}`);
        const url = 'https://notes.devlop.tech/api/notes';
        const resp = await axios.post(url, {title, content});
        console.log(resp);
        navigate('/');
    }

    return (
        <>
            <h1 id="note">Note</h1>
            <form action="" id='create-note' >
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required/> <br />
                <textarea name="content" value={content} onChange={e => setContent(e.target.value)} placeholder=" Content ..." maxLength={200} required></textarea> <br />
                <button id="add-note" onClick={submitForm}>Add</button>
            </form>
        </>
    )
}
export default CreateNote