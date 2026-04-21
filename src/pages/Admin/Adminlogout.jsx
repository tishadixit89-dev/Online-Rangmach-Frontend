import { useEffect } from "react";

const Adminlogout = () => {
  useEffect(() => {
    // Remove admin session token
    localStorage.removeItem("token");

    // Redirect to login page
    window.location.href = "/admin_login";
  }, []);

  return null;
};

export default Adminlogout;
