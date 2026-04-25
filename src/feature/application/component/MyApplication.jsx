import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyApplications } from "../slice/EmployeeApplicationSlice";
import '../styles/MyApplication.css'

export default function MyApplications() {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector(
    (state) => state.employeeApplication
  );

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  function formatDate(dateStr) {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  }

  function getStatusClass(status) {
    const map = {
      HIRED: "badge-hired",
      REJECTED: "badge-rejected",
      REVIEWED: "badge-reviewed",
      PENDING: "badge-pending",
      APPLIED: "badge-applied",
    };
    return map[status] || "badge-default";
  }

  if (loading) return <div className="ma-loading">Loading applications...</div>;
  if (error)   return <div className="ma-error">Failed to load applications.</div>;

  return (
    <div className="ma-wrapper">
      <h2 className="ma-title">My Applications</h2>

      {applications.length === 0 ? (
        <div className="ma-empty">You haven't applied to any jobs yet.</div>
      ) : (
        <div className="ma-table-wrap">
          <table className="ma-table">
            <thead>
              <tr>
                <th>S No:</th>
                <th>Job Title</th>
                <th>Applicant</th>
                <th>Applied Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.applicationId}>
                  <td>{index + 1}</td>
                  <td>{app.jobTitle}</td>
                  <td>{app.applicantName}</td>
                  <td>{formatDate(app.appliedDate)}</td>
                  <td>
                    <span className={`ma-badge ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}