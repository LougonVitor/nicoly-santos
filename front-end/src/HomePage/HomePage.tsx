import "./HomePage.css";

export default function HomePage() {
    return (
    <div className="home-page">
        <div className="home-page__grid" />
        <div className="home-page__blob" />

        <div className="home-page__content">
            <div className="home-page__tag">Welcome</div>

            <h1 className="home-page__title">NICK</h1>

            <p className="home-page__description">
                Your personal homepage. Built fast. Looks sharp.
                <br />
                Just like the intro.
            </p>

            <button className="home-page__button">Explore</button>
        </div>
    </div>
    );
}