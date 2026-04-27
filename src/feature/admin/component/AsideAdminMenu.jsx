import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/AsideAdminMenu.css";
import ConfirmModal from "../../../component/ConfirmModal";

export default function AsideAdminMenu(props) {
  const [showModal, setShowModal] = useState(false);

  const openLogoutModal = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    props.logout();
    setShowModal(false);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <aside className="admin-aside">
        <h2 className="admin-title">Admin Panel</h2>

        <ul className="admin-menu">
          <li>
            <NavLink to="/admin/dashboard">
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users">
              Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/company">
              Company
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/category">
              Category
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/announcement">
              Announcement
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/application">
              Application
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/jobs">
              Jobs
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/employer-requests">
              requests
            </NavLink>
          </li>

          {/* LOGOUT */}
          <li>
            <div className="admin-logout" onClick={openLogoutModal}>
              Logout
            </div>
          </li>
        </ul>
      </aside>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        show={showModal}
        title="Logout Confirmation"
        message="confrim to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}