import { useEffect, useRef, useState } from "react";
import { useVolunteerForm } from "../../hooks/useVolunteerForm";
import "./Volunteer.css";

const reasons = [
    "Faça parte de um movimento histórico",
    "Contribua para a transformação de São Paulo",
    "Construa uma rede de líderes comprometidos",
    "Seja a mudança que você quer ver",
];

export default function Volunteer() {
    const [visible, setVisible] = useState(false);
    const { form, setForm, submitted, handleSubmit } = useVolunteerForm();
    const [isSending, setIsSending] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmitWrapper = async () => {
        if(!isSending) {
            setIsSending(true);
            await handleSubmit();
            setIsSending(false);
        }
    }

    return (
        <section
        className={`volunteer ${visible ? "volunteer--visible" : ""}`}
        ref={ref}
        id="volunteer"
        >
        {/* Decorative background text */}
        <div className="volunteer__bg-text">MISSÃO</div>

        <div className="volunteer__container">

            {/* Left — CTA */}
            <div className="volunteer__left">
            <span className="volunteer__label">PARTICIPE</span>
            <h2 className="volunteer__title">
                SE TORNE<br />
                <span className="volunteer__title--outline">VOLUTÁRIO</span>
            </h2>

            <p className="volunteer__desc">
                A política muda quando as pessoas comuns decidem agir. Junte-se ao movimento de Nicoly Santos e ajude a construir uma São Paulo mais justa e segura.
            </p>

            <ul className="volunteer__reasons">
                {reasons.map((reason, i) => (
                <li
                    key={i}
                    className="volunteer__reason"
                    style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
                >
                    <span className="volunteer__reason-icon">→</span>
                    {reason}
                </li>
                ))}
            </ul>
            </div>

            {/* Right — Form */}
            <div className="volunteer__right">
            {submitted ? (
                <div className="volunteer__success">
                <div className="volunteer__success-icon">✓</div>
                <h3 className="volunteer__success-title">Inscrições recebidas!</h3>
                <p className="volunteer__success-text">
                    Entraremos em contato em breve para lhe dar as boas-vindas à equipe de voluntários de Nicoly Santos.
                </p>
                </div>
            ) : (
                <div className="volunteer__form">
                <div className="volunteer__form-header">
                    <span className="volunteer__form-tag">INSCREVER-SE</span>
                    <p className="volunteer__form-sub">
                        Preencha seus dados e faça parte da mudança.
                    </p>
                </div>

                <div className="volunteer__fields">
                    <div className="volunteer__field">
                    <label className="volunteer__field-label">Nome completo</label>
                    <input
                        type="text"
                        className="volunteer__input"
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    </div>
                    <div className="volunteer__field">
                    <label className="volunteer__field-label">Email</label>
                    <input
                        type="email"
                        className="volunteer__input"
                        placeholder="exemplo@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    </div>
                    <div className="volunteer__field">
                    <label className="volunteer__field-label">Cidade</label>
                    <input
                        type="text"
                        className="volunteer__input"
                        placeholder="Sua cidade — SP"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                    </div>
                    <div className="volunteer__field">
                    <label className="volunteer__field-label">WhatsApp</label>
                    <input
                        type="tel"
                        className="volunteer__input"
                        placeholder="(11) 99999-9999"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    </div>
                </div>

                <button className="volunteer__btn" onClick={handleSubmitWrapper}>
                    <span>
                        {isSending ? 'Enviando...' : 'SIM, EU QUERO PARTICIPAR'}
                    </span>
                    <span className="volunteer__btn-arrow">→</span>
                </button>

                <p className="volunteer__notice">
                    Ao se inscrever, você concorda em receber comunicações sobre a pré-campanha de Nicoly
                    Santos.
                </p>
                </div>
            )}
            </div>
        </div>
        </section>
    );
}