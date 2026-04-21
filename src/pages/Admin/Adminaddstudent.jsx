import React, { useEffect, useState } from "react";
import "../../assets/css/dashboardCss/AdminaddstudentPage.css";
import {
  getAddstudent,
  createAddstudent,
  updateAddstudent,
  deleteAddstudent,
} from "../../services/addstudent";

const Adminaddstudent = () => {
  const [addstudent, setAddstudent] = useState([]);
  const [editAddstudent, setEditAddstudent] = useState(null);
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    DOB: "",
    Gender: "",
    Email: "",
    MobileNumber: "",
    Address: "",
    City: "",
    Course: "",
  });

  useEffect(() => {
    const admin = localStorage.getItem("token");
    if (!admin) {
      window.location.href = "/admin/login";
    }
    fetchAddstudent();
  }, []);

  const fetchAddstudent = async () => {
    try {
      const res = await getAddstudent();
      setAddstudent(res.data.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setAddstudent([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editAddstudent) {
        await updateAddstudent(editAddstudent._id, formData);
        setMsg("Student updated successfully!");
      } else {
        await createAddstudent(formData);
        setMsg("Student added successfully!");
      }

      setFormData({
        FirstName: "",
        LastName: "",
        DOB: "",
        Gender: "",
        Email: "",
        MobileNumber: "",
        Address: "",
        City: "",
        Course: "",
      });

      setEditAddstudent(null);
      fetchAddstudent();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error saving student:", error);
      setMsg("Something went wrong!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteAddstudent(id);
      setMsg("Student deleted successfully!");
      fetchAddstudent();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error deleting student:", error);
      setMsg("Failed to delete student!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleEdit = (student) => {
    setEditAddstudent(student);
    setFormData({
      FirstName: student.FirstName,
      LastName: student.LastName,
      DOB: student.DOB,
      Gender: student.Gender,
      Email: student.Email,
      MobileNumber: student.MobileNumber,
      Address: student.Address,
      City: student.City,
      Course: student.Course,
    });
  };

  const handleCancel = () => {
    setEditAddstudent(null);
    setFormData({
      FirstName: "",
      LastName: "",
      DOB: "",
      Gender: "",
      Email: "",
      MobileNumber: "",
      Address: "",
      City: "",
      Course: "",
    });
  };

  return (
    <div className="admin-add-student">
      <header className="add-student-header fade-in">
        <h1>👨‍🎓 Student Management</h1>
        <p>Manage your performing arts academy's student admissions.</p>
      </header>

      <main className="add-student-main">
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
              <h2>
                {editAddstudent ? "✏️ Edit Student" : "➕ Add New Student"}
              </h2>
              <p>
                {editAddstudent
                  ? "Update student information"
                  : "Add a new student to your academy"}
              </p>
            </div>

            <form className="student-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="FirstName"
                    placeholder="Enter first name"
                    value={formData.FirstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="LastName"
                    placeholder="Enter last name"
                    value={formData.LastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="Email"
                    placeholder="student@example.com"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="MobileNumber"
                    placeholder="+91 9876543210"
                    value={formData.MobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  name="Address"
                  placeholder="Enter full address"
                  value={formData.Address}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="City"
                    placeholder="Enter city"
                    value={formData.City}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Course</label>
                  <select
                    name="Course"
                    value={formData.Course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Course</option>
                    <option>Acting</option>
                    <option>Dance</option>
                    <option>Drama</option>
                    <option>Music</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editAddstudent ? "💾 Update Student" : "👨‍🎓 Add Student"}
                </button>
                {editAddstudent && (
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

        {/* STUDENTS GRID */}
        <section className="students-section slide-in-right">
          <div className="section-header">
            <h2>Enrolled Students</h2>
            <p>Manage your academy's student records</p>
          </div>

          {addstudent.length > 0 ? (
            <div className="students-grid">
              {addstudent.map((student, index) => (
                <div
                  key={student._id}
                  className={`student-card scale-in stagger-${(index % 6) + 1}`}
                >
                  <div className="card-header">
                    <div className="student-name">
                      👤 {student.FirstName} {student.LastName}
                    </div>
                    <div className="student-course">🎭 {student.Course}</div>
                  </div>

                  <div className="card-content">
                    <div className="student-info">
                      <div className="info-row">
                        <span className="label">📧 Email:</span>
                        <span className="value">{student.Email}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">📱 Phone:</span>
                        <span className="value">{student.MobileNumber}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">🎂 DOB:</span>
                        <span className="value">
                          {new Date(student.DOB).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="info-row">
                        <span className="label">⚧ Gender:</span>
                        <span className="value">{student.Gender}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">🏠 Address:</span>
                        <span className="value">{student.Address}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">🏙️ City:</span>
                        <span className="value">{student.City}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(student)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-students slide-up">
              <div className="empty-state">
                <div className="empty-icon">👨‍🎓</div>
                <h3>No Students Yet</h3>
                <p>
                  Add your first student using the form above to get started.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Adminaddstudent;
