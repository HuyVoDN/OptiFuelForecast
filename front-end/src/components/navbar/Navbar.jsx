import React from "react";
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import Search from "../search/Search";
import Logo from "../../assets/optifuelforecastlogo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = () => {
    const { authState } = useContext(AuthContext);
    
    return (
       <>
       <div className="mainnavbar">
            <Link to='/'><img className="optiLogo" src={Logo} alt="logo" /></Link>
            <div className="mainnavbar-right">
                <nav className="mainnavbar-links">
                    <NavLink className="link" to='/'>Home</NavLink>
                    { !authState.isAuthenticated ?
                        <NavLink className="link account" to= '/login' style={{color: "#1d3354"}}><AccountCircleIcon/></NavLink> 
                        : <NavLink className="link account" to={`/${authState.username}/profile`} style={{color: "#1d3354"}}><AccountCircleIcon/></NavLink> 
                    }   
                </nav>
                <Search/>
            </div>
       </div>
       </>
    );
};
export default Navbar