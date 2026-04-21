import React, { useEffect, useState } from "react";
import "../../assets/css/dashboardCss/AdminvideogalleryPage.css";

import {
  getVideogallery,
  createVideogallery,
  updateVideogallery,
  deleteVideogallery,
} from "../../services/videogalleryService";

const Adminvideogallery = () => {
  const [videogallery, setVideogallery] = useState([]);
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const admin = localStorage.getItem("token");
    if (!admin) {
      window.location.href = "/admin/login";
    }
    fetchVideogallery();
  }, []);

  const fetchVideogallery = async () => {
    try {
      const res = await getVideogallery();
      setVideogallery(res.data.data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideogallery([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await createVideogallery({
        title,
        video,
      });

      setTitle("");
      setVideo(null);
      setMsg("Video uploaded successfully!");
      fetchVideogallery();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error uploading video:", error);
      setMsg("Upload failed!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await deleteVideogallery(id);
      setMsg("Video deleted successfully!");
      fetchVideogallery();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error deleting video:", error);
      setMsg("Failed to delete video!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setTitle(item.title);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateVideogallery(editItem._id, {
        title,
        video: video || editItem.video,
      });

      setTitle("");
      setVideo(null);
      setEditItem(null);
      setMsg("Video updated successfully!");
      fetchVideogallery();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error updating video:", error);
      setMsg("Failed to update video!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleCancel = () => {
    setEditItem(null);
    setTitle("");
    setVideo(null);
  };

  return (
    <div className="admin-video-gallery">
      <header className="video-gallery-header fade-in">
        <h1>🎬 Video Gallery Management</h1>
        <p>Manage your performing arts academy's video collection.</p>
      </header>

      <main className="video-gallery-main">
        {msg && (
          <div
            className={`message-toast ${msg.includes("success") ? "success" : "error"} slide-up`}
          >
            {msg}
          </div>
        )}

        {/* FORM SECTION */}
        <section className="form-section slide-in-left">
          <div className="form-card">
            <div className="form-header">
              <h2>{editItem ? "✏️ Edit Video" : "➕ Add New Video"}</h2>
              <p>
                {editItem
                  ? "Update video details"
                  : "Upload a new video to your gallery"}
              </p>
            </div>

            <form
              className="video-gallery-form"
              onSubmit={editItem ? handleUpdate : handleAdd}
            >
              <div className="form-group">
                <label>Video Title</label>
                <input
                  type="text"
                  placeholder="e.g., Dance Performance Showcase"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Video File</label>
                <input
                  type="file"
                  accept="video/mp4,video/avi,video/mov"
                  onChange={(e) => setVideo(e.target.files[0])}
                  required={!editItem}
                />
                {video && (
                  <div className="video-preview">
                    <video controls>
                      <source
                        src={URL.createObjectURL(video)}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {editItem && !video && (
                  <div className="current-video">
                    <video controls>
                      <source
                        src={`https://online-rangmach-backend-own6.vercel.app/uploads/videos/${editItem.video}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <small>Current video (upload new to replace)</small>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editItem ? "💾 Update Video" : "🎬 Upload Video"}
                </button>
                {editItem && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    ❌ Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* VIDEO GALLERY GRID */}
        <section className="video-gallery-section slide-in-right">
          <div className="section-header">
            <h2>Video Gallery</h2>
            <p>Manage your existing videos</p>
          </div>

          {videogallery.length > 0 ? (
            <div className="video-gallery-grid">
              {videogallery.map((item, index) => (
                <div
                  key={item._id}
                  className={`video-gallery-card scale-in stagger-${(index % 6) + 1}`}
                >
                  <div className="card-video">
                    <video controls>
                      <source
                        src={`https://online-rangmach-backend-own6.vercel.app/uploads/videos/${item.video}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="card-content">
                    <h3>{item.title}</h3>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-video-gallery slide-up">
              <div className="empty-state">
                <div className="empty-icon">🎬</div>
                <h3>No Videos Yet</h3>
                <p>
                  Upload your first video using the form above to get started.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Adminvideogallery;
