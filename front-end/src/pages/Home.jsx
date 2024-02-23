import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <div className="home">
                <div className="desc">
                   
                    <h1>We explore to <br />empower</h1>
                    <p>
                        Our cutting-edge oil fuel forecast system utilizes
                        advanced analytics and real-time data to <br />
                        provide accurate predictions and insights
                        into the future of oil prices and consumption. <br />
                        With a focus on innovation and empowerment,
                        we strive to contribute <br />to a sustainable and efficient
                        energy landscape.
                    </p>
                    <Link className="link" to="/about">Learn more</Link>
                </div>
            </div>
            </>
        
    );
}
export default Home