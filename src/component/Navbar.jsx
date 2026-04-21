import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/Joblogo.jpeg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import bellIcon from "../assets/Notification.png";
import profileIcon from "../assets/profile.png";

import NotificationPanel from "../feature/notification/component/NotificationPanel";
import { fetchTodatUnreadNotification } from "../feature/notification/slice/NotificationSlice";

import Profile from "../feature/profile/component/Profile";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.userRole);
  const isAdmin = role === "ADMIN";
  const isEmployee = role === "EMPLOYEE";
  const isEmployer = role === "EMPLOYER";

  const { notifications = [] } = useSelector(
    (state) => state.notification || {},
  );

  const unreadCount = notifications.length;

  useEffect(() => {
    if (!role) return;

    dispatch(fetchTodatUnreadNotification());

    const interval = setInterval(() => {
      dispatch(fetchTodatUnreadNotification());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, role]);

  return (
    <>
      <nav id="navbar">
        {/* LOGO */}
        <div id="logo">
          <Link to="/">
            <img src={logo} alt="Job Portal Logo" />
          </Link>
          <p>TalentBridge</p>
        </div>

        {/* HAMBURGER */}
        <button
          id="hamburger"
          className={isOpen ? "open" : ""}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* MENU */}
        <div id="navmenu" className={isOpen ? "open" : ""}>
          <ul>
            {/* ================= ADMIN NAV ================= */}
            {isAdmin && (
              <li className="nav-right">
                {/* Notification */}
                <div
                  className="notification"
                  onClick={() => setShowNotifications(true)}
                >
                  <img src={bellIcon} alt="notifications" />

                  {unreadCount > 0 && (
                    <span className="dot">{unreadCount}</span>
                  )}
                </div>

                {/* Profile */}
                <div className="profile" onClick={() => setShowProfile(true)}>
                  <img src={profileIcon} alt="profile" />
                </div>
              </li>
            )}

            {isEmployee && (
              <li className="nav-right">
                {/* Notification */}
                <div
                  className="notification"
                  onClick={() => setShowNotifications(true)}
                >
                  <img src={bellIcon} alt="notifications" />

                  {unreadCount > 0 && (
                    <span className="dot">{unreadCount}</span>
                  )}
                </div>

                {/* Profile */}
                <div className="profile" onClick={() => setShowProfile(true)}>
                  <img src={profileIcon} alt="profile" />
                </div>
              </li>
            )}

            {isEmployer && (
              <li className="nav-right">
                {/* Notification */}
                <div
                  className="notification"
                  onClick={() => setShowNotifications(true)}
                >
                  <img src={bellIcon} alt="notifications" />

                  {unreadCount > 0 && (
                    <span className="dot">{unreadCount}</span>
                  )}
                </div>

                {/* Profile */}
                <div className="profile" onClick={() => setShowProfile(true)}>
                  <img src={profileIcon} alt="profile" />
                </div>
              </li>
            )}

           
            {!isAdmin && !isEmployee && !isEmployer && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
}
