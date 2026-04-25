import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../slice/EmployerJobSlice";
import { setSkill } from "../slice/EmployerJobSlice";
import "../styles/PostJob.css";
import { useEffect } from "react";
import ToastMsg from "../../../component/Toast";

export default function PostJob() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { error, loading } = useSelector((state) => state.myJobs);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [payType, setPayType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  // errors
  const [titleError, setTitleError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [jobTypeError, setJobTypeError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [minSalaryError, setMinSalaryError] = useState("");
  const [maxSalaryError, setMaxSalaryError] = useState("");
  const [payTypeError, setPayTypeError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [skillsError, setSkillsError] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (error) {
      setToast({
        show: true,
        message: error,
        type: "danger",
      });
    }
  }, [error]);

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setSkills([...skills, { skillName: skillInput.trim() }]);
    setSkillInput("");
    setSkillsError("");

    console.log(skills);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear all errors first
    setTitleError("");
    setLocationError("");
    setJobTypeError("");
    setExperienceError("");
    setCategoryError("");
    setMinSalaryError("");
    setMaxSalaryError("");
    setPayTypeError("");
    setDeadlineError("");
    setDescriptionError("");
    setSkillsError("");

    // check each field
    let hasError = false;

    if (!title.trim()) {
      setTitleError("Job title is required");
      hasError = true;
    }
    if (!location.trim()) {
      setLocationError("Location is required");
      hasError = true;
    }
    if (!jobType) {
      setJobTypeError("Select a job type");
      hasError = true;
    }
    if (!experience) {
      setExperienceError("Experience is required");
      hasError = true;
    }
    if (!category) {
      setCategoryError("Select a category");
      hasError = true;
    }
    if (!minSalary) {
      setMinSalaryError("Min salary is required");
      hasError = true;
    }
    if (!maxSalary) {
      setMaxSalaryError("Max salary is required");
      hasError = true;
    }
    if (!payType) {
      setPayTypeError("Select a pay type");
      hasError = true;
    }
    if (!deadline) {
      setDeadlineError("Deadline is required");
      hasError = true;
    }
    if (!description.trim()) {
      setDescriptionError("Description is required");
      hasError = true;
    }
    if (skills.length === 0) {
      setSkillsError("Add at least one skill");
      hasError = true;
    }

    if (Number(minSalary) > Number(maxSalary)) {
      setMaxSalaryError("Max salary should be higher than min Salary");
      hasError = true;
    }

    if (new Date() > new Date(deadline)) {
      setDeadlineError("Deadline must be future date");
      hasError = true;
    }

    if (hasError) return;

    // submit
    try {
      const res = await dispatch(
        createJob({
          title,
          location,
          jobType,
          experienceReq: Number(experience),
          category,
          minSalary: Number(minSalary),
          maxSalary: Number(maxSalary),
          payType,
          deadLine: deadline,
          description,
        }),
      ).unwrap();

      console.log(res);

      // console.log(res.jobId)
      // console.log(skills)

      await dispatch(setSkill({ jobId: res.jobId, skills })).unwrap();

      // reset all fields
      setTitle("");
      setLocation("");
      setJobType("");
      setExperience("");
      setCategory("");
      setMinSalary("");
      setMaxSalary("");
      setPayType("");
      setDeadline("");
      setDescription("");
      setSkills([]);

      useEffect(() => {
        if (error) {
          setToast({
            show: true,
            message: "Job posted successfullt",
            type: "success",
          });
        }
      }, [error, dispatch]);
    } catch (err) {
      // console.error(err);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setLocation("");
    setJobType("");
    setExperience("");
    setCategory("");
    setMinSalary("");
    setMaxSalary("");
    setPayType("");
    setDeadline("");
    setDescription("");
    setSkills([]);
    setSkillInput("");
    setTitleError("");
    setLocationError("");
    setJobTypeError("");
    setExperienceError("");
    setCategoryError("");
    setMinSalaryError("");
    setMaxSalaryError("");
    setPayTypeError("");
    setDeadlineError("");
    setDescriptionError("");
    setSkillsError("");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Post Job</h2>
          <p className="page-subtitle">
            Post Your Requirements
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="pj-wrap">
        <div className="pj-header">
          <div className="pj-title">Post a job</div>
          <div className="pj-subtitle">
            Fill in the details below to publish your listing
          </div>
        </div>

        {/* Basic Info */}
        <div className="pj-section-label">Basic info</div>
        <div className="pj-grid-2">
          <div className="pj-field">
            <label>Job title</label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
              placeholder="e.g. Senior Frontend Developer"
              className={titleError ? "input-error" : ""}
            />
            {titleError && <span className="pj-err">{titleError}</span>}
          </div>

          <div className="pj-field">
            <label>Location</label>
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setLocationError("");
              }}
              placeholder="e.g. Chennai / Remote"
              className={locationError ? "input-error" : ""}
            />
            {locationError && <span className="pj-err">{locationError}</span>}
          </div>
        </div>

        <div className="pj-grid-3">
          <div className="pj-field">
            <label>Job type</label>
            <select
              value={jobType}
              onChange={(e) => {
                setJobType(e.target.value);
                setJobTypeError("");
              }}
              className={jobTypeError ? "input-error" : ""}
            >
              <option value="">Select type</option>
              <option value="FULL_TIME">Full time</option>
              <option value="PART_TIME">Part time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
            {jobTypeError && <span className="pj-err">{jobTypeError}</span>}
          </div>

          <div className="pj-field">
            <label>Experience (years)</label>
            <input
              type="number"
              min="0"
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
                setExperienceError("");
              }}
              placeholder="0"
              className={experienceError ? "input-error" : ""}
            />
            {experienceError && (
              <span className="pj-err">{experienceError}</span>
            )}
          </div>

          <div className="pj-field">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCategoryError("");
              }}
              className={categoryError ? "input-error" : ""}
            >
              <option value="">Select category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {categoryError && <span className="pj-err">{categoryError}</span>}
          </div>
        </div>

        {/* Compensation */}
        <div className="pj-section-label">Compensation</div>
        <div className="pj-grid-3">
          <div className="pj-field">
            <label>Min salary</label>
            <input
              type="number"
              value={minSalary}
              onChange={(e) => {
                setMinSalary(e.target.value);
                setMinSalaryError("");
              }}
              placeholder="e.g. 40000"
              className={minSalaryError ? "input-error" : ""}
            />
            {minSalaryError && <span className="pj-err">{minSalaryError}</span>}
          </div>

          <div className="pj-field">
            <label>Max salary</label>
            <input
              type="number"
              value={maxSalary}
              onChange={(e) => {
                setMaxSalary(e.target.value);
                setMaxSalaryError("");
              }}
              placeholder="e.g. 80000"
              className={maxSalaryError ? "input-error" : ""}
            />
            {maxSalaryError && <span className="pj-err">{maxSalaryError}</span>}
          </div>

          <div className="pj-field">
            <label>Pay type</label>
            <select
              value={payType}
              onChange={(e) => {
                setPayType(e.target.value);
                setPayTypeError("");
              }}
              className={payTypeError ? "input-error" : ""}
            >
              <option value="">Select</option>
              <option value="MONTHLY">Monthly</option>
              <option value="ANNUALY">Yearly</option>
            </select>
            {payTypeError && <span className="pj-err">{payTypeError}</span>}
          </div>
        </div>

        {/* Deadline */}
        <div className="pj-section-label">Application deadline</div>
        <div className="pj-deadline">
          <div className="pj-field">
            <input
              type="date"
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
                setDeadlineError("");
              }}
              className={deadlineError ? "input-error" : ""}
            />
            {deadlineError && <span className="pj-err">{deadlineError}</span>}
          </div>
        </div>

        {/* Description */}
        <div className="pj-section-label">Description</div>
        <div className="pj-field">
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError("");
            }}
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            className={`pj-textarea ${descriptionError ? "input-error" : ""}`}
          />
          {descriptionError && (
            <span className="pj-err">{descriptionError}</span>
          )}
        </div>

        {/* Skills */}
        <div className="pj-section-label">Required skills</div>
        <div className="pj-skill-row">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="e.g. React, Node.js, Python"
            className={skillsError ? "input-error" : ""}
          />
          <button type="button" className="pj-add-btn" onClick={addSkill}>
            + Add
          </button>
        </div>
        {skillsError && <span className="pj-err">{skillsError}</span>}

        {skills.length === 0 ? (
          <p className="pj-no-skills">No skills added yet</p>
        ) : (
          <div className="pj-tags">
            {skills.map((s, i) => (
              <span key={i} className="pj-tag">
                {s.skillName}
                <button type="button" onClick={() => removeSkill(i)}>
                  &#215;
                </button>
              </span>
            ))}
          </div>
        )}

        <hr className="pj-divider" />
        <div className="pj-buttons">
          <button type="button" className="pj-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="pj-post">
            Post job
          </button>
        </div>

        <ToastMsg
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </form>
    </div>
  );
}
