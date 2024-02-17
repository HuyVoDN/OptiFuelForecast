import React, {useState} from "react";
import './Login.scss';
const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // login logic here (e.g., API call, authentication)
  };

  return (
    <div className="login-container">
      {/* <h1>OptiFuelForecast</h1>
      <p>Your Optimal Fuel Cost Predictor</p> 
            Create a header component and import it here instead of doing this
            
      */
        
      }
       
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </p>
      <p>New user? <a href="/signup">Sign Up</a></p>
    </div>
  );
}
export default Login