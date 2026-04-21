import React from "react";
import { Link } from "react-router-dom";
import "../components/Footer.css";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND SECTION */}
        <div className="footer-box">
          <Logo className="footer-logo-container" />
          <p>
            A creative theatre academy dedicated to acting, drama, dance, and
            performance arts training.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-box">
          <h3>Contact</h3>
          <p>Email: info@rangmanch.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Bhopal, India</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Online-Rangmanch | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
