import React, { useEffect, useState } from "react";
import "../assets/css/PhotoGalleryPage.css";
import { getPhotogallery } from "../services/photogalleryService";

const PhotogalleryPage = () => {
  const [images, setImages] = useState([]);

  const fetchPhotogallery = async () => {
    try {
      const res = await getPhotogallery();
      setImages(res.data.data || []);
    } catch (error) {
      console.error("Error fetching photogallery:", error);
    }
  };

  useEffect(() => {
    fetchPhotogallery();
  }, []);

  const galleryItems = images.slice(0, 6);

  return (
    <main className="photo-gallery-page">
      <section className="photo-hero fade-in">
        <div className="hero-copy slide-up">
          <span>Photo Gallery</span>
          <h1>Capture the energy of every performance.</h1>
          <p>Browse moments from rehearsals, events, and student showcases.</p>
        </div>
      </section>

      <section className="gallery-section container slide-in-left">
        <div className="gallery-header">
          <h2>Memories from the stage</h2>
          <p>
            Each image tells the story of passion, practice, and theatre life at
            our academy.
          </p>
        </div>

        {galleryItems.length > 0 ? (
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <article
                key={item._id}
                className={`gallery-item scale-in stagger-${(index % 6) + 1}`}
              >
                <div className="gallery-media">
                  <img
                    src={`http://localhost:5000/uploads/photos/${item.image}`}
                    alt={item.title}
                    className="gallery-img"
                  />
                  <div className="gallery-overlay">
                    <p>{item.title}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-message">No photogallery images available.</p>
        )}
      </section>
    </main>
  );
};

export default PhotogalleryPage;
