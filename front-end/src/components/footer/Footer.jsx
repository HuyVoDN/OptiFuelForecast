import React, { useState, useEffect } from "react";
import Logo from "../../assets/OptiFuelForecast_removed_background.png";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Update current year when component mounts
        setCurrentYear(new Date().getFullYear());
    }, []);
    
    return (
        <footer className="footer">

        <div className="container_logo">
            <div className="logo">
                <Link to='/'><img className="optiLogo" src={Logo} alt="logo" /></Link>
            </div>
        </div>

        <div className="footer_links">
            <Link className="link" to='/'>Home</Link>
            <Link className="link" to='/about'>About</Link>
        </div>

            {/* <div className="footer-content">
                <p>OptiFuelForecast</p>
            </div> */}

            <div className="copyright">
                <p> Copyright &copy; <span>{currentYear}</span> OptiFuelForecast. All rights reserved.</p>
            </div>

            {/* <div className="logo">
                <img src={Logo} alt="Logo"/>
            </div>  */}
        </footer>
    );
};

export default Footer;
