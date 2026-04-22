// Employee.jsx
// This is the main page for the Employee role.
// Layout: Navbar on top, then sidebar + content side by side below.

import React from "react";
import Navbar from "../component/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../feature/auth/slice/AuthSlice";
import "../styles/Employee.css";
import EmployeeAsideMenu from "../feature/Employee/Component/EmployeeAsideMenu";

export default function Employee() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="employee-page">

      {/* 1. Navbar stays at the very top */}
      <Navbar />

      {/* 2. Everything below the navbar sits side by side */}
      <div className="employee-body">

        {/* Left: the sidebar menu */}
        <EmployeeAsideMenu logout={handleLogout} />

        {/* Right: the page content (EmployeeSearchJob loads here) */}
        <div className="employee-content">
          <Outlet context={{ handleLogout }} />
        </div>

      </div>

    </div>
  );
}