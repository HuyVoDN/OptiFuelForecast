import React from "react";
import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">

        <div className="logo">
            <img src="" alt="Logo"/>
        </div>

        <div className="footer_links">
            <a href="#">Home</a>
            <a href="#">About</a>
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