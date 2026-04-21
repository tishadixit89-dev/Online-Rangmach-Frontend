import React, { useEffect, useState } from "react";
import "../../assets/css/dashboardCss/AdmincontactPage.css";
import { getContact, deleteContact } from "../../services/contactService";

const Contact = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    const admin = localStorage.getItem("token");
    if (!admin) {
      window.location.href = "/admin/login";
    }
    fetchContact();
  }, []);

  /* ================= FETCH ================= */
  const fetchContact = async () => {
    try {
      const data = await getContact();
      setContact(data.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );
    if (!confirmDelete) return;

    try {
      await deleteContact(id);

      // Remove from UI instantly
      setContact((prev) => prev.filter((item) => item._id !== id));

      alert("Message deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting message");
    }
  };

  return (
    <div className="admin-contacts">
      <header className="contacts-header fade-in">
        <h1>📞 Contact Messages</h1>
        <p>Manage and respond to user inquiries and feedback.</p>
      </header>

      <main className="contacts-main">
        {contact.length > 0 ? (
          <div className="contacts-grid slide-in-left">
            {contact.map((item, index) => (
              <div
                key={item._id}
                className={`contact-card scale-in stagger-${(index % 6) + 1}`}
              >
                <div className="card-header">
                  <div className="contact-info">
                    <h3>{item.name || "Anonymous"}</h3>
                    <p className="contact-email">{item.email || "No email"}</p>
                  </div>
                  <div className="contact-date">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>

                <div className="card-body">
                  <p className="contact-message">
                    {item.message || "No message"}
                  </p>
                </div>

                <div className="card-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    🗑️ Delete
                  </button>
                  <button
                    className="reply-btn"
                    onClick={() =>
                      window.open(`mailto:${item.email}`, "_blank")
                    }
                  >
                    ✉️ Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-contacts slide-up">
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No Contact Messages</h3>
              <p>
                When users send messages through the contact form, they'll
                appear here.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Contact;
