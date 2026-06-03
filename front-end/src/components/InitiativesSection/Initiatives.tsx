import { useEffect, useRef, useState } from "react";
import "./Initiatives.css";

const initiatives = [
    {
        number: "001",
        tag: "SAÚDE PÚBLICA",
        title: "Transparência nas Filas do SUS",
        description:
        "Aplicativo integrado que permite ao cidadão acompanhar em tempo real sua posição na fila, receber notificações e acessar informações sobre o atendimento agendado.",
        status: "PROPOSTA",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80",
    },
    {
        number: "002",
        tag: "EDUCAÇÃO",
        title: "Psicologia nas Escolas Públicas",
        description:
        "Programa de acolhimento estudantil com profissionais de saúde mental em todas as escolas estaduais de São Paulo, prevenindo ansiedade e evasão escolar.",
        status: "PROPOSTA",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
    },
    {
        number: "006",
        tag: "PROTEÇÃO INFANTIL",
        title: "Tolerância Zero à Pedofilia",
        description:
            "Endurecimento das penas, monitoramento digital ativo e criação de delegacias especializadas para investigação e combate ao abuso e exploração sexual infantil.",
        status: "PROPOSTA",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80",
    },
    {
        number: "003",
        tag: "SEGURANÇA",
        title: "Tecnologia contra o Crime",
        description:
        "Sistema integrado de inteligência e monitoramento para combate ao crime organizado, com uso de câmeras, IA e dados em tempo real pelas forças de segurança.",
        status: "PROPOSTA",
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=900&q=80",
    },
    {
        number: "004",
        tag: "GESTÃO PÚBLICA",
        title: "Fiscalização dos Gastos Públicos",
        description:
        "Portal de transparência com linguagem acessível para que qualquer cidadão possa acompanhar onde e como o dinheiro público está sendo gasto.",
        status: "PROPOSTA",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
    },
    {
        number: "005",
        tag: "SAÚDE MENTAL",
        title: "São Paulo sem Ansiedade",
        description:
        "Campanha estadual de prevenção à ansiedade e depressão, com atendimento psicológico gratuito e descentralizado por regiões da cidade.",
        status: "PROPOSTA",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
    },
];

// Detect mobile once on mount — avoids SSR issues and is stable.
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return isMobile;
}

// ─── Desktop: sticky horizontal scroll ────────────────────────────────────────
function InitiativesDesktop() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const frozenVH = window.innerHeight;
        document.documentElement.style.setProperty("--real-vh", `${frozenVH}px`);

        const updateSectionHeight = () => {
            const maxTranslate = track.scrollWidth - track.clientWidth;
            section.style.height = `${frozenVH + maxTranslate}px`;
        };

        const ro = new ResizeObserver(updateSectionHeight);
        ro.observe(track);
        updateSectionHeight();

        let orientationChanged = false;
        const handleOrientationChange = () => { orientationChanged = true; };
        const handleResize = () => {
            if (!orientationChanged) return;
            orientationChanged = false;
            const newVH = window.innerHeight;
            document.documentElement.style.setProperty("--real-vh", `${newVH}px`);
            const maxTranslate = track.scrollWidth - track.clientWidth;
            section.style.height = `${newVH + maxTranslate}px`;
        };

        window.addEventListener("orientationchange", handleOrientationChange);
        window.addEventListener("resize", handleResize);

        const handleScroll = () => {
            if (!section || !track) return;
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            const scrollRange = sectionHeight - frozenVH;
            const scrolled = -sectionTop;
            const p = Math.max(0, Math.min(1, scrolled / scrollRange));
            setProgress(p);
            if (scrolled >= 0 && scrolled <= scrollRange) {
                const maxTranslate = track.scrollWidth - track.clientWidth;
                track.style.transform = `translateX(-${p * maxTranslate}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleOrientationChange);
            ro.disconnect();
        };
    }, []);

    return (
        <section className="initiatives" ref={sectionRef} id="initiatives">
            <div className="initiatives__sticky">
                <div className="initiatives__header">
                    <span className="initiatives__label">INICIATIVAS</span>
                    <h2 className="initiatives__title">
                        O QUE NICOLY<br />
                        <em>VAI FAZER</em>
                    </h2>
                    <div className="initiatives__progress">
                        <div
                            className="initiatives__progress-bar"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                </div>

                <div className="initiatives__viewport">
                    <div className="initiatives__track" ref={trackRef}>
                        {initiatives.map((item, i) => (
                            <Card key={item.number} item={item} i={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Mobile: plain vertical stack, zero JS scroll logic ───────────────────────
function InitiativesMobile() {
    return (
        <section className="initiatives-mobile" id="initiatives">
            <div className="initiatives-mobile__header">
                <span className="initiatives__label">INICIATIVAS</span>
                <h2 className="initiatives__title">
                    O QUE NICOLY<br />
                    <em>VAI FAZER</em>
                </h2>
            </div>
            <div className="initiatives-mobile__grid">
                {initiatives.map((item, i) => (
                    <Card key={item.number} item={item} i={i} />
                ))}
            </div>
        </section>
    );
}

// ─── Shared card ──────────────────────────────────────────────────────────────
function Card({ item, i }: { item: typeof initiatives[0]; i: number }) {
    return (
        <article
            className="initiatives__card"
            style={{ "--i": i } as React.CSSProperties}
        >
            <div
                className="initiatives__card-image"
                style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="initiatives__card-overlay" />
            <div className="initiatives__card-content">
                <div className="initiatives__card-top">
                    <span className="initiatives__card-num">{item.number}</span>
                    <span className="initiatives__card-status">{item.status}</span>
                </div>
                <div className="initiatives__card-body">
                    <span className="initiatives__card-tag">{item.tag}</span>
                    <h3 className="initiatives__card-title">{item.title}</h3>
                    <p className="initiatives__card-desc">{item.description}</p>
                </div>
            </div>
            <div className="initiatives__card-line" />
        </article>
    );
}

// ─── Root: renders the right layout based on screen size ──────────────────────
export default function Initiatives() {
    const isMobile = useIsMobile();
    return isMobile ? <InitiativesMobile /> : <InitiativesDesktop />;
}
