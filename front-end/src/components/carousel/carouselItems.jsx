import './carouselItems.scss';
import OurMission from '../../assets/our_mission.jpg';
import OurStory from '../../assets/our_story.jpg';
import OurTechnology from '../../assets/technology.jpg';

export const MissionSlide = () => {
    return (
        <div className="slide-container">
            <div className="slide-content">
                <div className='img-container'>
                    <img src={OurMission}/>
                </div>
                <div className="slide-text">
                    <h1>Our Mission</h1>
                    <span>
                        At OptiFuelForecast, we're driven by the vision of simplifying fuel procurement and management for businesses and individuals alike. With the world moving at an ever-accelerating pace, we believe in empowering our customers with the tools and insights needed to make smart, cost-effective fuel purchasing decisions. Our mission is to provide an unparalleled fuel ordering and quote generation experience, guided by transparency, efficiency, and personalized service.
                    </span>
                </div>
            </div>
        </div>
    );
}

export const StorySlide = () => {
    return (
        <div className='slide-container'>
            <div className="slide-content">
                <div className="img-container">
                    <img src={OurStory} />
                </div>
                <div className="slide-text">
                    <h1>Our Story</h1>
                    <span>
                    Founded by a team of data scientists, market analysts, and energy industry veterans, OptiFuelForecast was born out of a shared vision to make fuel procurement a transparent, cost-effective, and efficient process for everyone. With decades of combined experience, our founders understood the challenges of fuel price volatility firsthand and set out to create a solution that would not only address these challenges but also transform the industry.
                    </span>
                </div>
            </div>
        </div>
    );
}

export const TechnologySlide = () => {
    return (
        <div className='slide-container'>
            <div className="slide-content">
                <div className="img-container">
                    <img src={OurTechnology} style={{maxWidth: "75%"}}/>
                </div>
                <div className="slide-text">
                    <h1>Our Technology</h1>
                    <span>
                    At the heart of OptiFuelForecast is our proprietary forecasting algorithm, which analyzes historical data, market trends, geopolitical events, and environmental factors to predict fuel price movements. This technology is constantly refined by our team of experts to ensure the highest accuracy and relevance of our quotes.
                    </span>
                </div>
            </div>
        </div>
    );
}