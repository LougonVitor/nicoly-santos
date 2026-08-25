import { useEffect, useRef, useState } from "react";
import { useMaterialForm } from "../../hooks/useMaterialForm";
import nicolyPhoto from "../../assets/nicoly.jpeg";
import "./Material.css";

const benefits = [
    "Material impresso para divulgação",
    "Adesivos, santinhos e itens de campanha",
    "Conteúdo exclusivo para apoiadores",
    "Novidades em primeira mão",
];

const UF_OPTIONS = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

function formatCep(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Material() {
    const [visible, setVisible] = useState(false);
    const { form, setForm, submitted, handleSubmit, lookupCep, cepLoading } = useMaterialForm();
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
        if (!isSending) {
            setIsSending(true);
            await handleSubmit();
            setIsSending(false);
        }
    };

    return (
        <section
            className={`material ${visible ? "material--visible" : ""}`}
            ref={ref}
            id="material"
        >
            {/* Decorative background text */}
            <div className="material__bg-text">MATERIAL</div>

            <div className="material__container">

                {/* Left — CTA + photo */}
                <div className="material__left">
                    <span className="material__label">CADASTRO</span>
                    <h2 className="material__title">
                        RECEBA O MATERIAL<br />
                        <span className="material__title--highlight">DA CAMPANHA</span>
                    </h2>

                    <p className="material__desc">
                        Cadastre-se para receber materiais, novidades e conteúdos exclusivos
                        da campanha de Nicoly Santos e ajude a levar essa mensagem para
                        ainda mais gente.
                    </p>

                    <div className="material__photo-wrapper">
                        <div className="material__photo-bg">
                            <img src={nicolyPhoto} alt="Nicoly Santos" className="material__photo" />
                        </div>
                    </div>

                    <ul className="material__benefits">
                        {benefits.map((benefit, i) => (
                            <li
                                key={i}
                                className="material__benefit"
                                style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
                            >
                                <span className="material__benefit-icon">→</span>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right — Form */}
                <div className="material__right">
                    {submitted ? (
                        <div className="material__success">
                            <div className="material__success-icon">✓</div>
                            <h3 className="material__success-title">Cadastro recebido!</h3>
                            <p className="material__success-text">
                                Em breve enviaremos o material da campanha de Nicoly Santos
                                para o endereço informado.
                            </p>
                        </div>
                    ) : (
                        <div className="material__form">
                            <div className="material__form-header">
                                <span className="material__form-tag">CADASTRO</span>
                                <p className="material__form-sub">
                                    Preencha seus dados para receber o material.
                                </p>
                            </div>

                            <div className="material__fields">
                                <div className="material__row">
                                    <div className="material__field">
                                        <label className="material__field-label">Nome *</label>
                                        <input
                                            type="text"
                                            className="material__input"
                                            placeholder="Seu nome completo"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="material__field">
                                        <label className="material__field-label">E-mail *</label>
                                        <input
                                            type="email"
                                            className="material__input"
                                            placeholder="exemplo@email.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="material__row">
                                    <div className="material__field">
                                        <label className="material__field-label">WhatsApp *</label>
                                        <input
                                            type="tel"
                                            className="material__input"
                                            placeholder="(11) 99999-9999"
                                            value={form.whatsapp}
                                            onChange={(e) => setForm({ ...form, whatsapp: formatPhone(e.target.value) })}
                                        />
                                    </div>
                                    <div className="material__field">
                                        <label className="material__field-label">
                                            CEP * {cepLoading && <span className="material__field-loading">buscando…</span>}
                                        </label>
                                        <input
                                            type="text"
                                            className="material__input"
                                            placeholder="00000-000"
                                            value={form.cep}
                                            onChange={(e) => setForm({ ...form, cep: formatCep(e.target.value) })}
                                            onBlur={(e) => lookupCep(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="material__row">
                                    <div className="material__field material__field--grow">
                                        <label className="material__field-label">Endereço *</label>
                                        <input
                                            type="text"
                                            className="material__input"
                                            placeholder="Rua, avenida..."
                                            value={form.address}
                                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        />
                                    </div>
                                    <div className="material__field material__field--sm">
                                        <label className="material__field-label">Nº *</label>
                                        <input
                                            type="text"
                                            className="material__input"
                                            placeholder="123"
                                            value={form.number}
                                            onChange={(e) => setForm({ ...form, number: e.target.value })}
                                        />
                                    </div>
                                    <div className="material__field">
                                        <label className="material__field-label">Complem.</label>
                                        <input
                                            type="text"
                                            className="material__input"
                                            placeholder="Apto, bloco..."
                                            value={form.complement}
                                            onChange={(e) => setForm({ ...form, complement: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="material__row">
                                    <div className="material__field">
                                        <label className="material__field-label">Bairro *</label>
                                        <input
                                            type="text"
                                            className="material__input"
                                            placeholder="Seu bairro"
                                            value={form.neighborhood}
                                            onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                                        />
                                    </div>
                                    <div className="material__field">
                                        <label className="material__field-label">Cidade *</label>
                                        <input
                                            type="text"
                                            className="material__input"
                                            placeholder="Sua cidade"
                                            value={form.city}
                                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="material__field material__field--sm">
                                        <label className="material__field-label">UF *</label>
                                        <select
                                            className="material__input material__select"
                                            value={form.state}
                                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                                        >
                                            <option value="" disabled>-</option>
                                            {UF_OPTIONS.map((uf) => (
                                                <option key={uf} value={uf}>{uf}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Adesivo perfurado — prévia + opt-in */}
                            <div className="material__sticker-block">
                                <div className="material__sticker-preview" aria-hidden="true">
                                    <svg viewBox="0 0 220 120" className="material__car-svg">
                                        <ellipse cx="110" cy="112" rx="95" ry="6" fill="#000" opacity="0.25" />
                                        <path
                                            d="M18 96 C14 70 22 44 40 34 C58 24 162 24 180 34 C198 44 206 70 202 96 C202 104 196 108 188 108 L32 108 C24 108 18 104 18 96 Z"
                                            fill="#141414"
                                        />
                                        <path
                                            d="M55 38 C64 30 156 30 165 38 C170 46 172 54 172 60 L48 60 C48 54 50 46 55 38 Z"
                                            fill="url(#materialGlass)"
                                            stroke="#2a2a2a"
                                            strokeWidth="1.5"
                                        />
                                        <defs>
                                            <linearGradient id="materialGlass" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#3a3a3a" />
                                                <stop offset="100%" stopColor="#111" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="35" cy="102" r="12" fill="#0a0a0a" stroke="#333" strokeWidth="2" />
                                        <circle cx="185" cy="102" r="12" fill="#0a0a0a" stroke="#333" strokeWidth="2" />
                                        <rect x="85" y="96" width="50" height="14" rx="2" fill="#fff" />
                                        <text x="110" y="106" textAnchor="middle" fontSize="8" fontWeight="700" fill="#000">MISSÃO</text>

                                        {/* Adesivo perfurado no vidro traseiro */}
                                        <g className="material__sticker-decal">
                                            <rect x="63" y="40" width="94" height="17" rx="1.5" fill="#FDBE21" />
                                            <text x="110" y="47.5" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#000" letterSpacing="0.5">
                                                NICOLY SANTOS
                                            </text>
                                            <text x="110" y="54.5" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#000" letterSpacing="0.5">
                                                PARTIDO MISSÃO
                                            </text>
                                        </g>
                                    </svg>
                                    <span className="material__sticker-preview-label">Prévia do adesivo perfurado</span>
                                </div>

                                <label className="material__checkbox">
                                    <input
                                        type="checkbox"
                                        checked={form.wantsSticker}
                                        onChange={(e) => setForm({ ...form, wantsSticker: e.target.checked })}
                                    />
                                    <span className="material__checkbox-box" />
                                    <span className="material__checkbox-label">
                                        Quero incluir o adesivo perfurado para o vidro traseiro do meu carro
                                    </span>
                                </label>
                            </div>

                            <button className="material__btn" onClick={handleSubmitWrapper}>
                                <span>
                                    {isSending ? "Enviando..." : "QUERO RECEBER"}
                                </span>
                                <span className="material__btn-arrow">→</span>
                            </button>

                            <p className="material__notice">
                                Ao se cadastrar, você concorda em receber comunicações sobre a
                                campanha de Nicoly Santos.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
