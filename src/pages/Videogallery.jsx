import React, { useEffect, useState } from "react";
import "../assets/css/VideogalleryPage.css";
import { getVideogallery } from "../services/videogalleryService";

const VideogalleryPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideogallery = async () => {
    try {
      const res = await getVideogallery();
      setVideos(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideogallery();
  }, []);

  return (
    <main className="video-gallery-page">
      <section className="video-hero fade-in">
        <div className="hero-copy slide-up">
          <span>Video Gallery</span>
          <h1>Watch our most powerful performances and training moments.</h1>
          <p>
            Browse short videos from stage rehearsals, showcases, and academy
            highlights.
          </p>
        </div>
      </section>

      <section className="video-section container slide-in-left">
        <div className="video-header">
          <div>
            <p className="section-label">Featured Clips</p>
            <h2>Dynamic video stories from our academy.</h2>
          </div>
          <p className="section-copy">
            Click any clip to play and experience the energy of our stage
            sessions.
          </p>
        </div>

        {loading ? (
          <p className="status-message">Loading videos...</p>
        ) : videos.length > 0 ? (
          <div className="video-grid">
            {videos.map((video, index) => (
              <article
                key={video._id}
                className={`video-card scale-in stagger-${(index % 6) + 1}`}
              >
                <div className="video-wrapper">
                  <video controls className="video">
                    <source
                      src={`http://localhost:5000/uploads/videos/${video.video}`}
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="video-body">
                  <h5>{video.title}</h5>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="status-message">No videos available</p>
        )}
      </section>
    </main>
  );
};

export default VideogalleryPage;
