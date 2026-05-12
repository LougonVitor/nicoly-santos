import { useEffect, useRef, useState } from "react";
import "./AboutMe.css";

const pillars = [
  {
    title: "RELAÇÕES HUMANAS",
    text:
      "A política se afastou das pessoas comuns. Foi justamente por acreditar nas relações humanas e na necessidade de resolver problemas reais que decidi me envolver. Escutar, compreender e agir sempre fizeram mais sentido do que simplesmente aceitar que as coisas continuem erradas.",
    number: "01",
  },
  {
    title: "LIDERANÇA E PROPÓSITO",
    text:
      "Grandes mudanças acontecem quando pessoas comuns se unem por um mesmo ideal. Encontrar A Missão me mostrou que liderança não é sobre poder. É sobre servir, inspirar e construir algo maior do que nós mesmos.",
    number: "02",
  },
  {
    title: "COMUNICAÇÃO",
    text:
      "Palavras podem despertar uma geração inteira. Meu objetivo é desenvolver uma comunicação capaz de convencer, inspirar e unir pessoas em torno de valores e objetivos que realmente possam transformar São Paulo e o Brasil.",
    number: "03",
  },
];

export default function AboutMe() {
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

  return (
    <section className={`about ${visible ? "about--visible" : ""}`} ref={ref} id="about">
      <div className="about__container">

        {/* Left column — sticky, fits viewport */}
        <div className="about__left">
          <span className="about__label">QUEM É</span>
          <h2 className="about__title">
            NICOLY<br />
            <span className="about__title--highlight">SANTOS</span>
          </h2>
          <div className="about__photo-wrapper">
            <div className="about__photo-placeholder">
            </div>
            <div className="about__photo-badge">
              <span>Primeira Fundadora de Honra</span>
              <span className="about__photo-badge-party">Partido Missão</span>
            </div>
          </div>
        </div>

        {/* Right column — scrollable content */}
        <div className="about__right">
          <p className="about__bio">
            Nicoly Santos representa uma geração que decidiu enfrentar a política
            tradicional brasileira em vez de simplesmente aceitá-la. Sua atuação
            no Partido Missão lhe garantiu um reconhecimento histórico: tornar-se
            a <strong>primeira Fundadora de Honra</strong> do movimento, resultado
            de um trabalho intenso de mobilização e construção política.
          </p>
          <p className="about__bio">
            Com experiência no setor bancário, formação jurídica e atuação
            estratégica na logística da Revista Valete ao lado dos quadros do MBL,
            Nicoly passou a construir uma trajetória marcada pelo contato direto com
            as pessoas e pela coragem de enfrentar temas ignorados pela velha política.
          </p>

          <div className="about__mission">
            <span className="about__mission-title">HER MISSION</span>
            <p className="about__mission-text">
              Defender São Paulo como um estado mais seguro, com saúde eficiente,
              responsabilidade no uso do dinheiro público e representantes
              verdadeiramente próximos da população.
            </p>
          </div>

          <div className="about__pillars-label">O QUE ME MOVE</div>
          <div className="about__pillars">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.number}
                className="about__pillar"
                style={{ transitionDelay: `${0.2 + i * 0.12}s` }}
              >
                <span className="about__pillar-number">{pillar.number}</span>
                <div>
                  <h3 className="about__pillar-title">{pillar.title}</h3>
                  <p className="about__pillar-text">{pillar.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}