import React from "react";
import Navbar from "../component/Navbar";
import EmployerAsideMenu from "../feature/employer/component/EmployerAssideMenu.jsx";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../feature/auth/slice/AuthSlice.jsx";
import Footer from "../component/Footer";
import "./styles/Employer.css";
import MyJobs from "../feature/jobs/component/MyJobs.jsx";
import EmployerStatus from "../feature/employer/component/EmployerStatus.jsx";

export default function Employer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div >
      <Navbar />
      
      <div className="employer-layout">
        
        <EmployerAsideMenu logout={handleLogout} />

        <div className="employer-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}