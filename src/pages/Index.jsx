import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Hero from "../assets/Hero.jpg";
import { Link } from "react-router-dom";
import "../styles/Index.css";
import CustomerReview from "../component/CustomerReview";
import { getJobs } from "../service/JobService";
import JobCard from "../component/Jobcard";
import Footer from "../component/Footer";

export default function Index() {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        console.log(response.data);
        setJob(response.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />

      {/* INTRO SECTION */}
      <div id="intro">
        <div id="intro-img">
          <img src={Hero} alt="Job Portal" />
        </div>

        <div id="intro-content">
          <h1>Where Passion Meets Opportunity</h1>
          <p>
            Find your dream job or the perfect candidate with TalentBridge.
            Connecting talent with opportunity across India and beyond.
          </p>

          <Link to="/jobs">
            <button className="intro-btn">Browse Jobs →</button>
          </Link>
        </div>
      </div>

      {/* PORTAL STATS */}
      <div id="portal-review">
        <div className="review">
          <h1>12k+</h1>
          <h3>Clients Worldwide</h3>
          <p>
            Trusted by thousands of companies to find the right talent quickly.
          </p>
        </div>

        <div className="review">
          <h1>20k+</h1>
          <h3>Active Resumes</h3>
          <p>Access a growing database of skilled professionals.</p>
        </div>

        <div className="review">
          <h1>5k+</h1>
          <h3>Successful Hirings</h3>
          <p>Helping businesses connect with the right candidates every day.</p>
        </div>
      </div>

      
      <div id="recent-job">
        <div className="recent-header">
          <h2>Recent Jobs</h2>
          <Link to="/jobs">View All →</Link>
        </div>

        <div className="available-job-list">
          {loading ? (
            <p>Loading jobs...</p>
          ) : job.length > 0 ? (
            job.map((j) => <JobCard key={j.jobId} job={j} />)
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>

      <Footer />
      {/* OPTIONAL CUSTOMER REVIEW */}
      {/* 
      <div id="customer_review">
        <CustomerReview />
      </div> 
      */}
    </div>
  );
}