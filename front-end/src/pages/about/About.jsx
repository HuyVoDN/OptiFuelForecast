import React from 'react'
import "./About.scss";
import Carousel from '../../components/carousel/carousel';
import QuoteIcon from '../../assets/quote_icon.svg';
import DeliveryIcon from '../../assets/delivery_icon.svg';
import ForecastIcon from '../../assets/forecast_icon.svg';
import PersonalIcon from '../../assets/personal_icon.svg';

const About = () => {
  return (
    <div className='about-page-container'>
        <Carousel/>
      <div className='purpose-container'>
        <div className="purpose-text">
          <h2>What We Do</h2>
        </div>
        <div className="purpose-content">
          <div className="purpose-item">
            <img src={QuoteIcon} style={{width: '40%'}}/>
            <h3>Generate Instant Fuel Quotes</h3>
            <span>Get transparent and competitive quotes based on current market trends and predictive analytics.</span>
          </div>
          <div className="purpose-item">
            <img src={DeliveryIcon} style={{width: '40%'}}/>
            <h3>Order Fuel On-the-Go</h3>
            <span>Place orders for delivery with just a few clicks, whether you're at home, in the office, or on the move.</span>
          </div>
          <div className="purpose-item">
            <img src={ForecastIcon} style={{width: '40%'}}/>
            <h3>Fuel Price Forecasting</h3>
            <span>Access our advanced forecasting tools to plan your fuel purchases and optimize your budget.</span>
          </div>
          <div className="purpose-item">
            <img src={PersonalIcon} style={{width: '40%'}}/>
            <h3>Personalized Account Management</h3>
            <span>Manage your orders, track delivery statuses, and review your purchase history all in one place.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About