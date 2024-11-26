import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

function UpdateNote() {
     
    const navigate = useNavigate();
    const {id} = useParams();
    const [noteData, setNoteData] = useState({});
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [usersOptions, setUsersOptions] = useState([]);  
    const shared_with = selectedUsers.map(u => u.value);


    useEffect(() => {
        const getNote = async () => {
            const url = `/notes/${id}`;
            const resp = await axios.get(url);
            setNoteData(resp.data);
            const options = resp.data.shared_with.map( u => {
                return {
                        label : `${u.first_name} ${u.last_name}`,
                        value : u.id
                       }
            });
            setSelectedUsers(options); 
        }
        getNote();
    }, []);  
    
    const getUsers = async () => {
        const url = '/users';
        const resp = await axios.get(url);
        const users = resp.data.map(user => {
                                return {
                                            label : `${user.last_name} ${user.first_name}`,
                                            value : user.id
                                        }
                            });
        setUsersOptions(users);
    }
    const onChangeSelect = (e) => {
        const options = [];
        options.push(...e);
        // console.log(options);
        setSelectedUsers(options);
    }
    useEffect(() => {
        getUsers();
    }, []);
    // console.log(usersOptions);
    

    const setNote = async (e) => {
        e.preventDefault();
        const url = `/notes/${id}`;
        const resp = await axios.put(url, {...noteData, shared_with});
        navigate('/');
    }

    const handleChange = (e) => {   
        setNoteData({...noteData, [e.target.name]: e.target.value});
    }

    return (
        <>
            <h1 id="note">Update Note</h1>
            <form>
                <input type="text" name='title' value={noteData.title} onChange={handleChange}  placeholder="Title" required/> <br />
                <textarea name='content' value={noteData.content} onChange={handleChange}  placeholder=" Content ..." maxLength={200} required></textarea> <br />
                <Select onChange={onChangeSelect} isMulti name="users" value={selectedUsers} options={usersOptions}/>
                <button id="update-note" onClick={setNote}>Update</button>
            </form>
        </>
    )   
}

export default UpdateNote