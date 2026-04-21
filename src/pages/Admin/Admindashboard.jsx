import React, { useEffect, useState } from "react";
import "../../assets/css/dashboardCss/AdmindashboardPage.css";

import { getCourses } from "../../services/courseService";
import { getRegistration } from "../../services/registrationService";
import { getContact } from "../../services/contactService";
import { getTrainers } from "../../services/trainersService";
import { getPhotogallery } from "../../services/photogalleryService";
import { getVideogallery } from "../../services/videogalleryService";

const Admindashboard = () => {
  const [counts, setCounts] = useState({
    courses: 0,
    registrations: 0,
    contacts: 0,
    trainers: 0,
    photos: 0,
    videos: 0,
  });

  useEffect(() => {
    const admin = localStorage.getItem("token");
    if (!admin) {
      window.location.href = "/admin_login";
    }

    fetchCounts();
  }, []);

  /* ================= FETCH COUNTS ================= */
  const fetchCounts = async () => {
    try {
      const [courseRes, regRes, contactRes, trainerRes, photoRes, videoRes] =
        await Promise.all([
          getCourses(),
          getRegistration(),
          getContact(),
          getTrainers(),
          getPhotogallery(),
          getVideogallery(),
        ]);

      setCounts({
        courses: courseRes.data.data.length || 0,
        registrations: regRes.data.data.length || 0,
        contacts: contactRes.data.data.length || 0,
        trainers: trainerRes.data.data.length || 0,
        photos: photoRes.data.data.length || 0,
        videos: videoRes.data.data.length || 0,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header fade-in">
        <h1>🎭 Admin Dashboard</h1>
        <p>Welcome back! Here's an overview of your academy management.</p>
      </header>

      <main className="dashboard-main">
        <section className="stats-grid">
          <div className="stat-card scale-in stagger-1">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>{counts.courses}</h3>
              <p>Total Courses</p>
            </div>
            <a href="/admincourses" className="stat-link">
              Manage Courses
            </a>
          </div>

          <div className="stat-card scale-in stagger-2">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{counts.registrations}</h3>
              <p>Student Registrations</p>
            </div>
            <a href="/adminregistration" className="stat-link">
              View Registrations
            </a>
          </div>

          <div className="stat-card scale-in stagger-3">
            <div className="stat-icon">📞</div>
            <div className="stat-content">
              <h3>{counts.contacts}</h3>
              <p>Contact Messages</p>
            </div>
            <a href="/admincontact" className="stat-link">
              Manage Contacts
            </a>
          </div>

          <div className="stat-card scale-in stagger-4">
            <div className="stat-icon">👨‍🏫</div>
            <div className="stat-content">
              <h3>{counts.trainers}</h3>
              <p>Expert Trainers</p>
            </div>
            <a href="/admintrainers" className="stat-link">
              Manage Trainers
            </a>
          </div>

          <div className="stat-card scale-in stagger-5">
            <div className="stat-icon">📸</div>
            <div className="stat-content">
              <h3>{counts.photos}</h3>
              <p>Photo Gallery</p>
            </div>
            <a href="/adminphotogallery" className="stat-link">
              Manage Photos
            </a>
          </div>

          <div className="stat-card scale-in stagger-6">
            <div className="stat-icon">🎥</div>
            <div className="stat-content">
              <h3>{counts.videos}</h3>
              <p>Video Gallery</p>
            </div>
            <a href="/adminvideogallery" className="stat-link">
              Manage Videos
            </a>
          </div>
        </section>

        <section className="quick-actions slide-up">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/adminaddstudent" className="action-card">
              <div className="action-icon">➕</div>
              <h4>Add New Student</h4>
              <p>Register a new student manually</p>
            </a>
            <a href="/admindashboard" className="action-card">
              <div className="action-icon">📊</div>
              <h4>View Analytics</h4>
              <p>Check detailed statistics</p>
            </a>
            <a href="/adminlogout" className="action-card">
              <div className="action-icon">🚪</div>
              <h4>Logout</h4>
              <p>Securely sign out</p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admindashboard;
