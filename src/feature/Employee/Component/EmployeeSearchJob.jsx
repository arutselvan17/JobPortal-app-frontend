

import React, { useEffect, useState } from "react";
import JobCard from "../../../component/Jobcard";
import FilterSidebar from "../../../component/FilterSidebar";
import { getJobs } from "../../../service/JobService";
import ToastMsg from "../../../component/Toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeSearchJob.css";

export default function EmployeeSearchJob() {

  const navigate  = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;


  const [filters, setFilters] = useState({
    location:   "",
    category:   "",
    jobType:    "",
    workMode:   "",
    experience: "",
    minSalary:  "",
    maxSalary:  "",
    company:    "",
    datePosted: "",
  });

  useEffect(function () {
    getJobs()
      .then(function (res) {
        setJobs(res.data);   
        setLoading(false);  
      })
      .catch(function (err) {
        console.error(err);
        setLoading(false);
      });
  }, []); 


  
  useEffect(function () {
    setCurrentPage(1);
  }, [filters, search]);

  

  
  function getFilteredJobs() {
    const now = new Date();

    return jobs.filter(function (job) {

      // Filter by location
      if (filters.location) {
        if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // Filter by category
      if (filters.category) {
        if (!job.category.toLowerCase().includes(filters.category.toLowerCase())) {
          return false;
        }
      }

      // Filter by job type (Full Time, Part Time, etc.)
      if (filters.jobType) {
        if (job.jobType !== filters.jobType) {
          return false;
        }
      }

      // Filter by company name
      if (filters.company) {
        if (!job.companyname.toLowerCase().includes(filters.company.toLowerCase())) {
          return false;
        }
      }

      // Filter by minimum experience
      if (filters.experience !== "") {
        if (job.experienceReq < Number(filters.experience)) {
          return false;
        }
      }

      // Filter by minimum salary
      if (filters.minSalary !== "") {
        if (job.minSalary < Number(filters.minSalary)) {
          return false;
        }
      }

      // Filter by maximum salary
      if (filters.maxSalary !== "") {
        if (job.maxSalary > Number(filters.maxSalary)) {
          return false;
        }
      }

      
      if (filters.datePosted !== "") {
        const postedDate = new Date(job.postedDate);
        const daysAgo = Math.floor((now - postedDate) / 86400000);
        if (daysAgo > Number(filters.datePosted)) {
          return false;
        }
      }

      
      if (search) {
        if (!job.title.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }
      }

      
      return true;
    });
  }

  
  const filteredJobs = getFilteredJobs();


  
  const indexOfFirstJob = (currentPage - 1) * jobsPerPage;
  const indexOfLastJob  = indexOfFirstJob + jobsPerPage;
  const currentJobs     = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

 
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);


  
  function handleApply() {
    if (!isAuthenticated) {
      // Not logged in — show toast then redirect to login
      setShowToast(true);
      setTimeout(function () {
        navigate("/login");
      }, 1000);
    } else {
      console.log("Applied!");
      // TODO: call your apply API here
    }
  }

  // --- GO TO PREVIOUS PAGE ---
  function goToPrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // --- GO TO NEXT PAGE ---
  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }


  // --- RENDER ---
  return (
    <div className="emp-jobs-page">

      {/* Toast message: shown when user tries to apply without logging in */}
      <ToastMsg
        message="Please login to apply for jobs"
        type="danger"
        show={showToast}
        onClose={function () { setShowToast(false); }}
      />

      {/* SEARCH BAR */}
      <div className="emp-search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
        />
      </div>

      {/* MAIN LAYOUT: filter sidebar on left, job cards on right */}
      <div className="emp-jobs-layout">

        {/* Filter sidebar — passes filters state down, and setFilters to update it */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* JOB CARDS AREA */}
        <div className="emp-jobs-main">

          {/* Result count */}
          <div className="emp-result-count">
            {loading ? "Loading jobs..." : filteredJobs.length + " jobs found"}
          </div>

          {/* Show loading text while fetching */}
          {loading && (
            <div className="emp-loading">Loading jobs...</div>
          )}

          {/* Show "no results" if filter/search found nothing */}
          {!loading && currentJobs.length === 0 && (
            <div className="emp-no-jobs">No jobs found. Try changing your filters.</div>
          )}

          {/* Show job cards */}
          {!loading && currentJobs.length > 0 && (
            <div className="emp-jobs-grid">
              {currentJobs.map(function (job) {
                return (
                  <JobCard
                    key={job.jobId}
                    job={job}
                    onApply={handleApply}
                  />
                );
              })}
            </div>
          )}

          {/* PAGINATION BUTTONS */}
          {!loading && totalPages > 1 && (
            <div className="emp-pagination">

              {/* Previous button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {/* Page number buttons */}
              {Array.from({ length: totalPages }, function (_, i) {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    className={currentPage === pageNumber ? "active" : ""}
                    onClick={function () { setCurrentPage(pageNumber); }}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}