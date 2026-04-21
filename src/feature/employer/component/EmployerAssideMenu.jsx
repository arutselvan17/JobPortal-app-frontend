import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/EmployerAsideMenu.css";
import ConfirmModal from "../../../component/ConfirmModal";

export default function AsideEmployerMenu({ logout }) {
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
        <h2 className="employer-title">Employer Panel</h2>

        <ul className="employer-menu">

          <li>
            <NavLink to="/employer/my-jobs">
              My Jobs
            </NavLink>
          </li>

          <li>
            <NavLink to="/employer/post-job">
              Post Job
            </NavLink>
          </li>

          <li>
            <NavLink to="/employer/applications">
              Applications
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