import React, { useState, useEffect } from 'react';
import pencilIcon from '../assets/pencil_icon2.png';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';
import './ClientProfile.scss';

const ClientProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const { username } = useParams();
    const navigate = useNavigate();

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        Axios.get(`http://localhost:3000/users/${username}`)
            .then((response) => {
                // Handle the response, e.g. set your state
                const user = response.data;
                setFirstName(user.firstname);
                setLastName(user.lastname);
                setAddress1(user.address1);
                setAddress2(user.address2);
                setCity(user.city);
                setState(user.state);
                setZipcode(user.zipcode);
                //console.log(user);
            })
            .catch((error) => {
                // If the user does not exist and logged in, redirect to the 404 page
                if (error.response && error.response.status === 404) {
                    navigate('/404');
                }
            });
    }, [username, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.patch(`http://localhost:3000/users/${username}`, {
            firstName,
            lastName,
            address1,
            address2,
            city,
            state,
            zipcode,
        }).then((response) => {
            // response handling
            setIsEditing(false);

        }).catch(error => {
            // error handling
            console.error(error);
        })

    };
    return (
        <div className="client-profile">
            <div className="main-content">
                <Sidebar />
                <div className="container">
                    <div className="profile-row">
                        <h1>My Profile</h1>
                        <img onClick={handleEdit} className='pencil-icon' src={pencilIcon}></img>
                    </div>
                    <form id="client-profile-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <TextField
                                label="First Name"
                                value={firstName}
                                fullWidth
                                placeholder='John'
                                variant='filled'
                                onChange={e => setFirstName(e.target.value)}
                                required
                                disabled={!isEditing}
                            />
                            <TextField
                                label="Last Name"
                                value={lastName}
                                fullWidth
                                placeholder='Doe'
                                variant='filled'
                                onChange={e => setLastName(e.target.value)}
                                required
                                disabled={!isEditing}
                            />
                        </div>
                        <div className='form-row'>
                            <TextField
                                label="Address 1"
                                value={address1}
                                fullWidth
                                placeholder='123 Sesame St.'
                                variant='filled'
                                onChange={e => setAddress1(e.target.value)}
                                required
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-row">
                            <TextField
                                label="Address 2"
                                value={address2}
                                fullWidth
                                variant='filled'
                                onChange={e => setAddress2(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-row">
                            <TextField
                                label="City"
                                value={city}
                                placeholder='Houston'
                                variant='filled'
                                onChange={e => setCity(e.target.value)}
                                required
                                disabled={!isEditing}
                            />
                            <FormControl required variant="filled" sx={{ minWidth: 200 }} >
                                <InputLabel id="state-label">State</InputLabel>
                                <Select
                                    labelId="state-label"
                                    value={state}
                                    disabled={!isEditing}
                                    onChange={e => setState(e.target.value)}
                                >
                                    <MenuItem value={'TX'}>TX</MenuItem>
                                    <MenuItem value={'NY'}>NY</MenuItem>
                                    <MenuItem value={'CA'}>CA</MenuItem>
                                    <MenuItem value={'FL'}>FL</MenuItem>
                                    <MenuItem value={'PA'}>PA</MenuItem>
                                    <MenuItem value={'IL'}>IL</MenuItem>
                                    <MenuItem value={'OH'}>OH</MenuItem>
                                    <MenuItem value={'GA'}>GA</MenuItem>
                                    <MenuItem value={'NC'}>NC</MenuItem>
                                    <MenuItem value={'MI'}>MI</MenuItem>
                                    <MenuItem value={'NJ'}>NJ</MenuItem>
                                    <MenuItem value={'VA'}>VA</MenuItem>
                                    <MenuItem value={'WA'}>WA</MenuItem>
                                    <MenuItem value={'AZ'}>AZ</MenuItem>
                                    <MenuItem value={'MA'}>MA</MenuItem>
                                    <MenuItem value={'TN'}>TN</MenuItem>
                                    <MenuItem value={'IN'}>IN</MenuItem>
                                    <MenuItem value={'MO'}>MO</MenuItem>
                                    <MenuItem value={'MD'}>MD</MenuItem>
                                    <MenuItem value={'WI'}>WI</MenuItem>
                                    <MenuItem value={'CO'}>CO</MenuItem>
                                    <MenuItem value={'MN'}>MN</MenuItem>
        
                                </Select>
                            </FormControl>
                            <TextField
                                label="Zipcode"
                                value={zipcode}
                                placeholder='11554'
                                variant='filled'
                                onChange={e => setZipcode(e.target.value)}
                                required
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group button-container">
                            <Button type="submit" className="btn" variant="contained" color="primary" style={{ borderRadius: 50 }}>
                                Save
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ClientProfile;
