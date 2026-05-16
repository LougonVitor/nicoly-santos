import { useEffect, useRef, useState } from "react";
import "./DonateFloat.css";

export default function DonateFloat() {
    const [open, setOpen] = useState(false);
    const [everOpened, setEverOpened] = useState(false);
    const bubbleRef = useRef<HTMLDivElement>(null);

    // Abre automaticamente após 4s na primeira visita
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
            setEverOpened(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    // Fecha ao clicar fora
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (bubbleRef.current && !bubbleRef.current.contains(target)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const toggle = () => {
        setOpen((prev) => !prev);
        if (!everOpened) setEverOpened(true);
    };

    return (
        <div className="donate-float" ref={bubbleRef}>
            {/* Balão */}
            <div className={`donate-float__bubble ${open ? "donate-float__bubble--visible" : ""}`}>
                <span className="donate-float__bubble-tag">PARTIDO MISSÃO</span>
                <p className="donate-float__bubble-text">
                    Esta pré-campanha não usa <strong style={{ color: "#fff" }}>dinheiro público</strong>.
                    Cada contribuição vem de pessoas que acreditam numa política honesta.
                    Faça parte disso.
                </p>
                <a
                    href="https://queroapoiar.com.br/nicoly-santos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="donate-float__bubble-link"
                >
                    QUERO APOIAR A PRÉ-CAMPANHA
                    <span>→</span>
                </a>
            </div>

            {/* Botão flutuante */}
            <button
                className={`donate-float__btn ${open ? "donate-float__btn--open" : ""}`}
                onClick={toggle}
                aria-label="Apoiar a pré-campanha"
            >
                <span className="donate-float__btn-icon">
                    {open ? "✕" : "♥"}
                </span>
                {/* Ping de atenção */}
                <span className={`donate-float__ping ${open || everOpened ? "donate-float__ping--hidden" : ""}`} />
            </button>
        </div>
    );
}
