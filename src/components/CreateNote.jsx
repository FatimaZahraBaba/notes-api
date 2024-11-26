import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Select from "react-select";


function CreateNote({note}) {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [usersOptions, setUsersOptions] = useState([]);   
    const [selectedUsers, setSelectedUsers] = useState([]); 
    const shared_with = selectedUsers.map(u => u.value);

    const submitForm = async (e) => {
        e.preventDefault();
        const url = '/notes';
        const resp = await axios.post(url, {title, content, shared_with});
        // console.log(resp);
        navigate('/');
    }
    const getUsers = async () => {
        const url = '/users';
        const resp = await axios.get(url);
        const users = resp.data.map(user => {
                                return {
                                            label : `${user.last_name} ${user.first_name}`,
                                            value : user.id
                                        }
                            });
        // console.log(usersOptions);
        setUsersOptions(users);
    }
    const onChangeSelect = (e) => {
        const options = [];
        options.push(...e);
        // console.log(options);
        setSelectedUsers(options);
    }

    useEffect( () => {
        getUsers();         
    }, [])
    
    return (
        <>
            <h1 id="note">Note</h1>
            <form action="" id='create-note' >
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required/> <br />
                <textarea name="content" value={content} onChange={e => setContent(e.target.value)} placeholder=" Content ..." maxLength={200} required></textarea> <br />
                <Select onChange={onChangeSelect} isMulti name="users" options={usersOptions}/>
                <button id="add-note" onClick={submitForm}>Add</button>
            </form>
            {/* {
                selectedUsers.map(u => u.value)
            } */}
        </>
    )
}
export default CreateNote