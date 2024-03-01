import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import "./Signup.scss";
import { STATES } from '../../../constants/stateOptions';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Password:', confirmPassword);
        if (password === confirmPassword) {
            // login logic here (e.g., API call, authentication)
        }
        else {
            // let user know password no match :(
                console.log("password no matchy...TT");
                // is this what u learn at JPMorgan Sue?
        }
        
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1>Sign Up</h1>
                <FormControl required sx={{ m: 1, width: '75%', marginTop:'35px'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} 
                        id="outlined-adornment-email"
                        type='text'
                        label="Email"
                    />
                </FormControl>
                <FormControl required sx={{ m: 1, width: '75%', marginBottom:'8px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} 
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>setShowPassword(!showPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <FormControl required sx={{ m: 1, width: '75%', marginBottom:'8px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)} 
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="ConfirmPassword"
                    />
                </FormControl>
                <button className="signup-button" onClick={handleSignup}>
                    Sign Up
                </button>
                <div className="login-text">
                    Already have an account? <Link className="link" to='/login'>Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;