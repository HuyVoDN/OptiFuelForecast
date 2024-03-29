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
      const response = await Axios.post('https://optifuel-forecast-server.vercel.app/auth/login', {
        email: email,
        password: password,
      });

      setAuthState({
        token: response.data.token,
        username: response.data.username,
        isAuthenticated: true,
      });


      sessionStorage.setItem('firstname', response.data.firstname);
      sessionStorage.setItem('lastname', response.data.lastname);
      return response;

    } catch (error) {
      throw error;
    }

  };

  const logout = async () => {
    try {
      const response = await Axios.post('https://optifuel-forecast-server.vercel.app/auth/logout');

      setAuthState({
        token: null,
        username: null,
        isAuthenticated: false,
      });

      sessionStorage.removeItem('firstname');
      sessionStorage.removeItem('lastname');
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