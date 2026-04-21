import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <nav className="navbar">
        <Logo />
        <div className="navbar-links">
          <Link to="/admindashboard">Dashboard</Link>
          <Link to="/admincourses">Courses</Link>
          <Link to="/adminphotogallery">Photogallery</Link>
          <Link to="/adminvideogallery">Videogallery</Link>
          <Link to="/admintrainers">Trainers</Link>
          <Link to="/adminregistration">Registration</Link>
          <Link to="/adminaddstudent">Addstudent</Link>
          <Link to="/admincontact">Contact</Link>
          <button type="button" onClick={handleLogout} className="link-button">
            Logout
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Logo />
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/photogallery">Photogallery</Link>
        <Link to="/videogallery">Videogallery</Link>
        <Link to="/trainers">Trainers</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
