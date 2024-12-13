import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import Select from "react-select";
import './style.scss'
import Notes from "../Notes";
import del from './../../../public/del.png'



function ManageNote() {

    const selectStyles = {
        control: base => ({
            ...base,
            backgroundColor: "#474336",
            padding: "6px 0",
            border: 0,
            boxShadow: "none",
            borderRadius: 6,
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#797462",
          borderRadius: 5,
          padding: "2px 5px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#fff",
          textTransform: "capitalize"
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "#fff",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "#ddca89",
            color: "#474336",
          },
        }),
        menu: base => ({
            ...base,
            backgroundColor: "transparent"
        }),
        menuList: base => ({
            ...base,
            backgroundColor: "#797462",
            borderRadius: 6
        }),
        option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isFocused ? "#474336" : "#797462",
            cursor: "pointer",
            textTransform: "capitalize"
        }), 
    };

    const navigate = useNavigate();

    const {id} = useParams();
    const [noteData, setNoteData] = useState({});
    const [usersOptions, setUsersOptions] = useState([]);   
    const [selectedUsers, setSelectedUsers] = useState([]); 
    const shared_with = selectedUsers.map(u => u.value);


    useEffect( () => {
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
        getUsers();         
    }, [])

    useEffect( () => {
        const getNote = async (e) => {
            if(id) {
                const url = `/notes/${id}`;
                const resp = await axios.get(url);
                setNoteData(resp.data);
                const options = resp.data.shared_with.map( ({first_name, last_name, id}) => 
                    ({
                            label : `${first_name} ${last_name}`,
                            value : id
                        
                    }));
                setSelectedUsers(options); 
            }
        }
        getNote();
    }, [])

    const onChangeSelect = (e) => {
        setSelectedUsers([...e]);
    }

    const submitNote = async (e) => {
        e.preventDefault();
        if(id) {
            // const url = `/notes/${id}`;
            const resp = await axios.put(`/notes/${id}`, {...noteData, shared_with});
        } else {
            // const url = '/notes';
            const resp = await axios.post('/notes', {...noteData, shared_with});
        }
        navigate('/');
    }
    
    const handleChange = (e) => {   
        setNoteData({...noteData, [e.target.name]: e.target.value});
    }

    const cancel = () => {
        navigate('/');
    }

    return (
        <>
        <div className="container">
            <div className="blur-bg"><Notes /></div>
            <div className="manage-note">
                <form >
                    <button id="cancel" onClick={cancel}><img src={del} /></button>
                
                    <input type="text" name="title" value={noteData.title} onChange={handleChange} placeholder="Title" required/> <br />
                    <textarea name="content" value={noteData.content} onChange={handleChange} placeholder=" Content ..." maxLength={200} required></textarea> <br />
                    <Select id="input-select" onChange={onChangeSelect} value={selectedUsers} isMulti name="users" options={usersOptions} styles={selectStyles} placeholder='Share this note' />
                    <button id="manage-note" className={id ? 'update-note' : 'add-note'} onClick={submitNote}> {id ? 'Update' : 'Add'} </button>
                </form>
            </div>
        </div>
        </>
    )
}
export default ManageNote