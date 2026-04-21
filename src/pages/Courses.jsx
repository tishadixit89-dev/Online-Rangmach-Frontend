import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/CoursesPage.css";
import { getCourses } from "../services/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnroll = () => {
    navigate("/registration");
  };

  return (
    <main className="courses-page">
      <header className="courses-hero fade-in">
        <div className="hero-copy slide-up">
          <span>Our Courses</span>
          <h1>Learn performance skills that shine on stage and screen.</h1>
          <p>
            Explore theatre, acting, dance, and confidence-building programs
            crafted for beginners and advanced learners.
          </p>
        </div>
      </header>

      <section className="courses-list container slide-in-left">
        <div className="courses-top">
          <div>
            <p className="section-label">Training Programs</p>
            <h2>Professional courses for every passion.</h2>
          </div>
          <p className="section-copy">
            Choose the right program for your age, skill level, and stage goals.
          </p>
        </div>

        {loading && <p className="status-message">Loading courses...</p>}
        {error && <p className="status-message error">{error}</p>}

        {!loading && !error && (
          <div className="courses-grid">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <article
                  key={course._id}
                  className={`course-card scale-in stagger-${(index % 6) + 1}`}
                >
                  <div className="course-media">
                    <img
                      src={`http://localhost:5000/uploads/photos/${course.image}`}
                      alt={course.coursename}
                      className="course-img"
                    />
                  </div>

                  <div className="course-body">
                    <h3>{course.coursename}</h3>
                    <p>{course.description}</p>

                    <div className="course-meta">
                      <span>⏱ {course.duration}</span>
                      <span>💰 ₹{course.fees}</span>
                    </div>

                    <button className="course-action" onClick={handleEnroll}>
                      Enroll Now
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="status-message">No courses available.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Courses;
