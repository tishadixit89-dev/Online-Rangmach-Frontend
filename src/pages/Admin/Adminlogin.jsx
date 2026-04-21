import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "../../assets/css/dashboardCss/AdminloginPage.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admindashboard");
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
      const response = await loginUser(formData);
      localStorage.setItem("token", response.data.token);
      navigate("/admindashboard");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-card fade-in">
          <div className="login-header">
            <div className="logo-section">
              <div className="logo-icon">🎭</div>
              <h1>Performing Arts Academy</h1>
            </div>
            <h2>Admin Portal</h2>
            <p>Welcome back! Please sign in to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">📧 Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">🔒 Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            {error && (
              <div className="error-message slide-down">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                <>🚪 Sign In</>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Secure admin access only</p>
          </div>
        </div>

        <div className="background-decoration">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
