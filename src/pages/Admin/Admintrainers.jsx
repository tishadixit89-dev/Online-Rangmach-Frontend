import React, { useEffect, useState } from "react";
import "../../assets/css/dashboardCss/AdmintrainersPage.css";

import {
  getTrainers,
  createTrainers,
  updateTrainers,
  deleteTrainers,
} from "../../services/trainersService";

const Admintrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [editTrainers, setEditTrainers] = useState(null);
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
  });

  useEffect(() => {
    const admin = localStorage.getItem("token");
    if (!admin) {
      window.location.href = "/admin/login";
    }
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await getTrainers();
      setTrainers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setTrainers([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTrainers) {
        await updateTrainers(editTrainers._id, {
          ...form,
          image,
        });
        setMsg("Trainer updated successfully!");
      } else {
        await createTrainers({
          ...form,
          image,
        });
        setMsg("Trainer added successfully!");
      }

      setForm({
        name: "",
        specialization: "",
        experience: "",
      });

      setImage(null);
      setEditTrainers(null);
      fetchTrainers();

      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error saving trainer:", error);
      setMsg("Something went wrong!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trainer?")) return;

    try {
      await deleteTrainers(id);
      setMsg("Trainer deleted successfully!");
      fetchTrainers();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error deleting trainer:", error);
      setMsg("Failed to delete trainer!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleEdit = (trainer) => {
    setEditTrainers(trainer);
    setForm({
      name: trainer.name,
      specialization: trainer.specialization,
      experience: trainer.experience,
    });
  };

  const handleCancel = () => {
    setEditTrainers(null);
    setForm({
      name: "",
      specialization: "",
      experience: "",
    });
    setImage(null);
  };

  return (
    <div className="admin-trainers">
      <header className="trainers-header fade-in">
        <h1>👨‍🏫 Trainer Management</h1>
        <p>Manage your performing arts academy's expert trainers.</p>
      </header>

      <main className="trainers-main">
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
              <h2>{editTrainers ? "✏️ Edit Trainer" : "➕ Add New Trainer"}</h2>
              <p>
                {editTrainers
                  ? "Update trainer details"
                  : "Add a new expert trainer to your academy"}
              </p>
            </div>

            <form className="trainers-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Trainer Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Sarah Johnson"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    placeholder="e.g., Classical Dance"
                    value={form.specialization}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    placeholder="e.g., 5"
                    value={form.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Profile Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required={!editTrainers}
                  accept="image/*"
                />
                {image && (
                  <div className="image-preview">
                    <img src={URL.createObjectURL(image)} alt="Preview" />
                  </div>
                )}
                {editTrainers && !image && (
                  <div className="current-image">
                    <img
                      src={`http://localhost:5000/uploads/photos/${editTrainers.image}`}
                      alt="Current"
                    />
                    <small>Current image (upload new to replace)</small>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editTrainers ? "💾 Update Trainer" : "👨‍🏫 Add Trainer"}
                </button>
                {editTrainers && (
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

        {/* TRAINERS GRID */}
        <section className="trainers-section slide-in-right">
          <div className="section-header">
            <h2>Expert Trainers</h2>
            <p>Manage your academy's talented instructors</p>
          </div>

          {trainers.length > 0 ? (
            <div className="trainers-grid">
              {trainers.map((trainer, index) => (
                <div
                  key={trainer._id}
                  className={`trainer-card scale-in stagger-${(index % 6) + 1}`}
                >
                  <div className="card-image">
                    <img
                      src={`http://localhost:5000/uploads/photos/${trainer.image}`}
                      alt={trainer.name}
                    />
                  </div>

                  <div className="card-content">
                    <h3>{trainer.name}</h3>
                    <div className="trainer-specialization">
                      🎭 {trainer.specialization}
                    </div>
                    <div className="trainer-experience">
                      🏆 {trainer.experience} Years Experience
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(trainer)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(trainer._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-trainers slide-up">
              <div className="empty-state">
                <div className="empty-icon">👨‍🏫</div>
                <h3>No Trainers Yet</h3>
                <p>
                  Add your first expert trainer using the form above to get
                  started.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admintrainers;
