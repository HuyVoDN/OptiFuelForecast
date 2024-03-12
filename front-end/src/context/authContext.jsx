import React, { createContext, useState } from 'react';
import Axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    username: null,
    isAuthenticated: false,
  });

  const login = async (email, password) => {
    try {
      const response = await Axios.post('http://localhost:3000/auth/login', {
        email: email, 
        password: password,
      });

      setAuthState({
        token: response.data.token,
        username: response.data.username,
        isAuthenticated: true,
      });

    console.log('Token(From AuthContext):', response.data.token); // please delete once merged to main
    console.log('Username(From AuthContext):', response.data.username); // please delete once merged to main
      return response;

    } catch (error) {
      console.log(error.response.data);
      throw error;
    }

  };

  const logout = async () => {
    try 
    {
      const response = await Axios.post('http://localhost:3000/auth/logout');
      setAuthState({
        token: null,
        username: null,
        isAuthenticated: false,
      });

      console.log('Logout successful');
      return response;

    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};