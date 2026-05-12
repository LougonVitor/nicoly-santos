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
  },
  {
    number: "002",
    tag: "EDUCAÇÃO",
    title: "Psicologia nas Escolas Públicas",
    description:
      "Programa de acolhimento estudantil com profissionais de saúde mental em todas as escolas estaduais de São Paulo, prevenindo ansiedade e evasão escolar.",
    status: "PROPOSTA",
  },
  {
    number: "003",
    tag: "SEGURANÇA",
    title: "Tecnologia contra o Crime",
    description:
      "Sistema integrado de inteligência e monitoramento para combate ao crime organizado, com uso de câmeras, IA e dados em tempo real pelas forças de segurança.",
    status: "PROPOSTA",
  },
  {
    number: "004",
    tag: "GESTÃO PÚBLICA",
    title: "Fiscalização dos Gastos Públicos",
    description:
      "Portal de transparência com linguagem acessível para que qualquer cidadão possa acompanhar onde e como o dinheiro público está sendo gasto.",
    status: "PROPOSTA",
  },
  {
    number: "005",
    tag: "SAÚDE MENTAL",
    title: "São Paulo sem Ansiedade",
    description:
      "Campanha estadual de prevenção à ansiedade e depressão, com atendimento psicológico gratuito e descentralizado por regiões da cidade.",
    status: "PROPOSTA",
  },
];

export default function Initiatives() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollRange = sectionHeight - viewportHeight;
      const scrolled = -sectionTop;

      if (scrolled < 0 || scrolled > scrollRange) {
        setProgress(Math.max(0, Math.min(1, scrolled / scrollRange)));
        return;
      }

      const p = scrolled / scrollRange;
      setProgress(p);

      const maxTranslate = track.scrollWidth - track.clientWidth;
      track.style.transform = `translateX(-${p * maxTranslate}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="initiatives" ref={sectionRef} id="initiatives">
      <div className="initiatives__sticky">

        {/* Header */}
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

        {/* Horizontal rail */}
        <div className="initiatives__viewport">
          <div className="initiatives__track" ref={trackRef}>
            {initiatives.map((item, i) => (
              <article
                key={item.number}
                className="initiatives__card"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="initiatives__card-top">
                  <span className="initiatives__card-num">{item.number}</span>
                  <span className="initiatives__card-status">{item.status}</span>
                </div>
                <span className="initiatives__card-tag">{item.tag}</span>
                <h3 className="initiatives__card-title">{item.title}</h3>
                <p className="initiatives__card-desc">{item.description}</p>
                <div className="initiatives__card-line" />
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}