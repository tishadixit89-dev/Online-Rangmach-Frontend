import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Branding */}
        <div className="footer-section">
          <h2 className="footer-logo">MyPortfolio</h2>
          <p>
            Showcasing creativity, skills, and projects with a modern touch.
          </p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Me</a>
            </li>
            <li>
              <a href="#register">Register</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#login">Login</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: yourname@example.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: Tarana, MP, India</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Follow Me</h3>
          <div className="footer-social">
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 MyPortfolio. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
