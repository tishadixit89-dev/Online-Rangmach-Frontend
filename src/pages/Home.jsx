import React, { useState, useEffect } from "react";
import "../assets/css/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const images = [
    "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1400&q=80",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const programs = [
    {
      title: "Acting Masterclass",
      description:
        "Character building, improvisation, and stage presence training.",
      icon: "🎬",
    },
    {
      title: "Dance & Movement",
      description:
        "Expressive movement, choreography, and physical storytelling.",
      icon: "💃",
    },
    {
      title: "Voice & Speech",
      description:
        "Voice control, Hindi dialogue delivery, and confidence training.",
      icon: "🗣️",
    },
    {
      title: "Audition Prep",
      description:
        "Portfolio coaching, audition practice, and media readiness.",
      icon: "✨",
    },
  ];

  const features = [
    {
      title: "Live Stage Events",
      description:
        "Perform in front of real audiences to build confidence and presence.",
      icon: "🎤",
    },
    {
      title: "Expert Mentors",
      description:
        "Learn from theatre artists, directors, and film professionals.",
      icon: "👩‍🏫",
    },
    {
      title: "Creative Community",
      description:
        "Connect with fellow students, workshops, and group performances.",
      icon: "🤝",
    },
  ];

  return (
    <>
      <section className="hero-slider fade-in">
        {images.map((img, i) => (
          <div
            key={i}
            className={`slide ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="hero-overlay"></div>

        <div className="hero-content text-center text-white slide-up">
          <span className="hero-badge bounce-in">Premium Online Theatre </span>
          <h1 className="hero-title float">🎭 Online Rangmanch</h1>
          <p className="hero-subtitle">जहाँ कला मिलती है मंच से</p>

          <div className="hero-buttons">
            <a href="#programs" className="btn btn-warning px-4 me-2 scale-in">
              Explore Programs
            </a>
            <a
              href="#contact"
              className="btn btn-outline-light px-4 slide-in-left"
            >
              Join Today
            </a>
          </div>
        </div>
      </section>

      <section className="about-section container py-5 text-center slide-up">
        <h2 className="section-title text-warning mb-3">
          Welcome to Online Rangmanch
        </h2>
        <p className="mx-auto about-text">
          We help aspiring performers master acting, dance, speech, and stage
          presence with practical training, live performances, and mentor-led
          guidance.
        </p>
      </section>

      <section id="programs" className="container py-5 fade-in">
        <div className="section-header text-center mb-5 slide-in-left">
          <h2 className="section-title text-warning">Our Programs</h2>
          <p className="section-subtitle mx-auto">
            Choose the path that fits your passion and develop your craft with
            our expert-led classes.
          </p>
        </div>

        <div className="row g-4">
          {programs.map((program, i) => (
            <div className="col-lg-3 col-md-6" key={i}>
              <article
                className={`course-card h-100 text-center p-4 scale-in stagger-${(i % 6) + 1}`}
              >
                <div className="course-icon">{program.icon}</div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section py-5 slide-up">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title text-warning">Why Join Us</h2>
            <p className="section-subtitle mx-auto">
              Learn in a creative, supportive environment that emphasizes real
              stage experience.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {features.map((feature, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div
                  className={`feature-card p-4 text-center h-100 bounce-in stagger-${(i % 6) + 1}`}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section text-center py-5">
        <div className="container">
          <h2 className="text-white mb-3">Ready for your next performance?</h2>
          <p className="text-light mb-4">
            Register now and begin your journey from rehearsal room to
            spotlight.
          </p>
          <a href="/registration" className="btn btn-warning btn-lg px-5">
            Register Now
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
