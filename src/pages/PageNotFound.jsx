
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();

  const { isAuthenticated, userRole } = useSelector(
    (state) => state.auth
  );

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (userRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (userRole === "EMPLOYEE") {
      navigate("/employee/jobs");
    } else if (userRole === "EMPLOYER") {
      navigate("/employer/my-jobs");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <div className="btn-group">
        <button onClick={goBack}>Go Back</button>
        <button onClick={goHome}>Go Home</button>
      </div>
    </div>
  );
}

export default PageNotFound;