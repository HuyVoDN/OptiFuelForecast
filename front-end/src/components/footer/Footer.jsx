import React from "react";
import "./Footer.scss";
import Logo from "../../assets/optifuelforecastlogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
        
        <div className="footer_container">

        <div className="container_logo">
            <div className="logo">
                <Link to='/'><img className="optiLogo" src={Logo} alt="logo" /></Link>
            </div>
        </div>

        <div className="contact_info">
          <div className="email">
            <span>Email: OptiFuelForecast@uh.edu</span>
          </div>

            <div className="phone">
                <span>Phone: +1234567890</span>
            </div>
        </div>

        <div className="copyright">
            <p>&copy; 2024 OptiFuelForecast. All rights reserved.</p>
        </div>

    </div>

        </footer>
    );
};

export default Footer;