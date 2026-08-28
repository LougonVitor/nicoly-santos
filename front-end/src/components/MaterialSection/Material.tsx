import { useEffect, useRef, useState } from "react";
import { useMaterialForm } from "../../hooks/useMaterialForm";
import nicolyPhoto from "../../assets/nicoly.jpeg";
import celtaSticker from "../../assets/celta-3.png";
import "./Material.css";

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
            <div className="material__container">

                {/* Left — foto */}
                <div className="material__photo-wrapper">
                    <img src={nicolyPhoto} alt="Nicoly Santos" className="material__photo" />
                </div>

                {/* Right — cadastro + formulário */}
                <div className="material__content">
                    <span className="material__label">CADASTRO</span>
                    <h2 className="material__title">
                        RECEBA O MATERIAL<br />DA CAMPANHA
                    </h2>
                    <p className="material__desc">
                        Cadastre-se para receber informações, novidades e conteúdos
                        da campanha de Nicoly Santos.
                    </p>

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
                        <>
                            <div className="material__fields">
                                <div className="material__row">
                                    <input
                                        type="text"
                                        className="material__input"
                                        placeholder="Nome *"
                                        aria-label="Nome"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        className="material__input"
                                        placeholder="E-mail *"
                                        aria-label="E-mail"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>

                                <div className="material__row">
                                    <input
                                        type="tel"
                                        className="material__input"
                                        placeholder="WhatsApp *"
                                        aria-label="WhatsApp"
                                        value={form.whatsapp}
                                        onChange={(e) => setForm({ ...form, whatsapp: formatPhone(e.target.value) })}
                                    />
                                    <input
                                        type="text"
                                        className="material__input"
                                        placeholder={cepLoading ? "Buscando…" : "CEP *"}
                                        aria-label="CEP"
                                        value={form.cep}
                                        onChange={(e) => setForm({ ...form, cep: formatCep(e.target.value) })}
                                        onBlur={(e) => lookupCep(e.target.value)}
                                    />
                                </div>

                                <div className="material__row">
                                    <input
                                        type="text"
                                        className="material__input material__input--grow"
                                        placeholder="Endereço *"
                                        aria-label="Endereço"
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="material__input material__input--sm"
                                        placeholder="Nº *"
                                        aria-label="Número"
                                        value={form.number}
                                        onChange={(e) => setForm({ ...form, number: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="material__input"
                                        placeholder="Complem."
                                        aria-label="Complemento"
                                        value={form.complement}
                                        onChange={(e) => setForm({ ...form, complement: e.target.value })}
                                    />
                                </div>

                                <div className="material__row">
                                    <input
                                        type="text"
                                        className="material__input"
                                        placeholder="Bairro *"
                                        aria-label="Bairro"
                                        value={form.neighborhood}
                                        onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="material__input"
                                        placeholder="Cidade *"
                                        aria-label="Cidade"
                                        value={form.city}
                                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                                    />
                                    <select
                                        className="material__input material__input--sm material__select"
                                        aria-label="UF"
                                        value={form.state}
                                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                                    >
                                        <option value="" disabled>UF *</option>
                                        {UF_OPTIONS.map((uf) => (
                                            <option key={uf} value={uf}>{uf}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Adesivo perfurado — prévia + opt-in */}
                            <div className="material__sticker-block">
                                <img
                                    src={celtaSticker}
                                    alt="Prévia do adesivo perfurado no vidro do carro"
                                    className="material__car-photo"
                                />

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
                                <span>{isSending ? "Enviando..." : "QUERO RECEBER"}</span>
                                <span className="material__btn-arrow">→</span>
                            </button>

                            <p className="material__notice">
                                Ao se cadastrar, você concorda em receber comunicações sobre a
                                campanha de Nicoly Santos.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
