import React from 'react'
import "./About.scss";
import Carousel from '../../components/carousel/carousel';

const About = () => {
  return (
    <div className='about-page-container'>
      {/* <div className="about-page-header">
        <h2>Opti Fuel Forecast</h2>
        <span>Fueling Your Future with Precision and Care!</span>
      </div> */}
        <Carousel/>
        <p>Describe the Fuel Form purposes</p>
    </div>
  )
}

export default About