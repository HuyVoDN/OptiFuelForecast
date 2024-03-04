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

    console.log('Token(From AuthContext):', response.data.token);
    console.log('Username(From AuthContext):', response.data.username);
      return response;

    } catch (error) {
      console.log(error.response.data);
      throw error;
    }

  };

  return (
    <AuthContext.Provider value={{ authState, login }}>
      {children}
    </AuthContext.Provider>
  );
};