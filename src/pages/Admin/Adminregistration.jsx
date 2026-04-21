import React, { useEffect, useState } from "react";
import "../../assets/css/dashboardCss/AdminregistrationPage.css";
import {
  getRegistration,
  deleteRegistration,
} from "../../services/registrationService";

const Adminregistration = () => {
  const [registration, setRegistration] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const admin = localStorage.getItem("token");
    if (!admin) {
      window.location.href = "/admin/login";
    }
    fetchRegistration();
  }, []);

  const fetchRegistration = async () => {
    try {
      const res = await getRegistration();
      setRegistration(res.data.data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setRegistration([]);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this student registration?",
      )
    )
      return;

    try {
      await deleteRegistration(id);
      setRegistration((prev) => prev.filter((item) => item._id !== id));
      setMsg("Student registration deleted successfully!");
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Error deleting registration:", error);
      setMsg("Failed to delete student registration!");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  return (
    <div className="admin-registration">
      <header className="registration-header fade-in">
        <h1>📋 Student Registrations</h1>
        <p>Manage your performing arts academy's student registrations.</p>
      </header>

      <main className="registration-main">
        {msg && (
          <div
            className={`message-toast ${msg.includes("success") ? "success" : "error"} slide-up`}
          >
            {msg}
          </div>
        )}

        <section className="registration-section slide-in-up">
          <div className="section-header">
            <h2>All Registrations</h2>
            <p>View and manage student registration details</p>
          </div>

          {registration.length > 0 ? (
            <div className="registration-grid">
              {registration.map((item, index) => (
                <div
                  key={item._id}
                  className={`registration-card scale-in stagger-${(index % 6) + 1}`}
                >
                  <div className="card-header">
                    <div className="student-id">ID: {item._id.slice(-8)}</div>
                    <div className="registration-date">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="student-info">
                      <h3 className="student-name">
                        👤 {item.studentname || item.name}
                      </h3>

                      <div className="info-row">
                        <span className="label">📧 Email:</span>
                        <span className="value">{item.email}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">📱 Phone:</span>
                        <span className="value">
                          {item.phonenumber || item.phone}
                        </span>
                      </div>

                      <div className="info-row">
                        <span className="label">🏠 Address:</span>
                        <span className="value">{item.address}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">🏙️ City:</span>
                        <span className="value">{item.city}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">🎭 Course:</span>
                        <span className="value">
                          {item.courses || item.course}
                        </span>
                      </div>

                      <div className="info-row">
                        <span className="label">⚧ Gender:</span>
                        <span className="value">{item.gender}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑️ Delete Registration
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-registrations slide-up">
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>No Student Registrations Yet</h3>
                <p>
                  Student registrations will appear here once students enroll in
                  your courses.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Adminregistration;
