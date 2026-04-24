import React from "react";
import "./AdminFooter.css";

export default function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">

        {/*  System Info */}
        <div className="admin-footer-logo">
          <div>
            <h4>TalentBridge Admin</h4>
            <p>System control panel for managing users, employers, and jobs.</p>
          </div>
        </div>

        {/*  Quick System Links */}
        <div className="admin-footer-column">
          <h5>ADMIN PANEL</h5>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/users">users</a>
          <a href="/admin/applications">applications</a>
          <a href="#">Jobs</a>
        </div>

        {/*  System & Support */}
        <div className="admin-footer-column right">
          <h5>SYSTEM</h5>
          <a href="#">Logs</a>
          <a href="#">Reports</a>
          <a href="#">Settings</a>
          <a href="#">Support</a>
        </div>
      </div>

      {/* Bottom */}
      <div className="admin-footer-bottom">
        <p>© {new Date().getFullYear()} TalentBridge Admin Panel. All rights reserved.</p>
      </div>
    </footer>
  );
}