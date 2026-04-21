import React, { useEffect, useState } from "react";
import "../../assets/css/dashboardCss/AdmincoursesPage.css";

import {
  getCourses,
  createCourses,
  updateCourses,
  deleteCourses,
} from "../../services/courseService";

const Admincourses = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    coursename: "",
    duration: "",
    fees: "",
    description: "",
  });

  useEffect(() => {
    const admin = localStorage.getItem("token");
    if (!admin) {
      window.location.href = "/admin/login";
    }
    fetchCourses();
  }, []);

  /* ================= FETCH ================= */
  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...form,
        image,
      };

      if (editCourse) {
        await updateCourses(editCourse._id, data);
        setMsg("Course updated successfully!");
      } else {
        await createCourses(data);
        setMsg("Course added successfully!");
      }

      setForm({
        coursename: "",
        duration: "",
        fees: "",
        description: "",
      });

      setImage(null);
      setEditCourse(null);
      fetchCourses();

      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error saving course:", error);
      setMsg("Something went wrong!");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await deleteCourses(id);
      setMsg("Course deleted!");
      fetchCourses();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (course) => {
    setEditCourse(course);
    setForm({
      coursename: course.coursename,
      duration: course.duration,
      fees: course.fees,
      description: course.description,
    });
  };

  return (
    <div className="admin-courses">
      <header className="courses-header fade-in">
        <h1>📚 Course Management</h1>
        <p>Add, edit, and manage your performing arts courses.</p>
      </header>

      <main className="courses-main">
        {msg && (
          <div
            className={`message-toast ${msg.includes("success") || msg.includes("updated") || msg.includes("added") || msg.includes("deleted") ? "success" : "error"} slide-up`}
          >
            {msg}
          </div>
        )}

        {/* FORM SECTION */}
        <section className="form-section slide-in-left">
          <div className="form-card">
            <div className="form-header">
              <h2>{editCourse ? "✏️ Edit Course" : "➕ Add New Course"}</h2>
              <p>
                {editCourse
                  ? "Update course details"
                  : "Create a new course for your academy"}
              </p>
            </div>

            <form className="course-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Course Name</label>
                  <input
                    type="text"
                    name="coursename"
                    placeholder="e.g., Acting Masterclass"
                    value={form.coursename}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g., 3 months"
                    value={form.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fees (₹)</label>
                  <input
                    type="number"
                    name="fees"
                    placeholder="e.g., 5000"
                    value={form.fees}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Course Image</label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required={!editCourse}
                    accept="image/*"
                  />
                  {image && (
                    <div className="image-preview">
                      <img src={URL.createObjectURL(image)} alt="Preview" />
                    </div>
                  )}
                  {editCourse && !image && (
                    <div className="current-image">
                      <img
                        src={`https://online-rangmach-backend-own6.vercel.app/uploads/photos/${editCourse.image}`}
                        alt="Current"
                      />
                      <small>Current image (upload new to replace)</small>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the course content, objectives, and what students will learn..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editCourse ? "💾 Update Course" : "🎭 Add Course"}
                </button>
                {editCourse && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setEditCourse(null);
                      setForm({
                        coursename: "",
                        duration: "",
                        fees: "",
                        description: "",
                      });
                      setImage(null);
                    }}
                  >
                    ❌ Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* COURSES GRID */}
        <section className="courses-section slide-in-right">
          <div className="section-header">
            <h2>All Courses</h2>
            <p>Manage your existing courses</p>
          </div>

          {courses.length > 0 ? (
            <div className="courses-grid">
              {courses.map((course, index) => (
                <div
                  key={course._id}
                  className={`course-card scale-in stagger-${(index % 6) + 1}`}
                >
                  <div className="card-image">
                    <img
                      src={`https://online-rangmach-backend-own6.vercel.app/uploads/photos/${course.image}`}
                      alt={course.coursename}
                    />
                  </div>

                  <div className="card-content">
                    <h3>{course.coursename}</h3>
                    <p className="course-description">{course.description}</p>

                    <div className="course-meta">
                      <span className="duration">⏱ {course.duration}</span>
                      <span className="fees">💰 ₹{course.fees}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(course)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(course._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-courses slide-up">
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No Courses Yet</h3>
                <p>
                  Add your first course using the form above to get started.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admincourses;
