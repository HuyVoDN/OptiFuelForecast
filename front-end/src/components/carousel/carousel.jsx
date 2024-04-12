import { useEffect, useState } from "react";
import "./carousel.scss"; 
import { MissionSlide, StorySlide, TechnologySlide } from "./carouselItems";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const items = [
    <MissionSlide/>,
    <StorySlide/>,
    <TechnologySlide/>
];

const Carousel = () => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const nextIndex = () => {
        return currentItemIndex !== items.length - 1 ? currentItemIndex + 1 : 0;
    }
    const prevIndex = () => {
        return currentItemIndex !== 0 ? currentItemIndex - 1 : items.length - 1;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentItemIndex(current => {
                return current !== items.length - 1 ? current + 1 : 0;
            });
        }, 10000);
    
        return () => clearInterval(interval);
    }, []); 
    

    return (
        <div className="carouselwrapper">
            <div className="interface-container">
                <div className="interface">
                    <button className="prev-button interface-button" onClick={() => setCurrentItemIndex(prevIndex())}>
                        <ArrowBackIosNewIcon />
                    </button>
                    <button className="next-button interface-button" onClick={() => setCurrentItemIndex(nextIndex())}>
                        <ArrowForwardIosIcon />
                    </button>
                    <div className="slide-nav">
                        <span className={0 === currentItemIndex ? 'dot active-dot' : 'dot'} onClick={() => setCurrentItemIndex(0)}></span>
                        <span className={1 === currentItemIndex ? 'dot active-dot' : 'dot'} onClick={() => setCurrentItemIndex(1)}></span>
                        <span className={2 === currentItemIndex ? 'dot active-dot' : 'dot'} onClick={() => setCurrentItemIndex(2)}></span>
                    </div>
                </div>
            </div>
            <div className="carousel-items-container">
                {items.map((item, index) => 
                    <div key={index} className={index === currentItemIndex ? 'card current-item' :
                                                index === prevIndex() ? 'card previous-item' :
                                                index === nextIndex() ? 'card next-item' : 'card'}>
                        {item}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Carousel;