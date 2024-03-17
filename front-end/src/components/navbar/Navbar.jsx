import React from "react";
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import Search from "../search/Search";
import Logo from "../../assets/optifuelforecastlogo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";



const Navbar = () => {
    const { authState } = useContext(AuthContext);
    
    return (
       <>
       <div className="mainnavbar">
            <Link to='/'><img className="optiLogo" src={Logo} alt="logo" /></Link>
            <div className="mainnavbar-right">
                <nav className="mainnavbar-links">
                    <NavLink className="link" to='/'>Home</NavLink>
                    <NavLink className="link" to='/about'>About</NavLink>
                    { !authState.isAuthenticated ?
                        <NavLink className="link" to= '/login'>Login</NavLink> 
                        : <NavLink className="link" to={`/${authState.username}/profile`}>My Profile</NavLink> 
                    }   
                </nav>
                <Search/>
            </div>
       </div>
       </>
    );
};
export default Navbar