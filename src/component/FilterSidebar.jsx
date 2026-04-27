import React from "react";
import { FunnelFill, XCircleFill } from "react-bootstrap-icons";
import "./styles//FilterSidebar.css";

export default function FilterSidebar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearAll = () => {
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
  };

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <aside className="filter-sidebar">

      {/* Header */}
      <div className="filter-header">
        <span className="filter-header-title">
          <FunnelFill size={14} /> Filters
        </span>
        {hasFilters && (
          <button className="filter-clear-all" onClick={clearAll}>
            <XCircleFill size={13} /> Clear all
          </button>
        )}
      </div>

      {/* Location */}
      <div className="filter-section">
        <h4>Location</h4>
        <input
          type="text"
          name="location"
          placeholder="e.g. Chennai"
          value={filters.location}
          onChange={handleChange}
        />
      </div>

      {/* Category */}
      <div className="filter-section">
        <h4>Category</h4>
        <input
          type="text"
          name="category"
          placeholder="e.g. Software Development"
          value={filters.category}
          onChange={handleChange}
        />
      </div>

      {/* Job Type */}
      <div className="filter-section">
        <h4>Job type</h4>
        <select name="jobType" value={filters.jobType} onChange={handleChange}>
          <option value="">All types</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="FREELANCE">Freelance</option>
        </select>
      </div>

      {/* Experience */}
      <div className="filter-section">
        <h4>Experience</h4>
        <select name="experience" value={filters.experience} onChange={handleChange}>
          <option value="">Any experience</option>
          <option value="0">Fresher</option>
          <option value="1">1+ year</option>
          <option value="2">2+ years</option>
          <option value="3">3+ years</option>
          <option value="5">5+ years</option>
        </select>
      </div>

      {/* Salary */}
      <div className="filter-section">
        <h4>Salary (annual ₹)</h4>
        <div className="salary-row">
          <input
            type="number"
            name="minSalary"
            placeholder="Min"
            value={filters.minSalary}
            onChange={handleChange}
          />
          <span className="salary-sep">–</span>
          <input
            type="number"
            name="maxSalary"
            placeholder="Max"
            value={filters.maxSalary}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Company */}
      <div className="filter-section">
        <h4>Company</h4>
        <input
          type="text"
          name="company"
          placeholder="e.g. Zoho"
          value={filters.company}
          onChange={handleChange}
        />
      </div>

      {/* Date Posted */}
      <div className="filter-section">
        <h4>Date posted</h4>
        <select name="datePosted" value={filters.datePosted} onChange={handleChange}>
          <option value="">Any time</option>
          <option value="1">Today</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>

    </aside>
  );
}