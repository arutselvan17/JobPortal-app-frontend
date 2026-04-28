import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../component/Navbar";
import JobCard from "../component/Jobcard";
import FilterSidebar from "../component/FilterSidebar";
import { getJobs } from "../service/JobService";
import "../styles/Job.css";
import ToastMsg from "../component/Toast";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const [filters, setFilters] = useState({
    location: "",
    category: "",
    jobType: "",
    workMode: "",
    experience: "",
    minSalary: "",
    maxSalary: "",
    company: "",
    datePosted: "",
  });

  // Fetch jobs
  useEffect(() => {
    getJobs()
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, search]);

  const onApply = (jobId) => {
    if (!isAuthenticated) {
      setShowToast(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      navigate(`jobs/${jobId}`);
    }
  };

  const handleReset = () => {
    setFilters({
      location: "",
      category: "",
      jobType: "",
      workMode: "",
      experience: "",
      minSalary: "",
      maxSalary: "",
      company: "",
      datePosted: "",
    });
    setSearch("");
  };

  const filteredJobs = jobs.filter((job) => {
    const now = new Date();

    if (
      filters.location &&
      !job.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;

    if (
      filters.category &&
      !job.category.toLowerCase().includes(filters.category.toLowerCase())
    )
      return false;

    if (filters.jobType && job.jobType !== filters.jobType) return false;

    if (
      filters.company &&
      !job.companyname.toLowerCase().includes(filters.company.toLowerCase())
    )
      return false;

    if (
      filters.experience !== "" &&
      job.experienceReq < Number(filters.experience)
    )
      return false;

    if (filters.minSalary !== "" && job.minSalary < Number(filters.minSalary))
      return false;

    if (filters.maxSalary !== "" && job.maxSalary > Number(filters.maxSalary))
      return false;

    if (filters.datePosted !== "") {
      const posted = new Date(job.postedDate);
      const diffDays = Math.floor((now - posted) / 86400000);

      if (diffDays > Number(filters.datePosted)) return false;
    }

    if (search && !job.title.toLowerCase().includes(search.toLowerCase()))
      return false;

    return true;
  });

  filteredJobs.sort((a, b) => {
    return new Date(b.postedDate) - new Date(a.postedDate);
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div>
      <Navbar />

      <ToastMsg
        message="Login to Apply job"
        type="danger"
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="jobs-page-header">
        <div className="jobs-header-content">
          <h1>Find Your Dream Job</h1>
          <p>
            Browse thousands of full-time, part-time and remote listings across
            India
          </p>

          <div className="jobs-top-search">
            <input
              type="text"
              placeholder="Search by job title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </div>

      <div className="jobs-page">
        {/* SIDEBAR */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* MAIN */}
        <main className="jobs-main">
          {/* RESULT BAR */}
          <div className="jobs-result-bar">
            <span className="jobs-result-count">
              {loading
                ? "Loading…"
                : `${filteredJobs.length} job${filteredJobs.length !== 1 ? "s" : ""} found`}
            </span>

            {Object.values(filters).some(Boolean) && (
              <button className="jobs-clear-btn" onClick={() => handleReset()}>
                Clear filters
              </button>
            )}
          </div>

          {/* JOB GRID */}
          {loading ? (
            <div className="jobs-empty">Loading jobs…</div>
          ) : currentJobs.length > 0 ? (
            <>
              <div className="jobs-grid">
                {currentJobs.map((job) => (
                  <JobCard
                    key={job.jobId}
                    job={job}
                    onApply={() => onApply(job.jobId)}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              {filteredJobs.length > jobsPerPage && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={currentPage === i + 1 ? "active" : ""}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="jobs-empty">
              <p>No jobs match your filters.</p>
              <button className="jobs-clear-btn" onClick={() => handleReset()}>
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
