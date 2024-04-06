import './carouselItems.scss';
import OurMission from '../../assets/our_mission.jpg'

export const MissionSlide = () => {
    return (
        <div className="mission-slide-container">
            <div className="mission-content">
                <div className='img-container'>
                    <img src={OurMission}/>
                </div>
                <div className="mission-text">
                    <h1>Our Misson</h1>
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
        <div>
            Story Slide..
        </div>
    );
}

export const PeopleSlide = () => {
    return (
        <div>
            People Slide..
        </div>
    );
}