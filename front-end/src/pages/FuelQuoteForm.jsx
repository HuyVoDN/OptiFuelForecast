import React from "react";
import "./FuelQuoteForm.scss";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import NavBar from "../components/Navbar.jsx";

const Quote = () => {
    return (
        <>
            <NavBar/>
            <Sidebar />
        </>
    );
}
export default Quote