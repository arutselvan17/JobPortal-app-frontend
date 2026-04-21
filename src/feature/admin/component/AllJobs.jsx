import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../slice/AdminJobSlice";
import "./AllJob.css";

export default function AllJobs() {
  const dispatch = useDispatch();
 


  const { jobs, loading, error } = useSelector((state) => state.alljobs);

  //  FILTER STATES
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  //  FILTER LOGIC (combined)
  const filteredJobs = (jobs || []).filter((job) => {
    return (
      job.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
      (typeFilter ? job.jobType === typeFilter : true) &&
      (statusFilter ? job.status === statusFilter : true)
    );
  });

  //  STATUS BUTTON (for later API)
  const handleStatusClick = (job) => {
    console.log("Update status for:", job);

    // later:
    // dispatch(updateJobStatus({ id: job.jobId, status: "CLOSED" }))
  };

  const handleReset = () => {
    setTitleFilter("");
    setLocationFilter("");
    setTypeFilter("");
    setStatusFilter("");
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="jobs-container">
      <h2>All Jobs</h2>

      {/*  FILTER SECTION */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="CLOSED">Closed</option>
        </select>

        {/*  RESET BUTTON */}
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/*  TABLE */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.jobId}>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{job.jobType}</td>

                <td>
                  <span
                    className={
                      job.status === "ACTIVE"
                        ? "status-active"
                        : "status-closed"
                    }
                  >
                    {job.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleStatusClick(job)}
                    className={`action-btn ${
                      job.status === "ACTIVE" ? "close-btn" : "activate-btn"
                    }`}
                  >
                    {job.status === "ACTIVE" ? "Close" : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
