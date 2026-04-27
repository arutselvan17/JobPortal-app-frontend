import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SavedJobs from "../feature/jobs/component/SavedJob";
import {
  ClockHistory,
  GeoAltFill,
  BookmarkFill,
  Bookmark,
  BuildingFill,
  PersonWorkspace,
  CurrencyRupee,
  Mortarboard,
} from "react-bootstrap-icons";
import "./styles//JobCard.css";
import { useDispatch, useSelector } from "react-redux";
import { saveJob } from "../feature/jobs/slice/EmployeeJobSlice";
import ToastMsg from "./Toast";

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  const diff = Math.floor((new Date() - new Date(dateStr)) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
}

function formatSalary(min, max, payType) {
  if (payType === "ANNUALY") {
    return `${(min / 100000).toFixed(0)} – ${(max / 100000).toFixed(0)} LPA`;
  }
  return `₹${(min / 1000).toFixed(0)}K – ₹${(max / 1000).toFixed(0)}K / mo`;
}

function formatJobType(jobType) {
  const map = {
    FULL_TIME: "Full Time",
    PART_TIME: "Part Time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
    FREELANCE: "Freelance",
  };
  return map[jobType] || jobType;
}

function getExperience(exp) {
  if (exp === 0) return "Fresher";
  if (exp === 1) return "1 yr exp";
  return `${exp}+ yrs`;
}

function CompanyLogo({ name }) {
  const palettes = [
    { bg: "#E6F1FB", color: "#0C447C" },
    { bg: "#FBEAF0", color: "#72243E" },
    { bg: "#EAF3DE", color: "#27500A" },
    { bg: "#FAEEDA", color: "#633806" },
    { bg: "#EEEDFE", color: "#3C3489" },
  ];
  const p = palettes[name.charCodeAt(0) % palettes.length];
  return (
    <div className="jc__logo" style={{ background: p.bg, color: p.color }}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// ── JobCard ───────────────────────────────────────────────────────────────────

export default function JobCard({ job, onApply }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const [toastMessage, setToastMessage] = useState("");
  // const [toastModel, setToastModel] = useState(false);
  // const [toastType, setToastType] = useState("Success");

  const handleSave = async (jobId) => {
    if (!isAuthenticated) {
      console.log("login to save job");
      return;
    }

    try {
      setSaved(true);
      await dispatch(saveJob(jobId)).unwrap();
    } catch (error) {
      // setToastMessage("job is alread saved")
      // setToastType("danger")
      // setToastModel(true)
    }
  };

  const {
    jobId,
    title,
    companyname,
    location,
    postedDate,
    deadLine,
    jobType,
    minSalary,
    maxSalary,
    payType,
    experienceReq,
    skills = [],
    status,
  } = job;

  const isExpired = status === "EXPIRED" || new Date(deadLine) < new Date();

  return (
    <div className="jc">
      <div className="jc__top">
        <span className="jc__date">
          <ClockHistory size={12} />
          {timeAgo(postedDate)}
        </span>
        <button
          className={`jc__save ${saved ? "jc__save--saved" : ""}`}
          onClick={() => handleSave(jobId)}
        >
          {saved ? <BookmarkFill size={13} /> : <Bookmark size={13} />}
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      {/* Company */}
      <div className="jc__company-row">
        <CompanyLogo name={companyname} />
        <div className="jc__company-info">
          <h3 className="jc__title">{title}</h3>
          <p className="jc__company">{companyname}</p>
          <p className="jc__location">
            <GeoAltFill size={11} /> {location}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="jc__badges">
        <span className="jc__badge jc__badge--blue">
          <BuildingFill size={11} /> On-site
        </span>
        <span className="jc__badge jc__badge--pink">
          <PersonWorkspace size={11} /> {formatJobType(jobType)}
        </span>
        <span className="jc__badge jc__badge--green">
          <CurrencyRupee size={11} />{" "}
          {formatSalary(minSalary, maxSalary, payType)}
        </span>
        <span className="jc__badge jc__badge--amber">
          <Mortarboard size={11} /> {getExperience(experienceReq)}
        </span>
      </div>

      {/* Skills */}
      <div className="jc__skills">
        {skills.slice(0, 4).map((s) => (
          <span key={s.skillId} className="jc__skill">
            {s.skillName}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="jc__skill">+{skills.length - 4}</span>
        )}
      </div>

      {/* Actions */}
      <div className="jc__actions">
        <button
          className="jc__btn-apply"
          onClick={() => onApply(job)}
          disabled={isExpired}
        >
          {isExpired ? "Expired" : "Apply Now"}
        </button>
        <button
          className="jc__btn-details"
          onClick={() => navigate(`/jobs/${jobId}`)}
        >
          View Details
        </button>
      </div>

      {/* <ToastMsg
      message={toastMessage}
      type={toastType}
      show={toastModel}
      onClose={() => setToastModel(false)}
      /> */}
    </div>
  );
}
