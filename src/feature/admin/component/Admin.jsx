import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/Navbar";
import AsideAdminMenu from "./AsideAdminMenu";
import "./Admin.css";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";

export default function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="admin-layout-wrapper">

        {/* Sidebar + Content */}
        <div className="admin-layout">
          <AsideAdminMenu logout={handleLogout} />

          <div className="admin-content">
            <Outlet />
          </div>
        </div>

        {/* Footer OUTSIDE layout */}
        <AdminFooter />
      </div>
    </>
  );
}