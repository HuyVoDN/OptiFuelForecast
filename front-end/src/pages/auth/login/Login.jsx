import React, {useContext, useState} from "react";
import './Login.scss';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { AuthContext } from '../../../context/authContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  // do a get method to retrieve the username
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await login(email, password);
      const username = response.data.username;
      console.log('Username(From Login):', username);
      console.log('Token(From Login):', response.data.token);
      navigate(`/${username}/profile`);
    } catch (error)
    {
      console.log(error.response.data);
      setError(error.response.data);
    }

  };

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
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
        {error && <div className="error">{error}</div>}
        <div className="forgotPassword">
          <Link className="link" to='/contactus'>Forgot password?</Link>
        </div>
          <button className="login-button" onClick={handleLogin}>
              Login
          </button>
        <div className="signup-text">
          New user? <Link className="link" to='/signup'>Sign up here</Link>
        </div>
      </div>
    </div>  
    
  );
}
export default Login

 