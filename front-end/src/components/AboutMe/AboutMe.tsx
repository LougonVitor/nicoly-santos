import { useEffect, useRef, useState } from "react";
import "./AboutMe.css";

const pilares = [
  {
    titulo: "RELAÇÕES HUMANAS",
    texto:
      "A política se afastou das pessoas comuns. Foi justamente por acreditar nas relações humanas e na necessidade de resolver problemas reais que decidi me envolver. Escutar, compreender e agir sempre fizeram mais sentido do que simplesmente aceitar que as coisas continuem erradas.",
    numero: "01",
  },
  {
    titulo: "LIDERANÇA E PROPÓSITO",
    texto:
      "Grandes mudanças acontecem quando pessoas comuns se unem por um mesmo ideal. Encontrar A Missão me mostrou que liderança não é sobre poder. É sobre servir, inspirar e construir algo maior do que nós mesmos.",
    numero: "02",
  },
  {
    titulo: "COMUNICAÇÃO",
    texto:
      "Palavras podem despertar uma geração inteira. Meu objetivo é desenvolver uma comunicação capaz de convencer, inspirar e unir pessoas em torno de valores e objetivos que realmente possam transformar São Paulo e o Brasil.",
    numero: "03",
  },
];

export default function SobreMim() {
  const [visivel, setVisivel] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisivel(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`sobre-mim ${visivel ? "sobre-mim--visivel" : ""}`} ref={ref} id="sobre-mim">
      <div className="sobre-mim__container">

        {/* Coluna esquerda */}
        <div className="sobre-mim__esquerda">
          <span className="sobre-mim__label">QUEM É</span>
          <h2 className="sobre-mim__titulo">
            NICOLY<br />
            <span className="sobre-mim__titulo--destaque">SANTOS</span>
          </h2>
          <div className="sobre-mim__foto-wrapper">
            <div className="sobre-mim__foto-placeholder">
            </div>
            <div className="sobre-mim__foto-badge">
              <span>Primeira Fundadora de Honra</span>
              <span className="sobre-mim__foto-badge-partido">Partido Missão</span>
            </div>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="sobre-mim__direita">
          <p className="sobre-mim__bio">
            Nicoly Santos representa uma geração que decidiu enfrentar a política
            tradicional brasileira em vez de simplesmente aceitá-la. Sua atuação
            no Partido Missão lhe garantiu um reconhecimento histórico: tornar-se
            a <strong>primeira Fundadora de Honra</strong> do movimento, resultado
            de um trabalho intenso de mobilização e construção política.
          </p>
          <p className="sobre-mim__bio">
            Com experiência no setor bancário, formação jurídica e atuação
            estratégica na logística da Revista Valete ao lado dos quadros do MBL,
            Nicoly passou a construir uma trajetória marcada pelo contato direto com
            as pessoas e pela coragem de enfrentar temas ignorados pela velha política.
          </p>

          <div className="sobre-mim__missao">
            <span className="sobre-mim__missao-titulo">SUA MISSÃO</span>
            <p className="sobre-mim__missao-texto">
              Defender São Paulo como um estado mais seguro, com saúde eficiente,
              responsabilidade no uso do dinheiro público e representantes
              verdadeiramente próximos da população.
            </p>
          </div>

          <div className="sobre-mim__pilares-titulo">O QUE ME MOVE</div>
          <div className="sobre-mim__pilares">
            {pilares.map((pilar, i) => (
              <div
                key={pilar.numero}
                className="sobre-mim__pilar"
                style={{ transitionDelay: `${0.2 + i * 0.12}s` }}
              >
                <span className="sobre-mim__pilar-numero">{pilar.numero}</span>
                <div>
                  <h3 className="sobre-mim__pilar-titulo">{pilar.titulo}</h3>
                  <p className="sobre-mim__pilar-texto">{pilar.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}