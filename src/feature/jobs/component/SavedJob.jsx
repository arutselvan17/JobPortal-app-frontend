import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedJob } from "../slice/EmployeeJobSlice";
import JobCard from "../../../component/Jobcard";
import "../styles/SavedJob.css"
import ToastMsg from "../../../component/Toast";

export default function SavedJobs() {
  const dispatch = useDispatch();
 
  const { savedJobs, loading, error } = useSelector(
    (state) => state.employeeJob
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchSavedJob());
  }, [dispatch]);

  
 
  const filteredJobs = savedJobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleApply = (job) => {
    console.log("Apply:", job);
  };


  const convertJob = (job) => ({
    jobId: job.jobId,
    title: job.title,
    companyname: job.companyName,
    location: job.location,
    postedDate: job.savedDate,
    deadLine: job.deadLine,
    jobType: job.jobType,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary,
    payType: job.payType,
    experienceReq: 0,
    skills: [],
    status: job.jobStatus,
  });

  return (
    <div className="saved-page">
      {/* Header */}
      <div className="saved-header">
        <div>
          <h2>Saved Jobs</h2>
          <p>Your bookmarked opportunities</p>
        </div>

        <div className="saved-count">
          {filteredJobs.length} Jobs
        </div>
      </div>

      {/* Search */}
      <div className="saved-search-wrap">
        <input
          type="text"
          placeholder="Search by job title..."
          className="saved-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="saved-status">Loading jobs...</p>}


      {error && <p className="saved-error">{error}</p>}

      {!loading && filteredJobs.length === 0 && (
        <p className="saved-status">No saved jobs found</p>
      )}

      <div className="saved-grid">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.savedJobId}
            job={convertJob(job)}
            onApply={handleApply}
          />
        ))}
      </div>
      
    </div>
  );
}