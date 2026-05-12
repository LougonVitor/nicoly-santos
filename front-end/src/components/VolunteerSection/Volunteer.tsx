import { useEffect, useRef, useState } from "react";
import "./Volunteer.css";

const reasons = [
  "Be part of a historic movement",
  "Contribute to the transformation of São Paulo",
  "Build a network of committed leaders",
  "Be the change you want to see",
];

export default function Volunteer() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", city: "", phone: "" });
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
    setSubmitted(true);
  };

  return (
    <section
      className={`volunteer ${visible ? "volunteer--visible" : ""}`}
      ref={ref}
      id="volunteer"
    >
      {/* Decorative background text */}
      <div className="volunteer__bg-text">MISSION</div>

      <div className="volunteer__container">

        {/* Left — CTA */}
        <div className="volunteer__left">
          <span className="volunteer__label">GET INVOLVED</span>
          <h2 className="volunteer__title">
            BECOME A<br />
            <span className="volunteer__title--outline">VOLUNTEER</span>
          </h2>

          <p className="volunteer__desc">
            Politics changes when ordinary people decide to act. Join Nicoly
            Santos's movement and help build a fairer, safer São Paulo.
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
              <h3 className="volunteer__success-title">Registration received!</h3>
              <p className="volunteer__success-text">
                We will be in touch soon to welcome you to Nicoly Santos's
                volunteer team.
              </p>
            </div>
          ) : (
            <div className="volunteer__form">
              <div className="volunteer__form-header">
                <span className="volunteer__form-tag">SIGN UP</span>
                <p className="volunteer__form-sub">
                  Fill in your details and be part of the change
                </p>
              </div>

              <div className="volunteer__fields">
                <div className="volunteer__field">
                  <label className="volunteer__field-label">Full name</label>
                  <input
                    type="text"
                    className="volunteer__input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="volunteer__field">
                  <label className="volunteer__field-label">Email</label>
                  <input
                    type="email"
                    className="volunteer__input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="volunteer__field">
                  <label className="volunteer__field-label">City</label>
                  <input
                    type="text"
                    className="volunteer__input"
                    placeholder="Your city — SP"
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

              <button className="volunteer__btn" onClick={handleSubmit}>
                <span>YES, I WANT TO JOIN</span>
                <span className="volunteer__btn-arrow">→</span>
              </button>

              <p className="volunteer__notice">
                By signing up, you agree to receive communications about Nicoly
                Santos's campaign.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
