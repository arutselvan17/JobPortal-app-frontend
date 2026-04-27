import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllApplications } from "../slice/AdminAllApplicationSlice";
import "../styles/AllApplications.css";

export default function AllApplications() {
  const dispatch = useDispatch();

  const { applications, loading, error } = useSelector(
    (state) => state.allApplication
  );

  // FILTER STATES
  const [nameFilter, setNameFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllApplications());
  }, [dispatch]);

  //  FILTER LOGIC
  const filteredApplications = applications.filter((app) => {
    return (
      app.applicantName.toLowerCase().includes(nameFilter.toLowerCase()) &&
      app.jobTitle.toLowerCase().includes(jobFilter.toLowerCase()) &&
      (statusFilter ? app.status === statusFilter : true)
    );
  });

  const handleReset = () => {
    setNameFilter("");
    setJobFilter("");
    setStatusFilter("");
  };

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="applications-container">

      <h2>Applications</h2>

      {/*  FILTERS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search applicant"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search job title"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="APPLIED">Applied</option>
          <option value="REVIEWED">Reviewed</option>
          <option value="SHORLISTED">Shortlisted</option>
        </select>

        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/*  TABLE */}
      <table>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Job Title</th>
            <th>Applied Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <tr key={app.applicationId}>
                <td>{app.applicantName}</td>
                <td>{app.jobTitle}</td>
                <td>{app.appliedDate}</td>

                <td>
                  <span className={`status ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No applications found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}