import { useEffect, useState } from "react";
import "./HomePage.css";
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import PresentationSection from '../../components/PresentationSection/PresentationSection'
import AnimationZoom from '../../components/AnimationZoom/AnimationZoom';
import AboutMe from '../../components/AboutMe/AboutMe';
import Initiatives from "../../components/Initiatives/Initiatives";
import Projects from "../../components/ProjectsSection/Projects";

export default function HomePage() {
    const [progress, setProgress] = useState(0); // 0 → 1
    const [animDone, setAnimDone] = useState(false);

    useEffect(() => {
    const SCROLL_DISTANCE = 500; // px de scroll para completar o efeito

    const onScroll = () => {
        const p = Math.min(window.scrollY / SCROLL_DISTANCE, 1);
        setProgress(p);
    };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isMobile = window.innerWidth <= 768;
    const targetW = isMobile ? window.innerWidth * 0.40 : 500;
    const targetH = isMobile ? window.innerHeight * 0.35 : 300;

    const heroWidthVw  = lerp(100, (targetW / window.innerWidth)  * 100, progress);
    const heroHeightVh = lerp(100, (targetH / window.innerHeight) * 100, progress);

    const heroBorderR  = lerp(0, 20, progress);
    const aboutOpacity = lerp(0, 1, progress);
    const finalImageOpacity = lerp(0, 1, progress);
    const initialImageOpacity = lerp(1, 0, progress);
    const textBannerOpacity = lerp(-1, 1, progress);

    const heroBannerStyle: React.CSSProperties = {
        width:        `${heroWidthVw}vw`,
        height:       `${heroHeightVh}vh`,
        borderRadius: `${heroBorderR}px`,
        boxShadow:    `0 ${lerp(0, 40, progress)}px ${lerp(0, 80, progress)}px rgba(0,0,0,${lerp(0, 0.4, progress).toFixed(2)})`,
    };

    const imageSwappingStyle = {
        "--final-opacity": `${finalImageOpacity}`,
        "--initial-opacity": `${initialImageOpacity}`,
    } as React.CSSProperties

    const textOverBannerStyle: React.CSSProperties = {
        width:        `${heroWidthVw}vw`,
        height:       `${heroHeightVh}vh`,
        opacity:        `${textBannerOpacity}`,
    }

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
            }}
        >
            <PresentationSection />
        </div>
    </div>

    {/* Hero sticky na frente, encolhe com o scroll */}
    <div className="hero-sticky-wrapper" style={imageSwappingStyle}>
        <div className="hero-shrink-container" style={heroBannerStyle}>
            <HeroBanner />
        </div>
    </div>

    
    <div className="box-text under">
        <div>
            <h1>A MISSÃO</h1>
            <h1>ESTÁ DADA</h1>
        </div>
    </div>

    <div className="box-text over">
        <div style={textOverBannerStyle}>
            <h1>A MISSÃO</h1>
            <h1>ESTÁ DADA</h1>
        </div>
    </div>

    </div>
        {/* Conteúdo normal após o efeito terminar */}
        <AboutMe />

        <Initiatives />
        
        <Projects />
    </div>
    );
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}