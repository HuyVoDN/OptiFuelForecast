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
//import { AuthContext } from '../../../context/authContext.jsx';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //const {login} = useContext(AuthContext);

  // do a get method to retrieve the username
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    Axios.post('http://localhost:3000/auth/login', {
      email: email, 
      password: password,
    }).then((response) => {
      const username = response.data.username;
      console.log(response.data);
      console.log('Username:', username);
      navigate(`/${username}/profile`);
      //navigate('/');
    }).catch((error) => {
      console.log(error.response.data);
      setError(error.response.data);
    });


    // this is for authContext method, cannot figure out as of now
    /*
    try {
      const response = await login({email, password});
      console.log(response);
      const username = response.username;
      console.log('Username:', username);
      navigate(`/${username}/profile`);
    } catch (error) {
      console.log(error);
      setError(error);
    }*/

    // login logic here (e.g., API call, authentication)
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

 