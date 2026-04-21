import React, { useState } from "react";
import "../assets/css/ContactPage.css";
import { createContact } from "../services/contactService";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setStatus("");

    try {
      const data = await createContact(formData);

      if (data.data.success) {
        setMsg("Message sent successfully!");
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg(data.data?.error || "Failed to send message.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setMsg("Failed to send message.");
      setStatus("error");
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero fade-in">
        <div className="hero-copy slide-up">
          <span>Connect With Us</span>
          <h1>Tell us about your creative goals.</h1>
          <p>
            Have a question about classes, auditions, or training? Send us a
            message and we’ll get back to you soon.
          </p>
        </div>
      </section>

      <section className="contact-panel container slide-in-left">
        <div className="contact-card scale-in">
          <div className="contact-head">
            <p className="section-label">Contact</p>
            <h2>Send a message to Theatre Academy</h2>
            <p className="section-copy">
              We’re here to help with registration, programs, and performance
              details.
            </p>
          </div>

          {msg && <div className={`message ${status} bounce-in`}>{msg}</div>}

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="submit-btn scale-in">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
