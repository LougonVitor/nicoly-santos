import { useEffect, useRef, useState } from "react";
import "./Projects.css";

const projects = [
    {
        id: "modern-health",
        category: "SAÚDE",
        title: "SAÚDE MODERNA",
        subtitle: "Tecnologia a favor do cidadão",
        items: [
        "Transparência nas filas",
        "Aplicativo integrado",
        "Tecnologia hospitalar",
        "Menos burocracia",
        ],
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
        accent: "#FDBE21",
        number: "01",
    },
    {
        id: "mental-health",
        category: "EDUCAÇÃO",
        title: "SAÚDE MENTAL E PREVENÇÃO",
        subtitle: "Cuidando de quem vai construir o futuro",
        items: [
        "Psicologia nas escolas",
        "Prevenção à ansiedade",
        "Acolhimento estudantil",
        "Saúde preventiva",
        ],
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
        accent: "#FDBE21",
        number: "02",
    },
    {
        id: "security",
        category: "SEGURANÇA",
        title: "PRENDEU / MATOU",
        subtitle: "Tolerância zero com o crime organizado",
        items: [
        "Enfrentamento real ao crime organizado",
        "Tolerância zero para facções criminosas",
        "Uso de inteligência, tecnologia e monitoramento",
        "Fortalecimento das forças de segurança",
        "Prioridade para quem trabalha e empreende",
        ],
        image: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=1200&q=80",
        accent: "#FDBE21",
        number: "03",
    },
];

export default function Projects() {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) setVisible(true);
        },
        { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const project = projects[active];

    return (
        <section
        className={`projects ${visible ? "projects--visible" : ""}`}
        ref={ref}
        id="projects"
        >
        <div className="projects__container">

            {/* Header */}
            <div className="projects__header">
            <span className="projects__label">O QUE EU DEFENDO</span>
            <h2 className="projects__title">MINHAS<br /><em>BANDEIRAS</em></h2>
            </div>

            {/* Main layout */}
            <div className="projects__layout">

            {/* Side navigation */}
            <nav className="projects__nav">
                {projects.map((p, i) => (
                <button
                    key={p.id}
                    className={`projects__nav-item ${i === active ? "projects__nav-item--active" : ""}`}
                    onClick={() => setActive(i)}
                >
                    <span className="projects__nav-num">{p.number}</span>
                    <span className="projects__nav-name">{p.title}</span>
                    <span className="projects__nav-cat">{p.category}</span>
                </button>
                ))}
            </nav>

            {/* Content */}
            <div className="projects__content" key={active}>

                {/* Background image with overlay */}
                <div
                className="projects__image-bg"
                style={{ backgroundImage: `url(${project.image})` }}
                >
                <div className="projects__image-overlay" />
                </div>

                <div className="projects__content-inner">
                <div className="projects__content-header">
                    <span className="projects__content-cat">{project.category}</span>
                    <h3 className="projects__content-title">{project.title}</h3>
                    <p className="projects__content-sub">{project.subtitle}</p>
                </div>

                <ul className="projects__list">
                    {project.items.map((item, i) => (
                    <li
                        key={i}
                        className="projects__item"
                        style={{ animationDelay: `${i * 0.08}s` }}
                    >
                        <span className="projects__item-bullet" />
                        {item}
                    </li>
                    ))}
                </ul>

                <div className="projects__number-bg">{project.number}</div>
                </div>
            </div>
            </div>

        </div>
        </section>
    );
}
