import React, { useEffect, useState } from "react";
import JobCard from "../../../component/Jobcard";
import FilterSidebar from "../../../component/FilterSidebar";
import { getJobs } from "../../../service/JobService";
import ToastMsg from "../../../component/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeSearchJob.css";
import { clearError } from "../../jobs/slice/EmployeeJobSlice";

export default function EmployeeSearchJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const { error } = useSelector((state) => state.employeeJob);

  const [toastMessage, setToastMessage] = useState("");
  const [toastModel, setToastModel] = useState(false);
  const [toastType, setToastType] = useState("success");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

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

  useEffect(
    function () {
      setCurrentPage(1);
    },
    [filters, search],
  );

  useEffect(() => {
    if (error) {
      setToastMessage("Job is Already Saved");
      setToastType("danger");
      setToastModel(true);

      dispatch(clearError());
    }
  }, [error]);

  function getFilteredJobs() {
    const now = new Date();

    return jobs.filter(function (job) {
      if (filters.location) {
        if (
          !job.location.toLowerCase().includes(filters.location.toLowerCase())
        ) {
          return false;
        }
      }

      if (filters.category) {
        if (
          !job.category.toLowerCase().includes(filters.category.toLowerCase())
        ) {
          return false;
        }
      }

      if (filters.jobType) {
        if (job.jobType !== filters.jobType) {
          return false;
        }
      }

      if (filters.company) {
        if (
          !job.companyname.toLowerCase().includes(filters.company.toLowerCase())
        ) {
          return false;
        }
      }

      if (filters.experience !== "") {
        if (job.experienceReq < Number(filters.experience)) {
          return false;
        }
      }

      if (filters.minSalary !== "") {
        if (job.minSalary < Number(filters.minSalary)) {
          return false;
        }
      }

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
  const indexOfLastJob = indexOfFirstJob + jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  function handleApply(jobId) {
    if (!isAuthenticated) {
      setToastMessage("Login Required");
      setToastType("danger");
      setToastModel(true);
      setTimeout(function () {
        navigate("/login");
      }, 1000);
    } else {
      navigate(`/jobs/${jobId}`);
    }
  }

  function goToPrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="emp-jobs-page">
      <ToastMsg
        message={toastMessage}
        type={toastType}
        show={toastModel}
        onClose={function () {
          setToastModel(false);
        }}
      />

      <div className="emp-search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={function (e) {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="emp-jobs-layout">
        <FilterSidebar filters={filters} setFilters={setFilters} />

        <div className="emp-jobs-main">
          <div className="emp-result-count">
            {loading ? "Loading jobs..." : filteredJobs.length + " jobs found"}
          </div>

          {loading && <div className="emp-loading">Loading jobs...</div>}

          {!loading && currentJobs.length === 0 && (
            <div className="emp-no-jobs">
              No jobs found. Try changing your filters.
            </div>
          )}

          {!loading && currentJobs.length > 0 && (
            <div className="emp-jobs-grid">
              {currentJobs.map(function (job) {
                return (
                  <JobCard
                    key={job.jobId}
                    job={job}
                    onApply={() => handleApply(job.jobId)}
                  />
                );
              })}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="emp-pagination">
              <button onClick={goToPrevPage} disabled={currentPage === 1}>
                Prev
              </button>

              {Array.from({ length: totalPages }, function (_, i) {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    className={currentPage === pageNumber ? "active" : ""}
                    onClick={function () {
                      setCurrentPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </button>
                );
              })}

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
