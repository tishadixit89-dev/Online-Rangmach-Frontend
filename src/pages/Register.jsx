import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-hero">
        <div className="hero-copy">
          <span>Create your account</span>
          <h1>Join Theatre Academy</h1>
          <p>
            Sign up for coaching, creative sessions, and rehearsals designed for
            confident performers.
          </p>
        </div>
      </section>

      <section className="register-panel container">
        <div className="register-card">
          <div className="register-card-header">
            <h2>Register</h2>
            <p>Start your journey with our theatre and performance programs.</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
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
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="register-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
