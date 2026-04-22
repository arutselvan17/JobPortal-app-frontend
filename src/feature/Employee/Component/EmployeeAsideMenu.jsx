import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/EmployeeAsideMenu.css';
import ConfirmModal from "../../../component/ConfirmModal";

export default function EmployeeAsideMenu({ logout }) {
  const [showModal, setShowModal] = useState(false);

  const openLogoutModal = () => setShowModal(true);
  const confirmLogout = () => {
    logout();
    setShowModal(false);
  };
  const cancelLogout = () => setShowModal(false);

  return (
    <>
      <aside className="employer-aside">
        <h2 className="employer-title">Employee Panel</h2>

        <ul className="employer-menu">

          <li>
            <NavLink to="/employee/jobs">
              Browse Jobs
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/saved-jobs">
              Saved Jobs
            </NavLink>
          </li>

          <li>
            <NavLink to="/employee/my-applications">
              My Applications
            </NavLink>
          </li>

          {/* LOGOUT */}
          <li>
            <div className="employer-logout" onClick={openLogoutModal}>
              Logout
            </div>
          </li>

        </ul>
      </aside>

      <ConfirmModal
        show={showModal}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}