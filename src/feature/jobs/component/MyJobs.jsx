import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyJobs, updateJobStatus, extendDeadline } from "../slice/EmployerJobSlice";
import { fetchCategories } from "../../admin/slice/CategorySlice";
import { useNavigate } from "react-router-dom";
import "../styles/Myjobs.css";
import ExtendDeadlineModal from "./ExtendDeadlineModel";
import EmployerStatus from "../../employer/component/EmployerStatus.jsx";

export default function MyJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get jobs from redux
  const jobs = useSelector((state) => state.myJobs.jobs);
  const loading = useSelector((state) => state.myJobs.loading);
  const error = useSelector((state) => state.myJobs.error);

  // get categories from redux
  const categories = useSelector((state) => state.category.categories);

  // filter states
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // fetch jobs and categories when page loads
  useEffect(() => {
    dispatch(fetchMyJobs());

    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  // filter jobs based on selected filters
  const filteredJobs = (jobs || []).filter((job) => {
    const statusMatch = statusFilter ? job.status === statusFilter : true;
    const categoryMatch = categoryFilter ? job.category === categoryFilter : true;
    return statusMatch && categoryMatch;
  });

  // toggle job status between ACTIVE and CLOSED
  const handleStatus = (job) => {
    const newStatus = job.status === "ACTIVE" ? "CLOSED" : "ACTIVE";
    dispatch(updateJobStatus({ jobId: job.jobId, status: newStatus }));
  };

  // open the extend deadline modal
  const openExtendModal = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  // extend deadline
  const handleExtend = (jobId, date) => {
    dispatch(extendDeadline({ jobId, deadLine: date }));
  };

  // reset all filters
  const handleReset = () => {
    setStatusFilter("");
    setCategoryFilter("");
  };

  // show loading or error
  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">

      <EmployerStatus />

      <div className="page-header">
        <h2>My Jobs</h2>

      {/* post job button */}
      <button onClick={() => navigate("/employer/post-job")}>
        + Post Job
      </button>
      </div>

      {/* filters */}
      <div className="filters">

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="CLOSED">Closed</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={handleReset}>Reset</button>

      </div>

      {/* jobs table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.jobId}>

                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.location}</td>
                <td>{job.jobType}</td>

                {/* status badge */}
                <td>
                  {job.status === "ACTIVE" ? (
                    <span className="status-active">Active</span>
                  ) : (
                    <span className="status-closed">Closed</span>
                  )}
                </td>

                <td>{job.deadLine}</td>

                {/* action buttons */}
                <td>
                  {/* toggle active / closed */}
                  {job.status === "ACTIVE" ? (
                    <button
                      className="action-btn close-btn"
                      onClick={() => handleStatus(job)}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      className="action-btn activate-btn"
                      onClick={() => handleStatus(job)}
                    >
                      Activate
                    </button>
                  )}

                  <button
                    className="action-btn extend-btn"
                    onClick={() => openExtendModal(job.jobId)}
                  >
                    Extend
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* extend deadline modal */}
      {showModal && (
        <ExtendDeadlineModal
          jobId={selectedJobId}
          onClose={() => setShowModal(false)}
          onExtend={handleExtend}
        />
      )}

    </div>
  );
}