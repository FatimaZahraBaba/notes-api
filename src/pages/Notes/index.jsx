import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import del from './../../../public/del.png'
import up from './../../../public/up.png'
import add from './../../../public/add.png'
import './style.scss'
import ConfirmationDelete from '../ConfirmationDelete';


function Notes() {

    const [notesList, setNotesList] = useState([]);
    const navigate = useNavigate();
    const addNote = () =>  navigate('/notes') ;
    // const [onMouseEnter, setOnMouseEnter] = useState(false);

    const getNotes = async () => {
        const url = '/notes';
        const resp = await axios.get(url);
        setNotesList(resp.data);
    }
    useEffect(() => {
        getNotes();
    }, [])


    const deleteNote = async (id) => {
        const confirmed = confirm('Are you sure you want to delete this note?');
        if (confirmed) {
            const url = `/notes/${id}`;
            const resp = await axios.delete(url);
            getNotes();
        }
        navigate('/');
        // navigate(`/confirmation-delete/${id}`);
    }
 
    const updateNote = async (id) => {
        navigate(`/notes/${id}`);
    }

    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };



  return (
    <>
    <div className="notes-container">
        <div className="notes">
            <div className="add-btn">
                <button id='add' onClick={addNote}><img src={add} /></button>   
            </div>
            <div className='liste-notes'>     
                {
                    notesList.map( (note, index) => {
                        return <div className='note' key={index} >
                                    <div className="note-header">
                                        <span>{note.date.slice(0, 10).replaceAll('-', '/')}</span>
                                        <div className='del-up'>
                                            <button className='icon-up' onClick={() => updateNote(note.id)}> <img src={up} /> </button>
                                            <button className='icon-del' onClick={() => deleteNote(note.id)}> <img src={del} /></button> 
                                        </div>
                                    </div>
                                    <div className='note-title'><span>{note.title}</span> </div>
                                    <hr />
                                    <div className='note-content'><span>{note.content}</span></div>
                                    <div className='note-shared'>
                                    {
                                        note.shared_with.map((user, index) => {
                                            return  <div key={index} className='user-style'>{user.first_name.substr(0,1)}{user.last_name.substr(0,1)}
                                                        <span className='hover-name'>{user.last_name} {user.first_name}</span>
                                                    </div>                                                       
                                        }) 
                                    } 
                                    </div>

                                </div>
                        })
                }
                
             </div>             
        </div>
    </div>
    </>
  )
}

export default Notes