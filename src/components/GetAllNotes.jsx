import { useEffect, useState } from 'react'
import axios from 'axios';


function GetAllNotes() {
    
    const [notesList, setNotesList] = useState([]);
    const token = localStorage.getItem("token");
    
    const getNotes = async () => {
        const url = 'https://notes.devlop.tech/api/notes';
        const resp = await axios.get(url, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        console.log(resp.data);
        setNotesList(resp.data);
    }

useEffect(() => {
    getNotes();
}, []);

  return (
    <>
        <h1>Notes List</h1>
        
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        notesList.map((note, index) => (
                            <tr key={index}>
                                <td key={note.id}> {note.id} </td>
                                <td key={note.title}> {note.title} </td>
                                <td key={note.content}> {note.content} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </>
  )
}

export default GetAllNotes