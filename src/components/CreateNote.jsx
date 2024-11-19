import { useRef } from "react"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


function CreateNote() {

    // const titleField = useRef();
    // const contentField = useRef();
    // const shareField = useRef();

    // const validateForm = (e) => {
    //     e.preventDefault();
    //     const titleValue = titleField.current.value;
    //     const contentValue = contentField.current.value;
    //     const shareValue = shareField.current.value;

    //     console.log(titleValue);
    //     console.log(contentValue);
    //     console.log(shareValue);
        
    // }



    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    // const [sharedWith, setsharedWith] = useState([]);

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(`title: ${title} - content: ${content}`);
        const url = 'https://notes.devlop.tech/api/notes';
        const resp = await axios.post(url, {title, content});
        console.log(resp);
        // navigate('/');
    }

    return (
        <>
            <form action="" id='create-note' >
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required/> <br />
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder=" Content ..." maxLength={200} required></textarea> <br />
                {/* <small>Shared with</small>
                <select value={sharedWith} multiple onChange={e => setsharedWith(e.target.value)}>
                    <option value="Shared-with"></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select> */}
                <button id="add-note" onClick={submitForm}>Add</button>
            </form>
        </>
    )
}
export default CreateNote