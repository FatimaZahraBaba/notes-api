import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function GetAllNotes() {

    // const fullName = {
    //     visibility : 'hidden',
    //     backgroundColor: '#F1C232',
    //     color: 'white',
    //     fontSize: '10px',
    //     // width: '150px',
    //     maxWidth: '400px',
    //     maxHeight: '100px',
    //     padding: '5px 10px',
    //     borderRadius: '5px',
    //     position: 'absolute',
    //     top: '-40px',
    //     left: '1px',
    //     // '&:hover' {
    //     //     visibility: 'visible'
    //     // }  
    // }
    
    const [notesList, setNotesList] = useState([]);
    const navigate = useNavigate();

    const addNote = () =>  navigate('/notes') ;

    const [onMouseEnter, setOnMouseEnter] = useState(false);

    // const getNotes = async () => {
    //     const token = localStorage.getItem("token");
    //     const url = '/notes';
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
    const url = '/notes';
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
// console.log(notesList);


const deleteNote = async (e) => {
    const id = e.target.getAttribute('data-id');
    const url = `/notes/${id}`;
    const resp = await axios.delete(url);
    // console.log(resp);
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
                        <th>Shared with</th>
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
                                    <div className='name-position'>
                                    {
                                        note.shared_with.map((user, index) => {
                                            return  <>  
                                                        <div className='border-name'>
                                                            <div className='user-style' key={index}>{user.first_name.substr(0,1)} {user.last_name.substr(0,1)}
                                                                <span className='hover-name'>{user.first_name} {user.last_name}</span>
                                                            </div>
                                                        </div>
                                                    </>       
                                        })  
                                    }
                                    {/* <table>
                                        <tbody>
                                        {
                                            note.shared_with.map((u, index) => {
                                                return <tr key={index}>
                                                    <td>{u.id}</td>
                                                    <td>{u.last_name} {u.first_name}</td>
                                                </tr>             
                                            })
                                        } 
                                        </tbody>
                                    </table> */}
                                    </div>
                                </td>
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