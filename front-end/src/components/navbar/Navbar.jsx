import React from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import Search from "../search/Search";
import Logo from "../../assets/optifuelforecastlogo.png";
const Navbar = () => {
    return (
       <>
       <div className="mainnavbar">
            <img className="optiLogo" src={Logo} alt="logo" />
            <div className="mainnavbar-right">
                <nav className="mainnavbar-links">
                    <NavLink className="link" to='/'>Home</NavLink>
                    <NavLink className="link" to='/about'>About</NavLink>
                    <NavLink className="link" to= '/login'>Login</NavLink>
                </nav>
                <Search/>
            </div>
       </div>
       </>
    );
};
export default Navbar