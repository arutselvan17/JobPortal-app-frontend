import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobApplications, updateApplicationStatus } from "../../application/slice/EmployerApplicationSlice";
import "../styles/Application.css";

export default function Applications() {
  const dispatch = useDispatch();

  const {
    applications = [],
    error,
    loading,
  } = useSelector((state) => state.employerApplication);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [updateTarget, setUpdateTarget] = useState(null); 
  const [newStatus, setNewStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(getJobApplications());
  }, [dispatch]);

  // FILTER LOGIC
  const filteredApplications = applications.filter((app) => {
    const matchesTitle = app.jobTitle
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? app.status?.toUpperCase() === statusFilter.toUpperCase()
      : true;

    return matchesTitle && matchesStatus;
  });

  // STATUS BADGE
  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "APPLIED":
        return "badge badge-applied";
      case "SHORLISTED":
      case "SHORTLISTED":
        return "badge badge-shortlisted";
      case "REVIEWED":
        return "badge badge-reviewed";
      case "HIRED":
        return "badge badge-hired";
      case "REJECTED":
        return "badge badge-rejected";
      default:
        return "badge";
    }
  };

  // Open update status modal
  const openUpdateModal = (app) => {
    setUpdateTarget(app);
    setNewStatus(app.status || "APPLIED");
  };

  // Confirm status update
  const handleStatusUpdate = async () => {
    if (updateTarget && newStatus) {
      try {
        await dispatch(updateApplicationStatus({ id: updateTarget.applicationId, status: newStatus })).unwrap();
        setUpdateTarget(null);
        setNewStatus("");
      } catch (err) {
        alert("Failed to update status. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="app-loading-state">
        <div className="spinner" />
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error-state">
        <p>Failed to load applications</p>
      </div>
    );
  }

  return (
    <div className="app-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h2>Applications</h2>
          <p className="page-subtitle">Manage and review all job applications</p>
        </div>
        <div className="header-stat">
          <span className="stat-count">{filteredApplications.length}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="APPLIED">Applied</option>
          <option value="REVIEWED">Reviewed</option>
          <option value="SHORLISTED">Shortlisted</option>
          <option value="HIRED">Hired</option>
          <option value="REJECTED">Rejected</option>
        </select>

        {(searchTerm || statusFilter) && (
          <button
            className="btn-clear"
            onClick={() => { setSearchTerm(""); setStatusFilter(""); }}
          >
            Clear
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="table-wrap">
        <table className="app-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Applicant</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app, index) => (
                <tr key={app.applicationId}>
                  <td className="row-num">{index + 1}</td>
                  <td className="job-title-cell">{app.jobTitle}</td>
                  <td className="applicant-cell">
                    <div className="avatar-name">
                      <div className="avatar">
                        {app.applicantName?.charAt(0)?.toUpperCase()}
                      </div>
                      {app.applicantName}
                    </div>
                  </td>
                  <td>
                    <span className={getStatusClass(app.status)}>
                      {app.status === "SHORLISTED" ? "SHORTLISTED" : app.status}
                    </span>
                  </td>
                  <td>{new Date(app.appliedDate).toLocaleDateString("en-IN", {
                    day: "2-digit", month: "short", year: "numeric"
                  })}</td>
                  <td>
                    <div className="action-group">
                      <button
                        className="btn-review"
                        onClick={() => setSelectedApplication(app)}
                        title="View profile"
                      >
                        Review
                      </button>
                      <button
                        className="btn-update"
                        onClick={() => openUpdateModal(app)}
                        title="Update status"
                      >
                         Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-row">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── REVIEW PROFILE MODAL ── */}
      {selectedApplication && (
        <div className="overlay" onClick={() => setSelectedApplication(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-top" onClick={() => setSelectedApplication(null)}>✕</button>

            <div className="modal-profile-header">
              <div className="modal-avatar">
                {selectedApplication.applicantName?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h2>{selectedApplication.applicantName}</h2>
                <span className={getStatusClass(selectedApplication.status)}>
                  {selectedApplication.status === "SHORLISTED" ? "SHORTLISTED" : selectedApplication.status}
                </span>
              </div>
            </div>

            <div className="modal-divider" />

            {/* BASIC INFO */}
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="modal-label">Application ID</span>
                <span className="modal-value">#{selectedApplication.applicationId}</span>
              </div>
              <div className="modal-info-item">
                <span className="modal-label">Job Title</span>
                <span className="modal-value">{selectedApplication.jobTitle}</span>
              </div>
              <div className="modal-info-item">
                <span className="modal-label">Applied Date</span>
                <span className="modal-value">
                  {new Date(selectedApplication.appliedDate).toLocaleDateString("en-IN", {
                    day: "2-digit", month: "short", year: "numeric"
                  })}
                </span>
              </div>
            </div>

            {/* SKILLS */}
            <div className="modal-section">
              <h4>Skills</h4>
              {selectedApplication.skills?.length > 0 ? (
                <div className="chip-wrap">
                  {selectedApplication.skills.map((s, i) => (
                    <span key={i} className="chip">{s.skillName}</span>
                  ))}
                </div>
              ) : (
                <p className="empty-msg">No skills listed</p>
              )}
            </div>

            {/* EDUCATION */}
            <div className="modal-section">
              <h4>Education</h4>
              {selectedApplication.educations?.length > 0 ? (
                selectedApplication.educations.map((e, i) => (
                  <div key={i} className="edu-card">
                    <p className="edu-name">{e.educationName}</p>
                    <p className="edu-school">{e.schoolName}</p>
                    <p className="edu-dates">
                      {new Date(e.startingDate).toLocaleDateString()} →{" "}
                      {new Date(e.endingDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="empty-msg">No education data</p>
              )}
            </div>

            {/* RESUME */}
            <div className="modal-section">
              <h4>Resume</h4>
              {selectedApplication.resume ? (
                <a
                  href={selectedApplication.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-resume"
                >
                  📄 View Resume
                </a>
              ) : (
                <p className="empty-msg">No resume uploaded</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ── UPDATE STATUS MODAL ── */}
      {updateTarget && (
        <div className="overlay" onClick={() => setUpdateTarget(null)}>
          <div className="modal-box modal-small" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-top" onClick={() => setUpdateTarget(null)}>✕</button>
            <h2>Update Status</h2>
            <p className="update-subtitle">
              Applicant: <strong>{updateTarget.applicantName}</strong>
            </p>
            <p className="update-subtitle">
              Job: <strong>{updateTarget.jobTitle}</strong>
            </p>

            <div className="modal-divider" />

            <label className="status-label">Select new status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="status-select"
            >
              <option value="APPLIED">Applied</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="SHORLISTED">Shortlisted</option>
              <option value="HIRED">Hired</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <div className="modal-actions">
              <button className="btn-save" onClick={handleStatusUpdate}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}