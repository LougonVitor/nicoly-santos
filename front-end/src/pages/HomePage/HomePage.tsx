import AboutSection from '../../components/AboutSection/AboutSection'
import { HeroBanner } from '../../components/HeroBanner/HeroBanner';
import './HomePage.css'
import { useState } from 'react';
import AnimationZoom from '../../components/AnimationZoom/AnimationZoom';

function HomePage() {
    const [animDone, setAnimDone] = useState(false);

    return (
        <>
        <div className="home-page--root">
            <HeroBanner></HeroBanner>
            <AboutSection />
            {!animDone && <AnimationZoom onComplete={() => setAnimDone(true)} />}
        </div>
        </>
    )
}

export default HomePage