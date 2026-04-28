import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob, setSkill } from "../slice/EmployerJobSlice";
import "../styles/PostJob.css";
import ToastMsg from "../../../component/Toast";

export default function PostJob() {
  const dispatch = useDispatch();

  const { categories = [] } = useSelector((state) => state.category);
  const { error, loading } = useSelector((state) => state.myJobs);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: "",
    experience: "",
    category: "",
    minSalary: "",
    maxSalary: "",
    payType: "",
    deadline: "",
    description: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    const exists = skills.some(
      (item) => item.skillName.toLowerCase() === value.toLowerCase(),
    );

    if (exists) {
      setSkillInput("");
      return;
    }

    setSkills([...skills, { skillName: value }]);
    setSkillInput("");

    setErrors({
      ...errors,
      skills: "",
    });
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.jobType) newErrors.jobType = "Select job type";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.category) newErrors.category = "Select category";
    if (!formData.minSalary) newErrors.minSalary = "Min salary is required";
    if (!formData.maxSalary) newErrors.maxSalary = "Max salary is required";
    if (!formData.payType) newErrors.payType = "Select pay type";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (skills.length === 0) {
      newErrors.skills = "Add at least one skill";
    }

    if (
      Number(formData.minSalary) > Number(formData.maxSalary)
    ) {
      newErrors.maxSalary =
        "Max salary should be greater than min salary";
    }

    if (
      formData.deadline &&
      formData.deadline < today
    ) {
      newErrors.deadline = "Deadline must be future date";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await dispatch(
        createJob({
          title: formData.title,
          location: formData.location,
          jobType: formData.jobType,
          experienceReq: Number(formData.experience),
          category: formData.category,
          minSalary: Number(formData.minSalary),
          maxSalary: Number(formData.maxSalary),
          payType: formData.payType,
          deadLine: formData.deadline,
          description: formData.description,
        }),
      ).unwrap();

      await dispatch(
        setSkill({
          jobId: res.jobId,
          skills,
        }),
      ).unwrap();

      setToast({
        show: true,
        message: "Job posted successfully",
        type: "success",
      });

      handleCancel();
    } catch (err) {}
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      location: "",
      jobType: "",
      experience: "",
      category: "",
      minSalary: "",
      maxSalary: "",
      payType: "",
      deadline: "",
      description: "",
    });

    setSkills([]);
    setSkillInput("");
    setErrors({});
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

        <div className="pj-section-label">Basic info</div>

        <div className="pj-grid-2">
          <div className="pj-field">
            <label>Job title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && (
              <span className="pj-err">{errors.title}</span>
            )}
          </div>

          <div className="pj-field">
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Chennai / Remote"
              className={errors.location ? "input-error" : ""}
            />
            {errors.location && (
              <span className="pj-err">{errors.location}</span>
            )}
          </div>
        </div>

        <div className="pj-grid-3">
          <div className="pj-field">
            <label>Job type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className={errors.jobType ? "input-error" : ""}
            >
              <option value="">Select</option>
              <option value="FULL_TIME">Full time</option>
              <option value="PART_TIME">Part time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
            {errors.jobType && (
              <span className="pj-err">{errors.jobType}</span>
            )}
          </div>

          <div className="pj-field">
            <label>Experience</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={errors.experience ? "input-error" : ""}
            />
            {errors.experience && (
              <span className="pj-err">{errors.experience}</span>
            )}
          </div>

          <div className="pj-field">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? "input-error" : ""}
            >
              <option value="">Select</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <span className="pj-err">{errors.category}</span>
            )}
          </div>
        </div>

        <div className="pj-section-label">Compensation</div>

        <div className="pj-grid-3">
          <div className="pj-field">
            <label>Min salary</label>
            <input
              type="number"
              name="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              className={errors.minSalary ? "input-error" : ""}
            />
            {errors.minSalary && (
              <span className="pj-err">{errors.minSalary}</span>
            )}
          </div>

          <div className="pj-field">
            <label>Max salary</label>
            <input
              type="number"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              className={errors.maxSalary ? "input-error" : ""}
            />
            {errors.maxSalary && (
              <span className="pj-err">{errors.maxSalary}</span>
            )}
          </div>

          <div className="pj-field">
            <label>Pay type</label>
            <select
              name="payType"
              value={formData.payType}
              onChange={handleChange}
              className={errors.payType ? "input-error" : ""}
            >
              <option value="">Select</option>
              <option value="MONTHLY">Monthly</option>
              <option value="ANNUALLY">Yearly</option>
            </select>

            {errors.payType && (
              <span className="pj-err">{errors.payType}</span>
            )}
          </div>
        </div>

        <div className="pj-section-label">
          Application deadline
        </div>

        <div className="pj-field">
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={errors.deadline ? "input-error" : ""}
          />
          {errors.deadline && (
            <span className="pj-err">{errors.deadline}</span>
          )}
        </div>

        <div className="pj-section-label">Description</div>

        <div className="pj-field">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`pj-textarea ${
              errors.description ? "input-error" : ""
            }`}
          />

          {errors.description && (
            <span className="pj-err">
              {errors.description}
            </span>
          )}
        </div>

        <div className="pj-section-label">
          Required skills
        </div>

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
            className={errors.skills ? "input-error" : ""}
          />

          <button
            type="button"
            className="pj-add-btn"
            onClick={addSkill}
          >
            + Add
          </button>
        </div>

        {errors.skills && (
          <span className="pj-err">{errors.skills}</span>
        )}

        <div className="pj-tags">
          {skills.map((skill, index) => (
            <span key={index} className="pj-tag">
              {skill.skillName}

              <button
                type="button"
                onClick={() => removeSkill(index)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <hr className="pj-divider" />

        <div className="pj-buttons">
          <button
            type="button"
            className="pj-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="pj-post"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>

        <ToastMsg
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              ...toast,
              show: false,
            })
          }
        />
      </form>
    </div>
  );
}