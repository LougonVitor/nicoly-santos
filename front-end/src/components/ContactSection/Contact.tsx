import { useEffect, useRef, useState } from "react";
import "./Contact.css";

const channels = [
    {
        icon: "IG",
        name: "Instagram",
        handle: "@nicolysantos",
        link: "https://www.instagram.com/nicoly.mbl/",
    },
    {
        icon: "WA",
        name: "WhatsApp",
        handle: "Official group",
        link: "https://chat.whatsapp.com/IYRNssUBRxj4J2nGT9DDqM?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGndoftTn6mTWJZFovIfnqznwy-ZSlU7qcM5if4e3bjagsHJ-HhN-wC1r8QWE8_aem_d2Xf1SWCUWvXRgoMtHl8bg",
    },
    {
        icon: "YT",
        name: "YouTube",
        handle: "Nicoly Santos",
        link: "https://www.youtube.com/@Nicolymbl",
    },
];

export default function Contact() {
    const [visible, setVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (form.name && form.email && form.message) setSubmitted(true);
    };

    return (
        <section
        className={`contact ${visible ? "contact--visible" : ""}`}
        ref={ref}
        id="contact"
        >
        <div className="contact__container">

            {/* Header */}
            <div className="contact__header">
            <span className="contact__label">CONTATO</span>
            <h2 className="contact__title">
                ENTRE EM<br />
                <em>CONTATO</em>
            </h2>
            <p className="contact__desc">
                Sua voz importa. Entre em contato, compartilhe suas ideias ou faça perguntas sobre a campanha de Nicoly Santos.
            </p>
            </div>

            <div className="contact__layout">

            {/* Form */}
            <div className="contact__form-wrapper">
                {submitted ? (
                <div className="contact__success">
                    <div className="contact__success-icon">✓</div>
                    <h3>Mensagem enviada!</h3>
                    <p>Entraremos em contato em breve. Obrigado por entrar em contato com Nicoly Santos.</p>
                </div>
                ) : (
                <>
                    <div className="contact__field">
                    <label className="contact__field-label">Nome</label>
                    <input
                        type="text"
                        className="contact__input"
                        placeholder="Seu nome completo"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    </div>
                    <div className="contact__field">
                    <label className="contact__field-label">Email</label>
                    <input
                        type="email"
                        className="contact__input"
                        placeholder="exemplo@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    </div>
                    <div className="contact__field">
                    <label className="contact__field-label">Mensagem</label>
                    <textarea
                        className="contact__textarea"
                        placeholder="Escreva sua mensagem aqui..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    </div>
                    <button className="contact__btn" onClick={handleSubmit}>
                    <span>ENVIAR MENSAGEM</span>
                    <span>→</span>
                    </button>
                </>
                )}
            </div>

            {/* Channels */}
            <div className="contact__channels">
                <span className="contact__channels-title">REDES SOCIAIS</span>
                {channels.map((channel, i) => (
                <a
                    key={channel.name}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__channel"
                    style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                >
                    <div className="contact__channel-icon">{channel.icon}</div>
                    <div className="contact__channel-info">
                    <span className="contact__channel-name">{channel.name}</span>
                    <span className="contact__channel-handle">{channel.handle}</span>
                    </div>
                    <span className="contact__channel-arrow">↗</span>
                </a>
                ))}

                <div className="contact__divider" />

                <div className="contact__cta-box">
                <span className="contact__cta-tag">GRUPO OFICIAL</span>
                <p className="contact__cta-text">
                    Participe do grupo do WhatsApp e receba as atualizações da campanha em primeira mão.
                </p>
                <a href="https://whatsapp.com" className="contact__cta-btn" target="_blank" rel="noopener noreferrer">
                    PARTICIPE DO GRUPO
                </a>
                </div>
            </div>

            </div>
        </div>
        </section>
    );
}