import React from "react";
import { Link } from "react-router-dom";
import '../styles/PageFooter.css'
import logo from "../assets/Joblogo.jpeg"; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LOGO */}
        <div className="footer-logo">
          <img src={logo} alt="TalentBridge Logo" />
          <p>
            Connecting talent with opportunity across India and beyond.
          </p>
        </div>

        {/* PLATFORM */}
        <div className="footer-column">
          <h5>Platform</h5>
          <Link to="/">Home</Link>
          <Link to="/jobs">Browse Jobs</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* ACCOUNT */}
        <div className="footer-column">
          <h5>Account</h5>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* LEGAL */}
        <div className="footer-column">
          <h5>Legal</h5>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Cookie Policy</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 TalentBridge. All rights reserved.
      </div>
    </footer>
  );
}