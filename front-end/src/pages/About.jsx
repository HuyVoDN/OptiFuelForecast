import React from 'react'
import "./About.scss";

const About = () => {
  return (
    <about className="footer">

    <div className="header">
        <h2>About</h2>
    </div>

    <div className="content_about">
      <p>At OptiFuelForecast, we are excited to start on this project, aiming to develop a prediction based software application. 
        The goal is to predict fuel rates with precision and efficiency. 
        Our solution will revolutionize how fuel rates are determined. 
        Using knowledge of our client like their location, historical data, requested gallons, and company profit margin we aim to give the most accurate predication. 
        By using data analytics, we're committed to given an online platform that gives businesses a chance to make informed decisions in real-time.
        With our expertise and dedication to innovation, we look forward to crafting a solution.</p>
    </div>

    </about>
  );
};

export default About