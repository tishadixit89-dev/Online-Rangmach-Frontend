import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Photogallery from "./pages/Photogallery";
import Videogallery from "./pages/Videogallery";
import Trainers from "./pages/Trainers";
import Registration from "./pages/Registration";
import Contact from "./pages/Contact";
import Admindashboard from "./pages/Admin/Admindashboard";
import Admincourses from "./pages/Admin/Admincourses";
import AdminPhotogallery from "./pages/Admin/Adminphotogallery";
import Adminvideogallery from "./pages/Admin/Adminvideogallery";
import Admintrainers from "./pages/Admin/Admintrainers";
import Adminregistration from "./pages/Admin/Adminregistration";
import Adminaddstudent from "./pages/Admin/Adminaddstudent";
import Admincontacts from "./pages/Admin/Admincontact";
import Adminlogin from "./pages/Admin/Adminlogin";
import Adminlogout from "./pages/Admin/Adminlogout";

const App = () => {
  return (
    <div>
      <Navbar />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/photogallery" element={<Photogallery />} />
          <Route path="/videogallery" element={<Videogallery />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/admincourses" element={<Admincourses />} />
          <Route path="/adminphotogallery" element={<AdminPhotogallery />} />
          <Route path="/adminvideogallery" element={<Adminvideogallery />} />
          <Route path="/admintrainers" element={<Admintrainers />} />
          <Route path="/adminregistration" element={<Adminregistration />} />
          <Route path="/adminaddstudent" element={<Adminaddstudent />} />
          <Route path="/admincontact" element={<Admincontacts />} />
          <Route path="/adminlogout" element={<Adminlogout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
