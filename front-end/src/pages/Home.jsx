import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import About from '../pages/about/About';

const Home = () => {
    return (
        <>
        <div className="home">
            <div className="desc">
                <h1>We explore to empower</h1>
                <p>
                    Our cutting-edge oil fuel forecast system utilizes
                    advanced analytics and real-time data to <br />
                    provide accurate predictions and insights
                    into the future of oil prices and consumption. <br />
                    With a focus on innovation and empowerment,
                    we strive to contribute <br />to a sustainable and efficient
                    energy landscape.
                </p>
                <Link className="link" to="/about">LEARN MORE</Link>
            </div>
            <div className="curve"></div>
        </div>
        <div className="about-container">
            <About/>
        </div>
        </>

    );
}
export default Home