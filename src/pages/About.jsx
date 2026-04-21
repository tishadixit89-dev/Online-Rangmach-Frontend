import React, { useState, useEffect } from "react";
import "../assets/css/AboutPage.css";

const About = () => {
  const images = [
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    "https://images.unsplash.com/photo-1521334884684-d80222895322",
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="about-page">
      <section className="about-hero container fade-in">
        <div className="hero-copy slide-up">
          <p className="hero-label">About Online Rangmanch</p>
          <h1>From Stage Dreams to Spotlight Confidence</h1>
          <p>
            Online Rangmanch develops performers through creative training, real
            stage experience, and mentorship that shapes strong, confident
            artists.
          </p>
          <a href="/registration" className="hero-cta scale-in">
            Start Your Journey
          </a>
        </div>

        {/* <div className="hero-slider slide-in-right">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, index) => (
              <div className="slider-card" key={index}>
                <img src={img} alt={`Slide ${index + 1}`} />
                <div className="slider-overlay">
                  <span>Training | Performance | Growth</span>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-btn prev-btn" onClick={handlePrev}>
            ❮
          </button>
          <button className="slider-btn next-btn" onClick={handleNext}>
            ❯
          </button>
        </div> */}
      </section>

      <section className="about-intro container slide-up">
        <div className="intro-card fade-in">
          <h2>Who We Are</h2>
          <p>
            We are a creative academy that empowers learners with practical
            theatre skills, dance mechanics, acting technique, and presentation
            confidence.
          </p>
        </div>
        <div className="intro-card slide-in-left">
          <h2>Our Mission</h2>
          <p>
            To inspire aspiring performers and provide a safe, supportive space
            to grow through guided industry training and real-world stage
            practice.
          </p>
        </div>
        <div className="intro-card slide-in-right">
          <h2>Our Promise</h2>
          <p>
            To deliver disciplined coaching, artistic freedom, and a performance
            journey that helps each student shine their brightest.
          </p>
        </div>
      </section>

      <section className="about-features container bounce-in">
        <div className="section-heading">
          <span>Why Choose Us</span>
          <h2>Creative training built for confident performers</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card scale-in stagger-1">
            <div className="feature-icon">🎭</div>
            <h3>Experienced Coaches</h3>
            <p>
              Learn from instructors with real stage, film, and dance expertise.
            </p>
          </div>
          <div className="feature-card scale-in stagger-2">
            <div className="feature-icon">✨</div>
            <h3>Practical Performances</h3>
            <p>
              Gain confidence through live showcases and creative rehearsals.
            </p>
          </div>
          <div className="feature-card scale-in stagger-3">
            <div className="feature-icon">📚</div>
            <h3>Modern Curriculum</h3>
            <p>
              Train with courses designed for today's theatre, media, and
              events.
            </p>
          </div>
          <div className="feature-card scale-in stagger-4">
            <div className="feature-icon">🤝</div>
            <h3>Supportive Community</h3>
            <p>
              Belong to a friendly space that celebrates growth and
              collaboration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
