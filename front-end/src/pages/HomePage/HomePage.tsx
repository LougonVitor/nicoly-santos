import { useEffect, useState } from "react";
import "./HomePage.css";
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import PresentationSection from '../../components/PresentationSection/PresentationSection'
import AnimationZoom from '../../components/AnimationZoom/AnimationZoom';

export default function HomePage() {
    // const [animDone, setAnimDone] = useState(false);
    const [progress, setProgress] = useState(0); // 0 → 1
    const [animDone, setAnimDone] = useState(false);

    useEffect(() => {
    const SCROLL_DISTANCE = 500; // px de scroll para completar o efeito

    const onScroll = () => {
        const p = Math.min(window.scrollY / SCROLL_DISTANCE, 1);
        setProgress(p);
    };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const heroWidthVw  = lerp(100, (500 / window.innerWidth) * 100, progress);
    const heroHeightVh = lerp(100, (200 / window.innerHeight) * 100, progress);
    const heroBorderR  = lerp(0, 20, progress);
    const aboutOpacity = lerp(0, 1, progress);
    const aboutScale   = lerp(0.97, 1, progress);

    const heroStyle: React.CSSProperties = {
        width:        `${heroWidthVw}vw`,
        height:       `${heroHeightVh}vh`,
        borderRadius: `${heroBorderR}px`,
        boxShadow:    `0 ${lerp(0, 40, progress)}px ${lerp(0, 80, progress)}px rgba(0,0,0,${lerp(0, 0.4, progress).toFixed(2)})`,
    };

    return (
    <div className="home-root">
    {!animDone && <AnimationZoom onComplete={() => setAnimDone(true)} />}

    <div className="scroll-driver">

    {/* AboutSection fica sticky no fundo — aparece enquanto o hero encolhe */}
    <div className="about-sticky-bg">
        <div
            className="about-reveal"
            style={{
            opacity:   aboutOpacity,
            transform: `scale(${aboutScale})`,
            }}
        >
            <PresentationSection />
        </div>
    </div>

    {/* Hero sticky na frente, encolhe com o scroll */}
    <div className="hero-sticky-wrapper">
        <div className="hero-shrink-container" style={heroStyle}>
            <HeroBanner />
        </div>
    </div>

    </div>
        {/* Conteúdo normal após o efeito terminar */}
        <div className="post-scroll-content" />
    </div>
    );
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}