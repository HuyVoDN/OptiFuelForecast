import React from "react";
import "./Footer.scss";
import Logo from "../../assets/optifuelforecastlogo.png";

const Footer = () => {
    return (
        <footer className="footer">

        <div className="logo">
            <Link to='/'><img className="optiLogo" src={Logo} alt="logo" /></Link>
        </div>

        <div className="footer_links">
            <Link className="link" to='/'>Home</Link>
            <Link className="link" to='/about'>About</Link>
        </div>

        <div className="footer-content">
            <p>OptiFuelForecast</p>
        </div>

        <div className="copyright">
            <p>&copy; 2024 OptiFuelForecast. All rights reserved.</p>
        </div>

        </footer>
    );
};

export default Footer;