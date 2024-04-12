import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import About from '../pages/about/About';
import ArrowDown from '../assets/arrow-down.svg';

const Home = () => {
    return (
        <div className="home-container">
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
                    <div style={{display: 'flex', alignItems:'center'}}>
                        {/* <a className="learn-more" href="#about-section">LEARN MORE</a> */}
                        <p>
                            LEARN MORE
                            <img src={ArrowDown} style={{height: '40px'}}/>
                        </p>
                        
                    </div>
                    <a className="link" href="#about-section">LEARN MORE</a>
                </div>
                <div className="spacer1 curve1"></div>
            </div>
            <div id="about-section" className="about-container">
                <div className="spacer2 curve2"></div>
                <About/>
            </div>
        </div>
    );
}
export default Home