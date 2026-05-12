import { useEffect, useRef, useState } from "react";
import "./Contact.css";

const channels = [
    {
        icon: "IG",
        name: "Instagram",
        handle: "@nicolysantos",
        link: "https://instagram.com",
    },
    {
        icon: "WA",
        name: "WhatsApp",
        handle: "Official group",
        link: "https://whatsapp.com",
    },
    {
        icon: "YT",
        name: "YouTube",
        handle: "Nicoly Santos",
        link: "https://youtube.com",
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
            <span className="contact__label">CONTACT</span>
            <h2 className="contact__title">
                GET IN<br />
                <em>TOUCH</em>
            </h2>
            <p className="contact__desc">
                Your voice matters. Get in touch, share your ideas, or ask questions
                about Nicoly Santos's campaign.
            </p>
            </div>

            <div className="contact__layout">

            {/* Form */}
            <div className="contact__form-wrapper">
                {submitted ? (
                <div className="contact__success">
                    <div className="contact__success-icon">✓</div>
                    <h3>Message sent!</h3>
                    <p>We will be in touch soon. Thank you for reaching out to Nicoly Santos.</p>
                </div>
                ) : (
                <>
                    <div className="contact__field">
                    <label className="contact__field-label">Name</label>
                    <input
                        type="text"
                        className="contact__input"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    </div>
                    <div className="contact__field">
                    <label className="contact__field-label">Email</label>
                    <input
                        type="email"
                        className="contact__input"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    </div>
                    <div className="contact__field">
                    <label className="contact__field-label">Message</label>
                    <textarea
                        className="contact__textarea"
                        placeholder="Write your message..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    </div>
                    <button className="contact__btn" onClick={handleSubmit}>
                    <span>SEND MESSAGE</span>
                    <span>→</span>
                    </button>
                </>
                )}
            </div>

            {/* Channels */}
            <div className="contact__channels">
                <span className="contact__channels-title">SOCIAL MEDIA</span>
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
                <span className="contact__cta-tag">OFFICIAL GROUP</span>
                <p className="contact__cta-text">
                    Join the WhatsApp group and get campaign updates first-hand.
                </p>
                <a href="https://whatsapp.com" className="contact__cta-btn" target="_blank" rel="noopener noreferrer">
                    JOIN THE GROUP
                </a>
                </div>
            </div>

            </div>
        </div>
        </section>
    );
}