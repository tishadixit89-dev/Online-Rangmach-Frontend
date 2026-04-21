import React, { useState } from "react";
import "../assets/css/RegistrationPage.css";
import { createRegistration } from "../services/registrationService";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    studentname: "",
    address: "",
    city: "",
    phonenumber: "",
    email: "",
    gender: "",
    courses: "",
  });

  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createRegistration(formData);
      console.log(data.data.message);
      setMessage(data.data.message);
      setIsSuccess(data.success);
      setShow(true);

      // Auto hide after 3 sec
      setTimeout(() => {
        setShow(false);
      }, 3000);

      if (data.success) {
        setFormData({
          studentname: "",
          email: "",
          phonenumber: "",
          address: "",
          city: "",
          gender: "",
          courses: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("Registration already exists");
      setIsSuccess(false);
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };
  return (
    <div className="register-page">
      <section className="register-hero fade-in">
        <div className="hero-copy slide-up">
          <span>Enroll Today</span>
          <h1>Student Registration</h1>
          <p>
            Join our performing arts academy and start your creative journey
            with professional training in acting, dance, drama, and music.
          </p>
        </div>
      </section>

      <div className="register-panel slide-in-left">
        <div className="register-card scale-in">
          <div className="register-card-header">
            <h2>Register Now</h2>
            <p>
              Fill out the form below to enroll in your chosen course and begin
              your artistic adventure.
            </p>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            {show && (
              <div
                className={`toast ${isSuccess ? "success" : "error"} bounce-in`}
              >
                {message}
              </div>
            )}
            <label>
              Full Name
              <input
                type="text"
                name="studentname"
                required
                value={formData.studentname}
                onChange={handleChange}
              />
            </label>
            <label>
              Email Address
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone Number
              <input
                type="text"
                name="phonenumber"
                required
                value={formData.phonenumber}
                onChange={handleChange}
              />
            </label>
            <label>
              Address
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <label>
              City
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              />
            </label>
            <label>
              Gender
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Course
              <select
                name="courses"
                required
                value={formData.courses}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                <option>Acting</option>
                <option>Dance</option>
                <option>Drama</option>
                <option>Music</option>
                <option>Stage-Makeup</option>
                <option>Script-Writting</option>
              </select>
            </label>
            <button type="submit" className="submit-btn scale-in">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
