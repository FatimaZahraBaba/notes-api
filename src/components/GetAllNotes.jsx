import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function GetAllNotes() {
    
    const [notesList, setNotesList] = useState([]);
    const navigate = useNavigate();

    const addNote = () => { navigate('/notes') }

    
    // const getNotes = async () => {
    //     const token = localStorage.getItem("token");
    //     const url = 'https://notes.devlop.tech/api/notes';
    //     const resp = await axios.get(url, {
    //         headers : {
    //             Authorization : `Bearer ${token}`
    //         }
    //     });
    //     setNotesList(resp.data);
    //     // console.log(resp.data);
    // }

    // useEffect(() => {
    //     getNotes();
    // }, [])


const getNotes = async () => {
    const url = 'https://notes.devlop.tech/api/notes';
    // try {
        const resp = await axios.get(url);
        setNotesList(resp.data);
    // } catch(e) {
    //     console.log(`Error : ${e}`);
    // }
}
useEffect(() => {
    // const token = localStorage.getItem("token");
    // if(!token) {
    //     navigate('/login');
    // }
    getNotes();
}, [])

const deleteNote = async (e) => {
    const id = e.target.getAttribute('data-id');
    const url = `https://notes.devlop.tech/api/notes/${id}`;
    const resp = await axios.delete(url);
    console.log(resp);
    getNotes();
}

const updateNote = async (e) => {
    const id = e.target.getAttribute('data-id');
    navigate(`/notes/${id}`);
}

  return (
    <>
    <div className="notes">
        <h1>Notes List</h1>
        <button id='add' onClick={addNote}>Add note</button>
            <table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th id='action'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        notesList.map((note, index) => (
                            <tr key={index}>
                                <td> {note.id} </td>
                                <td> {note.title} </td>
                                <td> {note.content} </td>
                                <td> 
                                    <button data-id={note.id} id='delete' onClick={deleteNote}> Delete </button> 
                                    <button data-id={note.id} id='update' onClick={updateNote}> Update </button> 
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
    </>
  )
}

export default GetAllNotes