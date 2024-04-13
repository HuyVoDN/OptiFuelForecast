import React, { useState, useEffect } from "react";
import Logo from "../../assets/OptiFuelForecast_removed_background.png";
import "./Footer.scss";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Update current year when component mounts
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="footer">

            {/*<div className="footer_links">
                <a href="#">Home</a>
                <a href="#">About</a>
            </div>*/}

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
