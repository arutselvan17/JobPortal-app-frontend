import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompany } from "../slice/AdminCompnaySlice";
import PostCompany from "./PostCompany";
import "../styles/AllCompany.css";

export default function AllCompany() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { companies, loading, error } = useSelector(
    (state) => state.allcompany
  );

  useEffect(() => {
    dispatch(fetchAllCompany());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    dispatch(fetchAllCompany()); 
  };

  console.log(companies)
  return (
    <div className="company-container">

      <div id="hero">
        <h2>All Companies</h2>
        <button onClick={() => setShowModal(true)}>Post Company</button>
      </div>

      {loading && <p style={{ padding: "16px" }}>Loading companies...</p>}

      {error && (
        <p style={{ padding: "16px", color: "red" }}>
          {typeof error === "string" ? error : "Failed to load companies."}
        </p>
      )}

      <table className="company-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {companies?.length > 0 ? (
            companies.map((c) => (
              <tr key={c.companyId}>
                <td>{c.companyName}</td>
                <td>{c.companyLocation}</td>
                <td>{c.companyDescription}</td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No companies found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {showModal && <PostCompany onClose={handleClose} />}

    </div>
  );
}