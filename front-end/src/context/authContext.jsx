// import React, { createContext, useState} from 'react';
// import Axios from 'axios';
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [authState, setAuthState] = useState({
//         token: sessionStorage.getItem('token'),
//         username: null,
//         isAuthenticated: sessionStorage.getItem('token') ? true : false,
//     });

//     const login = async (email, password) => {
//         const res = await Axios.post('http://localhost:3000/auth/login', {
//             email: email, 
//             password: password,
//           }, {withCredentials: true});
//         //   .then((response) => {
//         //     const username = response.data.username;
//         //     console.log(response.data);
//         //     console.log('Username:', username);
//         //     //navigate(`/${username}/profile`);
//         //   }).catch((error) => {
//         //     console.log(error.response.data);
//         //     setError(error.response.data);
//         //   });

//           setAuthState({
//             token: res.data.token,
//             username: res.data.username,
//             isAuthenticated: true,
//           });

//           sessionStorage.setItem('token', res.data.token);
//     }
//     return (
//         <AuthContext.Provider value={{ authState, login }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }