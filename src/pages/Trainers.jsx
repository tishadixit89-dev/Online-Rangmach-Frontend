import React, { useEffect, useState } from "react";
import "../assets/css/TrainersPage.css";
import { getTrainers } from "../services/trainersService";

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    try {
      const res = await getTrainers();
      setTrainers(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <main className="trainers-page">
      <section className="trainers-hero fade-in">
        <div className="hero-copy slide-up">
          <span>Meet the Team</span>
          <h1>Expert coaches crafting confident performers.</h1>
          <p>
            Our trainers combine stage experience, acting training, and dance
            coaching to help every student grow.
          </p>
        </div>
      </section>

      <section className="trainers-content container slide-in-left">
        <div className="trainers-heading">
          <div>
            <p className="section-label">Expert Trainers</p>
            <h2>Professional guidance for every talent level.</h2>
          </div>
          <p className="section-copy">
            Learn from experienced instructors who bring real stage energy and
            theatre discipline to every class.
          </p>
        </div>

        {loading ? (
          <p className="status-message">Loading trainers...</p>
        ) : trainers.length > 0 ? (
          <div className="cards-container">
            {trainers.map((trainer, index) => (
              <article
                key={trainer._id || trainer.id}
                className={`card bounce-in stagger-${(index % 6) + 1}`}
              >
                <div className="card-avatar">
                  <img
                    src={`https://online-rangmach-backend-own6.vercel.app/uploads/photos/${trainer.image}`}
                    alt={trainer.name}
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{trainer.name}</h3>
                  <p className="card-meta">{trainer.specialization}</p>
                  <p>
                    <strong>Experience:</strong> {trainer.experience} years
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="status-message">No trainers available.</p>
        )}
      </section>
    </main>
  );
};

export default TrainersPage;
