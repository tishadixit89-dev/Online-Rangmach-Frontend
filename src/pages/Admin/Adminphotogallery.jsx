import React, { useEffect, useState } from "react";
import "../../assets/css/dashboardCss/AdminphotogalleryPage.css";

import {
  getPhotogallery,
  createPhotogallery,
  updatePhotogallery,
  deletePhotogallery,
} from "../../services/photogalleryService";

const Adminphotogallery = () => {
  const [photogallery, setPhotogallery] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const admin = localStorage.getItem("token");
    if (!admin) {
      window.location.href = "/admin/login";
    }
    fetchPhotogallery();
  }, []);

  const fetchPhotogallery = async () => {
    try {
      const res = await getPhotogallery();
      setPhotogallery(res.data.data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setPhotogallery([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await createPhotogallery({
        title,
        image,
      });

      setTitle("");
      setImage(null);
      setMsg("Photo added successfully!");
      fetchPhotogallery();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error adding photo:", error);
      setMsg("Failed to add photo!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo?")) return;

    try {
      await deletePhotogallery(id);
      setMsg("Photo deleted successfully!");
      fetchPhotogallery();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error deleting photo:", error);
      setMsg("Failed to delete photo!");
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
      await updatePhotogallery(editItem._id, {
        title,
        image: image || editItem.image,
      });

      setTitle("");
      setImage(null);
      setEditItem(null);
      setMsg("Photo updated successfully!");
      fetchPhotogallery();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error updating photo:", error);
      setMsg("Failed to update photo!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleCancel = () => {
    setEditItem(null);
    setTitle("");
    setImage(null);
  };

  return (
    <div className="admin-gallery">
      <header className="gallery-header fade-in">
        <h1>📸 Photo Gallery Management</h1>
        <p>Manage your performing arts academy's photo collection.</p>
      </header>

      <main className="gallery-main">
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
              <h2>{editItem ? "✏️ Edit Photo" : "➕ Add New Photo"}</h2>
              <p>
                {editItem
                  ? "Update photo details"
                  : "Add a new photo to your gallery"}
              </p>
            </div>

            <form
              className={editItem ? "gallery-form" : "gallery-form"}
              onSubmit={editItem ? handleUpdate : handleAdd}
            >
              <div className="form-group">
                <label>Photo Title</label>
                <input
                  type="text"
                  placeholder="e.g., Dance Performance 2024"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Photo Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required={!editItem}
                  accept="image/*"
                />
                {image && (
                  <div className="image-preview">
                    <img src={URL.createObjectURL(image)} alt="Preview" />
                  </div>
                )}
                {editItem && !image && (
                  <div className="current-image">
                    <img
                      src={`https://online-rangmach-backend-own6.vercel.app/uploads/photos/${editItem.image}`}
                      alt="Current"
                    />
                    <small>Current image (upload new to replace)</small>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editItem ? "💾 Update Photo" : "📸 Add Photo"}
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

        {/* GALLERY GRID */}
        <section className="gallery-section slide-in-right">
          <div className="section-header">
            <h2>Photo Gallery</h2>
            <p>Manage your existing photos</p>
          </div>

          {photogallery.length > 0 ? (
            <div className="gallery-grid">
              {photogallery.map((item, index) => (
                <div
                  key={item._id}
                  className={`gallery-card scale-in stagger-${(index % 6) + 1}`}
                >
                  <div className="card-image">
                    <img
                      src={`https://online-rangmach-backend-own6.vercel.app/uploads/photos/${item.image}`}
                      alt={item.title}
                    />
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
            <div className="no-gallery slide-up">
              <div className="empty-state">
                <div className="empty-icon">📸</div>
                <h3>No Photos Yet</h3>
                <p>Add your first photo using the form above to get started.</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Adminphotogallery;
