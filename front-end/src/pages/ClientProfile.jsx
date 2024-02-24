import React, { useState } from 'react';
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

    return (
        <div className="client-profile">
            <div className="main-content">
                <Sidebar />
                <div className="container">
                    <h1>My Profile</h1>
                    <form id="client-profile-form">
                        <div className="form-row">

                            <TextField
                                label="First Name"
                                value={firstName}
                                fullWidth
                                placeholder='John'
                                variant='filled'
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                            <TextField
                                label="Last Name"
                                value={lastName}
                                fullWidth
                                placeholder='Doe'
                                variant='filled'
                                onChange={e => setLastName(e.target.value)}
                                required
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
                            />
                        </div>
                        <div className="form-row">
                            <TextField
                                label="Address 2"
                                fullWidth
                                value={address2}
                                variant='filled'
                                onChange={e => setAddress2(e.target.value)}

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
                            />
                            <FormControl required variant="filled" sx={{ minWidth: 200 }} >
                                <InputLabel id="state-label">State</InputLabel>
                                <Select
                                    labelId="state-label"
                                    value={state}

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
                                    {/* Add more MenuItem components for other states */}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Zipcode"
                                value={zipcode}
                                placeholder='11554'
                                variant='filled'
                                onChange={e => setZipcode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group button-container">
                            <Button className="btn" variant="contained" color="primary" style={{ borderRadius: 50 }}>
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
