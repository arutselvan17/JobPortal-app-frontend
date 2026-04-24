import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSpecific } from "../service/JobService";
import {
  GeoAltFill,
  BriefcaseFill,
  GridFill,
  FolderFill,
  Mortarboard,
  BuildingFill,
  CurrencyRupee,
  ClipboardFill,
  BookmarkFill,
  Bookmark,
  SendFill,
  CalendarEventFill,
  PersonBadgeFill,
  ChevronRight,
  HouseFill,
} from "react-bootstrap-icons";

import "./JobDetail.css";
import Navbar from "./Navbar";
import ToastMsg from "./Toast";
import { useSelector } from "react-redux";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatSalary(min, max, payType ) {
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
  if (exp === 0) return "Fresher (0 yrs)";
  if (exp === 1) return "1 year";
  return `${exp}+ years`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CompanyLogo({ name, size = 72 }) {
  const palettes = [
    { bg: "#E6F1FB", color: "#0C447C" },
    { bg: "#FBEAF0", color: "#72243E" },
    { bg: "#EAF3DE", color: "#27500A" },
    { bg: "#FAEEDA", color: "#633806" },
    { bg: "#EEEDFE", color: "#3C3489" },
  ];
  const p = palettes[name.charCodeAt(0) % palettes.length];
  return (
    <div
      className="jd__hero-logo"
      style={{ background: p.bg, color: p.color, width: size, height: size }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// ── Overview Row ──────────────────────────────────────────────────────────────

function OverviewRow({ icon, label, value }) {
  return (
    <div className="jd__ov-row">
      <div className="jd__ov-icon">{icon}</div>
      <div className="jd__ov-text">
        <span className="jd__ov-label">{label}</span>
        <span className="jd__ov-value">{value}</span>
      </div>
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────

function SectionCard({ icon, iconBg, iconColor, title, children }) {
  return (
    <div className="jd__section">
      <div className="jd__section-header">
        <div className="jd__section-icon" style={{ background: iconBg }}>
          {icon}
        </div>
        <h3 className="jd__section-title">{title}</h3>
      </div>
      <div className="jd__section-body">{children}</div>
    </div>
  );
}

// ── JobDetailPage ─────────────────────────────────────────────────────────────
export default function JobDetailPage({
  job: jobProp,
  onApply,
  backPath = "/jobs",
  showNavbar = "true"
}) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(jobProp || null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(!jobProp);
  const [showModel, setShowModel] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (jobProp) return;
    getSpecific(jobId)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [jobId, jobProp]);

  const handleNavigate = () => {
    if (!isAuthenticated) {
      navigate("/jobs");
    } else {
      navigate("/employee/jobs");
    }
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      setShowModel(true);
      setTimeout(() => navigate("/login"), 2000);
    } else console.log("Commig soon");
  };

  if (loading) return <div className="jd__loading">Loading job details…</div>;
  if (!job) return <div className="jd__loading">Job not found.</div>;

  const {
    title,
    companyname,
    companyLocation,
    location,
    postedDate,
    deadLine,
    jobType,
    minSalary,
    maxSalary,
    payType,
    experienceReq,
    description,
    category,
    status,
    skills = [],
  } = job;

  const isExpired = status === "EXPIRED" || new Date(deadLine) < new Date();
  const salary = formatSalary(minSalary, maxSalary, payType);

  return (
    <div className="jd">
      <div>
        {showNavbar && <Navbar />}
      </div>

      <ToastMsg
        message="login to Apply for this job"
        type="danger"
        show={showModel}
        onClose={() => setShowModel(false)}
      />
      {/* ── Breadcrumb ── */}
      <nav className="jd__breadcrumb">
        {!isAuthenticated  && (
          <>
            <span className="jd__bc-item" onClick={() => navigate("/")}>
              <HouseFill size={12} /> Home
            </span>
            <ChevronRight size={11} className="jd__bc-sep" />
          </>
        )}
        <span className="jd__bc-item" onClick={() => handleNavigate()}>
          {isAuthenticated ? "Back" : "Jobs"}
        </span>
        <ChevronRight size={11} className="jd__bc-sep" />
        <span className="jd__bc-current">{title}</span>
      </nav>

      {/* ── Hero Banner ── */}
      <div className="jd__hero">
        <div className="jd__hero-left">
          <CompanyLogo name={companyname} />
          <div className="jd__hero-info">
            <h1 className="jd__hero-title">{title}</h1>
            <p className="jd__hero-sub">
              {companyname} — {location}
            </p>
            <div className="jd__hero-badges">
              <span className="jd__hero-badge">{formatJobType(jobType)}</span>
              <span className="jd__hero-badge">
                <BuildingFill size={11} /> On-site
              </span>
              <span className="jd__hero-badge">
                <GeoAltFill size={11} /> {location}
              </span>
              <span className="jd__hero-badge">
                <CurrencyRupee size={11} /> {salary}
              </span>
            </div>
          </div>
        </div>
        <div className="jd__hero-actions">
          <button
            className="jd__btn-apply"
            disabled={isExpired}
            onClick={() => handleApply()}
          >
            <SendFill size={13} />
            {isExpired ? "Expired" : "Apply Now"}
          </button>
          <button
            className={`jd__btn-save ${saved ? "jd__btn-save--saved" : ""}`}
            onClick={() => setSaved((s) => !s)}
          >
            {saved ? <BookmarkFill size={13} /> : <Bookmark size={13} />}
            {saved ? "Saved" : "Save Job"}
          </button>
        </div>
      </div>

      <div className="jd__body">
        <div className="jd__main">
          <SectionCard
            icon={<ClipboardFill size={15} color="#0C447C" />}
            iconBg="#E6F1FB"
            title="Job description"
          >
            <p>{description}</p>
          </SectionCard>

          <SectionCard
            icon={<PersonBadgeFill size={15} color="#27500A" />}
            iconBg="#EAF3DE"
            title="Requirements"
          >
            <ul className="jd__bullet-list">
              <li>Fresher or {getExperience(experienceReq)} of experience</li>
              <li>
                Strong knowledge in {skills.map((s) => s.skillName).join(", ")}
              </li>
              <li>Good problem-solving and communication skills</li>
              <li>Ability to work in a collaborative team environment</li>
            </ul>
          </SectionCard>

          <SectionCard
            icon={<GridFill size={14} color="#72243E" />}
            iconBg="#FBEAF0"
            title="Skills required"
          >
            <div className="jd__skills">
              {skills.map((s) => (
                <span key={s.skillId} className="jd__skill">
                  {s.skillName}
                </span>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right: sidebar */}
        <aside className="jd__sidebar">
          <div className="jd__overview-card">
            <div className="jd__ov-header">
              <GridFill size={15} color="rgba(255,255,255,0.85)" />
              <span>Job overview</span>
            </div>
            <div className="jd__ov-rows">
              <OverviewRow
                icon={<BriefcaseFill size={15} color="#6b7280" />}
                label="Job title"
                value={title}
              />
              <OverviewRow
                icon={<PersonBadgeFill size={15} color="#6b7280" />}
                label="Job type"
                value={formatJobType(jobType)}
              />
              <OverviewRow
                icon={<FolderFill size={15} color="#6b7280" />}
                label="Category"
                value={category}
              />
              <OverviewRow
                icon={<Mortarboard size={15} color="#6b7280" />}
                label="Experience"
                value={getExperience(experienceReq)}
              />
              <OverviewRow
                icon={<BuildingFill size={15} color="#6b7280" />}
                label="Work mode"
                value="On-site"
              />
              <OverviewRow
                icon={<CurrencyRupee size={15} color="#6b7280" />}
                label="Offered salary"
                value={salary}
              />
              <OverviewRow
                icon={<GeoAltFill size={15} color="#6b7280" />}
                label="Company location"
                value={companyLocation}
              />
            </div>
          </div>

          <div className="jd__deadline-card">
            <CalendarEventFill size={14} color="#A32D2D" />
            <div>
              <p className="jd__deadline-label">Application deadline</p>
              <p className="jd__deadline-date">{formatDate(deadLine)}</p>
            </div>
          </div>

          <div className="jd__posted-card">
            <p className="jd__posted-label">Posted on</p>
            <p className="jd__posted-date">{formatDate(postedDate)}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
